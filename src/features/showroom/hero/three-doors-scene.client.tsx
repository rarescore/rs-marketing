"use client";

import { ContactShadows, Environment, Lightformer, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useHeroScroll, type IndustrySlug } from "./hero-scroll-store";

interface ThreeDoorsSceneProps {
  onFailure: () => void;
  onReady: () => void;
}

const portalX: Record<IndustrySlug, number> = {
  "real-estate": -3.16,
  plumbing: 0,
  "injury-law": 3.16,
};

const damp = (current: number, target: number, delta: number, speed = 5) =>
  THREE.MathUtils.damp(current, target, speed, delta);

function SceneReady({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const announced = useRef(false);

  useFrame(() => {
    if (announced.current) return;
    frames.current += 1;
    if (frames.current < 3) return;
    announced.current = true;
    onReady();
  });

  return null;
}

function ContextLossGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);

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

function CameraRig() {
  const camera = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ pointer }, delta) => {
    if (!camera.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const reveal = THREE.MathUtils.smoothstep(progress, 0.03, 0.72);
    const hub = THREE.MathUtils.smoothstep(progress, 0.66, 1);
    const selectedX = portalX[transitionIndustry ?? activeIndustry];
    // The primary move is a lateral architectural dolly. The z change only
    // widens the reveal; this is genuine scene choreography, not a 2D zoom.
    const dollyX = THREE.MathUtils.lerp(-1.15, 0.48, reveal);
    const pointerInfluence = 0.35 + hub * 0.65;
    const targetX = transitionIndustry
      ? selectedX * 0.48
      : dollyX + selectedX * 0.11 * hub + pointer.x * 0.08 * pointerInfluence;
    const targetY = THREE.MathUtils.lerp(0.72, 0.08, reveal) + pointer.y * 0.045 * pointerInfluence;
    const targetZ = transitionIndustry ? 6.75 : THREE.MathUtils.lerp(6.72, 9.8, reveal);

    camera.current.position.x = damp(camera.current.position.x, targetX, delta, transitionIndustry ? 3.4 : 4.2);
    camera.current.position.y = damp(camera.current.position.y, targetY, delta, 4.4);
    camera.current.position.z = damp(camera.current.position.z, targetZ, delta, transitionIndustry ? 3.2 : 4.2);
    camera.current.lookAt(
      transitionIndustry
        ? selectedX * 0.76
        : THREE.MathUtils.lerp(0.45, selectedX * 0.18, hub),
      THREE.MathUtils.lerp(0.2, 0.03, reveal),
      -0.56,
    );
  });

  return <PerspectiveCamera ref={camera} makeDefault position={[-1.15, 0.72, 6.72]} fov={40} near={0.1} far={50} />;
}

