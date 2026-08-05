import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));

export default function PomegranateSequence(){
  const sectionRef=useRef(null);
  const canvasRef=useRef(null);
  const framesRef=useRef([]);
  const progressRef=useRef(0);
  const rafRef=useRef(0);
  const resizeRef=useRef(null);
  const [ready,setReady]=useState(false);
  const [loaded,setLoaded]=useState(0);
  const reduced=useReducedMotion();

  useEffect(()=>{
    if(reduced) return;
    const mobile=window.matchMedia('(max-width: 700px)').matches;
    const folder=mobile?'mobile':'desktop';
    const count=180;
    const frames=new Array(count);
    framesRef.current=frames;
    let cancelled=false;

    const priority=Array.from(new Set([
      ...Array.from({length:26},(_,i)=>i),
      32,40,48,56,64,72,80,88,96,104,112,120,132,144,count-1
    ].filter(i=>i<count)));
    const remaining=Array.from({length:count},(_,i)=>i).filter(i=>!priority.includes(i));
    const order=[...priority,...remaining];

    const loadFrame=index=>new Promise(resolve=>{
      const img=new Image();
      img.decoding='async';
      img.onload=async()=>{
        if(cancelled){resolve();return;}
        try{frames[index]=await createImageBitmap(img);}catch{frames[index]=img;}
        setLoaded(v=>v+1);
        resolve();
      };
      img.onerror=resolve;
      img.src=`/sequence/${folder}/frame-${String(index).padStart(3,'0')}.webp`;
    });

    (async()=>{
      for(let i=0;i<order.length;i+=10){
        await Promise.all(order.slice(i,i+10).map(loadFrame));
        if(cancelled) return;
        if(i>=20) setReady(true);
        await new Promise(r=>setTimeout(r,0));
      }
      if(!cancelled) setReady(true);
    })();

    return()=>{
      cancelled=true;
      frames.forEach(frame=>frame?.close?.());
    };
  },[reduced]);

  useEffect(()=>{
    if(reduced||!sectionRef.current||!canvasRef.current) return;
    const mobile=window.matchMedia('(max-width: 700px)').matches;
    const count=180;
    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});
    let cssW=1,cssH=1,dpr=1,lastDraw=-1;

    const nearest=(index,direction=0)=>{
      const frames=framesRef.current;
      if(frames[index]) return frames[index];
      for(let d=1;d<count;d++){
        const a=direction>=0?index+d:index-d;
        const b=direction>=0?index-d:index+d;
        if(a>=0&&a<count&&frames[a]) return frames[a];
        if(b>=0&&b<count&&frames[b]) return frames[b];
      }
      return null;
    };

    const fit=(img,alpha=1)=>{
      if(!img) return;
      const iw=img.width||img.naturalWidth, ih=img.height||img.naturalHeight;
      const scale=Math.max(cssW/iw,cssH/ih);
      const dw=iw*scale,dh=ih*scale;
      ctx.globalAlpha=alpha;
      ctx.drawImage(img,(cssW-dw)/2,(cssH-dh)/2,dw,dh);
    };

    const draw=progress=>{
      const exact=clamp(progress,0,count-1);
      if(Math.abs(exact-lastDraw)<0.02) return;
      const lo=Math.floor(exact), hi=Math.min(count-1,lo+1), mix=exact-lo;
      const first=nearest(lo,1), second=nearest(hi,-1);
      ctx.globalAlpha=1;
      ctx.fillStyle='#fff';
      ctx.fillRect(0,0,cssW,cssH);
      fit(first,1);
      if(second&&second!==first&&mix>.02) fit(second,mix);
      ctx.globalAlpha=1;
      lastDraw=exact;
    };

    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      cssW=Math.max(1,rect.width); cssH=Math.max(1,rect.height);
      dpr=Math.min(window.devicePixelRatio||1,2.5);
      canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      lastDraw=-1;
      draw(progressRef.current);
    };
    resizeRef.current=resize;
    resize();
    window.addEventListener('resize',resize,{passive:true});

    const render=()=>{
      draw(progressRef.current);
      rafRef.current=requestAnimationFrame(render);
    };
    rafRef.current=requestAnimationFrame(render);

    const trigger=ScrollTrigger.create({
      trigger:sectionRef.current,
      start:'top top',
      end:'bottom bottom',
      scrub:0.08,
      onUpdate:self=>{progressRef.current=self.progress*(count-1);}
    });

    return()=>{
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',resize);
      trigger.kill();
    };
  },[reduced]);

  if(reduced) return <section className="sequence reduced"><img src="/sequence/desktop/frame-110.webp" alt="Pomegranate seeds falling on a white background"/></section>;
  const total=typeof window!=='undefined'&&window.matchMedia('(max-width:700px)').matches?180:180;

  return <section ref={sectionRef} className={`sequence ${ready?'is-ready':''}`} aria-label="Pomegranate seed scroll animation">
    <div className="sequence-sticky">
      <canvas ref={canvasRef} aria-hidden="true"/>
      <div className="sequence-copy">
        <span>Scroll to begin</span>
        <strong>Make them notice.</strong>
      </div>
      {!ready&&<div className="sequence-loading">Preparing experience <b>{Math.min(100,Math.round((loaded/Math.min(total,38))*100))}%</b></div>}
    </div>
    <div className="load-meter" style={{'--p':`${Math.min(100,(loaded/total)*100)}%`}}/>
  </section>;
}
