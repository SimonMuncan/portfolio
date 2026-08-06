/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Deployed chat Worker, e.g. https://portfolio-chat.<subdomain>.workers.dev
  // Falls back to /api/chat (the Vite dev proxy) when unset.
  readonly VITE_CHAT_API_URL?: string
  // Cloudflare Turnstile *site* key (the public half).
  readonly VITE_TURNSTILE_SITE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
