import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const DESKTOP_FRAME_COUNT=180;
const MOBILE_FRAME_COUNT=120;
const DESKTOP_START_FRAME=45;
const MOBILE_START_FRAME=30;

export default function PomegranateSequence(){
  const sectionRef=useRef(null);
  const canvasRef=useRef(null);
  const cacheRef=useRef(new Map());
  const loadingRef=useRef(new Set());
  const targetRef=useRef(0);
  const currentRef=useRef(0);
  const rafRef=useRef(0);
  const [ready,setReady]=useState(false);
  const [loaded,setLoaded]=useState(0);
  const reduced=useReducedMotion();

  useEffect(()=>()=>{
    cacheRef.current.forEach(frame=>frame?.close?.());
    cacheRef.current.clear();
  },[]);

  useEffect(()=>{
    if(reduced||!canvasRef.current)return;

    const mobile=matchMedia('(max-width:700px)').matches;
    const folder=mobile?'mobile':'desktop';
    const frameCount=mobile?MOBILE_FRAME_COUNT:DESKTOP_FRAME_COUNT;
    const startFrame=mobile?MOBILE_START_FRAME:DESKTOP_START_FRAME;
    const cacheLimit=mobile?20:14;
    const windowRadius=mobile?6:4;

    targetRef.current=startFrame;
    currentRef.current=startFrame;

    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});
    let cssW=1,cssH=1,dpr=1,last=-1,dead=false;

    const evict=(focus)=>{
      const cache=cacheRef.current;
      if(cache.size<=cacheLimit)return;
      const keys=[...cache.keys()].sort((a,b)=>Math.abs(b-focus)-Math.abs(a-focus));
      while(cache.size>cacheLimit&&keys.length){
        const key=keys.shift();
        if(Math.abs(key-focus)<windowRadius+2)continue;
        cache.get(key)?.close?.();
        cache.delete(key);
      }
    };

    const loadFrame=index=>{
      index=Math.max(0,Math.min(frameCount-1,index));
      if(cacheRef.current.has(index)||loadingRef.current.has(index))return;
      loadingRef.current.add(index);
      const img=new Image();
      img.decoding='async';
      img.onload=async()=>{
        if(dead)return;
        let frame=img;
        try{
          const iw=img.naturalWidth||img.width;
          const ih=img.naturalHeight||img.height;
          const targetW=Math.min(iw,Math.max(1,Math.round(cssW*dpr)));
          const targetH=Math.max(1,Math.round(targetW*(ih/iw)));
          frame=await createImageBitmap(img,{resizeWidth:targetW,resizeHeight:targetH,resizeQuality:'high'});
        }catch{}
        cacheRef.current.set(index,frame);
        loadingRef.current.delete(index);
        setLoaded(v=>Math.min(frameCount,v+1));
        if(index===startFrame||!ready)setReady(true);
        evict(Math.round(targetRef.current));
        draw(currentRef.current);
      };
      img.onerror=()=>loadingRef.current.delete(index);
      img.src=`/sequence/${folder}/frame-${String(index).padStart(3,'0')}.webp`;
    };

    const requestWindow=exact=>{
      const focus=Math.round(exact);
      loadFrame(focus);
      for(let d=1;d<=windowRadius;d++){
        loadFrame(focus+d);
        loadFrame(focus-d);
      }
    };

    const nearest=i=>{
      const cache=cacheRef.current;
      if(cache.has(i))return cache.get(i);
      for(let d=1;d<frameCount;d++){
        if(cache.has(i-d))return cache.get(i-d);
        if(cache.has(i+d))return cache.get(i+d);
      }
      return null;
    };

    const fit=(img,alpha=1)=>{
      if(!img)return;
      const iw=img.width||img.naturalWidth,ih=img.height||img.naturalHeight;
      const scale=Math.max(cssW/iw,cssH/ih);
      const dw=iw*scale,dh=ih*scale;
      ctx.globalAlpha=alpha;
      ctx.drawImage(img,(cssW-dw)/2,(cssH-dh)/2,dw,dh);
    };

    function draw(exact){
      if(!cacheRef.current.size)return;
      if(Math.abs(exact-last)<.015)return;
      const lo=Math.floor(exact),hi=Math.min(frameCount-1,lo+1),mix=exact-lo;
      ctx.globalAlpha=1;
      ctx.fillStyle='#fff';
      ctx.fillRect(0,0,cssW,cssH);
      const a=nearest(lo),b=nearest(hi);
      fit(a,1);
      if(b&&b!==a&&mix>.025)fit(b,mix);
      ctx.globalAlpha=1;
      last=exact;
    }

    const resize=()=>{
      const r=canvas.getBoundingClientRect();
      cssW=Math.max(1,r.width);
      cssH=Math.max(1,r.height);
      // 4K desktop source gives us more real detail; 1.5 DPR keeps memory sane.
      dpr=Math.min(devicePixelRatio||1,mobile?1.5:1.65);
      canvas.width=Math.round(cssW*dpr);
      canvas.height=Math.round(cssH*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      last=-1;
      draw(currentRef.current);
    };

    const updateTarget=()=>{
      const s=sectionRef.current;if(!s)return;
      const rect=s.getBoundingClientRect();
      const travel=Math.max(1,s.offsetHeight-innerHeight);
      const progress=clamp(-rect.top/travel,0,1);
      targetRef.current=startFrame+progress*((frameCount-1)-startFrame);
      s.style.setProperty('--seed-progress',String(progress));
      requestWindow(targetRef.current);
      startAnimation();
    };

    const tick=()=>{
      const diff=targetRef.current-currentRef.current;
      currentRef.current+=diff*.15;
      if(Math.abs(diff)<.01)currentRef.current=targetRef.current;
      draw(currentRef.current);
      requestWindow(currentRef.current);
      if(Math.abs(targetRef.current-currentRef.current)>.012)rafRef.current=requestAnimationFrame(tick);
      else rafRef.current=0;
    };
    const startAnimation=()=>{if(!rafRef.current)rafRef.current=requestAnimationFrame(tick)};

    resize();
    loadFrame(startFrame);
    requestWindow(startFrame);
    [startFrame,Math.round(frameCount*.4),Math.round(frameCount*.58),Math.round(frameCount*.76),frameCount-1].forEach(loadFrame);
    updateTarget();
    addEventListener('resize',resize,{passive:true});
    addEventListener('scroll',updateTarget,{passive:true});
    return()=>{
      dead=true;
      cancelAnimationFrame(rafRef.current);
      removeEventListener('resize',resize);
      removeEventListener('scroll',updateTarget);
      cacheRef.current.forEach(frame=>frame?.close?.());
      cacheRef.current.clear();
      loadingRef.current.clear();
    };
  },[reduced]);

  if(reduced)return <section className="sequence reduced"><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div></section>;

  return <section ref={sectionRef} className={`sequence sequence-scroll sequence-hq ${ready?'is-ready':''}`} aria-label="Scroll-controlled pomegranate seed animation">
    <div className="sequence-sticky">
      <picture className="sequence-poster" aria-hidden="true">
        <source media="(max-width:700px)" srcSet="/sequence/mobile/frame-030.webp"/>
        <img src="/sequence/desktop/frame-045.webp" alt=""/>
      </picture>
      <canvas ref={canvasRef} aria-hidden="true"/>
      <div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div>
      {!ready&&<div className="sequence-loading">Preparing experience</div>}
    </div>
    <div className="load-meter" style={{'--p':`${Math.min(100,(loaded/(matchMedia('(max-width:700px)').matches?MOBILE_FRAME_COUNT:DESKTOP_FRAME_COUNT))*100)}%`}}/>
  </section>;
}