function PortalArchitecture({ accent }: { accent: string }) {
  return (
    <group>
      <RoundedBox castShadow receiveShadow args={[2.78, 0.34, 0.86]} radius={0.07} position={[0, 2.13, 0]}>
        <meshPhysicalMaterial color="#24272c" roughness={0.27} metalness={0.62} clearcoat={0.24} />
      </RoundedBox>
      {[-1.22, 1.22].map((x) => (
        <group key={x} position={[x, 0.1, 0]}>
          <RoundedBox castShadow receiveShadow args={[0.34, 4.26, 0.86]} radius={0.07}>
            <meshPhysicalMaterial color="#202328" roughness={0.32} metalness={0.56} clearcoat={0.2} />
          </RoundedBox>
          <mesh position={[x < 0 ? 0.19 : -0.19, 0, 0.43]}>
            <boxGeometry args={[0.026, 3.76, 0.035]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.25} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <RoundedBox castShadow receiveShadow args={[2.48, 0.18, 1]} radius={0.035} position={[0, -2.02, 0.08]}>
        <meshPhysicalMaterial color="#171a1e" roughness={0.2} metalness={0.68} clearcoat={0.35} />
      </RoundedBox>
      <mesh position={[0, -1.91, 0.55]}>
        <boxGeometry args={[2.32, 0.035, 0.36]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.1, -0.52]}>
        <planeGeometry args={[2.16, 3.84]} />
        <meshStandardMaterial color="#0d1014" roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function WorldRig({ industry, children }: { industry: IndustrySlug; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.6, 1);
    const active = activeIndustry === industry || transitionIndustry === industry;
    group.current.position.z = damp(group.current.position.z, active ? -0.04 + hub * 0.22 : -0.34, delta, 4.5);
    group.current.position.y = damp(group.current.position.y, active ? 0.035 : -0.045, delta, 4.5);
    group.current.rotation.y = damp(group.current.rotation.y, active ? 0 : portalX[industry] * -0.018, delta, 4.5);
  });
  return <group ref={group}>{children}</group>;
}

function DoorLeaf({ industry, color, accent, children }: { industry: IndustrySlug; color: string; accent: string; children?: ReactNode }) {
  const hinge = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  useFrame((_, delta) => {
    if (!hinge.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.63, 1);
    const active = activeIndustry === industry;
    const entering = transitionIndustry === industry;
    const target = entering ? -1.42 : active ? -0.94 * hub : -0.12 * hub;
    hinge.current.rotation.y = damp(hinge.current.rotation.y, target, delta, entering ? 7.2 : 5.6);
    if (material.current) material.current.clearcoat = damp(material.current.clearcoat, active ? 0.48 : 0.28, delta, 4.5);
  });

  return (
    <group ref={hinge} position={[-1.075, 0.1, 0.24]}>
      <group position={[1.075, 0, 0]}>
        <RoundedBox castShadow receiveShadow args={[2.14, 3.84, 0.24]} radius={0.035} smoothness={5}>
          <meshPhysicalMaterial ref={material} color={color} roughness={0.27} metalness={0.26} clearcoat={0.3} clearcoatRoughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[1.76, 1.28, 0.075]} radius={0.025} position={[0, 0.86, 0.15]}>
          <meshPhysicalMaterial color={color} roughness={0.34} metalness={0.18} clearcoat={0.2} />
        </RoundedBox>
        <RoundedBox args={[1.76, 1.5, 0.075]} radius={0.025} position={[0, -0.72, 0.15]}>
          <meshPhysicalMaterial color={color} roughness={0.34} metalness={0.18} clearcoat={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[1.9, 0.018, 0.018]} />
          <meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} />
        </mesh>
        <RoundedBox args={[0.13, 0.58, 0.09]} radius={0.035} position={[0.78, 0, 0.23]}>
          <meshPhysicalMaterial color={accent} metalness={0.92} roughness={0.16} clearcoat={0.5} />
        </RoundedBox>
        <mesh position={[0.57, 0, 0.29]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.42, 24]} />
          <meshPhysicalMaterial color={accent} metalness={0.95} roughness={0.13} clearcoat={0.5} />
        </mesh>
        {[-1.5, 1.5].map((y) => (
          <mesh key={y} position={[-1.08, y, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.27, 18]} />
            <meshStandardMaterial color="#777d83" metalness={0.85} roughness={0.22} />
          </mesh>
        ))}
        {children}
      </group>
    </group>
  );
}

function PortalLight({ industry, color }: { industry: IndustrySlug; color: string }) {
  const light = useRef<THREE.RectAreaLight>(null);
  useFrame((_, delta) => {
    if (!light.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.5, 1);
    const active = activeIndustry === industry || transitionIndustry === industry;
    light.current.intensity = damp(light.current.intensity, active ? 8.4 * hub + 1.2 : 0.9 + hub, delta, 4.8);
  });
  return <rectAreaLight ref={light} color={color} intensity={1.1} width={1.9} height={3.45} position={[0, 0.12, 0.48]} />;
}

