"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitDemoLead, type DemoLeadState } from "@/app/showroom/real-estate/actions";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

export function LeadForm({
  defaultIntent = "general",
  context = "General consultation",
  compact = false,
}: {
  defaultIntent?: "buying" | "selling" | "both" | "listing" | "general" | "owner";
  context?: string;
  compact?: boolean;
}) {
  const initialDemoLeadState: DemoLeadState = { success: false, message: "" };
  const [state, action, pending] = useActionState(submitDemoLead, initialDemoLeadState);
  const record = useSystemLens((lens) => lens.record);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message) summaryRef.current?.focus();
    if (state.success) record({ type: "consultation_prepared", signal: "Follow-up requested with explicit consent", response: "Validated, CRM-ready demonstration record prepared", value: "Context and preferred timing are ready for a human response", status: "demo-preview" });
  }, [record, state.message, state.success]);

  if (state.success) {
    return (
      <div className="re-form-success" role="status" tabIndex={-1} ref={summaryRef}>
        <p className="re-kicker">Request prepared · {state.receipt}</p>
        <h2>Nothing was sent.</h2>
        <p>{state.message}</p>
        <p>In a production system, this is where a validated request would enter the advisor’s follow-up workflow.</p>
      </div>
    );
  }

  const fieldError = (name: string) => state.errors?.[name]?.[0];

  return (
    <form className={`re-form${compact ? " re-form--compact" : ""}`} action={action} noValidate>
      {state.message ? <div className="re-error-summary" role="alert" tabIndex={-1} ref={summaryRef}><strong>{state.message}</strong><p>Nothing has been submitted. Correct each field below and try again.</p></div> : null}
      <input type="hidden" name="context" value={context} />
      <label className="re-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label>What would you like to discuss?<select name="intent" defaultValue={defaultIntent} aria-invalid={Boolean(fieldError("intent"))}><option value="buying">Buying</option><option value="selling">Selling</option><option value="both">Buying and selling</option><option value="listing">A specific property</option><option value="general">A general question</option><option value="owner">This website system for my business</option></select>{fieldError("intent") ? <span role="alert">{fieldError("intent")}</span> : null}</label>
      <div className="re-form__row">
        <label>Name<input name="name" autoComplete="name" aria-invalid={Boolean(fieldError("name"))} />{fieldError("name") ? <span role="alert">{fieldError("name")}</span> : null}</label>
        <label>Preferred timing<select name="timing" defaultValue=""><option value="" disabled>Choose one</option><option>This week</option><option>Within two weeks</option><option>This month</option><option>Planning ahead</option></select>{fieldError("timing") ? <span role="alert">{fieldError("timing")}</span> : null}</label>
      </div>
      <div className="re-form__row">
        <label>Email<input name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={Boolean(fieldError("email"))} />{fieldError("email") ? <span role="alert">{fieldError("email")}</span> : null}</label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(fieldError("phone"))} />{fieldError("phone") ? <span role="alert">{fieldError("phone")}</span> : null}</label>
      </div>
      <label>What context would be useful? <small>Optional</small><textarea name="message" rows={compact ? 3 : 5} maxLength={800} /></label>
      <label className="re-consent"><input type="checkbox" name="consent" /><span>I understand this is a demonstration. I consent to the form being validated for the preview, and understand that the information is not sent to a brokerage or retained.</span></label>
      {fieldError("consent") ? <span className="re-field-error" role="alert">{fieldError("consent")}</span> : null}
      <button className="re-button re-button--solid" type="submit" disabled={pending}>{pending ? "Preparing…" : "Prepare request"}<span aria-hidden="true">→</span></button>
    </form>
  );
}
