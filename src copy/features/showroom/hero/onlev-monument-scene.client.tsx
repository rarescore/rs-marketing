"use client";

import { Environment, Lightformer, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useOnlevOpening } from "./onlev-opening-store";

type SceneProps = { onReady: () => void; onFailure: () => void };

const ease = (value: number) => value * value * (3 - 2 * value);
const phase = (value: number, start: number, end: number) => ease(THREE.MathUtils.clamp((value - start) / (end - start), 0, 1));
const damp = (current: number, target: number, delta: number, speed = 5) => THREE.MathUtils.damp(current, target, speed, delta);

type Transform = { position: [number, number, number]; rotation: [number, number, number] };

function AnimatedPart({
  start,
  end,
  size,
  color = "#252a31",
  metalness = 0.72,
  roughness = 0.25,
  emissive,
}: {
  start: Transform;
  end: Transform;
  size: [number, number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const intro = phase(clock.elapsedTime, 0.15, 1.8) * 0.13;
    const p = phase(Math.max(useOnlevOpening.getState().progress, intro), 0.04, 0.72);
    const targetPosition = start.position.map((value, index) => THREE.MathUtils.lerp(value, end.position[index]!, p));
    const targetRotation = start.rotation.map((value, index) => THREE.MathUtils.lerp(value, end.rotation[index]!, p));
    group.current.position.set(
      damp(group.current.position.x, targetPosition[0]!, delta, 7),
      damp(group.current.position.y, targetPosition[1]!, delta, 7),
      damp(group.current.position.z, targetPosition[2]!, delta, 7),
    );
    group.current.rotation.set(
      damp(group.current.rotation.x, targetRotation[0]!, delta, 7),
      damp(group.current.rotation.y, targetRotation[1]!, delta, 7),
      damp(group.current.rotation.z, targetRotation[2]!, delta, 7),
    );
  });
  return (
    <group ref={group} position={start.position} rotation={start.rotation}>
      <RoundedBox castShadow receiveShadow args={size} radius={Math.min(size[0], size[1]) * 0.08} smoothness={4}>
        <meshPhysicalMaterial
          color={color}
          emissive={emissive ?? "#000000"}
          emissiveIntensity={emissive ? 2.25 : 0}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.42}
          clearcoatRoughness={0.22}
          toneMapped={!emissive}
        />
      </RoundedBox>
    </group>
  );
}

