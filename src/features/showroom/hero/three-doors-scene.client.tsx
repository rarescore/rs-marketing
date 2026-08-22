"use client";

import { ContactShadows, Environment, Lightformer, PerspectiveCamera, RoundedBox, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useHeroScroll, type IndustrySlug } from "./hero-scroll-store";

interface ThreeDoorsSceneProps { onFailure: () => void; onReady: () => void; }

const portalX: Record<IndustrySlug, number> = {
  "real-estate": -3.12,
  plumbing: 0,
  "injury-law": 3.12,
};

const damp = (current: number, target: number, delta: number, speed = 5) => THREE.MathUtils.damp(current, target, speed, delta);

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
    const handleContextLoss = (event: Event) => { event.preventDefault(); onFailure(); };
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
    const reveal = THREE.MathUtils.smoothstep(progress, 0.02, 0.66);
    const hub = THREE.MathUtils.smoothstep(progress, 0.18, 0.74);
    const selectedX = portalX[transitionIndustry ?? activeIndustry];
    const pointerInfluence = 0.25 + hub * 0.55;
    const targetX = transitionIndustry
      ? selectedX * 0.5
      : THREE.MathUtils.lerp(-0.35, 0.12, reveal) + selectedX * 0.075 * hub + pointer.x * 0.07 * pointerInfluence;
    const targetY = THREE.MathUtils.lerp(0.45, 0.08, reveal) + pointer.y * 0.035 * pointerInfluence;
    const targetZ = transitionIndustry ? 6.45 : THREE.MathUtils.lerp(10.35, 8.75, reveal);
    camera.current.position.x = damp(camera.current.position.x, targetX, delta, transitionIndustry ? 3.2 : 4.2);
    camera.current.position.y = damp(camera.current.position.y, targetY, delta, 4.2);
    camera.current.position.z = damp(camera.current.position.z, targetZ, delta, transitionIndustry ? 3.0 : 4.2);
    camera.current.lookAt(
      transitionIndustry ? selectedX * 0.76 : selectedX * 0.13 * hub,
      THREE.MathUtils.lerp(0.16, 0.02, reveal),
      -0.58,
    );
  });
  return <PerspectiveCamera ref={camera} makeDefault position={[-0.35, 0.45, 10.35]} fov={39} near={0.1} far={50} />;
}

function PortalAsset({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} />;
}

function WorldRig({ industry, children }: { industry: IndustrySlug; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.18, 0.72);
    const active = activeIndustry === industry || transitionIndustry === industry;
    group.current.position.z = damp(group.current.position.z, active ? -0.02 + hub * 0.23 : -0.36, delta, 4.4);
    group.current.position.y = damp(group.current.position.y, active ? 0.035 : -0.055, delta, 4.4);
    group.current.rotation.y = damp(group.current.rotation.y, active ? 0 : portalX[industry] * -0.016, delta, 4.4);
  });
  return <group ref={group}>{children}</group>;
}

function WeightedHinge({ industry, children }: { industry: IndustrySlug; children: ReactNode }) {
  const hinge = useRef<THREE.Group>(null);
  const velocity = useRef(0);
  const angle = useRef(-0.015);
  const wasActive = useRef(false);
  useFrame((_, delta) => {
    if (!hinge.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.18, 0.68);
    const active = activeIndustry === industry;
    const entering = transitionIndustry === industry;
    const target = entering ? -1.5 : active ? -1.02 * hub : -0.045 * hub;
    if (active && !wasActive.current) velocity.current -= 0.95;
    wasActive.current = active;
    const stiffness = entering ? 42 : 31;
    const damping = entering ? 9.2 : 8.4;
    velocity.current += ((target - angle.current) * stiffness - velocity.current * damping) * Math.min(delta, 0.035);
    angle.current += velocity.current * Math.min(delta, 0.035);
    angle.current = THREE.MathUtils.clamp(angle.current, -1.58, 0.035);
    hinge.current.rotation.y = angle.current;
  });
  return <group ref={hinge} position={[-1.04, 0.02, 0.48]}><group position={[1.04, 0, 0]}>{children}</group></group>;
}