function EstateInterior() {
  return (
    <WorldRig industry="real-estate">
      <group position={[0, 0.02, -0.56]}>
        <mesh position={[0, 0, -0.72]}><planeGeometry args={[2.1, 3.74]} /><meshStandardMaterial color="#2a241d" roughness={0.86} /></mesh>
        <mesh position={[0.46, 0.54, -0.62]}><planeGeometry args={[0.84, 1.62]} /><meshStandardMaterial color="#d8c6a4" emissive="#d5a762" emissiveIntensity={1.7} toneMapped={false} /></mesh>
        <mesh position={[-0.42, 0.1, -0.42]}><boxGeometry args={[0.68, 2.92, 0.14]} /><meshPhysicalMaterial color="#64523f" roughness={0.58} metalness={0.08} clearcoat={0.12} /></mesh>
        {[0, 1, 2].map((step) => <mesh key={step} position={[0.15 + step * 0.22, -1.24 + step * 0.16, -0.2 + step * 0.1]}><boxGeometry args={[1.28 - step * 0.18, 0.16, 0.6]} /><meshStandardMaterial color="#c8b38e" roughness={0.68} /></mesh>)}
        <mesh position={[0, -1.78, -0.08]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.1, 2.5]} /><meshPhysicalMaterial color="#4d4032" roughness={0.34} metalness={0.16} clearcoat={0.38} /></mesh>
        <mesh position={[0.52, -0.55, -0.02]}><cylinderGeometry args={[0.22, 0.28, 0.6, 22]} /><meshStandardMaterial color="#777b55" roughness={0.78} /></mesh>
        <pointLight color="#e7b96f" intensity={3.1} position={[0.4, 1.16, 0]} distance={4.6} />
      </group>
    </WorldRig>
  );
}

function ServiceInterior() {
  const gauge = useRef<THREE.Group>(null);
  const flow = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const { progress, activeIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.62, 1);
    const active = activeIndustry === "plumbing";
    if (gauge.current) gauge.current.rotation.z = damp(gauge.current.rotation.z, active ? -0.75 + hub * 1.35 : -0.62, delta, 5.2);
    if (flow.current) flow.current.position.y = damp(flow.current.position.y, active ? 0.28 : -0.42, delta, 4.5);
  });
  return (
    <WorldRig industry="plumbing">
      <group position={[0, 0.02, -0.54]}>
        <mesh position={[0, 0, -0.7]}><planeGeometry args={[2.1, 3.74]} /><meshStandardMaterial color="#102737" roughness={0.7} metalness={0.18} /></mesh>
        {[-0.68, 0, 0.68].map((x, index) => <group key={x} position={[x, 0, -0.3]}><mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.082, 0.082, 2.8, 20]} /><meshPhysicalMaterial color={index === 1 ? "#b87748" : "#8399a7"} roughness={0.2} metalness={0.88} clearcoat={0.3} /></mesh>{[-1.08, 0.92].map((y) => <mesh key={y} rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0.04]}><torusGeometry args={[0.18, 0.036, 12, 32]} /><meshStandardMaterial color="#d8e0e4" roughness={0.19} metalness={0.9} /></mesh>)}</group>)}
        <group position={[0, 0.62, 0.02]}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.42, 0.07, 18, 48]} /><meshPhysicalMaterial color="#e4e8e9" roughness={0.18} metalness={0.92} clearcoat={0.4} /></mesh><mesh position={[0, 0, -0.02]}><circleGeometry args={[0.34, 42]} /><meshStandardMaterial color="#e8ecec" roughness={0.6} /></mesh><group ref={gauge}><mesh position={[0, 0.16, 0.02]}><boxGeometry args={[0.035, 0.34, 0.025]} /><meshStandardMaterial color="#16354b" roughness={0.32} /></mesh></group></group>
        <group ref={flow}>{[-0.25, 0, 0.25].map((y) => <mesh key={y} position={[0, y, 0.12]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.115, 0.018, 8, 28]} /><meshStandardMaterial color="#6f8fff" emissive="#5f79ff" emissiveIntensity={2.4} toneMapped={false} /></mesh>)}</group>
        <RoundedBox args={[1.72, 0.54, 0.38]} radius={0.04} position={[0, -1.24, -0.08]}><meshPhysicalMaterial color="#365267" roughness={0.34} metalness={0.54} clearcoat={0.22} /></RoundedBox>
        <pointLight color="#5f79ff" intensity={3.6} position={[0, 1.18, 0.1]} distance={4.4} />
      </group>
    </WorldRig>
  );
}

