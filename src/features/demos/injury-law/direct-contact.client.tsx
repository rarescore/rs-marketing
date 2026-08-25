"use client";

import Script from "next/script";
import { useActionState, useState } from "react";
import { submitDirectMessage } from "@/app/(law)/actions";
import { initialLeadState } from "@/schemas/lead";
import { lawPhoneDisplay, lawPhoneHref } from "./data";

export function DirectContact({ onlineReady }: { onlineReady: boolean }) {
  const [state, action, pending] = useActionState(submitDirectMessage, initialLeadState);
  const [securityFailed, setSecurityFailed] = useState(false);
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const available = onlineReady && Boolean(key) && !securityFailed;

  if (state.status === "success") return <div className="il-direct-form__success" role="status"><p className="il-eyebrow">Message received</p><h3>We received your message.</h3><p>The intake team will respond using the contact method you selected. To speak now, call <a href={lawPhoneHref}>{lawPhoneDisplay}</a>.</p></div>;

  return <>
    {key && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onError={() => setSecurityFailed(true)} />}
    <form action={action} className="il-direct-form" noValidate>
      <input type="hidden" name="source" value="homepage-direct-message" /><label className="il-honeypot">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="il-field"><span>Name</span><input name="fullName" autoComplete="name" required /></label>
      <label className="il-field"><span>Phone or email</span><input name="contactDetail" autoComplete="email" required /></label>
      <label className="il-field"><span>Preferred contact method</span><select name="preferredContactMethod" defaultValue="phone"><option value="phone">Phone</option><option value="email">Email</option></select></label>
      <label className="il-field"><span>Short message <small>Optional</small></span><textarea name="message" rows={4} maxLength={1000} /></label>
      <label className="il-consent"><input type="checkbox" name="consent" required /><span>Lev &amp; On may contact me about this request. Sending this message does not create an attorney-client relationship.</span></label>
      {key && !securityFailed ? <div className="cf-turnstile" data-sitekey={key} data-theme="light" /> : <input type="hidden" name="cf-turnstile-response" value="" />}
      {!available && <div className="il-form-status il-form-status--notice"><strong>Online messages are temporarily unavailable.</strong><span>Call <a href={lawPhoneHref}>{lawPhoneDisplay}</a>.</span></div>}
      {state.status === "error" && <div className="il-form-status" role="alert"><strong>{state.message}</strong></div>}
      <button className="il-button il-button--oxblood" type="submit" disabled={!available || pending}>{pending ? "Sending…" : "Send my message"}</button>
    </form>
  </>;
}
