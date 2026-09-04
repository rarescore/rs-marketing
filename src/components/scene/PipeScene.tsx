import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

function WaterFlow({ progress }: { progress: number }) {
  const points = useRef<THREE.Points>(null)
  const count = 180
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = -3.7 + Math.random() * 7.4
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * .48
      data[i * 3 + 1] = Math.cos(angle) * radius
      data[i * 3 + 2] = Math.sin(angle) * radius
    }
    return data
  }, [])

  useFrame((_, delta) => {
    if (!points.current) return
    const attribute = points.current.geometry.attributes.position as THREE.BufferAttribute
    const array = attribute.array as Float32Array
    const speed = .75 + progress * 3.2
    for (let i = 0; i < count; i += 1) {
      array[i * 3] += delta * speed
      if (array[i * 3] > 3.8) array[i * 3] = -3.8
    }
    attribute.needsUpdate = true
  })

  return (
    <points ref={points} rotation-z={-.12}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#62e5d1" size={progress > .4 ? .055 : .025} transparent opacity={.82} sizeAttenuation />
    </points>
  )
}

function RootBlockage({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.x += delta * (.1 + progress * 1.7)
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * .4) * .25
    const clear = THREE.MathUtils.smoothstep(progress, .18, .54)
    group.current.scale.setScalar(Math.max(.035, 1 - clear * .97))
    group.current.position.y = clear * 1.8
  })
  return (
    <group ref={group} position={[.3, 0, 0]}>
      {Array.from({ length: 7 }, (_, index) => (
        <mesh key={index} rotation={[index * .6, index * .8, index * .35]} scale={[.52, .52, .52]}>
          <torusKnotGeometry args={[.7, .1, 48, 8, 2 + (index % 2), 3]} />
          <meshStandardMaterial color={index % 2 ? '#4b2e1e' : '#744226'} roughness={.94} />
        </mesh>
      ))}
    </group>
  )
}

function Probe({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.position.x = THREE.MathUtils.lerp(-3.35, 3.1, THREE.MathUtils.smoothstep(progress, .3, .9))
    group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * .05
  })
  return (
    <group ref={group} position={[-3.35, 0, 0]}>
      <mesh rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[.2, .26, .55, 24]} />
        <meshStandardMaterial color="#dce7e9" metalness={.94} roughness={.15} />
      </mesh>
      <mesh position={[.3, 0, 0]} rotation-y={Math.PI / 2}>
        <sphereGeometry args={[.18, 24, 24]} />
        <meshStandardMaterial color="#ff552e" emissive="#ff552e" emissiveIntensity={5} />
      </mesh>
      <pointLight position={[.55, 0, 0]} color="#ff552e" intensity={4} distance={2.8} />
    </group>
  )
}

function Pipeline({ progress }: { progress: number }) {
  const pipe = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!pipe.current) return
    pipe.current.rotation.y = THREE.MathUtils.damp(pipe.current.rotation.y, pointer.x * .16 + .18, 3, delta)
    pipe.current.rotation.x = THREE.MathUtils.damp(pipe.current.rotation.x, pointer.y * .08 - .14, 3, delta)
    pipe.current.position.x = THREE.MathUtils.damp(pipe.current.position.x, progress > .82 ? -.25 : .5, 3, delta)
  })

  return (
    <group ref={pipe} position={[.5, .05, 0]} rotation={[-.14, .18, -.12]}>
      <mesh rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[1.08, 1.08, 7.8, 48, 1, true]} />
        <MeshTransmissionMaterial color="#7893a0" transmission={.22} thickness={.7} roughness={.24} metalness={.72} transparent opacity={.52} backside />
      </mesh>
      {[-3.55, -2.3, 2.25, 3.55].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation-y={Math.PI / 2}>
          <torusGeometry args={[1.1, .12, 16, 64]} />
          <meshStandardMaterial color="#a8bbc2" metalness={.92} roughness={.18} />
        </mesh>
      ))}
      <mesh position={[-3.76, 0, 0]} rotation-y={Math.PI / 2}>
        <torusGeometry args={[1.12, .22, 16, 64]} />
        <meshStandardMaterial color="#d1dde0" metalness={.96} roughness={.12} />
      </mesh>
      <RootBlockage progress={progress} />
      <WaterFlow progress={progress} />
      <Probe progress={progress} />
    </group>
  )
}

function Gauge() {
  return (
    <Float speed={1.3} rotationIntensity={.14} floatIntensity={.25} position={[2.9, 1.75, -.8]}>
      <group rotation={[0, -.2, 0]}>
        <mesh><cylinderGeometry args={[.52, .52, .18, 32]} /><meshStandardMaterial color="#c9d4d7" metalness={.9} roughness={.18} /></mesh>
        <mesh position={[0, .1, 0]} rotation-x={-Math.PI / 2}><circleGeometry args={[.43, 32]} /><meshStandardMaterial color="#071016" roughness={.3} /></mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => <mesh key={i} position={[Math.cos(i * 1.04) * .3, .115, Math.sin(i * 1.04) * .3]}><sphereGeometry args={[.026, 8, 8]} /><meshBasicMaterial color="#62e5d1" /></mesh>)}
      </group>
    </Float>
  )
}

function Experience({ progress, lowPower }: { progress: number; lowPower: boolean }) {
  return (
    <>
      <ambientLight intensity={.7} />
      <directionalLight position={[-4, 6, 4]} intensity={3.8} color="#d8f3ff" />
      <pointLight position={[4, -2, 3]} intensity={5} color="#62e5d1" distance={9} />
      <pointLight position={[-4, 2, 2]} intensity={4} color="#ff552e" distance={8} />
      <Pipeline progress={progress} />
      <Gauge />
      {!lowPower && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={.75} luminanceThreshold={.45} mipmapBlur />
          <Vignette eskil={false} offset={.28} darkness={.62} />
        </EffectComposer>
      )}
    </>
  )
}

export default function PipeScene({ progress }: { progress: number }) {
  const lowPower = window.matchMedia('(max-width: 820px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4
  return (
    <div className="scene" role="img" aria-label="Animated cutaway of a drain line being inspected and cleared">
      <Suspense fallback={<div className="scene-fallback" />}>
        <Canvas dpr={[1, lowPower ? 1.15 : 1.6]} camera={{ position: [0, 0, 7.4], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Experience progress={progress} lowPower={lowPower} />
        </Canvas>
      </Suspense>
    </div>
  )
}
