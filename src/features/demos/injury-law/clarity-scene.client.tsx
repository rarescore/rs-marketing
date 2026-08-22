"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type PlaneSpec = { start: [number, number, number]; end: [number, number, number]; rotation: [number, number, number]; size: [number, number] };

const smooth = (value: number) => 1 - Math.pow(1 - THREE.MathUtils.clamp(value, 0, 1), 4);

function RecordField({ onComplete, paused, resetKey }: { onComplete: () => void; paused: boolean; resetKey: number }) {
  const group = useRef<THREE.Group>(null);
  const line = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  const completed = useRef(false);
  const specs = useMemo<PlaneSpec[]>(() => [
    { start: [-3.7, 1.9, .2], end: [-2.1, .95, -.2], rotation: [.18, -.42, .13], size: [1.35, 2.5] },
    { start: [2.8, 2.3, -1.4], end: [1.9, .9, -.75], rotation: [-.14, .35, -.1], size: [1.6, 2.9] },
    { start: [-2.3, -2.4, -.8], end: [-1.75, -.95, -.42], rotation: [-.25, .32, -.16], size: [1.7, 1.8] },
    { start: [3.9, -1.6, .1], end: [2.2, -.8, -.24], rotation: [.15, -.48, .17], size: [1.5, 2.15] },
    { start: [.8, 2.8, -2.1], end: [.4, 1.25, -1.25], rotation: [.34, -.18, .08], size: [1.9, 1.35] },
    { start: [-.5, -3.1, -1.6], end: [.15, -1.2, -.95], rotation: [-.28, .2, -.08], size: [2.1, 1.25] },
  ], []);

  useEffect(() => {
    elapsed.current = 0;
    completed.current = false;
  }, [resetKey]);

  useFrame((state, delta) => {
    if (paused) return;
    elapsed.current = Math.min(elapsed.current + delta, 4.35);
    const p = smooth((elapsed.current - .25) / 3.45);
    if (group.current) {
      group.current.children.forEach((child, index) => {
        const spec = specs[index];
        if (!spec) return;
        child.position.set(
          THREE.MathUtils.lerp(spec.start[0], spec.end[0], p),
          THREE.MathUtils.lerp(spec.start[1], spec.end[1], p),
          THREE.MathUtils.lerp(spec.start[2], spec.end[2], p),
        );
        child.rotation.set(
          THREE.MathUtils.lerp(spec.rotation[0], 0, p),
          THREE.MathUtils.lerp(spec.rotation[1], 0, p),
          THREE.MathUtils.lerp(spec.rotation[2], 0, p),
        );
      });
    }
    if (line.current) line.current.scale.x = smooth((elapsed.current - 1.6) / 1.8);
    state.camera.position.x = THREE.MathUtils.lerp(-.25, .15, p);
    state.camera.position.z = THREE.MathUtils.lerp(7.4, 6.9, p);
    state.camera.lookAt(.65, 0, -.6);
    if (elapsed.current >= 4.35 && !completed.current) {
      completed.current = true;
      onComplete();
    }
  });

  return (
    <>
      <color attach="background" args={["#172334"]} />
      <fog attach="fog" args={["#172334", 5.8, 11]} />
      <ambientLight intensity={1.2} color="#cbd3dd" />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#fff4df" />
      <pointLight position={[2.8, .5, 2.5]} intensity={24} distance={7} color="#e7c6ae" />
      <group ref={group} position={[1.15, 0, 0]}>
        {specs.map((spec, index) => (
          <mesh key={index} position={spec.start} rotation={spec.rotation}>
            <planeGeometry args={spec.size} />
            <meshPhysicalMaterial
              color={index % 2 ? "#f1ede3" : "#d8d4ce"}
              transparent
              opacity={index % 2 ? .2 : .13}
              roughness={.23}
              metalness={0}
              transmission={.54}
              thickness={.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      <mesh ref={line} position={[1.18, -.06, 1.1]} scale={[0, 1, 1]}>
        <boxGeometry args={[5.3, .035, .035]} />
        <meshBasicMaterial color="#9f5361" />
      </mesh>
      <mesh position={[1.2, -2.35, -1.7]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 10]} />
        <meshStandardMaterial color="#101b29" roughness={.92} />
      </mesh>
    </>
  );
}

function SceneLifecycle({ onFailure, onReady }: { onFailure: () => void; onReady: () => void }) {
  const gl = useThree((state) => state.gl);
  const frames = useRef(0);
  const announced = useRef(false);

  useFrame(() => {
    if (announced.current) return;
    frames.current += 1;
    if (frames.current < 2) return;
    announced.current = true;
    onReady();
  });

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", handleContextLoss);
    return () => canvas.removeEventListener("webglcontextlost", handleContextLoss);
  }, [gl, onFailure]);

  return null;
}

export function ClarityScene() {
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const handleComplete = useCallback(() => setComplete(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);
  const handleReady = useCallback(() => setReady(true), []);

  if (failed) return null;

  return (
    <>
        <Canvas
          camera={{ position: [-.25, 0, 7.4], fov: 42, near: .1, far: 30 }}
          dpr={[1, 1.55]}
          frameloop={paused || complete ? "demand" : "always"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ opacity: ready ? 1 : 0, transition: "opacity 350ms ease" }}
        >
          <Suspense fallback={null}><RecordField onComplete={handleComplete} paused={paused} resetKey={resetKey} /></Suspense>
          <SceneLifecycle onFailure={handleFailure} onReady={handleReady} />
        </Canvas>
      <button
        className="il-motion-control"
        type="button"
        onClick={() => {
          if (complete) {
            setComplete(false);
            setPaused(false);
            setResetKey((value) => value + 1);
            return;
          }
          setPaused((value) => !value);
        }}
      >
        {complete ? "Replay scene" : paused ? "Resume scene" : "Pause scene"}
      </button>
    </>
  );
}
