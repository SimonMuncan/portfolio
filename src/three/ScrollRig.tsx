import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Lenis from 'lenis'
import { scrollState, measureAct4Top } from './scrollState'

// ScrollRig — the cinematic core.
// Lenis smooths native scroll; raw scroll position (px) is mapped onto a
// CatmullRom camera path traveling through the particle corridor toward the
// orb. The camera reaches full arrival exactly at the Act 4 boundary
// (scrollState.act4Top), whatever that pixel offset turns out to be — so the
// journey stays in sync with real content length instead of an assumed vh
// budget. SceneCanvas fades out over the same boundary (see scrollState.ts).

export default function ScrollRig() {
  const camera = useThree((s) => s.camera)
  const smoothed = useRef(0)

  // Camera travel path: a gentle S-curve through the field, ending framed on the orb at z=-46.
  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0, 14),
          new THREE.Vector3(1.6, 0.4, -4),
          new THREE.Vector3(-1.8, -0.5, -18),
          new THREE.Vector3(0.8, 0.3, -30),
          new THREE.Vector3(0, 0, -39.5), // final: orb (z=-46) fills the frame
        ],
        false,
        'catmullrom',
        0.5
      ),
    []
  )

  useEffect(() => {
    // Same immediate sync as SceneCanvas: this component mounts later (it's
    // inside the lazy-loaded 3D bundle), so re-sync here too in case that
    // load gap outlasted SceneCanvas's own sync.
    scrollState.y = window.scrollY
    measureAct4Top()
    const onResize = () => measureAct4Top()
    window.addEventListener('resize', onResize)
    const settleTimer = setTimeout(measureAct4Top, 600) // catch late webfont/layout shifts

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
    const onScroll = ({ scroll }: { scroll: number }) => {
      scrollState.y = scroll
    }
    lenis.on('scroll', onScroll)
    let raf: number
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(settleTimer)
      window.removeEventListener('resize', onResize)
      lenis.destroy()
    }
  }, [])

  const pos = useMemo(() => new THREE.Vector3(), [])
  const ahead = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    // Camera travels Acts 1–3, arriving fully at the orb exactly at the Act 4
    // boundary; clamp so Act 4's flat content doesn't keep moving a camera
    // nobody can see.
    const t = Math.min(scrollState.y / Math.max(scrollState.act4Top, 1), 1)
    smoothed.current = THREE.MathUtils.damp(smoothed.current, t, 3, delta)

    path.getPointAt(smoothed.current, pos)
    path.getPointAt(Math.min(smoothed.current + 0.02, 1), ahead)
    camera.position.copy(pos)
    camera.lookAt(ahead.x, ahead.y, ahead.z - 4) // bias look target deeper for stability
  })

  return null
}