function LawInterior() {
  const fracture = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!fracture.current) return;
    const { progress, activeIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.62, 1);
    fracture.current.rotation.z = damp(fracture.current.rotation.z, activeIndustry === "injury-law" ? -0.04 + hub * 0.04 : -0.08, delta, 4.7);
    fracture.current.position.x = damp(fracture.current.position.x, activeIndustry === "injury-law" ? -0.08 : -0.22, delta, 4.7);
  });
  const lines: Array<[number, number, number]> = [[-0.52, 0.62, 0.9], [-0.38, 0.15, -0.65], [-0.18, -0.3, 0.55], [-0.58, -0.72, -0.38], [0.02, 0.18, 1.12]];
  return (
    <WorldRig industry="injury-law">
      <group position={[0, 0.02, -0.56]}>
        <mesh position={[0, 0, -0.72]}><planeGeometry args={[2.1, 3.74]} /><meshStandardMaterial color="#202a38" roughness={0.82} /></mesh>
        <mesh position={[0.42, 0.56, -0.6]}><planeGeometry args={[0.7, 1.72]} /><meshStandardMaterial color="#eee2cf" emissive="#ead6ba" emissiveIntensity={1.8} toneMapped={false} /></mesh>
        {[-0.7, -0.25, 0.2].map((x, index) => <RoundedBox key={x} args={[0.32, 1.9 - index * 0.12, 0.11]} radius={0.02} position={[x, 0.08 + index * 0.08, -0.35]}><meshStandardMaterial color={index % 2 ? "#d5c7b0" : "#80515d"} roughness={0.67} /></RoundedBox>)}
        <RoundedBox args={[1.56, 0.16, 0.74]} radius={0.025} position={[0, -1.06, -0.08]}><meshPhysicalMaterial color="#d7cbb8" roughness={0.6} clearcoat={0.15} /></RoundedBox>
        <mesh position={[0, -1.47, -0.12]}><boxGeometry args={[0.14, 0.76, 0.14]} /><meshStandardMaterial color="#7d2f3f" roughness={0.48} /></mesh>
        <group ref={fracture} position={[-0.18, 0.1, 0.1]}>{lines.map(([x, y, rotation], index) => <mesh key={index} position={[x, y, 0]} rotation={[0, 0, rotation]}><boxGeometry args={[0.018, 0.7 + index * 0.09, 0.012]} /><meshStandardMaterial color="#d9e2e7" emissive="#b9c8d2" emissiveIntensity={0.72} transparent opacity={0.72} /></mesh>)}</group>
        <pointLight color="#f0dfca" intensity={3.1} position={[0.36, 1.16, 0]} distance={4.5} />
      </group>
    </WorldRig>
  );
}

function EstatePortal() {
  return <group position={[portalX["real-estate"], 0, -0.38]}><PortalArchitecture accent="#caa56b" /><EstateInterior /><DoorLeaf industry="real-estate" color="#4a3527" accent="#c8a46d">{[-0.55, 0, 0.55].map((x) => <mesh key={x} position={[x, 0.8, 0.205]}><boxGeometry args={[0.022, 0.98, 0.018]} /><meshStandardMaterial color="#c8a46d" metalness={0.74} roughness={0.25} /></mesh>)}</DoorLeaf><PortalLight industry="real-estate" color="#e6b56f" /></group>;
}

function ServicePortal() {
  return <group position={[portalX.plumbing, 0, 0]}><PortalArchitecture accent="#6f8fff" /><ServiceInterior /><DoorLeaf industry="plumbing" color="#17384d" accent="#b87748"><mesh position={[0, 0.84, 0.21]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.28, 0.035, 14, 38]} /><meshStandardMaterial color="#b87748" roughness={0.2} metalness={0.9} /></mesh></DoorLeaf><PortalLight industry="plumbing" color="#5f79ff" /></group>;
}

function LawPortal() {
  return <group position={[portalX["injury-law"], 0, -0.38]}><PortalArchitecture accent="#b87988" /><LawInterior /><DoorLeaf industry="injury-law" color="#33252c" accent="#a86d7b">{[-0.42, -0.14, 0.16, 0.46].map((x, index) => <mesh key={x} position={[x, 0.84 + index * 0.035, 0.205]} rotation={[0, 0, -0.04 + index * 0.025]}><boxGeometry args={[0.026, 0.94, 0.018]} /><meshStandardMaterial color={index % 2 ? "#d6c8b3" : "#a86d7b"} metalness={0.35} roughness={0.38} /></mesh>)}</DoorLeaf><PortalLight industry="injury-law" color="#b87988" /></group>;
}

