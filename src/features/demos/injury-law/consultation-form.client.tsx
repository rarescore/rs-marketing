"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInjuryConsultation, type InjuryConsultationState } from "@/app/showroom/injury-law/actions";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

const initialState:InjuryConsultationState={success:false,message:""};
export function ConsultationForm({source="consultation",compact=false}:{source?:"consultation"|"case-review-result";compact?:boolean}){
  const [state,action,pending]=useActionState(submitInjuryConsultation,initialState);
  const statusRef=useRef<HTMLDivElement>(null);
  const record=useSystemLens(s=>s.record);
  useEffect(()=>{if(state.message)statusRef.current?.focus();if(state.success)record({scope:"injury-law",type:"consultation_prepared",signal:"A visitor chose a human follow-up path",response:"Consent and minimal contact details validated in a no-send preview",value:"A calmer, contextual consultation pathway",status:"demo-preview"});},[state,record]);
  if(state.success)return <div className="il-form-status" role="status" tabIndex={-1} ref={statusRef}><strong>Preview ready · {state.receipt}</strong><p>{state.message}</p><p>You may close this page. No review answers or contact details were retained.</p></div>;
  const error=(name:string)=>state.errors?.[name]?.[0];
  return <form action={action} className="il-form-grid" noValidate>
    {state.message&&<div className="il-form-status il-field--full" role="alert" tabIndex={-1} ref={statusRef}><strong>{state.message}</strong></div>}
    <input type="hidden" name="source" value={source}/>
    <label className="il-honeypot">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    {!compact&&<fieldset className="il-choice-group il-field--full"><legend>What would you like help with?</legend><div className="il-choice-list"><label className="il-choice"><input type="radio" name="intent" value="review" defaultChecked/><span>Ask for a review of my situation</span></label><label className="il-choice"><input type="radio" name="intent" value="next-steps"/><span>Ask a question about next steps</span></label><label className="il-choice"><input type="radio" name="intent" value="existing-counsel"/><span>I already have counsel and need to understand where to direct a question</span></label><label className="il-choice"><input type="radio" name="intent" value="business-owner"/><span>I am viewing this as a business system</span></label></div>{error("intent")&&<p className="il-field-error">{error("intent")}</p>}</fieldset>}
    {compact&&<input type="hidden" name="intent" value="review"/>}
    <label className="il-field"><span>Name</span><input id={`${source}-name`} name="name" autoComplete="name" required aria-invalid={Boolean(error("name"))}/>{error("name")&&<p className="il-field-error">{error("name")}</p>}</label>
    <label className="il-field"><span>Phone</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={Boolean(error("phone"))}/>{error("phone")&&<p className="il-field-error">{error("phone")}</p>}</label>
    <label className="il-field"><span>Email <small>(optional)</small></span><input name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(error("email"))}/>{error("email")&&<p className="il-field-error">{error("email")}</p>}</label>
    <label className="il-field"><span>Preferred contact time</span><select name="contactTime" defaultValue="" required aria-invalid={Boolean(error("contactTime"))}><option value="" disabled>Choose a window</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="anytime">Any time</option></select>{error("contactTime")&&<p className="il-field-error">{error("contactTime")}</p>}</label>
    <fieldset className="il-choice-group il-field--full"><legend>Are you 18 or older?</legend><div className="il-choice-list"><label className="il-choice"><input type="radio" name="adultStatus" value="yes"/><span>Yes</span></label><label className="il-choice"><input type="radio" name="adultStatus" value="prefer-not"/><span>Prefer not to answer</span></label></div><small>A real firm may need an adult or guardian pathway. Full date of birth is intentionally not collected here.</small>{error("adultStatus")&&<p className="il-field-error">{error("adultStatus")}</p>}</fieldset>
    <label className="il-consent il-field--full"><input type="checkbox" name="consent" required/><span>I understand this is a fictional, no-send demonstration. I consent to the interface processing these details only to produce the on-screen preview. Nothing is sent or retained, and no attorney-client relationship is created.</span></label>
    {error("consent")&&<p className="il-field-error il-field--full">{error("consent")}</p>}
    <div className="il-field--full"><button className="il-button il-button--oxblood" type="submit" disabled={pending}>{pending?"Preparing preview…":"Prepare consultation preview"}</button></div>
  </form>;
}
