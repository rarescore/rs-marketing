"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function Architecture({ onComplete }: { onComplete: () => void }) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const done = useRef(false);
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  const path = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(7.4, 3.1, 10.8),
    new THREE.Vector3(5.3, 2.55, 7.1),
    new THREE.Vector3(3.2, 2.15, 3.7),
    new THREE.Vector3(1.2, 1.85, 1.0),
    new THREE.Vector3(-.4, 1.7, -1.8),
  ]), []);
  const temp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    elapsed.current = Math.min(elapsed.current + delta, 8.2);
    const p = THREE.MathUtils.smootherstep(elapsed.current / 7.35, 0, 1);
    path.getPointAt(p, temp);
    camera.position.lerp(temp, 1 - Math.exp(-delta * 5.5));
    camera.lookAt(0, 1.35, -2.9 + p * 1.2);
    if (group.current) group.current.position.y = Math.sin(state.clock.elapsedTime * .34) * .012;
    if (elapsed.current >= 7.35 && !done.current) { done.current = true; onComplete(); }
  });

  return <group ref={group}>
    <color attach="background" args={["#b9c0bd"]} />
    <fog attach="fog" args={["#b9c0bd", 12, 30]} />
    <ambientLight intensity={.62} color="#d8ded9" />
    <directionalLight castShadow position={[7, 10, 8]} intensity={4.2} color="#fff1d7" shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <directionalLight position={[-6, 4, 2]} intensity={1.35} color="#b8c7d4" />

    <mesh receiveShadow position={[0,-.08,-2]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[28,34]} /><meshStandardMaterial color="#b8ae9c" roughness={.95} /></mesh>
    <mesh castShadow receiveShadow position={[0,1.55,-5.7]}><boxGeometry args={[8.7,3.25,.28]} /><meshStandardMaterial color="#d8d0c0" roughness={.72} /></mesh>
    <mesh castShadow receiveShadow position={[-4.2,1.45,-1.9]}><boxGeometry args={[.28,3.0,7.8]} /><meshStandardMaterial color="#cfc6b4" roughness={.75} /></mesh>
    <mesh castShadow receiveShadow position={[4.2,1.45,-2.1]}><boxGeometry args={[.28,3.0,7.4]} /><meshStandardMaterial color="#d1c8b7" roughness={.75} /></mesh>

    <mesh position={[0,1.55,-5.52]}><planeGeometry args={[4.5,2.45]} /><meshPhysicalMaterial color="#a8bdc7" transparent opacity={.34} transmission={.7} roughness={.1} thickness={.25} /></mesh>
    {[-2.25,0,2.25].map((x) => <mesh key={x} position={[x,1.55,-5.36]}><boxGeometry args={[.055,2.6,.08]} /><meshStandardMaterial color="#4f4d49" metalness={.72} roughness={.24} /></mesh>)}
    <mesh castShadow position={[1.55,.43,-2.6]}><boxGeometry args={[3.25,.48,1.15]} /><meshStandardMaterial color="#715a43" roughness={.62} /></mesh>
    <mesh castShadow position={[-1.6,.43,-2.2]}><boxGeometry args={[2.0,.42,.95]} /><meshStandardMaterial color="#4f493f" roughness={.78} /></mesh>
    <mesh position={[0,.028,1.55]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[6.8,3.6]} /><meshPhysicalMaterial color="#7597a0" roughness={.08} metalness={.05} /></mesh>
    <mesh castShadow position={[0,.24,-.25]}><boxGeometry args={[8.5,.48,.24]} /><meshStandardMaterial color="#8c7962" roughness={.88} /></mesh>
    <mesh castShadow position={[0,3.08,-2.5]}><boxGeometry args={[8.65,.18,6.7]} /><meshStandardMaterial color="#bbb09d" roughness={.7} /></mesh>

    <Environment resolution={64} environmentIntensity={.55}>
      <Lightformer form="rect" intensity={5} color="#fff0d8" position={[4,7,4]} rotation={[Math.PI/2,0,0]} scale={[9,5,1]} />
      <Lightformer form="rect" intensity={2.2} color="#c4d2d6" position={[-5,2,1]} rotation={[0,Math.PI/2,0]} scale={[4,6,1]} />
    </Environment>
  </group>;
}

export function ArchitecturalSequence() {
  const reduced = useReducedMotion();
  const [eligible, setEligible] = useState(false);
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(min-width: 900px)");
    const sync = () => setEligible(q.matches && (!navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 4));
    sync(); q.addEventListener("change", sync); return () => q.removeEventListener("change", sync);
  }, []);
  if (!eligible || reduced || failed) return null;

  return <div className={`re-architecture-sequence${ready ? " is-ready" : ""}`} aria-hidden="true">
    <Canvas shadows="soft" dpr={[1,1.4]} frameloop={complete ? "demand" : "always"} camera={{ position:[7.4,3.1,10.8], fov:40, near:.1, far:60 }} gl={{ antialias:true, alpha:false, powerPreference:"high-performance" }} onCreated={({gl}) => {
      gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.02; setReady(true);
      gl.domElement.addEventListener("webglcontextlost", (event) => { event.preventDefault(); setFailed(true); }, { once:true });
    }}>
      <Suspense fallback={null}><Architecture onComplete={() => setComplete(true)} /></Suspense>
    </Canvas>
    <div className="re-architecture-sequence__legend"><span>Exterior</span><i /><span>Threshold</span><i /><span>Interior</span></div>
  </div>;
}