function EstateDoor() {
  return (
    <WeightedHinge industry="real-estate">
      <RoundedBox castShadow receiveShadow args={[2.04, 3.86, 0.2]} radius={0.025} smoothness={4}>
        <meshPhysicalMaterial color="#4b3425" roughness={0.5} metalness={0.08} clearcoat={0.18} clearcoatRoughness={0.42} />
      </RoundedBox>
      {[0.86, -0.76].map((y, index) => <RoundedBox key={y} args={[1.62, index ? 1.48 : 1.22, .045]} radius={.018} position={[0,y,.125]}><meshStandardMaterial color="#3a281d" roughness={.58} /></RoundedBox>)}
      {[-.58,0,.58].map((x) => <mesh key={x} position={[x,.86,.16]}><boxGeometry args={[.022,.92,.018]} /><meshStandardMaterial color="#a87d4f" metalness={.74} roughness={.31} /></mesh>)}
      <mesh position={[.66,.02,.19]}><boxGeometry args={[.09,.62,.07]} /><meshPhysicalMaterial color="#b08a5f" metalness={.84} roughness={.22} clearcoat={.25} /></mesh>
      <mesh position={[.52,.02,.24]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.038,.038,.34,20]} /><meshPhysicalMaterial color="#b08a5f" metalness={.9} roughness={.18} /></mesh>
    </WeightedHinge>
  );
}

function ServiceDoor() {
  return (
    <WeightedHinge industry="plumbing">
      <RoundedBox castShadow receiveShadow args={[2.05,3.88,.22]} radius={.018} smoothness={3}>
        <meshPhysicalMaterial color="#17364a" roughness={.24} metalness={.44} clearcoat={.32} clearcoatRoughness={.22} />
      </RoundedBox>
      <mesh position={[-.55,.08,.16]}><boxGeometry args={[.09,2.55,.055]} /><meshPhysicalMaterial color="#b56f43" metalness={.84} roughness={.22} /></mesh>
      <mesh position={[-.1,1.32,.16]}><boxGeometry args={[.98,.09,.055]} /><meshPhysicalMaterial color="#b56f43" metalness={.84} roughness={.22} /></mesh>
      <RoundedBox args={[.13,2.28,.1]} radius={.028} position={[.7,0,.18]}><meshPhysicalMaterial color="#9da7ad" metalness={.92} roughness={.18} clearcoat={.28} /></RoundedBox>
      <mesh position={[.06,.72,.19]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.3,.035,14,40]} /><meshPhysicalMaterial color="#9da7ad" metalness={.9} roughness={.2} /></mesh>
      <mesh position={[.06,.72,.2]}><circleGeometry args={[.245,36]} /><meshStandardMaterial color="#d9ddde" roughness={.52} /></mesh>
    </WeightedHinge>
  );
}

function LawDoor() {
  return (
    <WeightedHinge industry="injury-law">
      <RoundedBox castShadow receiveShadow args={[2.04,3.86,.21]} radius={.02} smoothness={3}>
        <meshPhysicalMaterial color="#3a282f" roughness={.42} metalness={.22} clearcoat={.18} />
      </RoundedBox>
      {[.92,.48,.04,-.4,-.84].map((y,index) => <mesh key={y} position={[-.04,y,.15]} rotation={[0,0,index%2 ? -.01 : .012]}><boxGeometry args={[1.58,.07,.025]} /><meshStandardMaterial color={index%2 ? "#d5c7af" : "#a06d79"} roughness={.58} /></mesh>)}
      <mesh position={[.67,.02,.19]}><boxGeometry args={[.08,.74,.07]} /><meshPhysicalMaterial color="#a8a8a4" metalness={.88} roughness={.2} /></mesh>
      <mesh position={[.53,.02,.24]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.034,.034,.3,20]} /><meshPhysicalMaterial color="#a8a8a4" metalness={.9} roughness={.2} /></mesh>
    </WeightedHinge>
  );
}

function PortalLight({ industry, color }: { industry: IndustrySlug; color: string }) {
  const light = useRef<THREE.RectAreaLight>(null);
  useFrame((_, delta) => {
    if (!light.current) return;
    const { progress, activeIndustry, transitionIndustry } = useHeroScroll.getState();
    const hub = THREE.MathUtils.smoothstep(progress, 0.16, 0.72);
    const active = activeIndustry === industry || transitionIndustry === industry;
    light.current.intensity = damp(light.current.intensity, active ? 7.8 * hub + 1.4 : 0.8 + hub * .8, delta, 4.6);
  });
  return <rectAreaLight ref={light} color={color} intensity={1.1} width={1.9} height={3.45} position={[0,0.12,0.55]} />;
}

