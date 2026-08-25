"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CameraPath } from "@/components/three/camera-path";
import { CanvasShell } from "@/components/three/canvas-shell";
import { DevelopmentPerformanceMonitor } from "@/components/three/performance-monitor";
import { LightingRig } from "@/components/three/lighting-rig";
import type { CameraKeyframe } from "@/lib/three/camera-path";
import { MotionLabFallback } from "./motion-lab-fallback";
import { useMotionLabStore } from "./motion-lab-store";

const desktopPath: readonly CameraKeyframe[] = [
  { t: 0, x: 0, y: 1.35, z: 10, rx: 0, ry: 0, rz: 0, fov: 41, lookAt: [0, 0.15, 0] },
  { t: 0.28, x: -0.72, y: 1.28, z: 7.25, rx: -0.005, ry: 0.025, rz: 0, fov: 40, lookAt: [-0.1, 0.1, -0.2] },
  { t: 0.57, x: 1.08, y: 1.12, z: 5.18, rx: 0.008, ry: -0.045, rz: 0, fov: 38.5, lookAt: [0.15, 0.05, -0.8] },
  { t: 0.78, x: 0.52, y: 1.02, z: 4.05, rx: 0.006, ry: -0.018, rz: 0, fov: 37, lookAt: [0.1, -0.02, -1.4] },
  { t: 1, x: -0.18, y: 0.92, z: 3, rx: 0, ry: 0.012, rz: 0, fov: 36, lookAt: [0, -0.08, -2.2] },
];

const mobilePath: readonly CameraKeyframe[] = [
  { t: 0, x: 0.08, y: 1.3, z: 11.4, rx: 0, ry: 0, rz: 0, fov: 34, lookAt: [0, 0.2, 0] },
  { t: 0.3, x: -0.34, y: 1.2, z: 8.3, rx: 0, ry: 0.015, rz: 0, fov: 33, lookAt: [-0.05, 0.12, -0.2] },
  { t: 0.58, x: 0.48, y: 1.08, z: 6.2, rx: 0.006, ry: -0.025, rz: 0, fov: 32, lookAt: [0.05, 0.02, -0.9] },
  { t: 0.8, x: 0.24, y: 1, z: 5.05, rx: 0, ry: -0.01, rz: 0, fov: 31.5, lookAt: [0, -0.02, -1.5] },
  { t: 1, x: -0.08, y: 0.95, z: 4.15, rx: 0, ry: 0.008, rz: 0, fov: 31, lookAt: [0, -0.1, -2.2] },
];

