import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import ParticleField from './ParticleField'
import SitheaOrb from './SitheaOrb'
import ScrollRig from './ScrollRig'

// Scene — everything inside the WebGL context.
// Loaded lazily by SceneCanvas; never import this statically.

type Props = { onReady: () => void }

export default function Scene({ onReady }: Props) {
  // Adaptive particle budget. PerformanceMonitor halves it if the GPU struggles.
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768
  const [count, setCount] = useState(isSmall ? 18_000 : 45_000)

  useEffect(() => onReady(), [onReady])

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 14], fov: 55, near: 0.1, far: 120 }}
    >
      <color attach="background" args={['#05050E']} />
      <PerformanceMonitor onDecline={() => setCount((c) => Math.max(8_000, Math.floor(c * 0.5)))}>
        <ParticleField count={count} />
        <SitheaOrb position={[0, 0, -46]} />
        <ScrollRig />
      </PerformanceMonitor>
    </Canvas>
  )
}
