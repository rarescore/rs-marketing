"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { ConsultationForm } from "./consultation-form.client";
import { lawPhoneDisplay, lawPhoneHref } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);
type Step = "fault" | "injury" | "when" | "contact";
type Answers = { faultAnswer:"yes"|"no"|"not-sure"; injuryAnswer:"yes"|"no"|"not-sure"; accidentWhen:"today"|"yesterday"|"last-7-days"|"more-than-week"|"exact-date"|"not-sure"; accidentDate?:string };

export function InjuryHero() {
  const root=useRef<HTMLElement>(null), video=useRef<HTMLVideoElement>(null), titleRef=useRef<HTMLLegendElement>(null), contactRef=useRef<HTMLHeadingElement>(null);
  const reduced=useReducedMotion(), progress=useRef(0);
  const [step,setStep]=useState<Step>("fault");
  const [answers,setAnswers]=useState<Partial<Answers>>({});
  const [showDate,setShowDate]=useState(false);
  useEffect(()=>{ if(step!=="fault")(step==="contact"?contactRef:titleRef).current?.focus({preventScroll:true}); },[step]);
  const seek=(p:number)=>{progress.current=p;const el=video.current;if(!el||!Number.isFinite(el.duration))return;const scene=Math.min(p/.7,1);el.currentTime=gsap.parseEase("power1.inOut")(scene)*Math.max(el.duration-.04,0);};
  useGSAP(()=>{if(!root.current)return;if(reduced){gsap.set(".il-cinematic__question",{autoAlpha:1});seek(1);return;}const tl=gsap.timeline({scrollTrigger:{trigger:root.current,start:"top top",end:"bottom bottom",scrub:.55,onUpdate:s=>seek(s.progress),onLeave:()=>seek(1)}});tl.to(".il-cinematic__shade",{opacity:.9,duration:.12},.62).fromTo(".il-cinematic__question",{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.15},.7); "ACCIDENT?".split("").forEach((_,i)=>tl.fromTo(`.il-cinematic__char:nth-child(${i+1})`,{opacity:0},{opacity:1,duration:.014},.73+i*.008));return()=>tl.scrollTrigger?.kill();},{scope:root,dependencies:[reduced]});
  const fault=(v:Answers["faultAnswer"])=>{setAnswers(a=>({...a,faultAnswer:v}));setStep("injury");};
  const injury=(v:Answers["injuryAnswer"])=>{setAnswers(a=>({...a,injuryAnswer:v}));setStep("when");};
  const when=(v:Answers["accidentWhen"])=>{if(v==="exact-date"){setShowDate(true);return;}setAnswers(a=>({...a,accidentWhen:v}));setStep("contact");};
  const ready=answers.faultAnswer&&answers.injuryAnswer&&answers.accidentWhen;
  return <section ref={root} className={`il-cinematic ${reduced?"il-cinematic--reduced":""}`} aria-label="Free accident case review">
    <div className="il-cinematic__sticky">
      <div className="il-cinematic__visual" aria-hidden="true"><div className="il-cinematic__fallback"/><video ref={video} className="il-cinematic__video" muted playsInline preload="auto" tabIndex={-1} onLoadedMetadata={()=>reduced?seek(1):seek(progress.current)}><source src="/video/injury-law/accident-sequence.mp4" type="video/mp4"/></video></div>
      <div className="il-cinematic__shade" aria-hidden="true"/>
      <div id="free-case-review" className="il-cinematic__question" aria-live="polite">
        <p className="il-cinematic__progress">{step==="contact"?"Your contact details":`Question ${step==="fault"?1:step==="injury"?2:3} of 3`}</p>
        <h1 className="il-cinematic__headline">Recently been in an <span aria-label="accident">{[..."ACCIDENT?"].map((c,i)=><span className="il-cinematic__char" aria-hidden="true" key={i}>{c}</span>)}</span></h1>
        {step==="fault"&&<fieldset><legend ref={titleRef} tabIndex={-1}>Do you believe someone else may have caused the accident?</legend><p>Choose the closest answer. We will review the circumstances—not judge the answer.</p><div className="il-cinematic__choices"><button onClick={()=>fault("yes")}>Yes</button><button onClick={()=>fault("no")}>No</button><button onClick={()=>fault("not-sure")}>I’m not sure</button></div></fieldset>}
        {step==="injury"&&<fieldset><legend ref={titleRef} tabIndex={-1}>Were you injured?</legend><p>If symptoms are severe or worsening, seek appropriate medical care now.</p><div className="il-cinematic__choices"><button onClick={()=>injury("yes")}>Yes</button><button onClick={()=>injury("no")}>No</button><button onClick={()=>injury("not-sure")}>I’m not sure</button></div></fieldset>}
        {step==="when"&&<fieldset><legend ref={titleRef} tabIndex={-1}>When did the accident happen?</legend><p>An estimate is enough to begin.</p>{!showDate?<div className="il-cinematic__choices il-cinematic__choices--dates"><button onClick={()=>when("today")}>Today</button><button onClick={()=>when("yesterday")}>Yesterday</button><button onClick={()=>when("last-7-days")}>Within 7 days</button><button onClick={()=>when("more-than-week")}>More than a week ago</button><button onClick={()=>when("exact-date")}>Choose a date</button><button onClick={()=>when("not-sure")}>I’m not sure</button></div>:<div className="il-cinematic__date"><label htmlFor="accident-date">Accident date</label><input id="accident-date" type="date" max={new Date().toISOString().slice(0,10)} onChange={e=>setAnswers(a=>({...a,accidentWhen:"exact-date",accidentDate:e.currentTarget.value}))}/><button className="il-button il-button--paper" disabled={!answers.accidentDate} onClick={()=>setStep("contact")}>Continue</button></div>}</fieldset>}
        {step==="contact"&&ready&&<div className="il-cinematic__contact"><h2 ref={contactRef} tabIndex={-1}>Let’s have someone call you.</h2><p>Share only what we need to return your call. Your three answers are included automatically.</p><ConsultationForm answers={answers as Answers} source="hero-questionnaire" compact/></div>}
        <p className="il-cinematic__legal">No fee to request a review. Submission does not create an attorney-client relationship. Prefer to speak now? <a href={lawPhoneHref}>{lawPhoneDisplay}</a></p>
      </div>
      {!reduced&&<div className="il-cinematic__scroll" aria-hidden="true"><span/> Scroll to the moment after</div>}
    </div>
  </section>;
}
