import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local dev fallback when VITE_CHAT_API_URL is unset: forwards to
      // `npm run dev` inside worker/ (wrangler's default port).
      '/api/chat': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        rewrite: () => '/',
      },
    },
  },
})
