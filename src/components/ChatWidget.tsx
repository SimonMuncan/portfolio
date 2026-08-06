import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageSquare, X } from 'lucide-react'
import { act4 } from '../content'
import { getTurnstileToken } from '../lib/turnstile'

// The chat Worker's URL. Cross-origin, so the Worker echoes CORS headers for
// origins on its allow-list.
const CHAT_URL = import.meta.env.VITE_CHAT_API_URL ?? '/api/chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const OPENER =
  "I'm Simon's portfolio assistant. Ask me about his stack, his projects, or his experience."

const SUGGESTIONS = [
  'What has he built with .NET?',
  'Walk me through Sithea.',
  'How much cloud experience does he have?',
]

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
    body: JSON.stringify({ messages, turnstileToken }),
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

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Drop any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), [])

  async function send(text: string) {
    const question = text.trim()
    if (!question || busy) return

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

  const empty = messages.length === 0

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Ask about Simon's work"
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(24rem,calc(100vw-2rem))] h-[min(32rem,calc(100vh-8rem))] flex flex-col rounded-2xl border border-white/10 bg-void/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cosmic" aria-hidden="true" />
                <h2 className="font-sans text-sm font-semibold text-bone">Ask about my work</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-ash hover:text-bone transition-colors"
              >
                <X size={16} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <p className="font-sans text-sm text-ash leading-relaxed">{OPENER}</p>

              {empty && !unavailable && (
                <div className="flex flex-col items-start gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="font-sans text-xs text-left text-cosmic/90 hover:text-cosmic border border-cosmic/25 hover:border-cosmic/50 rounded-full px-3 py-1.5 transition-colors"
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
                        ? 'font-sans text-sm text-bone bg-white/[0.07] rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[85%] whitespace-pre-wrap'
                        : 'font-sans text-sm text-bone leading-relaxed whitespace-pre-wrap'
                    }
                  >
                    {m.content}
                    {m.role === 'assistant' && !m.content && busy && (
                      <span className="inline-block w-1.5 h-3.5 bg-cosmic/70 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
              ))}

              {error && <p className="font-sans text-sm text-gold">{error}</p>}

              {!empty && !busy && !unavailable && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`mailto:${act4.contact.email}`}
                    className="font-sans text-xs text-cosmic/90 hover:text-cosmic border border-cosmic/25 hover:border-cosmic/50 rounded-full px-3 py-1.5 transition-colors"
                  >
                    Email Simon
                  </a>
                  <a
                    href="/sithea"
                    className="font-sans text-xs text-ash hover:text-bone border border-white/10 hover:border-white/25 rounded-full px-3 py-1.5 transition-colors"
                  >
                    Read the case study
                  </a>
                </div>
              )}
            </div>

            {unavailable ? (
              <div className="px-4 py-4 border-t border-white/10">
                <p className="font-sans text-sm text-bone leading-relaxed">
                  The assistant is offline right now.
                </p>
                <p className="font-sans text-xs text-ash leading-relaxed mt-1 mb-3">
                  Simon answers his own email faster than any bot does anyway.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${act4.contact.email}`}
                    className="font-sans text-xs text-cosmic/90 hover:text-cosmic border border-cosmic/25 hover:border-cosmic/50 rounded-full px-3 py-1.5 transition-colors"
                  >
                    Email Simon
                  </a>
                  <a
                    href={act4.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-xs text-ash hover:text-bone border border-white/10 hover:border-white/25 rounded-full px-3 py-1.5 transition-colors"
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
                className="flex items-center gap-2 px-3 py-3 border-t border-white/10"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  maxLength={800}
                  aria-label="Your question"
                  className="flex-1 bg-transparent font-sans text-sm text-bone placeholder:text-ash/70 focus:outline-none px-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send message"
                  className="shrink-0 w-8 h-8 grid place-items-center rounded-full bg-cosmic/15 text-cosmic disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cosmic/25 transition-colors"
                >
                  <ArrowUp size={15} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Ask about my work'}
        aria-expanded={open}
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-void/90 backdrop-blur-xl pl-4 pr-5 py-3 shadow-xl shadow-black/50 hover:border-cosmic/40 transition-colors"
      >
        {open ? (
          <X size={16} className="text-ash" />
        ) : (
          <MessageSquare size={16} className="text-cosmic" />
        )}
        <span className="font-sans text-sm font-medium text-bone">
          {open ? 'Close' : 'Ask about my work'}
        </span>
      </button>
    </>
  )
}
