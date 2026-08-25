"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

type Point = [number, number];
const origin: Point = [0.58, 0.18];
const rays: Point[] = [[-3.8,2.15],[-2.45,.92],[-3.55,-1.74],[-1.45,-2.7],[.1,-3],[1.55,-2.7],[3.55,-1.85],[3.95,.2],[3.1,2.22],[1.62,2.85],[.28,2.65],[-1.15,2.82]];
const ease=(v:number)=>{const p=THREE.MathUtils.clamp(v,0,1);return p*p*(3-2*p)};
function lineTransform(a:Point,b:Point,z:number){const dx=b[0]-a[0],dy=b[1]-a[1];return{position:[(a[0]+b[0])/2,(a[1]+b[1])/2,z] as [number,number,number],rotation:[0,0,Math.atan2(dy,dx)] as [number,number,number],length:Math.hypot(dx,dy)}}
function triangle(a:Point,b:Point,c:Point){const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute([a[0],a[1],0,b[0],b[1],0,c[0],c[1],0],3));g.computeVertexNormals();return g}

function AccidentAftermath({progress,onReady,onFailure}:{progress:MutableRefObject<number>;onReady:()=>void;onFailure:()=>void}){
  const world=useRef<THREE.Group>(null),glass=useRef<THREE.Group>(null),shards=useRef<THREE.Group>(null),rain=useRef<THREE.Group>(null);
  const warm=useRef<THREE.PointLight>(null),blue=useRef<THREE.PointLight>(null),readyFrames=useRef(0);
  const {camera,gl}=useThree();
  const shardGeometry=useMemo(()=>rays.map((point,index)=>triangle(origin,point,rays[(index+1)%rays.length]!)),[]);
  const cracks=useMemo(()=>{const primary=rays.map((to,index)=>({from:origin,to,depth:index%3}));const branches=rays.flatMap((to,index)=>{if(index%2)return[];const mid:Point=[THREE.MathUtils.lerp(origin[0],to[0],.54),THREE.MathUtils.lerp(origin[1],to[1],.54)];return[{from:mid,to:[mid[0]+(index<6?-.72:.72),mid[1]+.4] as Point,depth:2},{from:mid,to:[mid[0]+(index<6?-.5:.5),mid[1]-.48] as Point,depth:2}]});return[...primary,...branches]},[]);
  useEffect(()=>()=>shardGeometry.forEach(g=>g.dispose()),[shardGeometry]);
  useEffect(()=>{const canvas=gl.domElement;const lost=(event:Event)=>{event.preventDefault();onFailure()};canvas.addEventListener("webglcontextlost",lost);return()=>canvas.removeEventListener("webglcontextlost",lost)},[gl,onFailure]);
  useFrame((state,delta)=>{
    if(++readyFrames.current===2)onReady();const p=progress.current,approach=ease(p/.58),passage=ease((p-.47)/.35),settle=ease((p-.78)/.22),t=state.clock.elapsedTime;
    camera.position.set(THREE.MathUtils.lerp(-.42,.34,approach),THREE.MathUtils.lerp(.06,.2,approach)+Math.sin(t*.45)*.008*(1-settle),THREE.MathUtils.lerp(7.7,2.45,approach));
    camera.rotation.set(THREE.MathUtils.lerp(-.012,.018,approach),THREE.MathUtils.lerp(.045,-.018,approach),THREE.MathUtils.lerp(-.012,0,settle));
    if(world.current){world.current.position.z=THREE.MathUtils.lerp(-1.4,-3.1,passage);world.current.rotation.y=THREE.MathUtils.lerp(-.025,.018,approach)}
    if(glass.current){glass.current.position.z=THREE.MathUtils.lerp(1.55,3.35,passage);glass.current.rotation.z=THREE.MathUtils.lerp(-.012,.008,approach)}
    shards.current?.children.forEach((child,index)=>{const d=passage*(.2+(index%4)*.12);child.position.z=d+(index===7?passage*1.4:0);child.rotation.x=passage*((index%3)-1)*.085;child.rotation.y=passage*(index%2?.12:-.09)});
    rain.current?.children.forEach((drop,index)=>{drop.position.y-=delta*(.13+(index%5)*.018);if(drop.position.y<-3.2)drop.position.y=3.2});if(rain.current)rain.current.position.z=THREE.MathUtils.lerp(1.7,3.45,passage);
    if(warm.current)warm.current.intensity=28+Math.sin(t*1.2)*2.2;if(blue.current)blue.current.intensity=18+Math.sin(t*1.75+1.2)*5;
  });
  return <><fog attach="fog" args={["#0b1119",4.5,18]}/><ambientLight intensity={.35} color="#c8d1dc"/><directionalLight position={[-4,6,5]} intensity={1.7} color="#dbe3e8"/><pointLight ref={warm} position={[3.5,.6,-1]} intensity={28} distance={10} color="#e48c50"/><pointLight ref={blue} position={[-4.2,.2,-2]} intensity={20} distance={11} color="#456e9f"/>
    <group ref={world} position={[0,0,-1.4]}>{[...Array(7)].map((_,i)=><mesh key={i} position={[-5+i*1.8,2.5+(i%2)*.15,-6.3]}><sphereGeometry args={[.055,14,14]}/><meshBasicMaterial color={i%3===0?"#e5a06d":"#8ca8c2"} transparent opacity={.42} toneMapped={false}/></mesh>)}</group>
    <group ref={glass} position={[0,0,1.55]}><mesh position={[0,0,-.025]}><planeGeometry args={[9.3,6.1]}/><meshPhysicalMaterial color="#aab7bf" transparent opacity={.022} roughness={.1} metalness={.04} transmission={.82} thickness={.012} depthWrite={false}/></mesh><group ref={shards}>{shardGeometry.map((geometry,i)=><mesh key={i} geometry={geometry}><meshPhysicalMaterial color={i%3===0?"#dce7eb":"#93a4ad"} transparent opacity={i%2?.026:.016} roughness={.16} transmission={.88} thickness={.008} side={THREE.DoubleSide} depthWrite={false}/></mesh>)}</group>{cracks.map((crack,i)=>{const l=lineTransform(crack.from,crack.to,.035+crack.depth*.002);return <mesh key={i} position={l.position} rotation={l.rotation}><planeGeometry args={[l.length,crack.depth===0?.009:.0045]}/><meshBasicMaterial color="#e5edf0" transparent opacity={crack.depth===0?.48:.29} toneMapped side={THREE.DoubleSide} depthWrite={false}/></mesh>})}<mesh position={[origin[0],origin[1],.06]}><ringGeometry args={[.025,.058,18]}/><meshBasicMaterial color="#eaf2f3" transparent opacity={.36} toneMapped depthWrite={false}/></mesh></group>
    <group ref={rain} position={[0,0,1.7]}>{[...Array(34)].map((_,i)=><mesh key={i} position={[-4.2+(i*2.41)%8.4,-3.1+(i*1.63)%6.2,.08+(i%3)*.01]} rotation={[0,0,-.08]}><capsuleGeometry args={[.008+(i%3)*.004,.08+(i%5)*.025,3,8]}/><meshBasicMaterial color="#dce7eb" transparent opacity={.16+(i%4)*.04}/></mesh>)}</group>
    <EffectComposer multisampling={0}><Bloom mipmapBlur intensity={.2} luminanceThreshold={.88} luminanceSmoothing={.2}/><Noise opacity={.018}/><Vignette eskil={false} offset={.12} darkness={.36}/></EffectComposer></>;
}

export function ClarityScene({progress}:{progress:MutableRefObject<number>}){const[ready,setReady]=useState(false),[failed,setFailed]=useState(false);const onFailure=useCallback(()=>setFailed(true),[]),onReady=useCallback(()=>setReady(true),[]);if(failed)return null;return <Canvas camera={{position:[-.42,.06,7.7],fov:41,near:.1,far:40}} dpr={[1,1.45]} frameloop="always" gl={{antialias:true,alpha:true,powerPreference:"high-performance",toneMapping:THREE.ACESFilmicToneMapping}} style={{opacity:ready?1:0,transition:"opacity 500ms ease"}}><Suspense fallback={null}><AccidentAftermath progress={progress} onReady={onReady} onFailure={onFailure}/></Suspense></Canvas>}
