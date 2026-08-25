"use client";

import Script from "next/script";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitLead } from "@/app/(law)/actions";
import { initialLeadState } from "@/schemas/lead";
import { lawPhoneDisplay, lawPhoneHref } from "./data";

type Answers = { faultAnswer: "yes" | "no" | "not-sure"; injuryAnswer: "yes" | "no" | "not-sure"; accidentWhen: "today" | "yesterday" | "last-7-days" | "more-than-week" | "exact-date" | "not-sure"; accidentDate?: string };
const defaults: Answers = { faultAnswer: "not-sure", injuryAnswer: "not-sure", accidentWhen: "not-sure" };

export function ConsultationForm({ answers = defaults, source = "contact-page", compact = false, onlineReady }: { answers?: Answers; source?: string; compact?: boolean; onlineReady: boolean }) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
  const [securityFailed, setSecurityFailed] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId().replaceAll(":", "");
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const onlineAvailable = onlineReady && Boolean(key) && !securityFailed;
  useEffect(() => { if (state.status !== "idle") statusRef.current?.focus(); }, [state.status]);

  if (state.status === "success") return <div className="il-thanks" role="status" tabIndex={-1} ref={statusRef}>
    <p className="il-eyebrow">Request received</p><h2>Thank you, {state.firstName}.</h2>
    <p>Our intake team will contact the number ending in {state.phoneLastFour}. If your situation is urgent, call now.</p>
    <a className="il-button il-button--ink" href={lawPhoneHref}>Call {lawPhoneDisplay}</a>
    <div className="il-thanks__next"><strong>While you wait</strong><ul><li>Keep original photos, messages, and reports.</li><li>Write down any new symptoms or appointments.</li><li>Do not send confidential records by email unless the firm asks for them securely.</li></ul></div>
  </div>;

  const error = (name: string) => state.errors?.[name]?.[0];
  const errorId = (name: string) => error(name) ? `${id}-${name}-error` : undefined;
  return <>
    {key && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onError={() => setSecurityFailed(true)} />}
    <form action={action} className={`il-lead-form ${compact ? "il-lead-form--compact" : ""}`} noValidate>
      <input type="hidden" name="source" value={source} /><input type="hidden" name="faultAnswer" value={answers.faultAnswer} /><input type="hidden" name="injuryAnswer" value={answers.injuryAnswer} /><input type="hidden" name="accidentWhen" value={answers.accidentWhen} /><input type="hidden" name="accidentDate" value={answers.accidentDate || ""} />
      <label className="il-honeypot">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {!onlineAvailable && <div className="il-form-status il-form-status--notice il-field--full" role="status"><strong>Online requests are temporarily unavailable.</strong><span>Your answers are still here. Call <a href={lawPhoneHref}>{lawPhoneDisplay}</a> and we’ll take the same information by phone.</span></div>}
      {state.status === "error" && <div className="il-form-status il-field--full" role="alert" tabIndex={-1} ref={statusRef}><strong>{state.message}</strong><a href={lawPhoneHref}>Call {lawPhoneDisplay}</a></div>}
      <label className="il-field" htmlFor={`${id}-name`}><span>Full name</span><input id={`${id}-name`} name="fullName" autoComplete="name" required defaultValue={state.values?.fullName} aria-invalid={Boolean(error("fullName"))} aria-describedby={errorId("fullName")} />{error("fullName") && <small id={errorId("fullName")} className="il-field-error">{error("fullName")}</small>}</label>
      <label className="il-field" htmlFor={`${id}-phone`}><span>Phone number</span><input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={state.values?.phone} aria-invalid={Boolean(error("phone"))} aria-describedby={errorId("phone")} />{error("phone") && <small id={errorId("phone")} className="il-field-error">{error("phone")}</small>}</label>
      <label className="il-field" htmlFor={`${id}-email`}><span>Email <small>Optional</small></span><input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" defaultValue={state.values?.email} aria-invalid={Boolean(error("email"))} aria-describedby={errorId("email")} />{error("email") && <small id={errorId("email")} className="il-field-error">{error("email")}</small>}</label>
      <label className="il-field" htmlFor={`${id}-time`}><span>Best time to call <small>Optional</small></span><select id={`${id}-time`} name="preferredContactTime" defaultValue={state.values?.preferredContactTime || ""}><option value="">No preference</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="anytime">Any time</option></select></label>
      <label className="il-consent il-field--full"><input type="checkbox" name="consent" required defaultChecked={state.values?.consent === "on"} aria-describedby={errorId("consent")} /><span>Lev &amp; On may contact me by phone, text, or email about this request. Message and data rates may apply. Consent is not a condition of hiring the firm; I may call instead. Sending this form does not create an attorney-client relationship. See the <a href="/privacy">Privacy Policy</a>.</span></label>
      {error("consent") && <small id={errorId("consent")} className="il-field-error il-field--full">{error("consent")}</small>}
      {key && !securityFailed ? <div className="cf-turnstile il-field--full" data-sitekey={key} data-theme="light" /> : <input type="hidden" name="cf-turnstile-response" value="" />}
      <div className="il-lead-form__submit il-field--full"><button className="il-button il-button--oxblood" type="submit" disabled={pending || !onlineAvailable}>{pending ? "Sending…" : "Request my call"}</button><a href={lawPhoneHref}>Call {lawPhoneDisplay}</a></div>
    </form>
  </>;
}
