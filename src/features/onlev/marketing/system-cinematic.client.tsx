"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function Sequence({ onComplete }: { onComplete:()=>void }) {
  const elapsed=useRef(0); const done=useRef(false); const signal=useRef<THREE.Mesh>(null); const gates=useRef<THREE.Group>(null); const temp=useMemo(()=>new THREE.Vector3(),[]);
  const curve=useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(-5.4,1.1,.4),new THREE.Vector3(-3.3,.5,.1),new THREE.Vector3(-1.6,-.15,.2),new THREE.Vector3(.2,.35,.1),new THREE.Vector3(2.1,-.1,.2),new THREE.Vector3(4.6,.45,.15)]),[]);
  useFrame((state,delta)=>{
    elapsed.current=Math.min(elapsed.current+delta,8.4); const p=THREE.MathUtils.smootherstep(elapsed.current/7.6,0,1); curve.getPointAt(p,temp); if(signal.current){signal.current.position.copy(temp); signal.current.scale.setScalar(.9+Math.sin(state.clock.elapsedTime*6)*.12);} if(gates.current){gates.current.children.forEach((child,index)=>{const activation=THREE.MathUtils.smoothstep(p,(index-.1)/5,(index+.75)/5); child.rotation.y=THREE.MathUtils.lerp(.6,0,activation); child.position.y=THREE.MathUtils.lerp((index%2?-.35:.35),0,activation);});} if(elapsed.current>=7.6&&!done.current){done.current=true;onComplete();}
  });
  return <><color attach="background" args={["#111318"]}/><fog attach="fog" args={["#111318",8,22]}/><ambientLight intensity={.48}/><directionalLight position={[4,7,5]} intensity={3.2} color="#f4ead8"/><pointLight position={[0,0,3]} intensity={8} color="#637bdf" distance={9}/>
    <group ref={gates}>{[-3.8,-2.1,-.4,1.3,3].map((x,i)=><group key={x} position={[x,i%2?-.35:.35,0]} rotation={[0,.6,0]}><mesh><boxGeometry args={[.95,2.6,.16]}/><meshStandardMaterial color={i===4?"#a77a4f":"#4b5058"} metalness={.82} roughness={.24}/></mesh><mesh position={[0,0,.16]}><boxGeometry args={[.56,1.9,.06]}/><meshStandardMaterial color="#d9d5cc" metalness={.15} roughness={.52}/></mesh></group>)}</group>
    <mesh ref={signal} position={[-5.4,1.1,.4]}><sphereGeometry args={[.12,20,20]}/><meshStandardMaterial color="#6d84ef" emissive="#6d84ef" emissiveIntensity={5} toneMapped={false}/></mesh>
    <mesh position={[0,-1.75,-.7]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[14,8]}/><meshStandardMaterial color="#171a20" roughness={.9}/></mesh></>;
}

export function OnlevSystemCinematic(){ const reduced=useReducedMotion(); const host=useRef<HTMLDivElement>(null); const [eligible,setEligible]=useState(false); const [visible,setVisible]=useState(false); const [complete,setComplete]=useState(false); const [failed,setFailed]=useState(false);
  useEffect(()=>{const q=window.matchMedia("(min-width: 850px)");const sync=()=>setEligible(q.matches);sync();q.addEventListener("change",sync);return()=>q.removeEventListener("change",sync);},[]);
  useEffect(()=>{const el=host.current;if(!el||typeof IntersectionObserver==="undefined"){setVisible(true);return;}const observer=new IntersectionObserver(([entry])=>setVisible(entry?.isIntersecting??false),{rootMargin:"160px 0px"});observer.observe(el);return()=>observer.disconnect();},[]);
  if(reduced||!eligible||failed)return <div className="onlev-system-cinematic onlev-system-cinematic--static" aria-hidden="true"><i/><i/><i/><i/><i/></div>;
  return <div ref={host} className="onlev-system-cinematic" aria-hidden="true"><Canvas dpr={[1,1.35]} frameloop={visible&&!complete?"always":"never"} camera={{position:[0,.2,9.7],fov:39,near:.1,far:40}} gl={{antialias:true,powerPreference:"high-performance"}} onCreated={({gl})=>{gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=.94;gl.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault();setFailed(true);},{once:true});}}><Suspense fallback={null}><Sequence onComplete={()=>setComplete(true)}/></Suspense></Canvas><div className="onlev-system-cinematic__caption"><span>signal</span><i/><span>context</span><i/><span>response</span></div></div>;
}
