"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const pipePaths = [
  { color:"#4ea4d5", points:[[-3,-1.5,0],[-3,.2,0],[-1.2,.2,0],[-1.2,1.25,0]] },
  { color:"#d97d52", points:[[2.7,-1.45,0],[2.7,.45,0],[.65,.45,0],[.65,1.25,0]] },
  { color:"#8b98a0", points:[[-1.2,1.0,-.25],[-1.2,-.8,-.25],[.2,-1.55,-.25],[3.1,-1.55,-.25]] },
] as const;

function Pipe({ color, points, phase }: { color:string; points: readonly (readonly number[])[]; phase:number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(([x,y,z]) => new THREE.Vector3(x,y,z))), [points]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, .07, 10, false), [curve]);
  const beads = useRef<THREE.Group>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    if (!beads.current) return;
    beads.current.children.forEach((child,index) => {
      const t = (state.clock.elapsedTime * .18 + phase + index / 7) % 1;
      curve.getPointAt(t,tmp); child.position.copy(tmp);
    });
  });
  return <group>
    <mesh geometry={geometry}><meshStandardMaterial color={color} metalness={.25} roughness={.36} /></mesh>
    <group ref={beads}>{Array.from({length:5},(_,i)=><mesh key={i}><sphereGeometry args={[.105,12,12]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} /></mesh>)}</group>
  </group>;
}

function System() {
  const root = useRef<THREE.Group>(null);
  const gauge = useRef<THREE.Group>(null);
  useFrame((state,delta) => {
    if (root.current) root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -.12 + Math.sin(state.clock.elapsedTime*.3)*.025, 3, delta);
    if (gauge.current) gauge.current.rotation.z = THREE.MathUtils.damp(gauge.current.rotation.z, -.35 + Math.sin(state.clock.elapsedTime*.75)*.12, 4, delta);
  });
  return <>
    <color attach="background" args={["#0b1217"]} /><fog attach="fog" args={["#0b1217",7,18]} />
    <ambientLight intensity={.65} color="#d7e2e8" /><directionalLight position={[5,7,6]} intensity={3.8} color="#f8f1e7" /><pointLight position={[-3,1,2]} intensity={9} distance={7} color="#3e9bd0" />
    <group ref={root} position={[0,0,-.3]}>
      <mesh position={[0,0,-.7]}><boxGeometry args={[7.4,4.4,.18]} /><meshStandardMaterial color="#18232a" roughness={.78} /></mesh>
      <mesh position={[-3.52,0,.15]}><boxGeometry args={[.18,4.4,1.6]} /><meshStandardMaterial color="#2d383e" metalness={.32} roughness={.48} /></mesh>
      <mesh position={[3.52,0,.15]}><boxGeometry args={[.18,4.4,1.6]} /><meshStandardMaterial color="#2d383e" metalness={.32} roughness={.48} /></mesh>
      {pipePaths.map((pipe,i)=><Pipe key={i} color={pipe.color} points={pipe.points} phase={i*.22} />)}
      <mesh position={[2.7,-1.05,.2]}><cylinderGeometry args={[.44,.44,1.05,28]} /><meshStandardMaterial color="#33444d" metalness={.65} roughness={.28} /></mesh>
      <mesh position={[2.7,-.55,.2]}><cylinderGeometry args={[.48,.48,.08,28]} /><meshStandardMaterial color="#b86c45" metalness={.72} roughness={.25} /></mesh>
      <group position={[2.1,1.25,.45]}>
        <mesh><cylinderGeometry args={[.55,.55,.12,32]} /><meshStandardMaterial color="#d9dde0" metalness={.55} roughness={.25} /></mesh>
        <group ref={gauge} position={[0,0,.08]}><mesh position={[0,.18,0]}><boxGeometry args={[.035,.42,.035]} /><meshStandardMaterial color="#1e485f" /></mesh></group>
      </group>
      <mesh position={[-1.2,1.45,.18]}><boxGeometry args={[1.2,.12,.38]} /><meshStandardMaterial color="#737f85" metalness={.5} roughness={.38} /></mesh>
    </group>
  </>;
}

export function PlumbingSystemScene() {
  const reduced = useReducedMotion(); const host=useRef<HTMLDivElement>(null); const [eligible,setEligible]=useState(false); const [visible,setVisible]=useState(true); const [failed,setFailed]=useState(false);
  useEffect(()=>{ const q=window.matchMedia("(min-width: 900px)"); const sync=()=>setEligible(q.matches); sync(); q.addEventListener("change",sync); return()=>q.removeEventListener("change",sync); },[]);
  useEffect(()=>{const el=host.current;if(!el||typeof IntersectionObserver==="undefined")return;const observer=new IntersectionObserver(([entry])=>setVisible(entry?.isIntersecting??true),{rootMargin:"120px 0px"});observer.observe(el);return()=>observer.disconnect();},[]);
  if (!eligible || reduced || failed) return null;
  return <div ref={host} className="pl-system-render" aria-hidden="true"><Canvas dpr={[1,1.35]} frameloop={visible?"always":"never"} camera={{position:[0,.1,8.1],fov:39,near:.1,far:30}} gl={{antialias:true,powerPreference:"high-performance"}} onCreated={({gl})=>{ gl.toneMapping=THREE.ACESFilmicToneMapping; gl.toneMappingExposure=.96; gl.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault();setFailed(true);},{once:true}); }}><Suspense fallback={null}><System /></Suspense></Canvas><div className="pl-system-render__labels"><span>Supply</span><span>Heat</span><span>Drain</span><span>Pressure</span></div></div>;
}
