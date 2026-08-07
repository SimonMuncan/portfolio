import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { act4 } from '../content'

const EMAIL = act4.contact.email

/**
 * A mailto link that still does something useful without a mail client.
 *
 * A bare `mailto:` is a dead click for anyone whose browser has no handler
 * registered — no Outlook, no Thunderbird, webmail only — which is most people
 * on a work laptop. Nothing opens, no error appears, and because every one of
 * these links is labelled ("Email Simon", "Hire me") rather than showing the
 * address, the visitor walks away without it.
 *
 * There is no reliable way to detect whether the handler exists, so this
 * doesn't try. The href is left alone, and the click *also* copies the address
 * and says so. Mail client present: it opens, and the copy is harmless. Mail
 * client absent: the visitor still leaves with the address and can see that
 * the click registered.
 */
interface Props {
  children: ReactNode
  className?: string
  /** Shown in place of `children` for a moment after a successful copy. */
  copiedLabel?: string
  /** Runs alongside the copy. The mailto still fires either way. */
  onClick?: () => void
}

export default function EmailLink({
  children,
  className,
  copiedLabel = 'Email copied',
  onClick,
}: Props) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function handleClick() {
    onClick?.()
    // Not awaited and not blocking: the mailto must fire normally either way.
    // Older browsers and insecure contexts have no clipboard API at all, and a
    // rejected permission is not worth surfacing — the link still works.
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => {
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), 1800)
      })
      .catch(() => {})
  }

  return (
    <a
      href={`mailto:${EMAIL}`}
      onClick={handleClick}
      // Surfaces the address on hover, so it is readable without clicking.
      title={EMAIL}
      aria-live="polite"
      className={className}
    >
      {copied ? copiedLabel : children}
    </a>
  )
}
