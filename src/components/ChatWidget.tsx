import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageSquare, X } from 'lucide-react'
import { act4 } from '../content'
import EmailLink from './EmailLink'
import { getTurnstileToken } from '../lib/turnstile'
import { OPEN_CHAT_EVENT } from '../lib/chat'
import type { OpenChatDetail } from '../lib/chat'

// The chat Worker's URL. Cross-origin, so the Worker echoes CORS headers for
// origins on its allow-list.
const CHAT_URL = import.meta.env.VITE_CHAT_API_URL ?? '/api/chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const OPENER =
  "I'm Simon's portfolio assistant. Ask me about his stack, his projects, or his experience."

// Drawn from rather than shown whole. Three fixed prompts sent most visitors
// down the same three answers, which made the assistant look like it only knew
// three things. Rotating the openers spreads the first question across the
// dossier instead.
const SUGGESTION_POOL = [
  'What has he built with .NET?',
  'Walk me through Sithea.',
  'How much cloud experience does he have?',
  'What is he working on right now?',
  'Show me his strongest backend work.',
  'Has he shipped anything solo, end to end?',
  'How does he handle non-technical stakeholders?',
  'Is he worth interviewing for a senior role?',
  'Why did he build a health app?',
  'How does this chat widget actually work?',
]

const SUGGESTION_COUNT = 3

// Most visitors never notice a launcher in the corner, so once per session a
// short nudge says what it is for. Shown after they have had time to look at
// the hero, never while the panel is open, and gone for good once dismissed.
const NUDGE_DELAY_MS = 7000
const NUDGE_KEY = 'chat-nudge-seen'

function nudgeSeen(): boolean {
  try {
    return sessionStorage.getItem(NUDGE_KEY) === '1'
  } catch {
    return false
  }
}

function markNudgeSeen() {
  try {
    sessionStorage.setItem(NUDGE_KEY, '1')
  } catch {
    // Storage blocked: the nudge may show again next load, which is harmless.
  }
}

// Mirrors the Worker's own MAX_HISTORY — it ignores anything older.
const MAX_HISTORY = 20

// How close to the bottom still counts as "following along". Wide enough to
// absorb sub-pixel rounding and the caret's own height.
const PIN_THRESHOLD_PX = 48

/** Fisher-Yates over a copy, so the pool itself is never reordered. */
function pickSuggestions(): string[] {
  const pool = [...SUGGESTION_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, SUGGESTION_COUNT)
}

/**
 * The assistant is definitively out — failed attestation, or the daily budget
 * is spent. Retrying won't help, so the widget hands off to email instead.
 */
class ChatUnavailable extends Error {}

