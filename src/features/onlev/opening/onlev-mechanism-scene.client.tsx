"use client";

import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useOpeningMotion } from "./onlev-opening-store";

interface Props { onFailure: () => void; onReady: () => void; }
const damp = (current: number, target: number, delta: number, speed = 5) => THREE.MathUtils.damp(current, target, speed, delta);

function ContextLoss({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const handler = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", handler);
    return () => canvas.removeEventListener("webglcontextlost", handler);
  }, [gl, onFailure]);
  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const sent = useRef(false);
  useFrame(() => {
    if (sent.current) return;
    frames.current += 1;
    if (frames.current < 3) return;
    sent.current = true;
    onReady();
  });
  return null;
}

function Mechanism() {
  const { scene } = useGLTF("/models/onlev-mechanism.glb");
  const object = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);
  const signal = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.PointLight>(null);
  const temp = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(4.3, 1.25, 1.4),
    new THREE.Vector3(2.6, .82, 1.0),
    new THREE.Vector3(.8, .72, .9),
    new THREE.Vector3(-.5, .72, .84),
    new THREE.Vector3(-1.55, -.82, .82),
    new THREE.Vector3(.7, -.82, .88),
    new THREE.Vector3(1.4, -.35, 1.0),
  ]), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const progress = useOpeningMotion.getState().progress;
    const settle = THREE.MathUtils.smoothstep(progress, .08, .86);
    group.current.rotation.y = damp(group.current.rotation.y, THREE.MathUtils.lerp(-.12, .025, settle), delta, 4.4);
    group.current.rotation.x = damp(group.current.rotation.x, THREE.MathUtils.lerp(.035, -.012, settle), delta, 4.4);
    group.current.position.x = damp(group.current.position.x, THREE.MathUtils.lerp(.62, .1, settle), delta, 4.2);
    group.current.position.y = damp(group.current.position.y, THREE.MathUtils.lerp(-.16, .02, settle), delta, 4.2);

    const travel = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(progress, .08, .76, 0, 1), 0, 1);
    curve.getPointAt(travel, temp);
    if (signal.current) {
      signal.current.position.copy(temp);
      const pulse = .82 + Math.sin(state.clock.elapsedTime * 5.2) * .12;
      signal.current.scale.setScalar(pulse);
    }
    if (halo.current) {
      halo.current.position.copy(temp);
      halo.current.intensity = 4.2 + settle * 3.2;
    }
  });

  return (
    <group ref={group} position={[.62, -.16, 0]} rotation={[.035, -.12, 0]}>
      <primitive object={object} />
      <mesh ref={signal} position={[4.3, 1.25, 1.4]}>
        <sphereGeometry args={[.095, 24, 24]} />
        <meshStandardMaterial color="#5f78d7" emissive="#5f78d7" emissiveIntensity={4.8} toneMapped={false} />
      </mesh>
      <pointLight ref={halo} color="#6680df" intensity={4} distance={2.3} decay={2} />
    </group>
  );
}

function Camera() {
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  useFrame(({ pointer }, delta) => {
    const progress = useOpeningMotion.getState().progress;
    const settle = THREE.MathUtils.smoothstep(progress, 0, .9);
    camera.position.x = damp(camera.position.x, THREE.MathUtils.lerp(1.45, 1.0, settle) + pointer.x * .05, delta, 4);
    camera.position.y = damp(camera.position.y, THREE.MathUtils.lerp(.22, .04, settle) + pointer.y * .035, delta, 4);
    camera.position.z = damp(camera.position.z, THREE.MathUtils.lerp(8.9, 8.15, settle), delta, 4);
    camera.lookAt(1.05, .02, .22);
  });
  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={.72} />
      <directionalLight castShadow position={[4, 6, 7]} intensity={3.4} color="#fff7e8" shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 1, 4]} intensity={1.4} color="#7f95cf" />
      <Environment resolution={64} environmentIntensity={.48}>
        <Lightformer form="rect" intensity={4} color="#fff7e9" position={[0, 5, 5]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2.8} color="#8295ce" position={[-5, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} />
        <Lightformer form="rect" intensity={2.1} color="#ba875b" position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 4, 1]} />
      </Environment>
    </>
  );
}

export function OnlevMechanismScene({ onFailure, onReady }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [fullQuality, setFullQuality] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true), { rootMargin: "180px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const sync = () => setFullQuality(query.matches && (!navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 6));
    sync(); query.addEventListener("change", sync); return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div ref={host} className="onlev-opening__canvas">
      <Canvas
        shadows="soft"
        frameloop={visible ? "always" : "never"}
        dpr={[1, fullQuality ? 1.45 : 1.18]}
        camera={{ position: [1.45, .22, 8.9], fov: 38, near: .1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = .94;
        }}
      >
        <color attach="background" args={["#e5e0d5"]} />
        <Suspense fallback={null}><Mechanism /><Lighting /></Suspense>
        <Camera />
        {fullQuality ? <EffectComposer multisampling={0} enableNormalPass={false}><Bloom intensity={.2} luminanceThreshold={.92} mipmapBlur /><Vignette eskil={false} offset={.1} darkness={.18} /></EffectComposer> : null}
        <Ready onReady={onReady} /><ContextLoss onFailure={onFailure} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/onlev-mechanism.glb");