function EstateInterior() {
  const sun = useRef<THREE.PointLight>(null);
  const blinds = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const { activeIndustry } = useHeroScroll.getState();
    const active = activeIndustry === "real-estate";
    if (sun.current) sun.current.intensity = damp(sun.current.intensity, active ? 4.6 : 2.4, delta, 4.2);
    if (blinds.current) blinds.current.rotation.z = damp(blinds.current.rotation.z, active ? -.08 : .05, delta, 3.8);
  });
  return (
    <WorldRig industry="real-estate">
      <group position={[0,.02,-.56]}>
        <mesh position={[0,0,-.74]}><planeGeometry args={[2.1,3.74]} /><meshStandardMaterial color="#2a241d" roughness={.88} /></mesh>
        <mesh position={[.46,.54,-.62]}><planeGeometry args={[.84,1.62]} /><meshStandardMaterial color="#d8c6a4" emissive="#d5a762" emissiveIntensity={1.45} toneMapped={false} /></mesh>
        <group ref={blinds} position={[.46,.54,-.57]}>{[-.28,-.14,0,.14,.28].map((y)=><mesh key={y} position={[0,y,0]}><boxGeometry args={[.78,.025,.02]} /><meshStandardMaterial color="#806b50" roughness={.7} /></mesh>)}</group>
        <mesh position={[-.42,.1,-.42]}><boxGeometry args={[.68,2.92,.14]} /><meshPhysicalMaterial color="#64523f" roughness={.58} metalness={.08} clearcoat={.12} /></mesh>
        {[0,1,2].map((step)=><mesh key={step} position={[.15+step*.22,-1.24+step*.16,-.2+step*.1]}><boxGeometry args={[1.28-step*.18,.16,.6]} /><meshStandardMaterial color="#c8b38e" roughness={.68} /></mesh>)}
        <mesh position={[0,-1.78,-.08]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[2.1,2.5]} /><meshPhysicalMaterial color="#4d4032" roughness={.34} metalness={.16} clearcoat={.38} /></mesh>
        <pointLight ref={sun} color="#e7b96f" intensity={2.4} position={[.4,1.16,0]} distance={4.8} />
      </group>
    </WorldRig>
  );
}

function ServiceInterior() {
  const gauge = useRef<THREE.Group>(null);
  const flow = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const { activeIndustry } = useHeroScroll.getState();
    const active = activeIndustry === "plumbing";
    if (gauge.current) gauge.current.rotation.z = damp(gauge.current.rotation.z, active ? .55 : -.62, delta, 5.4);
    if (flow.current) {
      flow.current.position.y = damp(flow.current.position.y, active ? .28 : -.42, delta, 4.5);
      flow.current.rotation.y = damp(flow.current.rotation.y, active ? .72 : 0, delta, 4.8);
    }
  });
  return (
    <WorldRig industry="plumbing">
      <group position={[0,.02,-.54]}>
        <mesh position={[0,0,-.7]}><planeGeometry args={[2.1,3.74]} /><meshStandardMaterial color="#102737" roughness={.7} metalness={.18} /></mesh>
        {[-.68,0,.68].map((x,index)=><group key={x} position={[x,0,-.3]}><mesh position={[0,-.12,0]}><cylinderGeometry args={[.082,.082,2.8,20]} /><meshPhysicalMaterial color={index===1?"#b87748":"#8399a7"} roughness={.2} metalness={.88} clearcoat={.3} /></mesh>{[-1.08,.92].map((y)=><mesh key={y} rotation={[Math.PI/2,0,0]} position={[0,y,.04]}><torusGeometry args={[.18,.036,12,32]} /><meshStandardMaterial color="#d8e0e4" roughness={.19} metalness={.9} /></mesh>)}</group>)}
        <group position={[0,.62,.02]}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.42,.07,18,48]} /><meshPhysicalMaterial color="#e4e8e9" roughness={.18} metalness={.92} clearcoat={.4} /></mesh><mesh position={[0,0,-.02]}><circleGeometry args={[.34,42]} /><meshStandardMaterial color="#e8ecec" roughness={.6} /></mesh><group ref={gauge}><mesh position={[0,.16,.02]}><boxGeometry args={[.035,.34,.025]} /><meshStandardMaterial color="#16354b" roughness={.32} /></mesh></group></group>
        <group ref={flow}>{[-.25,0,.25].map((y)=><mesh key={y} position={[0,y,.12]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.115,.018,8,28]} /><meshStandardMaterial color="#6f8fff" emissive="#5f79ff" emissiveIntensity={2.4} toneMapped={false} /></mesh>)}</group>
        <RoundedBox args={[1.72,.54,.38]} radius={.04} position={[0,-1.24,-.08]}><meshPhysicalMaterial color="#365267" roughness={.34} metalness={.54} clearcoat={.22} /></RoundedBox>
        <pointLight color="#5f79ff" intensity={3.6} position={[0,1.18,.1]} distance={4.4} />
      </group>
    </WorldRig>
  );
}

