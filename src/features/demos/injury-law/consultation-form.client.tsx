"use client";
import Script from "next/script";
import { useActionState, useEffect, useRef } from "react";
import { submitLead } from "@/app/(law)/actions";
import { initialLeadState } from "@/schemas/lead";
import { lawPhoneDisplay, lawPhoneHref } from "./data";

type Answers = { faultAnswer: "yes"|"no"|"not-sure"; injuryAnswer: "yes"|"no"|"not-sure"; accidentWhen: "today"|"yesterday"|"last-7-days"|"more-than-week"|"exact-date"|"not-sure"; accidentDate?: string };
const defaults: Answers = { faultAnswer: "not-sure", injuryAnswer: "not-sure", accidentWhen: "not-sure" };

export function ConsultationForm({ answers=defaults, source="contact-page", compact=false }: { answers?: Answers; source?: string; compact?: boolean }) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
  const statusRef = useRef<HTMLDivElement>(null);
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const disabledInProduction = process.env.NODE_ENV === "production" && !key;
  useEffect(() => { if (state.status !== "idle") statusRef.current?.focus(); }, [state.status]);
  if (state.status === "success") return <div className="il-thanks" role="status" tabIndex={-1} ref={statusRef}>
    <p className="il-eyebrow">Request received</p><h2>Thank you, {state.firstName}.</h2>
    <p>A member of the Lev &amp; On Law Firm intake team will contact you shortly at the number ending in {state.phoneLastFour}.</p>
    <a className="il-button il-button--paper" href={lawPhoneHref}>Call now: {lawPhoneDisplay}</a>
    <div className="il-thanks__next"><strong>What happens next</strong><ul><li>Keep your phone nearby.</li><li>Gather photographs, insurance information, and the police report if available.</li><li>Seek appropriate medical attention for urgent or worsening symptoms.</li></ul></div>
  </div>;
  const error=(name:string)=>state.errors?.[name]?.[0];
  return <>
    {key && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />}
    <form action={action} className={`il-lead-form ${compact ? "il-lead-form--compact" : ""}`} noValidate>
      <input type="hidden" name="source" value={source}/><input type="hidden" name="faultAnswer" value={answers.faultAnswer}/><input type="hidden" name="injuryAnswer" value={answers.injuryAnswer}/><input type="hidden" name="accidentWhen" value={answers.accidentWhen}/><input type="hidden" name="accidentDate" value={answers.accidentDate || ""}/>
      <label className="il-honeypot">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
      {state.status === "error" && <div className="il-form-status il-field--full" role="alert" tabIndex={-1} ref={statusRef}><strong>{state.message}</strong><br/><a href={lawPhoneHref}>Call {lawPhoneDisplay}</a></div>}
      <label className="il-field"><span>Full name</span><input name="fullName" autoComplete="name" required aria-invalid={Boolean(error("fullName"))}/>{error("fullName")&&<small className="il-field-error">{error("fullName")}</small>}</label>
      <label className="il-field"><span>Phone number</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={Boolean(error("phone"))}/>{error("phone")&&<small className="il-field-error">{error("phone")}</small>}</label>
      <label className="il-field"><span>Email <small>Optional</small></span><input name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(error("email"))}/>{error("email")&&<small className="il-field-error">{error("email")}</small>}</label>
      <label className="il-field"><span>Best time to call <small>Optional</small></span><select name="preferredContactTime" defaultValue=""><option value="">No preference</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="anytime">Any time</option></select></label>
      <label className="il-consent il-field--full"><input type="checkbox" name="consent" required/><span>By submitting, you agree that Lev &amp; On Law Firm may contact you about this request. Submission does not create an attorney-client relationship. See our <a href="/privacy">Privacy Policy</a>.</span></label>
      {error("consent")&&<small className="il-field-error il-field--full">{error("consent")}</small>}
      {key ? <div className="cf-turnstile il-field--full" data-sitekey={key} data-theme="light"/> : <input type="hidden" name="cf-turnstile-response" value=""/>}
      <div className="il-lead-form__submit il-field--full"><button className="il-button il-button--oxblood" type="submit" disabled={pending || disabledInProduction}>{pending ? "Sending securely…" : "Request My Call"}</button><a href={lawPhoneHref}>Or call {lawPhoneDisplay} now</a></div>
    </form>
  </>;
}