function Showroom() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const reveal = THREE.MathUtils.smoothstep(useHeroScroll.getState().progress, 0.04, 0.72);
    group.current.position.y = damp(group.current.position.y, THREE.MathUtils.lerp(-0.34, 0, reveal), delta, 4.6);
    group.current.rotation.y = damp(group.current.rotation.y, THREE.MathUtils.lerp(0.095, -0.018, reveal), delta, 4.6);
  });
  return (
    <group ref={group}>
      <EstatePortal /><ServicePortal /><LawPortal />
      <mesh receiveShadow position={[0, -2.08, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[18, 15]} /><meshPhysicalMaterial color="#101318" roughness={0.18} metalness={0.38} clearcoat={0.36} clearcoatRoughness={0.28} /></mesh>
      <mesh position={[0, 2.4, -0.34]}><boxGeometry args={[10.7, 0.3, 1]} /><meshPhysicalMaterial color="#202329" roughness={0.32} metalness={0.54} clearcoat={0.18} /></mesh>
      {[-3.2, 0, 3.2].map((x) => <mesh key={x} position={[x, 2.25, 0.08]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[1.65, 0.08]} /><meshStandardMaterial color="#f1e7d7" emissive="#f1e7d7" emissiveIntensity={2.4} toneMapped={false} /></mesh>)}
      <ContactShadows frames={1} position={[0, -2.055, 0.58]} opacity={0.7} scale={13.5} blur={2.35} far={6} />
    </group>
  );
}

function CinematicEffects() {
  return <EffectComposer multisampling={0} enableNormalPass={false}><Bloom intensity={0.34} luminanceThreshold={0.92} luminanceSmoothing={0.3} mipmapBlur /><Vignette eskil={false} offset={0.24} darkness={0.66} /></EffectComposer>;
}

function ShowroomEnvironment() {
  return (
    <Environment resolution={96} environmentIntensity={0.38}>
      <Lightformer form="rect" intensity={3.8} color="#f3e7d4" position={[0, 5, 4]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 2, 1]} />
      <Lightformer form="rect" intensity={2.4} color="#8fa0c9" position={[-5, 1.2, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} />
      <Lightformer form="rect" intensity={2.1} color="#c18775" position={[5, 0.4, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2.5, 4, 1]} />
      <Lightformer form="ring" intensity={1.8} color="#ffffff" position={[0, 1, -5]} scale={[5, 5, 1]} />
    </Environment>
  );
}

export function ThreeDoorsScene({ onFailure, onReady }: ThreeDoorsSceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [fullQuality, setFullQuality] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 64rem)").matches &&
    (!navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 6),
  );

  useEffect(() => {
    const element = host.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      { rootMargin: "220px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const updateQuality = () =>
      setFullQuality(
        query.matches &&
        (!navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 6),
      );
    updateQuality();
    query.addEventListener("change", updateQuality);
    return () => query.removeEventListener("change", updateQuality);
  }, []);

  return (
    <div ref={host} className="hero__canvas">
      <Canvas shadows="soft" dpr={[1, fullQuality ? 1.45 : 1.2]} frameloop={visible ? "always" : "never"} camera={{ position: [-1.15, 0.72, 6.72], fov: 40, near: 0.1, far: 50 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.outputColorSpace = THREE.SRGBColorSpace; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 0.82; }}>
        <color attach="background" args={["#0b0e12"]} /><fog attach="fog" args={["#0b0e12", 8.4, 19]} /><ambientLight intensity={0.23} />
        <directionalLight castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} position={[4, 6.5, 6]} intensity={2.7} color="#f3e8d5" /><directionalLight position={[-5, 2.5, 3]} intensity={0.9} color="#6479a9" />
        <Suspense fallback={null}><Showroom /><ShowroomEnvironment /></Suspense>
        <CameraRig />{fullQuality ? <CinematicEffects /> : null}<SceneReady onReady={onReady} /><ContextLossGuard onFailure={onFailure} />
      </Canvas>
    </div>
  );
}
