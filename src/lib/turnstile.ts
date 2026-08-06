// Cloudflare Turnstile — proves to the chat Worker that a request came from a
// real browser on this site rather than a script. The Worker rejects anything
// without a valid token with a 401.
//
// Turnstile tokens are single-use once verified, so this mints a fresh one per
// message rather than caching.
//
// NOTE: callbacks are registered at render() time. Turnstile does not document
// accepting them on execute(), so the widget resolves whichever request is
// currently in flight via `pending` below.

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

const TOKEN_TIMEOUT_MS = 15_000

interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string
  execute(el: HTMLElement | string, opts?: Record<string, unknown>): void
  reset(widgetId: string): void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<void> | null = null
let widgetId: string | null = null

// Resolver for the token request currently in flight. Only one at a time —
// the widget can't run two challenges concurrently.
let pending: ((token: string | null) => void) | null = null

function settle(token: string | null) {
  const resolve = pending
  pending = null
  resolve?.(token)
}

/** Loads the Turnstile script once, shared across all callers. */
function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Turnstile failed to load'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

/** Renders the invisible widget once, with callbacks wired to `pending`. */
async function ensureWidget(): Promise<{ id: string; host: HTMLElement }> {
  await loadScript()
  const api = window.turnstile
  if (!api) throw new Error('Turnstile unavailable')

  if (widgetId && hostEl) return { id: widgetId, host: hostEl }

  const host = document.createElement('div')
  host.style.display = 'none'
  document.body.appendChild(host)
  hostEl = host

  widgetId = api.render(host, {
    sitekey: SITE_KEY,
    execution: 'execute', // don't run until we ask
    appearance: 'interaction-only', // stay invisible unless a challenge is needed
    callback: (token: string) => settle(token),
    'error-callback': () => settle(null),
    'timeout-callback': () => settle(null),
    'expired-callback': () => settle(null),
  })

  return { id: widgetId, host }
}

let hostEl: HTMLElement | null = null

/**
 * Returns a fresh single-use token, or null when Turnstile isn't configured or
 * the challenge failed. A null result is treated by the caller as a retryable
 * failure, not a permanent one.
 */
export async function getTurnstileToken(): Promise<string | null> {
  if (!SITE_KEY) return null
  if (pending) return null // a challenge is already running

  try {
    const { id, host } = await ensureWidget()
    const api = window.turnstile!

    return await new Promise<string | null>((resolve) => {
      pending = resolve

      const timer = setTimeout(() => settle(null), TOKEN_TIMEOUT_MS)
      const done = (token: string | null) => {
        clearTimeout(timer)
        resolve(token)
      }
      pending = done

      // reset() clears the previous single-use token before re-running.
      api.reset(id)
      api.execute(host)
    })
  } catch {
    pending = null
    return null
  }
}