function LawInterior() {
  const records = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!records.current) return;
    const { activeIndustry } = useHeroScroll.getState();
    const active = activeIndustry === "injury-law";
    records.current.rotation.z = damp(records.current.rotation.z, active ? 0 : -.075, delta, 4.7);
    records.current.position.x = damp(records.current.position.x, active ? -.03 : -.22, delta, 4.7);
  });
  const lines: Array<[number,number,number]> = [[-.52,.62,.9],[-.38,.15,-.65],[-.18,-.3,.55],[-.58,-.72,-.38],[.02,.18,1.12]];
  return (
    <WorldRig industry="injury-law">
      <group position={[0,.02,-.56]}>
        <mesh position={[0,0,-.72]}><planeGeometry args={[2.1,3.74]} /><meshStandardMaterial color="#202a38" roughness={.82} /></mesh>
        <mesh position={[.42,.56,-.6]}><planeGeometry args={[.7,1.72]} /><meshStandardMaterial color="#eee2cf" emissive="#ead6ba" emissiveIntensity={1.55} toneMapped={false} /></mesh>
        {[-.7,-.25,.2].map((x,index)=><RoundedBox key={x} args={[.32,1.9-index*.12,.11]} radius={.02} position={[x,.08+index*.08,-.35]}><meshStandardMaterial color={index%2?"#d5c7b0":"#80515d"} roughness={.67} /></RoundedBox>)}
        <RoundedBox args={[1.56,.16,.74]} radius={.025} position={[0,-1.06,-.08]}><meshPhysicalMaterial color="#d7cbb8" roughness={.6} clearcoat={.15} /></RoundedBox>
        <group ref={records} position={[-.18,.1,.1]}>{lines.map(([x,y,rotation],index)=><mesh key={index} position={[x,y,0]} rotation={[0,0,rotation]}><boxGeometry args={[.018,.7+index*.09,.012]} /><meshStandardMaterial color="#d9e2e7" emissive="#b9c8d2" emissiveIntensity={.72} transparent opacity={.72} /></mesh>)}</group>
        <pointLight color="#f0dfca" intensity={3.1} position={[.36,1.16,0]} distance={4.5} />
      </group>
    </WorldRig>
  );
}

function EstatePortal() { return <group position={[portalX["real-estate"],0,-.38]}><PortalAsset path="/models/portal-real-estate-frame.glb" /><EstateInterior /><EstateDoor /><PortalLight industry="real-estate" color="#e6b56f" /></group>; }
function ServicePortal() { return <group position={[portalX.plumbing,0,0]}><PortalAsset path="/models/portal-plumbing-frame.glb" /><ServiceInterior /><ServiceDoor /><PortalLight industry="plumbing" color="#5f79ff" /></group>; }
function LawPortal() { return <group position={[portalX["injury-law"],0,-.38]}><PortalAsset path="/models/portal-injury-law-frame.glb" /><LawInterior /><LawDoor /><PortalLight industry="injury-law" color="#b87988" /></group>; }

function AdaptiveKeyLight() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((_,delta) => {
    if (!light.current) return;
    const { activeIndustry, transitionIndustry, progress } = useHeroScroll.getState();
    const x = portalX[transitionIndustry ?? activeIndustry];
    light.current.position.x = damp(light.current.position.x, x * .78, delta, 3.6);
    light.current.intensity = damp(light.current.intensity, 2.1 + THREE.MathUtils.smoothstep(progress,.16,.7) * 1.8, delta, 3.8);
  });
  return <pointLight ref={light} color="#efe5d4" intensity={2.2} position={[-2.4,2.5,3.1]} distance={8.5} decay={2} />;
}

