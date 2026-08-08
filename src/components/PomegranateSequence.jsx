import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const FRAME_COUNT=120;
const START_FRAME=18;
const CACHE_LIMIT=28;

export default function PomegranateSequence(){
  const sectionRef=useRef(null);const canvasRef=useRef(null);const cacheRef=useRef(new Map());const loadingRef=useRef(new Set());const targetRef=useRef(START_FRAME);const currentRef=useRef(START_FRAME);const rafRef=useRef(0);const [ready,setReady]=useState(false);const [loaded,setLoaded]=useState(0);const reduced=useReducedMotion();

  useEffect(()=>()=>{cacheRef.current.forEach(frame=>frame?.close?.());cacheRef.current.clear()},[]);

  useEffect(()=>{
    if(reduced||!canvasRef.current)return;
    const mobile=matchMedia('(max-width:700px)').matches;const folder=mobile?'mobile':'desktop';
    const canvas=canvasRef.current;const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});let cssW=1,cssH=1,dpr=1,last=-1,dead=false;

    const evict=(focus)=>{
      const cache=cacheRef.current;if(cache.size<=CACHE_LIMIT)return;
      const keys=[...cache.keys()].sort((a,b)=>Math.abs(b-focus)-Math.abs(a-focus));
      while(cache.size>CACHE_LIMIT&&keys.length){const key=keys.shift();if(Math.abs(key-focus)<8)continue;cache.get(key)?.close?.();cache.delete(key)}
    };
    const loadFrame=index=>{
      index=Math.max(0,Math.min(FRAME_COUNT-1,index));
      if(cacheRef.current.has(index)||loadingRef.current.has(index))return;
      loadingRef.current.add(index);const img=new Image();img.decoding='async';
      img.onload=async()=>{if(dead)return;let frame=img;try{frame=await createImageBitmap(img)}catch{}cacheRef.current.set(index,frame);loadingRef.current.delete(index);setLoaded(v=>Math.min(FRAME_COUNT,v+1));if(index===START_FRAME)setReady(true);evict(Math.round(targetRef.current));draw(currentRef.current)};
      img.onerror=()=>loadingRef.current.delete(index);
      img.src=`/sequence/${folder}/frame-${String(index).padStart(3,'0')}.webp`;
    };
    const requestWindow=exact=>{const focus=Math.round(exact);loadFrame(focus);for(let d=1;d<=8;d++){loadFrame(focus+d);loadFrame(focus-d)}};
    const nearest=i=>{const cache=cacheRef.current;if(cache.has(i))return cache.get(i);for(let d=1;d<FRAME_COUNT;d++){if(cache.has(i-d))return cache.get(i-d);if(cache.has(i+d))return cache.get(i+d)}return null};
    const fit=(img,alpha=1)=>{if(!img)return;const iw=img.width||img.naturalWidth,ih=img.height||img.naturalHeight;const scale=Math.max(cssW/iw,cssH/ih);const dw=iw*scale,dh=ih*scale;ctx.globalAlpha=alpha;ctx.drawImage(img,(cssW-dw)/2,(cssH-dh)/2,dw,dh)};
    function draw(exact){if(!ready&& !cacheRef.current.has(START_FRAME))return;if(Math.abs(exact-last)<.018)return;const lo=Math.floor(exact),hi=Math.min(FRAME_COUNT-1,lo+1),mix=exact-lo;ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.fillRect(0,0,cssW,cssH);const a=nearest(lo),b=nearest(hi);fit(a,1);if(b&&b!==a&&mix>.03)fit(b,mix);ctx.globalAlpha=1;last=exact}
    const resize=()=>{const r=canvas.getBoundingClientRect();cssW=Math.max(1,r.width);cssH=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);last=-1;draw(currentRef.current)};
    const updateTarget=()=>{const s=sectionRef.current;if(!s)return;const rect=s.getBoundingClientRect();const travel=Math.max(1,s.offsetHeight-innerHeight);const progress=clamp(-rect.top/travel,0,1);targetRef.current=START_FRAME+progress*((FRAME_COUNT-1)-START_FRAME);s.style.setProperty('--seed-progress',String(progress));requestWindow(targetRef.current);startAnimation()};
    const tick=()=>{const diff=targetRef.current-currentRef.current;currentRef.current+=diff*.16;if(Math.abs(diff)<.01)currentRef.current=targetRef.current;draw(currentRef.current);requestWindow(currentRef.current);if(Math.abs(targetRef.current-currentRef.current)>.012)rafRef.current=requestAnimationFrame(tick);else rafRef.current=0};
    const startAnimation=()=>{if(!rafRef.current)rafRef.current=requestAnimationFrame(tick)};

    loadFrame(START_FRAME);[START_FRAME,30,45,60,75,90,105,119].forEach(loadFrame);requestWindow(START_FRAME);resize();updateTarget();addEventListener('resize',resize,{passive:true});addEventListener('scroll',updateTarget,{passive:true});
    return()=>{dead=true;cancelAnimationFrame(rafRef.current);removeEventListener('resize',resize);removeEventListener('scroll',updateTarget);cacheRef.current.forEach(frame=>frame?.close?.());cacheRef.current.clear();loadingRef.current.clear()};
  },[reduced]);

  if(reduced)return <section className="sequence reduced"><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div></section>;
  return <section ref={sectionRef} className={`sequence sequence-scroll sequence-hq ${ready?'is-ready':''}`} aria-label="Scroll-controlled pomegranate seed animation"><div className="sequence-sticky"><canvas ref={canvasRef} aria-hidden="true"/><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div>{!ready&&<div className="sequence-loading">Preparing experience</div>}</div><div className="load-meter" style={{'--p':`${Math.min(100,(loaded/FRAME_COUNT)*100)}%`}}/></section>;
}
