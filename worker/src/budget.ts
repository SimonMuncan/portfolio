/**
 * Daily token budget and per-IP rate limiting, as a Durable Object.
 *
 * A Durable Object is single-threaded and strongly consistent, and Cloudflare's
 * input gates stop concurrent requests from interleaving storage operations.
 * That is the whole reason this isn't a Workers KV key: without serialisation,
 * concurrent requests all read the same under-budget value and blow past the
 * cap together.
 *
 * Rate limiting lives here too rather than in Worker memory, because Worker
 * isolates are recycled constantly and each one would keep its own counts —
 * an in-memory limiter is barely a limiter at all.
 */

const DAILY_TOKEN_BUDGET = 300_000

// Claimed up front, reconciled against real usage once the reply lands. Sized
// as a generous upper bound for one exchange: full history in, capped reply out.
// The dossier is ~6k tokens of that on its own and rides on every request, so
// this tracks the size of knowledge.ts — under-reserving would let a burst of
// concurrent requests each pass the cap check and collectively overshoot it.
// Reservations are refunded as each reply settles, so this only ever stacks
// across genuinely in-flight requests.
// ~6k dossier + 20 history messages capped at 800 chars each + a 600-token
// reply lands near 10.7k, so this keeps a little headroom above the real worst
// case rather than sitting on it.
const RESERVED_TOKENS = 13_000

const RATE_LIMIT_MAX = 12 // messages per IP...
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // ...per 5 minutes
const MAX_TRACKED_IPS = 5_000 // bound storage if someone rotates addresses

interface Ledger {
  day: string
  tokens: number
}

type Hits = Record<string, number[]>

const today = () => new Date().toISOString().slice(0, 10)

export class Budget {
  constructor(private state: DurableObjectState) {}

  private async ledger(): Promise<Ledger> {
    const stored = await this.state.storage.get<Ledger>('ledger')
    // A new UTC day resets the count — no cron needed.
    if (!stored || stored.day !== today()) return { day: today(), tokens: 0 }
    return stored
  }

  /** True when this IP has exceeded its window. Prunes as it goes. */
  private async rateLimited(ip: string): Promise<boolean> {
    if (!ip) return false
    const now = Date.now()
    const hits = (await this.state.storage.get<Hits>('hits')) ?? {}

    // Drop expired timestamps, and any IP left with nothing.
    for (const [key, times] of Object.entries(hits)) {
      const live = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
      if (live.length) hits[key] = live
      else delete hits[key]
    }

    const mine = hits[ip] ?? []
    mine.push(now)
    hits[ip] = mine

    // Under sustained abuse from rotating IPs, stop growing the record.
    if (Object.keys(hits).length > MAX_TRACKED_IPS) {
      await this.state.storage.put('hits', { [ip]: mine })
      return mine.length > RATE_LIMIT_MAX
    }

    await this.state.storage.put('hits', hits)
    return mine.length > RATE_LIMIT_MAX
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)

    if (url.pathname === '/reserve') {
      const { ip } = (await req.json()) as { ip: string }

      if (await this.rateLimited(ip)) {
        return Response.json({ ok: false, reason: 'rate_limit' })
      }

      const ledger = await this.ledger()
      if (ledger.tokens >= DAILY_TOKEN_BUDGET) {
        return Response.json({ ok: false, reason: 'budget' })
      }

      await this.state.storage.put('ledger', {
        day: ledger.day,
        tokens: ledger.tokens + RESERVED_TOKENS,
      })
      return Response.json({ ok: true })
    }

    if (url.pathname === '/settle') {
      // delta = actual - reserved. Negative refunds the unused reservation.
      const { delta } = (await req.json()) as { delta: number }
      const ledger = await this.ledger()
      await this.state.storage.put('ledger', {
        day: ledger.day,
        tokens: Math.max(0, ledger.tokens + delta),
      })
      return Response.json({ ok: true })
    }

    return new Response('Not found', { status: 404 })
  }
}

export { DAILY_TOKEN_BUDGET, RESERVED_TOKENS }
