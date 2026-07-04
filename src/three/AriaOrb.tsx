import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// AriaOrb — ARIA's identity mark, arriving in Act 3. A solid near-black core
// (so the orb reads as an object, not a light leak) plus a slightly larger
// fresnel-rim shell: the glow is entirely a view-dependent fresnel term,
// additively blended. No postprocessing/bloom — matches the brief's hard
// performance constraint.

const VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;

  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.2);

    vec3 purple = vec3(0.486, 0.227, 0.929); // #7C3AED
    vec3 cyan   = vec3(0.133, 0.827, 0.933); // #22D3EE
    vec3 rim = mix(purple, cyan, 0.5 + 0.5 * sin(uTime * 0.15));

    gl_FragColor = vec4(rim * fresnel * 1.6, fresnel);
  }
`

type Props = { position?: [number, number, number] }

export default function AriaOrb({ position = [0, 0, 0] }: Props) {
  const group = useRef<THREE.Group>(null!)
  const rim = useRef<THREE.ShaderMaterial>(null!)

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.05
    rim.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[2.1, 48, 48]} />
        {/* Matches the page/canvas background (#05050e) exactly, so the final
            approach — where the orb's surface fills the whole frame — dissolves
            into Act 4's flat background with no visible seam. */}
        <meshBasicMaterial color="#05050e" />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[2.1, 48, 48]} />
        <shaderMaterial
          ref={rim}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  )
}