function Monument() {
  const root = useRef<THREE.Group>(null);
  const energy = useRef<THREE.PointLight>(null);
  const parts = useMemo(() => [
    { size: [0.18, 4.9, 0.34], end: [-2.45, 0, 0], start: [-5.8, 2.4, -2.2], rot: [0.18, 0.72, -0.2] },
    { size: [0.18, 4.9, 0.34], end: [2.45, 0, 0], start: [5.4, -2.8, -1.1], rot: [-0.3, -0.8, 0.18] },
    { size: [5.08, 0.18, 0.34], end: [0, 2.36, 0], start: [-1.2, 5.4, -2.8], rot: [0.5, 0.18, 0.44] },
    { size: [5.08, 0.18, 0.34], end: [0, -2.36, 0], start: [1.8, -5.1, -2.2], rot: [-0.45, -0.2, -0.35] },
  ] as const, []);

  useFrame(({ pointer, clock }, delta) => {
    if (!root.current) return;
    const intro = phase(clock.elapsedTime, 0.15, 1.8) * 0.13;
    const p = Math.max(useOnlevOpening.getState().progress, intro);
    const resolved = phase(p, 0.64, 1);
    root.current.rotation.y = damp(root.current.rotation.y, pointer.x * 0.045 * resolved, delta, 3.5);
    root.current.rotation.x = damp(root.current.rotation.x, pointer.y * -0.025 * resolved, delta, 3.5);
    if (energy.current) energy.current.intensity = damp(energy.current.intensity, 2.2 + resolved * 4.8, delta, 4);
  });

  const graphite = "#252a31";
  const nickel = "#9da4aa";
  const beam = "#d19a52";
  const bar = (sx: number, sy: number, ex: number, ey: number, w: number, h: number, rotation = 0, color = graphite, delay = 0) => (
    <AnimatedPart
      start={{ position: [sx, sy, -1.4 - delay], rotation: [0.22, sx * 0.09, rotation + sx * 0.08] }}
      end={{ position: [ex, ey, 0.2], rotation: [0, 0, rotation] }}
      size={[w, h, 0.38]}
      color={color}
    />
  );

  return (
    <group ref={root} position={[1.18, 0, 0]}>
      {parts.map((part, index) => (
        <AnimatedPart
          key={index}
          start={{ position: part.start as [number, number, number], rotation: part.rot as [number, number, number] }}
          end={{ position: part.end as [number, number, number], rotation: [0, 0, 0] }}
          size={part.size as [number, number, number]}
          color={index % 2 ? "#1b1f25" : "#31363d"}
        />
      ))}

      {/* ON */}
      <group position={[0, 1.03, 0]}>
        <AnimatedPart start={{ position: [-4.8, 1.8, -1.7], rotation: [0.4, 0.55, -0.5] }} end={{ position: [-1.18, 0, 0.18], rotation: [0, 0, 0] }} size={[1.28, 1.28, 0.45]} color="#11151a" roughness={0.18} />
        <mesh position={[-1.18, 0, 0.43]}><torusGeometry args={[0.42, 0.15, 20, 52]} /><meshPhysicalMaterial color={nickel} metalness={0.88} roughness={0.18} clearcoat={0.5} /></mesh>
        {bar(3.8, 2.8, -0.18, 0, 0.22, 1.35, 0, graphite, 0.1)}
        {bar(4.5, 1.4, 0.74, 0, 0.22, 1.35, 0, graphite, 0.16)}
        {bar(2.6, -0.4, 0.28, 0, 0.22, 1.55, -0.56, nickel, 0.22)}
      </group>

      {/* LEV */}
      <group position={[0, -0.96, 0]}>
        {bar(-4.6, -2.2, -1.62, 0, 0.24, 1.4, 0, graphite, 0.12)}
        {bar(-3.7, -3.4, -1.18, -0.59, 1.05, 0.22, 0, graphite, 0.2)}
        {bar(-0.2, -4.2, -0.18, 0, 0.24, 1.4, 0, graphite, 0.28)}
        {bar(0.8, -3.2, 0.28, 0.59, 1.06, 0.2, 0, graphite, 0.35)}
        {bar(1.4, -2.7, 0.25, 0, 0.92, 0.19, 0, nickel, 0.42)}
        {bar(0.2, -1.9, 0.28, -0.59, 1.06, 0.2, 0, graphite, 0.48)}
        <AnimatedPart start={{ position: [4.8, -3.4, -2], rotation: [0.3, -0.62, 0.8] }} end={{ position: [1.18, 0, 0.26], rotation: [0, 0, -0.43] }} size={[0.2, 1.62, 0.28]} color={beam} roughness={0.16} emissive={beam} />
        <AnimatedPart start={{ position: [5.5, -1.1, -1.4], rotation: [-0.3, -0.55, -0.7] }} end={{ position: [1.77, 0, 0.26], rotation: [0, 0, 0.43] }} size={[0.2, 1.62, 0.28]} color={beam} roughness={0.16} emissive={beam} />
      </group>
      <pointLight ref={energy} position={[1.5, -1.1, 1.2]} color={beam} intensity={2.2} distance={6} />
    </group>
  );
}

