import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const DESKTOP_START=45/60;
const MOBILE_START=30/60;

export default function PomegranateSequence(){
  const sectionRef=useRef(null);
  const videoRef=useRef(null);
  const reduced=useReducedMotion();

  useEffect(()=>{
    if(reduced)return;
    const section=sectionRef.current;
    const video=videoRef.current;
    if(!section||!video)return;

    const mobile=matchMedia('(max-width:700px)').matches;
    const startTime=mobile?MOBILE_START:DESKTOP_START;
    const src=mobile?'/video/pomegranate-mobile.mp4':'/video/pomegranate-desktop.mp4';
    let raf=0;
    let target=startTime;
    let duration=3;
    let ready=false;
    let lastSeek=0;
    let dead=false;

    if(video.getAttribute('src')!==src){
      video.src=src;
      video.load();
    }

    const markReady=()=>{
      if(dead)return;
      ready=true;
      section.classList.add('is-ready');
    };

    const onMeta=()=>{
      duration=Number.isFinite(video.duration)&&video.duration>0?video.duration:3;
      target=Math.min(startTime,Math.max(0,duration-.05));
      try{ video.currentTime=target; }catch{}
      // The poster already contains this moment, so reveal video after the first seek.
      if(Math.abs(video.currentTime-target)<.08)markReady();
    };

    const onSeeked=()=>{ if(!ready)markReady(); };

    const updateTarget=()=>{
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-innerHeight);
      const progress=clamp(-rect.top/travel,0,1);
      target=startTime+progress*Math.max(.01,duration-startTime-.015);
      section.style.setProperty('--seed-progress',String(progress));
      if(!raf)raf=requestAnimationFrame(commitSeek);
    };

    const commitSeek=(now)=>{
      raf=0;
      if(dead||video.readyState<2)return;
      // Coalesce scroll events and cap seek pressure. Hardware-decoded H.264 handles
      // this far more smoothly than decoding/resizing hundreds of 4K bitmaps.
      if(now-lastSeek<24){
        raf=requestAnimationFrame(commitSeek);
        return;
      }
      lastSeek=now;
      if(Math.abs(video.currentTime-target)>.018){
        try{ video.currentTime=target; }catch{}
      }
    };

    video.addEventListener('loadedmetadata',onMeta);
    video.addEventListener('seeked',onSeeked);
    addEventListener('scroll',updateTarget,{passive:true});
    addEventListener('resize',updateTarget,{passive:true});
    updateTarget();

    return()=>{
      dead=true;
      if(raf)cancelAnimationFrame(raf);
      video.removeEventListener('loadedmetadata',onMeta);
      video.removeEventListener('seeked',onSeeked);
      removeEventListener('scroll',updateTarget);
      removeEventListener('resize',updateTarget);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  },[reduced]);

  if(reduced)return <section className="sequence reduced"><div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div></section>;

  return <section ref={sectionRef} className="sequence sequence-scroll sequence-video" aria-label="Scroll-controlled pomegranate seed animation">
    <div className="sequence-sticky">
      <picture className="sequence-poster" aria-hidden="true">
        <source media="(max-width:700px)" srcSet="/posters/pomegranate-mobile.webp"/>
        <img src="/posters/pomegranate-desktop.webp" alt="" fetchPriority="high"/>
      </picture>
      <video
        ref={videoRef}
        className="sequence-scrub-video"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex="-1"
      />
      <div className="sequence-copy"><span>LG Growth Studio</span><strong>Make them notice.</strong><small>Scroll to begin</small></div>
    </div>
  </section>;
}
