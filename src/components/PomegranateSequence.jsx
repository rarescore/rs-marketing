import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const SPRITE_COUNT = 12;
const clamp = (n,min,max)=>Math.min(max,Math.max(min,n));

function rngFactory(seed=123456789){
  let t=seed>>>0;
  return ()=>{
    t += 0x6D2B79F5;
    let r=t;
    r=Math.imul(r^(r>>>15),r|1);
    r^=r+Math.imul(r^(r>>>7),r|61);
    return ((r^(r>>>14))>>>0)/4294967296;
  };
}

function buildParticles(mobile=false){
  const rand=rngFactory(mobile?41091:81173);
  const count=mobile?68:104;
  const particles=[];
  for(let i=0;i<count;i++){
    const initial=i<(mobile?18:28);
    let x=.03+rand()*.94;
    // Preserve a calm reading area around the hero copy without making the fall look staged.
    if(x>.12&&x<.59&&rand()<.72)x=.62+rand()*.34;
    const depth=rand();
    const near=depth>.84;
    particles.push({
      sprite:Math.floor(rand()*SPRITE_COUNT),
      x,
      start:initial?(-.52+rand()*.37):(.01+rand()*.91),
      y0:-.20+rand()*.18,
      speed:.62+rand()*.42,
      drift:(.014+rand()*.048)*(rand()<.5?-1:1),
      wave:.8+rand()*2.1,
      phase:rand()*Math.PI*2,
      rotation:(rand()-.5)*Math.PI*2,
      spin:(rand()-.5)*(near?8.5:5.5),
      depth,
      baseSize:(mobile?34:38)*(0.62+depth*1.45)*(near?1.18:1),
      alpha:.70+depth*.30,
    });
  }
  // A few large foreground passes create depth, but keep them out of the text zone.
  const foreground=mobile?3:5;
  for(let i=0;i<foreground;i++){
    const right=i%2===0;
    particles.push({
      sprite:Math.floor(rand()*SPRITE_COUNT),
      x:right ? .79+rand()*.18 : .01+rand()*.08,
      start:.12+i*.17+rand()*.05,
      y0:-.30-rand()*.08,
      speed:1.05+rand()*.25,
      drift:(.015+rand()*.02)*(right?-1:1),
      wave:1+rand(),phase:rand()*6.28,
      rotation:(rand()-.5)*6.28,spin:(rand()-.5)*7,
      depth:1,
      baseSize:(mobile?88:115)*(1+rand()*.26),
      alpha:.94,
    });
  }
  return particles.sort((a,b)=>a.depth-b.depth);
}

export default function PomegranateSequence(){
  const sectionRef=useRef(null);
  const canvasRef=useRef(null);
  const [ready,setReady]=useState(false);
  const reduced=useReducedMotion();
  const desktopParticles=useMemo(()=>buildParticles(false),[]);
  const mobileParticles=useMemo(()=>buildParticles(true),[]);

  useEffect(()=>{
    if(reduced||!sectionRef.current||!canvasRef.current)return;
    const section=sectionRef.current;
    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});
    const mobile=matchMedia('(max-width:700px)').matches;
    const particles=mobile?mobileParticles:desktopParticles;
    let cssW=1,cssH=1,dpr=1,dead=false;
    let sprites=[];
    const playhead={progress:0};

    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      cssW=Math.max(1,rect.width);cssH=Math.max(1,rect.height);
      // The animation is sprite-based, so 1.25–1.4 DPR is crisp without wasting fill-rate.
      dpr=Math.min(window.devicePixelRatio||1,mobile?1.15:1.35);
      canvas.width=Math.round(cssW*dpr);
      canvas.height=Math.round(cssH*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      render(playhead.progress);
    };

    const render=(progress)=>{
      if(dead||!sprites.length)return;
      const p=clamp(progress,0,1);
      ctx.globalAlpha=1;
      ctx.fillStyle='#fff';
      ctx.fillRect(0,0,cssW,cssH);

      // Draw far particles first so the larger foreground arils naturally layer over them.
      for(const item of particles){
        const local=p-item.start;
        if(local<0)continue;
        const y=item.y0+local*1.16*item.speed;
        if(y<-.28||y>1.26)continue;
        const x=item.x+Math.sin(local*item.wave*Math.PI*2+item.phase)*item.drift;
        const perspective=.82+item.depth*.34;
        const size=item.baseSize*perspective*(1+Math.sin(local*Math.PI)*.035);
        const rotation=item.rotation+local*item.spin;
        const img=sprites[item.sprite];
        if(!img)continue;
        ctx.save();
        ctx.translate(x*cssW,y*cssH);
        ctx.rotate(rotation);
        ctx.globalAlpha=item.alpha;
        ctx.drawImage(img,-size/2,-size/2,size,size);
        ctx.restore();
      }
      ctx.globalAlpha=1;
      section.style.setProperty('--seed-progress',String(p));
    };


    const loadSprites=async()=>{
      const loaded=await Promise.all(Array.from({length:SPRITE_COUNT},(_,i)=>new Promise(resolve=>{
        const img=new Image();
        img.decoding='async';
        img.onload=()=>resolve(img);
        img.onerror=()=>resolve(null);
        img.src=`/seed-sprites/seed-${String(i).padStart(2,'0')}.png`;
      })));
      if(dead)return;
      sprites=loaded;
      resize();
      setReady(true);
    };

    resize();
    loadSprites();

    // GSAP's documented image-sequence pattern is a scroll-linked playhead. Here the
    // playhead drives a lightweight real-time seed field instead of decoding 80–180
    // full-screen bitmaps. That keeps scroll synchronized while eliminating decode jank.
    const tween=gsap.to(playhead,{
      progress:1,
      ease:'none',
      scrollTrigger:{
        trigger:section,
        start:'top top',
        end:'bottom bottom',
        scrub:.28,
        invalidateOnRefresh:true,
      },
      onUpdate:()=>render(playhead.progress),
    });

    addEventListener('resize',resize,{passive:true});
    return()=>{
      dead=true;
      removeEventListener('resize',resize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  },[reduced,desktopParticles,mobileParticles]);

  if(reduced)return <section className="sequence reduced"><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div></section>;

  return <section ref={sectionRef} className={`sequence sequence-scroll sequence-particles ${ready?'is-ready':''}`} aria-label="Scroll-controlled pomegranate seed animation">
    <div className="sequence-sticky">
      <picture className="sequence-poster" aria-hidden="true">
        <source media="(max-width:700px)" srcSet="/posters/pomegranate-mobile.webp"/>
        <img src="/posters/pomegranate-desktop.webp" alt="" fetchPriority="high"/>
      </picture>
      <canvas ref={canvasRef} aria-hidden="true"/>
      <div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div>
    </div>
  </section>;
}