function SevenLayers() {
  const group = useRef<THREE.Group>(null);
  const materials = ["#323941", "#242a31", "#343941", "#20252b", "#30363d", "#1c2127", "#394048"];
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const intro = phase(clock.elapsedTime, 0.15, 1.8) * 0.13;
    const p = phase(Math.max(useOnlevOpening.getState().progress, intro), 0.18, 0.82);
    group.current.rotation.y = damp(group.current.rotation.y, THREE.MathUtils.lerp(-0.3, 0.06, p), delta, 5);
    group.current.position.x = damp(group.current.position.x, THREE.MathUtils.lerp(1.8, 0, p), delta, 5);
  });
  return (
    <group ref={group} position={[1.8, 0, -2.2]} rotation={[0.08, -0.3, 0.03]}>
      {materials.map((color, index) => (
        <RoundedBox key={color} args={[6.2 - index * 0.22, 5.65 - index * 0.17, 0.08]} radius={0.04} position={[0.13 * index, -0.07 * index, -0.48 * index]}>
          <meshPhysicalMaterial color={color} transparent opacity={0.16 + index * 0.025} metalness={0.55} roughness={0.38} transmission={index % 3 === 0 ? 0.18 : 0} />
        </RoundedBox>
      ))}
    </group>
  );
}

function CameraRig() {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  useFrame(({ pointer, clock }, delta) => {
    if (!camera.current) return;
    const intro = phase(clock.elapsedTime, 0.15, 1.8) * 0.13;
    const p = Math.max(useOnlevOpening.getState().progress, intro);
    const assembly = phase(p, 0, 0.78);
    const exit = phase(p, 0.78, 1);
    const x = THREE.MathUtils.lerp(-2.6, 0.45, assembly) + pointer.x * 0.09 * (1 - exit);
    const y = THREE.MathUtils.lerp(0.9, 0.05, assembly) + pointer.y * 0.05 * (1 - exit);
    const z = THREE.MathUtils.lerp(7.4, 9.7, assembly) - exit * 0.7;
    camera.current.position.set(
      damp(camera.current.position.x, x, delta, 4.8),
      damp(camera.current.position.y, y, delta, 4.8),
      damp(camera.current.position.z, z, delta, 4.8),
    );
    camera.current.lookAt(THREE.MathUtils.lerp(0.8, 1.15, assembly), 0, -0.4);
  });
  return <PerspectiveCamera ref={camera} makeDefault position={[-2.6, 0.9, 7.4]} fov={36} near={0.1} far={45} />;
}

function SceneReady({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const sent = useRef(false);
  useFrame(() => {
    if (sent.current) return;
    frames.current += 1;
    if (frames.current >= 3) { sent.current = true; onReady(); }
  });
  return null;
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const handle = (event: Event) => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener("webglcontextlost", handle);
    return () => gl.domElement.removeEventListener("webglcontextlost", handle);
  }, [gl, onFailure]);
  return null;
}

function Stage() {
  return (
    <>
      <color attach="background" args={["#080a0d"]} />
      <fog attach="fog" args={["#080a0d", 10, 25]} />
      <ambientLight intensity={0.2} />
      <directionalLight castShadow position={[4, 7, 6]} color="#eee5d8" intensity={3.4} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 1, 2]} color="#6076c6" intensity={1.3} />
      <SevenLayers />
      <Monument />
      <mesh receiveShadow position={[0, -3.05, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 18]} />
        <meshPhysicalMaterial color="#11151a" metalness={0.5} roughness={0.25} clearcoat={0.26} />
      </mesh>
      <Environment resolution={64} environmentIntensity={0.34}>
        <Lightformer form="rect" intensity={4.2} color="#efe4d4" position={[0, 6, 4]} rotation={[Math.PI / 2, 0, 0]} scale={[7, 2, 1]} />
        <Lightformer form="rect" intensity={2.8} color="#6c7fd0" position={[-6, 1, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#d19a52" position={[6, -1, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 5, 1]} />
      </Environment>
      <CameraRig />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom intensity={0.42} luminanceThreshold={0.9} luminanceSmoothing={0.25} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.72} />
      </EffectComposer>
    </>
  );
}

export function OnlevMonumentScene({ onReady, onFailure }: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const node = host.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true), { rootMargin: "180px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="onlev-opening__canvas">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.84;
        }}
      >
        <Stage />
        <SceneReady onReady={onReady} />
        <ContextGuard onFailure={onFailure} />
      </Canvas>
    </div>
  );
}
