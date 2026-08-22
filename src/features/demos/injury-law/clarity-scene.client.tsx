"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Props = { onResolved?: () => void };

type RecordSpec = { from:[number,number,number]; to:[number,number,number]; rot:[number,number,number]; size:[number,number] };

const ease = (v:number) => THREE.MathUtils.smootherstep(v,0,1);

function AccidentToClarity({ onResolved }: { onResolved:()=>void }) {
  const camera = useThree((state)=>state.camera as THREE.PerspectiveCamera);
  const elapsed=useRef(0); const sent=useRef(false); const records=useRef<THREE.Group>(null); const glare=useRef<THREE.Mesh>(null); const windshield=useRef<THREE.Mesh>(null);
  const specs=useMemo<RecordSpec[]>(()=>[
    {from:[-3.1,1.5,-.6],to:[-2.15,.95,-.95],rot:[.22,-.48,.18],size:[1.25,1.9]},
    {from:[2.8,1.8,-1.3],to:[1.95,.88,-1.05],rot:[-.2,.42,-.12],size:[1.4,2.15]},
    {from:[-2.2,-2.0,-1.1],to:[-1.55,-.92,-1.15],rot:[-.3,.28,-.14],size:[1.55,1.35]},
    {from:[3.2,-1.45,-.6],to:[2.12,-.82,-1.1],rot:[.17,-.42,.14],size:[1.35,1.75]},
    {from:[.65,2.35,-1.8],to:[.35,1.22,-1.5],rot:[.28,-.16,.08],size:[1.75,1.1]},
  ],[]);

  useFrame((state,delta)=>{
    elapsed.current=Math.min(elapsed.current+delta,7.2); const t=elapsed.current;
    const impact=ease((t-.65)/1.05); const settle=ease((t-1.7)/1.9); const clarity=ease((t-3.05)/2.85);
    const shake=(1-settle)*Math.sin(t*29)*.07;
    camera.position.set(shake*.55, .03+Math.sin(t*23)*.018*(1-settle), THREE.MathUtils.lerp(6.7,7.45,clarity));
    camera.rotation.z = shake*.12;
    camera.lookAt(0,0,-1.2);
    if(glare.current){const s=THREE.MathUtils.lerp(1,.12,settle);glare.current.scale.setScalar(s); (glare.current.material as THREE.MeshBasicMaterial).opacity=THREE.MathUtils.lerp(.72,0,settle);}
    if(windshield.current){(windshield.current.material as THREE.MeshPhysicalMaterial).opacity=THREE.MathUtils.lerp(.3,.06,clarity);}
    if(records.current){records.current.visible=t>2.55; records.current.children.forEach((child,index)=>{const spec=specs[index]; if(!spec)return; const p=ease((clarity-index*.04)/.82); child.position.set(THREE.MathUtils.lerp(spec.from[0],spec.to[0],p),THREE.MathUtils.lerp(spec.from[1],spec.to[1],p),THREE.MathUtils.lerp(spec.from[2],spec.to[2],p)); child.rotation.set(THREE.MathUtils.lerp(spec.rot[0],0,p),THREE.MathUtils.lerp(spec.rot[1],0,p),THREE.MathUtils.lerp(spec.rot[2],0,p));});}
    if(t>=6.1&&!sent.current){sent.current=true;onResolved();}
    state.gl.toneMappingExposure=THREE.MathUtils.lerp(.78,1.02,clarity);
  });

  const crack = [[-.1,.2,1.8],[-.65,.48,1.75],[-1.15,.18,1.73],[-1.62,.68,1.7]] as [number,number,number][];
  const crack2 = [[-.1,.2,1.8],[.55,.74,1.74],[1.05,.58,1.71],[1.58,1.05,1.68]] as [number,number,number][];
  const crack3 = [[-.1,.2,1.8],[.32,-.42,1.75],[.88,-.8,1.71],[1.42,-.62,1.69]] as [number,number,number][];

  return <>
    <color attach="background" args={["#101822"]}/><fog attach="fog" args={["#101822",5,18]}/>
    <ambientLight intensity={.5} color="#aab5c2"/><directionalLight position={[3,5,4]} intensity={2.6} color="#fff0dc"/><pointLight position={[-4,.5,1]} intensity={18} distance={7} color="#d04a42"/><pointLight position={[4,.8,1]} intensity={15} distance={7} color="#6da1d4"/>
    <mesh position={[0,-1.9,-1.8]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[18,26]}/><meshStandardMaterial color="#151b22" roughness={.95}/></mesh>
    <mesh position={[-2.6,-.25,-2.1]}><boxGeometry args={[.18,.05,12]}/><meshStandardMaterial color="#e6e0cf" emissive="#e6e0cf" emissiveIntensity={.35}/></mesh>
    <mesh position={[2.6,-.25,-2.1]}><boxGeometry args={[.18,.05,12]}/><meshStandardMaterial color="#e6e0cf" emissive="#e6e0cf" emissiveIntensity={.35}/></mesh>
    <mesh ref={windshield} position={[0,.1,1.7]} rotation={[-.03,0,0]}><planeGeometry args={[7.5,4.45]}/><meshPhysicalMaterial color="#c8d3db" transparent opacity={.3} transmission={.48} roughness={.08} thickness={.12} side={THREE.DoubleSide}/></mesh>
    <Line points={crack} color="#e5e8ea" lineWidth={1.1} transparent opacity={.72}/><Line points={crack2} color="#e5e8ea" lineWidth={1.1} transparent opacity={.66}/><Line points={crack3} color="#e5e8ea" lineWidth={1.1} transparent opacity={.58}/>
    <mesh ref={glare} position={[.1,.15,1.9]}><circleGeometry args={[1.25,32]}/><meshBasicMaterial color="#fff2d6" transparent opacity={.72} toneMapped={false}/></mesh>
    <group ref={records} visible={false} position={[0,0,0]}>{specs.map((spec,index)=><mesh key={index} position={spec.from} rotation={spec.rot}><planeGeometry args={spec.size}/><meshPhysicalMaterial color={index%2?"#f4efe4":"#ddd8cf"} transparent opacity={index%2?.22:.15} roughness={.28} transmission={.34} thickness={.4} side={THREE.DoubleSide}/></mesh>)}</group>
    <mesh position={[0,-1.55,-1.15]}><boxGeometry args={[5.25,.035,.04]}/><meshBasicMaterial color="#985466"/></mesh>
  </>;
}

