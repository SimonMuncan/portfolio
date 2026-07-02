import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ParticleField — a single THREE.Points draw call. One buffer, one shader.
// Nebula shape: gaussian disc stretched along the camera's travel axis (z),
// so the scroll journey always has particles drifting past.
// Colors are mixed per-particle between nebula purple and cosmic cyan.

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aHue; // 0 = purple, 1 = cyan
  varying float vHue;
  varying float vDepth;
  uniform float uTime;

  void main() {
    vHue = aHue;
    vec3 p = position;
    // Slow organic drift; cheap, no noise texture needed.
    p.x += sin(uTime * 0.05 + position.z * 0.35) * 0.35;
    p.y += cos(uTime * 0.04 + position.x * 0.30) * 0.35;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_PointSize = aSize * (140.0 / -mv.z); // perspective attenuation
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  varying float vHue;
  varying float vDepth;

  void main() {
    // Soft round sprite, no texture: radial falloff from point center.
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);

    vec3 purple = vec3(0.486, 0.227, 0.929); // #7C3AED
    vec3 cyan   = vec3(0.133, 0.827, 0.933); // #22D3EE
    vec3 color  = mix(purple, cyan, vHue);

    // Fade very near/far particles so camera travel never clips a bright dot.
    float depthFade = smoothstep(1.0, 6.0, vDepth) * smoothstep(110.0, 60.0, vDepth);
    gl_FragColor = vec4(color, alpha * 0.55 * depthFade);
  }
`

type Props = { count: number }

export default function ParticleField({ count }: Props) {
  const group = useRef<THREE.Group>(null!)
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const mouse = useRef({ x: 0, y: 0 })

  const { positions, sizes, hues } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const hues = new Float32Array(count)
    // Box-Muller gaussian for a natural cluster density.
    const gauss = () =>
      Math.sqrt(-2 * Math.log(Math.random() || 1e-9)) * Math.cos(2 * Math.PI * Math.random())

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = gauss() * 9 // x spread
      positions[i * 3 + 1] = gauss() * 5 // y flatter, disc feel
      positions[i * 3 + 2] = -Math.random() * 90 // z: full travel corridor, 0 → -90
      sizes[i] = 0.6 + Math.pow(Math.random(), 3) * 2.6 // few large, many small
      hues[i] = Math.random() < 0.78 ? Math.random() * 0.25 : 0.7 + Math.random() * 0.3
    }
    return { positions, sizes, hues }
  }, [count])

  useFrame((state, delta) => {
    mat.current.uniforms.uTime.value = state.clock.elapsedTime
    // Mouse parallax: lerp group rotation toward pointer, framerate-independent damping.
    mouse.current.x = THREE.MathUtils.damp(mouse.current.x, state.pointer.x, 2.5, delta)
    mouse.current.y = THREE.MathUtils.damp(mouse.current.y, state.pointer.y, 2.5, delta)
    group.current.rotation.y = mouse.current.x * 0.06
    group.current.rotation.x = -mouse.current.y * 0.04
  })

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry key={count}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aHue" args={[hues, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
