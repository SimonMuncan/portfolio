import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'ARIA', href: '#aria' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-gold text-base tracking-tight">
          Simon Muncan
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-ash hover:text-bone transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:simonmuncan@gmail.com"
              className="font-sans text-sm border border-gold text-gold px-4 py-1.5 rounded-full hover:bg-gold hover:text-void transition-colors duration-300"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-bone transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-bone transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-bone transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        } bg-void/95 backdrop-blur-xl border-b border-white/5`}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-bone hover:text-gold font-medium text-sm transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:simonmuncan@gmail.com"
              className="inline-flex justify-center font-sans text-sm border border-gold text-gold px-4 py-1.5 rounded-full w-full"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