function Showroom() {
  const group = useRef<THREE.Group>(null);
  useFrame((_,delta) => {
    if (!group.current) return;
    const reveal = THREE.MathUtils.smoothstep(useHeroScroll.getState().progress,.02,.66);
    group.current.position.y = damp(group.current.position.y, THREE.MathUtils.lerp(-.26,0,reveal), delta,4.5);
    group.current.rotation.y = damp(group.current.rotation.y, THREE.MathUtils.lerp(.045,-.012,reveal), delta,4.5);
  });
  return (
    <group ref={group}>
      <EstatePortal /><ServicePortal /><LawPortal />
      <mesh receiveShadow position={[0,-2.08,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[18,15]} /><meshPhysicalMaterial color="#101318" roughness={.18} metalness={.38} clearcoat={.36} clearcoatRoughness={.28} /></mesh>
      <mesh position={[0,2.48,-.34]}><boxGeometry args={[10.8,.4,1.15]} /><meshPhysicalMaterial color="#202329" roughness={.32} metalness={.54} clearcoat={.18} /></mesh>
      {[-3.12,0,3.12].map((x)=><mesh key={x} position={[x,2.27,.1]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[1.52,.07]} /><meshStandardMaterial color="#f1e7d7" emissive="#f1e7d7" emissiveIntensity={2.35} toneMapped={false} /></mesh>)}
      <ContactShadows frames={1} position={[0,-2.055,.58]} opacity={.68} scale={13.5} blur={2.25} far={6} />
      <AdaptiveKeyLight />
    </group>
  );
}

function CinematicEffects() { return <EffectComposer multisampling={0} enableNormalPass={false}><Bloom intensity={.28} luminanceThreshold={.93} luminanceSmoothing={.3} mipmapBlur /><Vignette eskil={false} offset={.22} darkness={.56} /></EffectComposer>; }
function ShowroomEnvironment() { return <Environment resolution={96} environmentIntensity={.4}><Lightformer form="rect" intensity={3.8} color="#f3e7d4" position={[0,5,4]} rotation={[Math.PI/2,0,0]} scale={[8,2,1]} /><Lightformer form="rect" intensity={2.4} color="#8fa0c9" position={[-5,1.2,1]} rotation={[0,Math.PI/2,0]} scale={[3,5,1]} /><Lightformer form="rect" intensity={2.1} color="#c18775" position={[5,.4,0]} rotation={[0,-Math.PI/2,0]} scale={[2.5,4,1]} /><Lightformer form="ring" intensity={1.8} color="#ffffff" position={[0,1,-5]} scale={[5,5,1]} /></Environment>; }

export function ThreeDoorsScene({ onFailure, onReady }: ThreeDoorsSceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const [visible,setVisible] = useState(true);
  const [fullQuality,setFullQuality] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true), { rootMargin: "220px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  },[]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const update = () => setFullQuality(query.matches && (!navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 6));
    update(); query.addEventListener("change",update); return () => query.removeEventListener("change",update);
  },[]);
  return (
    <div ref={host} className="hero__canvas">
      <Canvas shadows="soft" dpr={[1,fullQuality?1.45:1.18]} frameloop={visible?"always":"never"} camera={{position:[-.35,.45,10.35],fov:39,near:.1,far:50}} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}} onCreated={({gl})=>{gl.outputColorSpace=THREE.SRGBColorSpace;gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=.82;}}>
        <color attach="background" args={["#0b0e12"]} /><fog attach="fog" args={["#0b0e12",8.6,19]} /><ambientLight intensity={.22} />
        <directionalLight castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} position={[4,6.5,6]} intensity={2.6} color="#f3e8d5" /><directionalLight position={[-5,2.5,3]} intensity={.85} color="#6479a9" />
        <Suspense fallback={null}><Showroom /><ShowroomEnvironment /></Suspense>
        <CameraRig />{fullQuality?<CinematicEffects />:null}<SceneReady onReady={onReady} /><ContextLossGuard onFailure={onFailure} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/portal-real-estate-frame.glb");
useGLTF.preload("/models/portal-plumbing-frame.glb");
useGLTF.preload("/models/portal-injury-law-frame.glb");
