import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function PomegranateSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const sequence = mobile ? 'mobile' : 'desktop';
    const frameCount = mobile ? 150 : 180;
    let cancelled = false;
    imagesRef.current = new Array(frameCount);

    const priority = Array.from(new Set([0,1,2,3,4,5,8,12,18,24,32,40,50,60,72,84,96,108,120,132,frameCount-1].filter(i=>i<frameCount)));
    const remaining = Array.from({length:frameCount},(_,i)=>i).filter(i=>!priority.includes(i));
    const order = [...priority, ...remaining];

    const load = index => new Promise(resolve => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if(!cancelled){ imagesRef.current[index]=img; setLoaded(v=>v+1); } resolve(); };
      img.onerror = resolve;
      img.src = `/sequence/${sequence}/frame-${String(index).padStart(3,'0')}.webp`;
    });

    (async()=>{
      for(let i=0;i<order.length;i+=16){
        await Promise.all(order.slice(i,i+16).map(load));
        await new Promise(r=>setTimeout(r,8));
      }
    })();
    return()=>{cancelled=true};
  },[reducedMotion]);

  useEffect(()=>{
    if(reducedMotion || !sectionRef.current || !canvasRef.current) return;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const frameCount = mobile ? 150 : 180;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d',{alpha:false,desynchronized:true});
    let w=0,h=0,raf=0,current=0,target=0,last=-1;

    const nearest = i => {
      if(imagesRef.current[i]) return imagesRef.current[i];
      for(let d=1;d<frameCount;d++){
        if(i-d>=0 && imagesRef.current[i-d]) return imagesRef.current[i-d];
        if(i+d<frameCount && imagesRef.current[i+d]) return imagesRef.current[i+d];
      }
      return null;
    };
    const draw = frame => {
      const img=nearest(Math.round(frame)); if(!img||!w||!h)return;
      ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);
      const scale=Math.max(w/img.width,h/img.height);
      const dw=img.width*scale,dh=img.height*scale;
      ctx.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);last=Math.round(frame);
    };
    const resize=()=>{
      const rect=canvas.getBoundingClientRect(); const dpr=Math.min(devicePixelRatio||1,2);
      w=rect.width;h=rect.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);draw(current);
    };
    const tick=()=>{
      current += (target-current)*0.34;
      if(Math.abs(target-current)<.01) current=target;
      if(Math.round(current)!==last) draw(current);
      raf=requestAnimationFrame(tick);
    };
    resize();window.addEventListener('resize',resize,{passive:true});
    const trigger=ScrollTrigger.create({
      trigger:sectionRef.current,start:'top top',end:'bottom bottom',scrub:true,
      onUpdate:self=>{ target=self.progress*(frameCount-1); }
    });
    raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);trigger.kill()};
  },[loaded,reducedMotion]);

  if(reducedMotion) return <section className="sequence reduced"><img src="/sequence/desktop/frame-110.webp" alt="Ruby-red pomegranate seeds falling on white"/></section>;
  const total = typeof window!=='undefined' && window.matchMedia('(max-width:700px)').matches ? 150 : 180;
  return <section ref={sectionRef} className="sequence">
    <div className="sequence-sticky"><canvas ref={canvasRef} aria-hidden="true"/>
      <div className="sequence-copy"><span>Scroll to begin</span><strong>Make them notice.</strong></div>
    </div>
    <div className="load-meter" style={{'--p':`${Math.min(100,(loaded/total)*100)}%`}}/>
  </section>;
}