function Lifecycle({ onFailure,onReady }:{onFailure:()=>void;onReady:()=>void}){const gl=useThree(s=>s.gl);const frames=useRef(0);const sent=useRef(false);useFrame(()=>{if(sent.current)return;frames.current++;if(frames.current>=2){sent.current=true;onReady();}});useEffect(()=>{const c=gl.domElement;const h=(e:Event)=>{e.preventDefault();onFailure();};c.addEventListener("webglcontextlost",h);return()=>c.removeEventListener("webglcontextlost",h);},[gl,onFailure]);return null;}

export function ClarityScene({ onResolved }: Props){const [ready,setReady]=useState(false);const [failed,setFailed]=useState(false);const [complete,setComplete]=useState(false);const resolved=()=>{setComplete(true);onResolved?.();};if(failed)return null;return <Canvas camera={{position:[0,0,6.7],fov:43,near:.1,far:35}} dpr={[1,1.45]} frameloop={complete?"demand":"always"} gl={{antialias:true,alpha:false,powerPreference:"high-performance"}} style={{opacity:ready?1:0,transition:"opacity 320ms ease"}} onCreated={({gl})=>{gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=.78;}}><Suspense fallback={null}><AccidentToClarity onResolved={resolved}/></Suspense><Lifecycle onFailure={()=>setFailed(true)} onReady={()=>setReady(true)}/></Canvas>}
