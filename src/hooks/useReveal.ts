import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )

    const revealEls = el.querySelectorAll('.reveal')
    if (revealEls.length > 0) {
      revealEls.forEach((child) => observer.observe(child))
    } else {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
