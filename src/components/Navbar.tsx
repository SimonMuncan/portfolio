import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import EmailLink from './EmailLink'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Sithea', href: '#building' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md transition-colors ${
        scrolled || menuOpen ? 'border-ink/10' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-sm font-semibold tracking-tight text-ink">
          Simon Muncan
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <EmailLink className="btn-primary !px-4 !py-2">Email me</EmailLink>
          </li>
        </ul>

        <button
          className="-mr-2 grid h-11 w-11 place-items-center rounded-md text-ink md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-ink/10 px-6 pb-6 pt-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2.5 text-base text-ink"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <EmailLink
              // Delayed rather than immediate, unlike the nav links above:
              // closing the menu at once hides the "Email copied" confirmation,
              // which is the only feedback a phone with no mail app gets.
              onClick={() => window.setTimeout(() => setMenuOpen(false), 1400)}
              className="btn-primary w-full justify-center"
            >
              Email me
            </EmailLink>
          </li>
        </ul>
      )}
    </header>
  )
}
