"use client";

import Script from "next/script";
import { useActionState, useEffect, useState } from "react";
import { submitLead } from "@/app/(law)/actions";
import { initialLeadState } from "@/schemas/lead";
import { lawPhoneDisplay, lawPhoneHref } from "./data";

const accidentTypes = ["Car accident", "Truck accident", "Motorcycle accident", "Rideshare accident", "Pedestrian accident", "Bicycle accident", "Unsafe property or fall", "Serious injury", "Wrongful death", "Not sure"];
type Choice = "yes" | "no" | "not-sure";

export function CallbackIntake({ onlineReady }: { onlineReady: boolean }) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
  const [step, setStep] = useState(1);
  const [accidentType, setAccidentType] = useState("");
  const [accidentDate, setAccidentDate] = useState("");
  const [location, setLocation] = useState("");
  const [injured, setInjured] = useState<Choice>("not-sure");
  const [medical, setMedical] = useState<Choice>("not-sure");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [securityFailed, setSecurityFailed] = useState(false);
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const available = onlineReady && Boolean(key) && !securityFailed;
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (state.status === "success") window.dispatchEvent(new CustomEvent("levon:intake", { detail: { event: "form_submitted", source: "homepage-primary" } }));
    if (state.status === "error") window.dispatchEvent(new CustomEvent("levon:intake", { detail: { event: "form_failed", source: "homepage-primary" } }));
  }, [state.status]);
  useEffect(() => {
    const abandoned = () => { if (step > 1 && state.status !== "success") window.dispatchEvent(new CustomEvent("levon:intake", { detail: { event: "form_abandoned", step, source: "homepage-primary" } })); };
    window.addEventListener("pagehide", abandoned);
    return () => window.removeEventListener("pagehide", abandoned);
  }, [step, state.status]);
  const advance = () => { if (step === 1) window.dispatchEvent(new CustomEvent("levon:intake", { detail: { event: "form_started", source: "homepage-primary" } })); window.dispatchEvent(new CustomEvent("levon:intake", { detail: { event: "step_completed", step, source: "homepage-primary" } })); setStep((value) => Math.min(5, value + 1)); };
  const trackCall = () => window.dispatchEvent(new CustomEvent("levon:intake", { detail: { event: "call_link_clicked", source: "homepage-primary" } }));

  if (state.status === "success") return <div className="il-callback__success" role="status"><p className="il-eyebrow">Request received</p><h3>Your request has been received.</h3><p>A member of the Lev &amp; On Law Firm intake team will call you shortly. Keep your phone nearby. If you would rather speak now, call <a href={lawPhoneHref} onClick={trackCall}>{lawPhoneDisplay}</a>.</p></div>;

  return <div className="il-callback">
    {key && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onError={() => setSecurityFailed(true)} />}
    <div className="il-callback__progress" aria-label={`Step ${step} of 5`}><span style={{ width: `${step * 20}%` }} /><b>Step {step} of 5</b></div>
    <div className="il-callback__stage">
      {step === 1 && <><p className="il-eyebrow">Accident</p><h3>What kind of accident happened?</h3><label className="il-field"><span>Accident type</span><select value={accidentType} onChange={(event) => setAccidentType(event.target.value)}><option value="">Choose the closest answer</option>{accidentTypes.map((item) => <option key={item}>{item}</option>)}</select></label><button className="il-button il-button--oxblood" type="button" disabled={!accidentType} onClick={advance}>Continue</button></>}
      {step === 2 && <><p className="il-eyebrow">Timing and location</p><h3>When and where did it happen?</h3><div className="il-callback__fields"><label className="il-field"><span>Approximate date <small>Optional</small></span><input type="date" max={today} value={accidentDate} onChange={(event) => setAccidentDate(event.target.value)} /></label><label className="il-field"><span>City or location</span><input value={location} onChange={(event) => setLocation(event.target.value)} required /></label></div><button className="il-button il-button--oxblood" type="button" disabled={!location.trim()} onClick={advance}>Continue</button></>}
      {step === 3 && <><p className="il-eyebrow">Injury</p><h3>Tell us only what you know now.</h3><fieldset><legend>Were you injured?</legend><div className="il-callback__choices">{(["yes","no","not-sure"] as Choice[]).map((value) => <button type="button" aria-pressed={injured === value} key={value} onClick={() => setInjured(value)}>{value === "not-sure" ? "I’m not sure" : value[0].toUpperCase()+value.slice(1)}</button>)}</div></fieldset><fieldset><legend>Have you received medical attention?</legend><div className="il-callback__choices">{(["yes","no","not-sure"] as Choice[]).map((value) => <button type="button" aria-pressed={medical === value} key={value} onClick={() => setMedical(value)}>{value === "not-sure" ? "I’m not sure" : value[0].toUpperCase()+value.slice(1)}</button>)}</div></fieldset><button className="il-button il-button--oxblood" type="button" onClick={advance}>Continue</button></>}
      {step === 4 && <><p className="il-eyebrow">Contact</p><h3>Where should we reach you?</h3><div className="il-callback__fields"><label className="il-field"><span>Full name</span><input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} /></label><label className="il-field"><span>Phone number</span><input type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></label><label className="il-field il-field--full"><span>Email <small>Optional</small></span><input type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label></div><button className="il-button il-button--oxblood" type="button" disabled={name.trim().length < 2 || phone.trim().length < 7} onClick={advance}>Continue</button></>}
      {step === 5 && <form action={action} className="il-callback__final" noValidate><p className="il-eyebrow">Callback</p><h3>When should we call?</h3>
        <input type="hidden" name="fullName" value={name} /><input type="hidden" name="phone" value={phone} /><input type="hidden" name="email" value={email} /><input type="hidden" name="faultAnswer" value="not-sure" /><input type="hidden" name="injuryAnswer" value={injured} /><input type="hidden" name="accidentWhen" value={accidentDate ? "exact-date" : "not-sure"} /><input type="hidden" name="accidentDate" value={accidentDate} /><input type="hidden" name="accidentType" value={accidentType} /><input type="hidden" name="accidentLocation" value={location} /><input type="hidden" name="medicalAttention" value={medical} /><input type="hidden" name="source" value="homepage-primary" /><input type="hidden" name="website" value="" />
        <label className="il-field"><span>Best time to call</span><select name="preferredContactTime" defaultValue=""><option value="">No preference</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="anytime">Any time</option></select></label>
        <label className="il-consent"><input type="checkbox" name="consent" required /><span>Lev &amp; On may contact me by phone, text, or email about this request. Consent is not a condition of hiring the firm. Sending this form does not create an attorney-client relationship.</span></label>
        {key && !securityFailed ? <div className="cf-turnstile" data-sitekey={key} data-theme="light" /> : <input type="hidden" name="cf-turnstile-response" value="" />}
        {!available && <div className="il-form-status il-form-status--notice"><strong>Online requests are temporarily unavailable.</strong><span>Your answers are still here. Call <a href={lawPhoneHref} onClick={trackCall}>{lawPhoneDisplay}</a>.</span></div>}
        {state.status === "error" && <div className="il-form-status" role="alert"><strong>{state.message}</strong></div>}
        <button className="il-button il-button--oxblood" type="submit" disabled={!available || pending}>{pending ? "Sending…" : "Request my call"}</button>
      </form>}
    </div>
    {step > 1 && <button className="il-callback__back" type="button" onClick={() => setStep((value) => Math.max(1, value - 1))}>← Back</button>}
  </div>;
}
