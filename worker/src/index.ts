import { Budget, RESERVED_TOKENS } from './budget.js'
import { SYSTEM_PROMPT } from './knowledge.js'

export { Budget }

// $0.25 / $1.50 per 1M tokens, with a free tier. 'gemini-2.5-flash-lite' is
// cheaper still ($0.10 / $0.40) if you ever want to trade capability for cost.
const MODEL = 'gemini-3.1-flash-lite'

// Answers are meant to be two or three sentences — this is a backstop, not a
// target. Thinking tokens bill as output and count against this.
const MAX_OUTPUT_TOKENS = 600

const MAX_MESSAGE_CHARS = 800 // one user message
// Messages kept from the client's transcript. The prompt's strongest rule is
// "never send the same answer twice", and it enforces that by seeing what it
// already said — so this is the real ceiling on that behaviour, not a detail.
// 20 messages is 10 exchanges; below that it starts repeating itself legally.
const MAX_HISTORY = 20

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`
const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

interface Env {
  BUDGET: DurableObjectNamespace
  GEMINI_API_KEY: string
  TURNSTILE_SECRET: string
  ALLOWED_ORIGINS: string
}

interface ChatTurn {
  role: 'user' | 'model'
  parts: [{ text: string }]
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  if (!origin || !allowed.includes(origin)) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  }
}

/** Verifies the Turnstile token. Tokens are single-use, so one per message. */
async function verifyTurnstile(token: string, ip: string, env: Env): Promise<boolean> {
  if (!token) return false
  const body = new FormData()
  body.append('secret', env.TURNSTILE_SECRET)
  body.append('response', token)
  if (ip) body.append('remoteip', ip)
  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body })
    const { success } = (await res.json()) as { success: boolean }
    return success === true
  } catch {
    return false
  }
}

function parseHistory(raw: unknown): ChatTurn[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null

  const turns: ChatTurn[] = []
  for (const entry of raw.slice(-MAX_HISTORY)) {
    const { role, content } = (entry ?? {}) as Record<string, unknown>
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS)
    if (!text) return null
    turns.push({ role: role === 'user' ? 'user' : 'model', parts: [{ text }] })
  }

  // Gemini requires the transcript to open on a user turn and end on one.
  while (turns.length && turns[0].role !== 'user') turns.shift()
  if (!turns.length || turns[turns.length - 1].role !== 'user') return null
  return turns
}

const json = (body: unknown, status: number, headers: Record<string, string>) =>
  Response.json(body, { status, headers })

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = req.headers.get('Origin')
    const cors = corsHeaders(origin, env)

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors)

    let payload: { messages?: unknown; turnstileToken?: unknown }
    try {
      payload = await req.json()
    } catch {
      return json({ error: 'Invalid request' }, 400, cors)
    }

    // Attestation first — an unverified request must not reach the model,
    // the budget, or anything else that costs money.
    const ip = req.headers.get('CF-Connecting-IP') ?? ''
    const token = typeof payload.turnstileToken === 'string' ? payload.turnstileToken : ''
    if (!(await verifyTurnstile(token, ip, env))) {
      return json({ error: 'Unverified request.' }, 401, cors)
    }

    const contents = parseHistory(payload.messages)
    if (!contents) return json({ error: 'Invalid request' }, 400, cors)

    // One Durable Object instance for the whole site, so both the rate limit
    // and the token count are global rather than per-isolate.
    const budget = env.BUDGET.get(env.BUDGET.idFromName('global'))
    const reserved = (await (
      await budget.fetch('https://budget/reserve', {
        method: 'POST',
        body: JSON.stringify({ ip }),
      })
    ).json()) as { ok: boolean; reason?: string }

    if (!reserved.ok) {
      // A rate limit is the visitor's own doing and clears on its own; an
      // exhausted budget is terminal for the day. The widget treats 429 as
      // retryable and 503 as "hand off to email".
      return reserved.reason === 'rate_limit'
        ? json({ error: 'Too many messages. Give it a minute.' }, 429, cors)
        : json(
            {
              error:
                'The assistant is off for today. Email simonmuncan@gmail.com and Simon will reply himself.',
            },
            503,
            cors,
          )
    }

    const upstream = await fetch(`${GEMINI_URL}&key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          // Deliberately not low. The dossier is a pile of facts rather than
          // prewritten answers, so the model has to choose between them — and
          // at 0.4 it made the same choice every time, which is what made two
          // different questions about the same job come back word for word.
          // Past ~0.8 the grounding starts to soften, and a fabricated fact
          // costs more here than a repeated one.
          temperature: 0.7,
          topP: 0.95,
          // Selecting the right facts is light work, and thinking tokens bill
          // at the output rate. If answers still read as recitation, 'LOW' is
          // the dial — verify the model accepts it before shipping, since an
          // unsupported level is a 400 and takes the whole chat down.
          thinkingConfig: { thinkingLevel: 'MINIMAL' },
        },
      }),
    })

    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()
    const send = (event: string, data: unknown) =>
      writer.write(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))

    // Relay Gemini's stream into our own SSE shape, then settle the budget.
    // Handed to waitUntil rather than awaited: the response must return so the
    // browser can start reading, but the runtime must not tear the context down
    // before the settle call lands — otherwise the reservation stays charged.
    const relay = (async () => {
      let used = 0
      try {
        if (!upstream.ok || !upstream.body) {
          console.error('gemini error', upstream.status, await upstream.text().catch(() => ''))
          await send('error', { message: 'Something broke on my end. Try again in a moment.' })
          return
        }

        const reader = upstream.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let emitted = false

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          // Gemini separates SSE frames with CRLF. Normalise so the split below
          // works whether the upstream sends \r\n\r\n or \n\n — getting this
          // wrong means no frame ever matches and the reply arrives empty.
          buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n')

          const frames = buffer.split('\n\n')
          buffer = frames.pop() ?? ''

          for (const frame of frames) {
            const line = frame.split('\n').find((l) => l.startsWith('data:'))
            if (!line) continue

            const payload = line.slice(line.indexOf(':') + 1).trim()
            if (!payload || payload === '[DONE]') continue

            let chunk: any
            try {
              chunk = JSON.parse(payload)
            } catch {
              console.error('skipped unparseable SSE frame')
              continue
            }

            const text = chunk?.candidates?.[0]?.content?.parts
              ?.map((p: { text?: string }) => p.text ?? '')
              .join('')
            if (text) {
              emitted = true
              await send('delta', { text })
            }

            const total = chunk?.usageMetadata?.totalTokenCount
            if (typeof total === 'number') used = Math.max(used, total)
          }
        }

        // Never end a stream silently. If the relay produced nothing, say so
        // rather than letting the widget quietly drop an empty reply.
        if (!emitted) {
          console.error('relay produced no text')
          await send('error', { message: 'Something broke on my end. Try again in a moment.' })
        } else {
          await send('done', {})
        }
      } catch (err) {
        console.error('stream failed', err)
        await send('error', { message: 'Something broke on my end. Try again in a moment.' })
      } finally {
        // Refund the unused reservation, or charge the overage. A failed
        // request refunds in full because `used` stays 0.
        const delta = used - RESERVED_TOKENS
        if (delta !== 0) {
          await budget
            .fetch('https://budget/settle', {
              method: 'POST',
              body: JSON.stringify({ delta }),
            })
            .catch((err) => console.error('budget settle failed', err))
        }
        await writer.close().catch(() => {})
      }
    })()

    ctx.waitUntil(relay)

    return new Response(readable, {
      headers: {
        ...cors,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
      },
    })
  },
}