function CalibrationArchitecture() {
  const foreground = useRef<THREE.Group>(null);
  const middle = useRef<THREE.Group>(null);
  const background = useRef<THREE.Group>(null);

  useFrame(() => {
    const progress = useMotionLabStore.getState().progress;
    const cross = THREE.MathUtils.smoothstep(progress, 0.12, 0.72);
    const resolve = THREE.MathUtils.smoothstep(progress, 0.62, 1);

    if (foreground.current) {
      foreground.current.position.x = THREE.MathUtils.lerp(0, -0.42, cross);
      foreground.current.rotation.y = THREE.MathUtils.lerp(0, 0.065, cross);
    }
    if (middle.current) {
      middle.current.position.x = THREE.MathUtils.lerp(0, 0.24, cross);
      middle.current.rotation.y = THREE.MathUtils.lerp(-0.04, 0.035, resolve);
    }
    if (background.current) {
      background.current.position.x = THREE.MathUtils.lerp(0, -0.09, cross);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#0a0c0f", 8, 25]} />
      <LightingRig />

      <group ref={background} position={[0, 0, -5.8]}>
        <mesh receiveShadow position={[0, 0.15, -0.3]}>
          <boxGeometry args={[18, 8.5, 0.55]} />
          <meshStandardMaterial color="#151719" roughness={0.92} metalness={0.08} />
        </mesh>
        <mesh position={[1.4, 0.8, 0.01]}>
          <boxGeometry args={[5.8, 3.6, 0.08]} />
          <meshStandardMaterial color="#090b0d" roughness={0.84} />
        </mesh>
        <mesh position={[1.4, 2.63, 0.18]}>
          <boxGeometry args={[5.95, 0.055, 0.12]} />
          <meshStandardMaterial color="#d6aa62" emissive="#d6aa62" emissiveIntensity={3.1} toneMapped={false} />
        </mesh>
        {[-5.2, -2.8, -0.4, 2, 4.4].map((x) => (
          <mesh key={x} position={[x, -1.9, 0.04]}>
            <boxGeometry args={[0.018, 2.6, 0.06]} />
            <meshStandardMaterial color="#45494d" roughness={0.75} />
          </mesh>
        ))}
      </group>

      <group ref={middle} position={[0, 0, -0.7]} rotation={[0, -0.04, 0]}>
        {[-2.05, 2.05].map((x) => (
          <RoundedBox key={x} args={[0.28, 5.1, 0.55]} radius={0.035} position={[x, 0.28, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial color="#2a2c2e" roughness={0.38} metalness={0.62} clearcoat={0.14} />
          </RoundedBox>
        ))}
        <RoundedBox args={[4.36, 0.28, 0.55]} radius={0.035} position={[0, 2.7, 0]} castShadow>
          <meshPhysicalMaterial color="#282a2c" roughness={0.42} metalness={0.58} clearcoat={0.12} />
        </RoundedBox>
        <group position={[0.62, -0.05, 0.1]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.84, 0.08, 20, 80]} />
            <meshPhysicalMaterial color="#a88a59" roughness={0.22} metalness={0.9} clearcoat={0.35} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.38, 0.48, 1.15, 32]} />
            <meshPhysicalMaterial color="#1b1d20" roughness={0.25} metalness={0.78} clearcoat={0.18} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.025, 1.3, 0.03]} />
            <meshStandardMaterial color="#e0b56e" emissive="#e0b56e" emissiveIntensity={2.2} toneMapped={false} />
          </mesh>
        </group>
      </group>

      <group ref={foreground} position={[0, 0, 4.7]}>
        <RoundedBox args={[0.72, 6.5, 1.15]} radius={0.045} position={[3.05, 0.1, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#151719" roughness={0.28} metalness={0.72} clearcoat={0.12} />
        </RoundedBox>
        <RoundedBox args={[6.9, 0.5, 1.15]} radius={0.045} position={[0, 3.05, 0]} castShadow>
          <meshPhysicalMaterial color="#181a1c" roughness={0.3} metalness={0.7} clearcoat={0.12} />
        </RoundedBox>
        <mesh position={[2.66, 0.05, -0.62]}>
          <boxGeometry args={[0.035, 5.85, 0.05]} />
          <meshStandardMaterial color="#c39752" roughness={0.32} metalness={0.78} />
        </mesh>
      </group>

      <mesh receiveShadow position={[0, -2.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 30]} />
        <meshPhysicalMaterial color="#111316" roughness={0.32} metalness={0.42} clearcoat={0.12} />
      </mesh>
      {[-4.8, -2.4, 0, 2.4, 4.8].map((x) => (
        <mesh key={x} position={[x, -2.335, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.018, 18]} />
          <meshBasicMaterial color="#55595d" transparent opacity={0.38} />
        </mesh>
      ))}
    </>
  );
}

function ResponsiveCameraPath() {
  const width = useThree((state) => state.size.width);
  const keyframes = useMemo(() => (width <= 520 ? mobilePath : desktopPath), [width]);
  return <CameraPath keyframes={keyframes} getProgress={() => useMotionLabStore.getState().progress} />;
}

function LabEffects() {
  const width = useThree((state) => state.size.width);
  if (width < 768) return null;
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Vignette eskil={false} offset={0.18} darkness={0.42} />
    </EffectComposer>
  );
}

export default function MotionLabScene() {
  return (
    <CanvasShell
      fallback={<MotionLabFallback />}
      frameloop="always"
      camera={{ position: [0, 1.35, 10], fov: 41, near: 0.05, far: 80 }}
    >
      <color attach="background" args={["#090b0e"]} />
      <ResponsiveCameraPath />
      <CalibrationArchitecture />
      <LabEffects />
      <DevelopmentPerformanceMonitor onSample={useMotionLabStore.getState().setFps} />
    </CanvasShell>
  );
}
