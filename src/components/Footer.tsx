import { act4 } from '../content'
import EmailLink from './EmailLink'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs tabular-nums text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Simon Muncan</p>
        <div className="flex items-center gap-6">
          <EmailLink className="transition-colors hover:text-ink" copiedLabel="Copied">
            Email
          </EmailLink>
          <a href={act4.contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            LinkedIn
          </a>
          <a href={act4.contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
