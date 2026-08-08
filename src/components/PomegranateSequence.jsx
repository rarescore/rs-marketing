import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const DESKTOP_FRAMES=85;
const MOBILE_FRAMES=78;
const DESKTOP_START=20;
const MOBILE_START=18;

export default function PomegranateSequence(){
  const sectionRef=useRef(null);const canvasRef=useRef(null);const framesRef=useRef([]);const targetRef=useRef(0);const currentRef=useRef(0);const rafRef=useRef(0);const [ready,setReady]=useState(false);const [loaded,setLoaded]=useState(0);const reduced=useReducedMotion();

  useEffect(()=>{
    if(reduced)return;
    const mobile=matchMedia('(max-width:700px)').matches;const folder=mobile?'mobile':'desktop';const count=mobile?MOBILE_FRAMES:DESKTOP_FRAMES;const start=mobile?MOBILE_START:DESKTOP_START;const frames=new Array(count);framesRef.current=frames;let dead=false;
    const load=(i)=>new Promise(resolve=>{const img=new Image();img.decoding='async';img.onload=async()=>{if(dead)return resolve();try{frames[i]=await createImageBitmap(img)}catch{frames[i]=img}setLoaded(v=>v+1);resolve()};img.onerror=resolve;img.src=`/sequence/${folder}/frame-${String(i).padStart(3,'0')}.webp`});
    (async()=>{
      // Frame 0 appears as quickly as possible, then the rest streams in by priority.
      await load(start);if(dead)return;setReady(true);
      const priority=[start+1,start+2,start+3,start+4,start+5,start+6,start+8,start+10,start+12,start+15,start+18,start+22,start+26,start+30,start+36,start+42,start+50,start+58];
      await Promise.all(priority.filter(i=>i<count).map(load));
      for(let i=1;i<count;i+=10){const batch=[];for(let j=i;j<Math.min(count,i+10);j++)if(!frames[j])batch.push(load(j));await Promise.all(batch);if(dead)return}
    })();
    return()=>{dead=true;frames.forEach(f=>f?.close?.())};
  },[reduced]);

  useEffect(()=>{
    if(reduced||!ready||!canvasRef.current)return;
    const mobile=matchMedia('(max-width:700px)').matches;const count=mobile?MOBILE_FRAMES:DESKTOP_FRAMES;const start=mobile?MOBILE_START:DESKTOP_START;const canvas=canvasRef.current;const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});let cssW=1,cssH=1,last=-1;
    const fit=(img,alpha=1)=>{if(!img)return;const iw=img.width||img.naturalWidth,ih=img.height||img.naturalHeight;const scale=Math.max(cssW/iw,cssH/ih);const dw=iw*scale,dh=ih*scale;ctx.globalAlpha=alpha;ctx.drawImage(img,(cssW-dw)/2,(cssH-dh)/2,dw,dh)};
    const nearest=i=>{if(framesRef.current[i])return framesRef.current[i];for(let d=1;d<count;d++){if(framesRef.current[i-d])return framesRef.current[i-d];if(framesRef.current[i+d])return framesRef.current[i+d]}return null};
    const draw=exact=>{if(Math.abs(exact-last)<.015)return;const lo=Math.floor(exact),hi=Math.min(count-1,lo+1),mix=exact-lo;ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.fillRect(0,0,cssW,cssH);const a=nearest(lo),b=nearest(hi);fit(a,1);if(b&&b!==a&&mix>.02)fit(b,mix);ctx.globalAlpha=1;last=exact};
    const resize=()=>{const r=canvas.getBoundingClientRect();cssW=Math.max(1,r.width);cssH=Math.max(1,r.height);const dpr=Math.min(devicePixelRatio||1,2.25);canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);currentRef.current=start;targetRef.current=start;last=-1;draw(start)};
    const updateTarget=()=>{const s=sectionRef.current;if(!s)return;const rect=s.getBoundingClientRect();const travel=Math.max(1,s.offsetHeight-innerHeight);const progress=clamp(-rect.top/travel,0,1);targetRef.current=start+progress*((count-1)-start);s.style.setProperty('--seed-progress',String(progress))};
    const tick=()=>{currentRef.current+=(targetRef.current-currentRef.current)*.19;if(Math.abs(targetRef.current-currentRef.current)<.008)currentRef.current=targetRef.current;draw(currentRef.current);rafRef.current=requestAnimationFrame(tick)};
    resize();updateTarget();addEventListener('resize',resize,{passive:true});addEventListener('scroll',updateTarget,{passive:true});rafRef.current=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(rafRef.current);removeEventListener('resize',resize);removeEventListener('scroll',updateTarget)};
  },[ready,reduced]);

  if(reduced)return <section className="sequence reduced"><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div></section>;
  const mobile=typeof window!=='undefined'&&matchMedia('(max-width:700px)').matches;const total=mobile?MOBILE_FRAMES:DESKTOP_FRAMES;
  return <section ref={sectionRef} className={`sequence sequence-scroll ${ready?'is-ready':''}`} aria-label="Scroll-controlled pomegranate seed animation"><div className="sequence-sticky"><canvas ref={canvasRef} aria-hidden="true"/><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div>{!ready&&<div className="sequence-loading">Preparing experience</div>}</div><div className="load-meter" style={{'--p':`${Math.min(100,(loaded/total)*100)}%`}}/></section>;
}
