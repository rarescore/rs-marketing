"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import { demoLawPhoneHref, injuryBase } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const ClarityScene=dynamic(()=>import("./clarity-scene.client").then(module=>module.ClarityScene),{ssr:false});
const question="Are you okay?";
type HeroStep="wellbeing"|"accident"|"date"|"ready";

export function InjuryHero(){
  const root=useRef<HTMLElement>(null),progress=useRef(0);const record=useSystemLens(state=>state.record);const reducedMotion=useReducedMotion();
  const[canUseScene,setCanUseScene]=useState(false),[step,setStep]=useState<HeroStep>("wellbeing"),[wellbeing,setWellbeing]=useState(""),[date,setDate]=useState("");
  useEffect(()=>{record({scope:"injury-law",type:"safety_path_shown",signal:"Visitor entered the injury guidance system",response:"Immediate care and human-help paths surfaced before marketing",value:"A calmer first decision",status:"observed"})},[record]);
  useEffect(()=>{const query=window.matchMedia("(min-width: 768px)");const update=()=>setCanUseScene(query.matches&&Boolean(window.WebGL2RenderingContext));update();query.addEventListener("change",update);return()=>query.removeEventListener("change",update)},[]);
  useGSAP(()=>{
    if(reducedMotion||!root.current){progress.current=1;gsap.set([".il-cinematic__opening",".il-cinematic__question"],{autoAlpha:1});return}
    const timeline=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root.current,start:"top top",end:"bottom bottom",scrub:.65,onUpdate:self=>{progress.current=self.progress},onLeave:()=>{progress.current=1},onEnterBack:()=>{progress.current=.999}}});
    timeline.to(".il-cinematic__opening",{autoAlpha:0,yPercent:-12,duration:.18},.19).fromTo(".il-cinematic__chapter",{autoAlpha:0},{autoAlpha:1,duration:.12},.38).to(".il-cinematic__chapter",{autoAlpha:0,duration:.12},.57).fromTo(".il-cinematic__question",{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.15},.69);
    question.split("").forEach((_,index)=>timeline.fromTo(`.il-cinematic__char:nth-child(${index+1})`,{opacity:0},{opacity:1,duration:.018},.74+index*.013));
    return()=>timeline.scrollTrigger?.kill();
  },{scope:root,dependencies:[reducedMotion]});
  const answerWellbeing=(value:string)=>{setWellbeing(value);setStep("accident")};
  const answerAccident=(value:string)=>setStep(value==="yes"?"date":"ready");
  return <section ref={root} className="il-cinematic" aria-labelledby="injury-hero-title"><div className="il-cinematic__sticky">
    <div className="il-cinematic__visual" aria-hidden="true"><div className="il-cinematic__fallback"/>{canUseScene&&!reducedMotion?<ClarityScene progress={progress}/>:null}</div><div className="il-cinematic__shade" aria-hidden="true"/>
    <div className="il-cinematic__opening"><p className="il-eyebrow">Morrow &amp; Vale · Personal injury guidance</p><h1 id="injury-hero-title">The moment after changes everything.</h1><p>First, make sure you are safe. Then protect the record—without pressure, promises, or guesswork.</p><div className="il-cinematic__opening-actions"><Link className="il-button il-button--paper" href={`${injuryBase}/after-an-accident`}>What to do now</Link><a className="il-button il-button--line" href={demoLawPhoneHref}>Human help</a></div></div>
    <div className="il-cinematic__chapter" aria-hidden="true"><small>01 / Disruption</small><span/><p>Clarity begins by separating what needs attention now from what can wait.</p></div>
    <div className="il-cinematic__question" aria-live="polite"><p className="il-cinematic__privacy">Private orientation · answers remain on this screen until you continue or leave</p>
      {step==="wellbeing"&&<fieldset><legend aria-label={question}>{question.split("").map((char,index)=><span className="il-cinematic__char" aria-hidden="true" key={`${char}-${index}`}>{char===" "?"\u00a0":char}</span>)}</legend><p>Choose the answer that feels closest. No response affects your ability to ask for help.</p><div className="il-cinematic__choices"><button type="button" onClick={()=>answerWellbeing("no")}>No</button><button type="button" onClick={()=>answerWellbeing("yes")}>Yes</button><button type="button" onClick={()=>answerWellbeing("not-sure")}>Not sure</button></div></fieldset>}
      {step==="accident"&&<fieldset><legend>Were you in an accident?</legend><p>{wellbeing==="no"||wellbeing==="not-sure"?"If you may need urgent care, use emergency services or an appropriate medical professional before continuing.":"A broad answer is enough. The complete review does not decide whether you have a case."}</p><div className="il-cinematic__choices"><button type="button" onClick={()=>answerAccident("yes")}>Yes</button><button type="button" onClick={()=>answerAccident("no")}>No</button><button type="button" onClick={()=>answerAccident("not-sure")}>Not sure</button></div></fieldset>}
      {step==="date"&&<fieldset><legend>When did it happen?</legend><p>The date helps a lawyer understand timing. It is not used here to decide eligibility and is not sent or saved.</p><label className="il-cinematic__date"><span>Accident date</span><input type="date" value={date} max={new Date().toISOString().slice(0,10)} onChange={event=>setDate(event.currentTarget.value)}/></label><div className="il-cinematic__choices il-cinematic__choices--continue"><button type="button" disabled={!date} onClick={()=>setStep("ready")}>Continue</button><button type="button" onClick={()=>setStep("ready")}>I’m not sure</button></div></fieldset>}
      {step==="ready"&&<div className="il-cinematic__ready"><p className="il-eyebrow">A careful next step</p><h2>Let’s organize what matters.</h2><p>The private review provides general safety, evidence, and documentation guidance first. Afterward, you may ask a legal professional to contact you. It does not approve a case or create an attorney-client relationship.</p><Link className="il-button il-button--paper" href={`${injuryBase}/case-review`} onClick={()=>record({scope:"injury-law",type:"case_review_started",signal:"Incident review selected after orientation",response:"A private, result-first orientation begins",value:"A useful action plan before contact",status:"observed"})}>Continue to the private review <span aria-hidden="true">→</span></Link><button className="il-cinematic__restart" type="button" onClick={()=>{setStep("wellbeing");setWellbeing("");setDate("")}}>Start over</button></div>}
      <p className="il-cinematic__legal">Demonstration only. General information—not legal or medical advice. Submitting a contact request does not create representation. Production privacy, retention, consent, advertising, and jurisdiction language requires attorney review.</p>
    </div>{!reducedMotion&&<div className="il-cinematic__scroll" aria-hidden="true"><span/> Scroll to move through the scene</div>}
  </div></section>;
}