/** Reads the SSE body and calls onDelta for each token as it lands. */
async function streamReply(
  messages: Message[],
  onDelta: (text: string) => void,
  signal: AbortSignal,
): Promise<void> {
  const turnstileToken = await getTurnstileToken()

  // A missing token is usually a transient challenge failure, not a broken
  // setup — let the visitor retry rather than retiring the composer.
  if (!turnstileToken) {
    throw new Error('Verification didn’t complete. Try sending that again?')
  }

  const res = await fetch(CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The Worker reads only the last MAX_HISTORY messages and refuses oversized
    // bodies, so a long conversation must not grow the request without bound.
    body: JSON.stringify({ messages: messages.slice(-MAX_HISTORY), turnstileToken }),
    signal,
  })

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: null }))
    // 401: Turnstile rejected us. 503: out of budget for the day.
    if ([401, 403, 503].includes(res.status)) throw new ChatUnavailable()
    throw new Error(error ?? 'That didn’t go through. Try again?')
  }
  if (!res.body) throw new Error('That didn’t go through. Try again?')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    // SSE frames are separated by a blank line.
    const frames = buffer.split('\n\n')
    buffer = frames.pop() ?? ''

    for (const frame of frames) {
      const event = frame.match(/^event: (.+)$/m)?.[1]
      const data = frame.match(/^data: (.+)$/m)?.[1]
      if (!event || !data) continue

      const payload = JSON.parse(data)
      if (event === 'delta') onDelta(payload.text)
      if (event === 'error') throw new Error(payload.message)
    }
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  // Chosen once per mount: they must not reshuffle under the visitor's cursor
  // on every re-render.
  const [suggestions] = useState(pickSuggestions)
  const [nudge, setNudge] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Whether the visitor is still reading the bottom of the log. Streaming a
  // reply must not drag them back down mid-sentence if they scrolled up.
  const pinnedRef = useRef(true)

  function onLogScroll() {
    const el = scrollRef.current
    if (!el) return
    pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < PIN_THRESHOLD_PX
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !pinnedRef.current) return
    // Instant while a reply streams. `messages` changes on every token, and a
    // smooth scroll re-issued that often restarts its animation before it can
    // land — which is what made the log lurch instead of following the text.
    el.scrollTo({ top: el.scrollHeight, behavior: busy ? 'auto' : 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    // The log unmounts with the panel, so a reopened chat would otherwise start
    // at scrollTop 0 — showing the opener with the conversation below the fold.
    // Jump, don't animate: this is a restore, not a new message arriving.
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (nudgeSeen()) return
    const timer = window.setTimeout(() => setNudge(true), NUDGE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // Opening the chat by any route counts as having seen the nudge.
  useEffect(() => {
    if (!open) return
    setNudge(false)
    markNudgeSeen()
  }, [open])

  function dismissNudge() {
    setNudge(false)
    markNudgeSeen()
  }

  // Sections open the chat through openChat(), sometimes with a question. The
  // listener is registered once, so it reaches send() through a ref rather
  // than capturing the first render's closure over an empty transcript.
  const sendRef = useRef<(text: string) => void>(() => {})

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true)
      const question = (e as CustomEvent<OpenChatDetail>).detail?.question
      if (question) sendRef.current(question)
    }
    window.addEventListener(OPEN_CHAT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen)
  }, [])

  // Drop any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), [])

  async function send(text: string) {
    const question = text.trim()
    if (!question || busy || unavailable) return

    // Sending is an explicit request to see what comes back, so re-follow the
    // log even if they had scrolled up to re-read something.
    pinnedRef.current = true

    const next: Message[] = [...messages, { role: 'user', content: question }]
    setMessages([...next, { role: 'assistant', content: '' }])
    setInput('')
    setError(null)
    setBusy(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await streamReply(next, (delta) => {
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = {
            role: 'assistant',
            content: copy[copy.length - 1].content + delta,
          }
          return copy
        })
      }, controller.signal)

      // An empty reply means the stream closed before saying anything.
      setMessages((prev) =>
        prev[prev.length - 1].content ? prev : prev.slice(0, -1),
      )
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      // Drop the empty assistant bubble we optimistically added.
      setMessages((prev) => (prev[prev.length - 1].content ? prev : prev.slice(0, -1)))
      if (err instanceof ChatUnavailable) setUnavailable(true)
      else setError((err as Error).message)
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  sendRef.current = send

  const empty = messages.length === 0

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Ask about Simon's work"
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(24rem,calc(100vw-2rem))] h-[min(32rem,calc(100vh-8rem))] flex flex-col rounded-xl border border-ink/10 bg-surface shadow-2xl shadow-black/15 overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <h2 className="font-sans text-sm font-semibold text-ink">Ask about my work</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-md text-muted hover:text-ink transition-colors"
              >
                <X size={16} />
              </button>
            </header>

            <div
              ref={scrollRef}
              onScroll={onLogScroll}
              // Keeps the wheel from scrolling the page once the log hits its end.
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4"
            >
              <p className="font-sans text-sm text-muted leading-relaxed">{OPENER}</p>

              {empty && !unavailable && (
                <div className="flex flex-col items-start gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="font-sans text-sm text-left text-ink border border-ink/15 hover:border-ink/40 rounded-md px-3 py-2 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  <p
                    className={
                      m.role === 'user'
                        ? 'font-sans text-sm text-paper bg-ink rounded-lg rounded-br-sm px-3.5 py-2 max-w-[85%] whitespace-pre-wrap'
                        : 'font-sans text-sm text-ink leading-relaxed whitespace-pre-wrap'
                    }
                  >
                    {m.content}
                    {m.role === 'assistant' && !m.content && busy && (
                      <span className="inline-block w-1.5 h-3.5 bg-ink/50 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
              ))}

              {error && <p className="font-sans text-sm text-red-600">{error}</p>}

              {!empty && !busy && !unavailable && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <EmailLink className="font-sans text-xs font-medium text-paper bg-ink hover:bg-ink/85 rounded-md px-3 py-1.5 transition-colors">
                    Email Simon
                  </EmailLink>
                  <a
                    href="/sithea"
                    className="font-sans text-xs font-medium text-ink border border-ink/15 hover:border-ink/40 rounded-md px-3 py-1.5 transition-colors"
                  >
                    Read the case study
                  </a>
                </div>
              )}
            </div>

            {unavailable ? (
              <div className="px-4 py-4 border-t border-ink/10">
                <p className="font-sans text-sm text-ink leading-relaxed">
                  The assistant is offline right now.
                </p>
                <p className="font-sans text-xs text-muted leading-relaxed mt-1 mb-3">
                  Simon answers his own email faster than any bot does anyway.
                </p>
                <div className="flex flex-wrap gap-2">
                  <EmailLink className="font-sans text-xs font-medium text-paper bg-ink hover:bg-ink/85 rounded-md px-3 py-1.5 transition-colors">
                    Email Simon
                  </EmailLink>
                  <a
                    href={act4.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-xs font-medium text-ink border border-ink/15 hover:border-ink/40 rounded-md px-3 py-1.5 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="flex items-center gap-2 px-3 py-3 border-t border-ink/10"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  maxLength={800}
                  aria-label="Your question"
                  className="flex-1 bg-transparent font-sans text-sm text-ink placeholder:text-muted focus:outline-none px-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send message"
                  className="shrink-0 w-8 h-8 grid place-items-center rounded-md bg-ink text-paper disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/85 transition-colors"
                >
                  <ArrowUp size={15} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            key="nudge"
            className="fixed bottom-[5.25rem] right-4 sm:right-6 z-50 w-[min(17rem,calc(100vw-2rem))] rounded-xl rounded-br-sm border border-ink/10 bg-surface shadow-xl shadow-black/15"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block w-full text-left px-4 py-3 pr-9"
            >
              <span className="block font-sans text-sm font-medium text-ink mb-0.5">
                Hiring, or just curious?
              </span>
              <span className="block font-sans text-xs text-muted leading-relaxed">
                Ask my assistant about my experience, stack or projects. It answers from my real work history.
              </span>
            </button>
            <button
              type="button"
              onClick={dismissNudge}
              aria-label="Dismiss"
              className="absolute top-1.5 right-1.5 grid h-8 w-8 place-items-center rounded-md text-muted hover:text-ink transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Ask about my work'}
        aria-expanded={open}
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-full bg-ink text-paper pl-4 pr-5 py-3 shadow-lg shadow-black/20 hover:bg-ink/85 transition-colors"
      >
        {open ? (
          <X size={16} />
        ) : (
          <MessageSquare size={16} />
        )}
        <span className="font-sans text-sm font-medium">
          {open ? 'Close' : 'Ask my AI about me'}
        </span>
      </button>
    </>
  )
}
