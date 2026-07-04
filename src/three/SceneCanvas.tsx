import { Suspense, lazy, useEffect, useState } from 'react'
import { scrollState, measureAct4Top } from './scrollState'

// SceneCanvas — the only 3D entry point.
// Mounted once in App, fixed behind the HTML flow:
//   <SceneCanvas />
//   <main className="relative z-10">...</main>
//
// Responsibilities:
// 1. Never block first paint: the three.js bundle loads via dynamic import.
// 2. Bail out entirely for reduced-motion users and missing WebGL2.
// 3. Fade in when ready so there is no pop.
// 4. Fade out (and stop costing GPU) just before scroll reaches Act 4 — the
//    fade window is anchored to the Act 4 boundary's real pixel offset (see
//    scrollState.ts), not a fixed fraction of total scroll, since Act 4's
//    length depends on actual content and isn't fixed.

const Scene = lazy(() => import('./Scene'))

function supportsWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!canvas.getContext('webgl2')
  } catch {
    return false
  }
}

export default function SceneCanvas() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [actFadeOpacity, setActFadeOpacity] = useState(1)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reducedMotion && supportsWebGL2()) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    // Sync immediately: on reload the browser can restore scroll to any
    // position before Lenis ever fires a 'scroll' event, so without this
    // scrollState.y stays stuck at its initial 0 and the fade/camera math
    // thinks the page is still at the top until the user scrolls once.
    scrollState.y = window.scrollY
    measureAct4Top()
    const onResize = () => measureAct4Top()
    window.addEventListener('resize', onResize)
    const settleTimer = setTimeout(measureAct4Top, 600) // catch late webfont/layout shifts

    let raf: number
    const tick = () => {
      if (Number.isFinite(scrollState.act4Top)) {
        const fadeEndY = scrollState.act4Top - window.innerHeight * 0.3
        const fadeStartY = scrollState.act4Top - window.innerHeight * 1.1
        const t = 1 - Math.min(Math.max((scrollState.y - fadeStartY) / Math.max(fadeEndY - fadeStartY, 1), 0), 1)
        const fade = t * t * (3 - 2 * t) // smoothstep ease so the dive into the orb tapers instead of cutting linearly
        setActFadeOpacity(fade)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(settleTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled])

  if (!enabled) {
    // Static fallback: cheap, calm, on-brand. Also the no-JS/weak-device experience.
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(124,58,237,0.10), transparent 70%), #05050E',
        }}
      />
    )
  }

  const hidden = !visible || actFadeOpacity <= 0.01

  return (
    // Outer div: one-shot CSS transition for the initial reveal (visible
    // flips false -> true, then stays). Inner div: the scroll-tied fade,
    // already smoothed per-frame above — no CSS transition here, since
    // retargeting a transition every rAf tick just fights the JS curve.
    <div
      aria-hidden
      className="fixed inset-0 z-0 transition-opacity duration-700"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: hidden ? 'none' : 'auto',
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      <div className="w-full h-full" style={{ opacity: actFadeOpacity }}>
        <Suspense fallback={null}>
          <Scene onReady={() => setVisible(true)} />
        </Suspense>
      </div>
    </div>
  )
}
