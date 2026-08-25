"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitWalkthrough,
  type WalkthroughState,
} from "@/app/contact/actions";

const initialWalkthroughState: WalkthroughState = { success: false, message: "" };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, action, pending] = useActionState(submitWalkthrough, initialWalkthroughState);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message) summaryRef.current?.focus();
  }, [state.message]);

  const error = (field: string) => state.errors?.[field]?.[0];

  if (state.success) {
    return (
      <div className="onlev-form-success" role="status" tabIndex={-1} ref={summaryRef}>
        <p className="onlev-kicker">Request prepared / {state.receipt}</p>
        <h2>The next step is clear.</h2>
        <p>{state.message}</p>
        <p>In production, a consented request like this would be routed to ONLEV with its source and industry context, followed by a human response.</p>
      </div>
    );
  }

  return (
    <form className={`onlev-form${compact ? " onlev-form--compact" : ""}`} action={action} noValidate data-onlev-reveal>
      {state.message ? (
        <div className="onlev-form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <strong>{state.message}</strong>
          <p>Correct each field below and try again.</p>
        </div>
      ) : null}
      <label className="onlev-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="onlev-form__row">
        <Field label="Your name" name="name" error={error("name")} autoComplete="name" />
        <Field label="Business name" name="company" error={error("company")} autoComplete="organization" />
      </div>
      <div className="onlev-form__row">
        <Field label="Work email" name="email" type="email" inputMode="email" error={error("email")} autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" inputMode="tel" error={error("phone")} autoComplete="tel" />
      </div>
      <div className="onlev-form__row">
        <label>Closest industry
          <select name="industry" defaultValue="" aria-invalid={Boolean(error("industry"))} aria-describedby={error("industry") ? "industry-error" : undefined}>
            <option value="" disabled>Choose one</option>
            <option value="real-estate">Real Estate</option>
            <option value="home-services">Home Services</option>
            <option value="injury-law">Injury Law</option>
            <option value="other">Another lead-driven business</option>
          </select>
          {error("industry") ? <span id="industry-error" role="alert">{error("industry")}</span> : null}
        </label>
        <label>Ideal timing
          <select name="timing" defaultValue="" aria-invalid={Boolean(error("timing"))} aria-describedby={error("timing") ? "timing-error" : undefined}>
            <option value="" disabled>Choose one</option>
            <option value="soon">As soon as the right scope is clear</option>
            <option value="quarter">Within the next quarter</option>
            <option value="planning">Planning for later</option>
            <option value="unsure">Not sure yet</option>
          </select>
          {error("timing") ? <span id="timing-error" role="alert">{error("timing")}</span> : null}
        </label>
      </div>
      <label>Where does the current customer journey break down?
        <textarea name="challenge" rows={compact ? 4 : 6} maxLength={1200} aria-invalid={Boolean(error("challenge"))} aria-describedby={error("challenge") ? "challenge-error" : "challenge-help"} />
        <small id="challenge-help">For example: weak lead quality, no useful tools, slow follow-up, or no way to connect marketing to an outcome.</small>
        {error("challenge") ? <span id="challenge-error" role="alert">{error("challenge")}</span> : null}
      </label>
      <label className="onlev-form__consent"><input type="checkbox" name="consent" /><span>I consent to ONLEV using these details to respond about this request. I understand this local preview validates the form but does not send or retain my information.</span></label>
      {error("consent") ? <p className="onlev-form__field-error" role="alert">{error("consent")}</p> : null}
      <button type="submit" disabled={pending}>{pending ? "Preparing request…" : "Request my walkthrough"}<span aria-hidden="true">↗</span></button>
      <p className="onlev-form__privacy">No newsletter enrollment. No information is sent from this demonstration. See the <a href="/privacy">privacy policy</a>.</p>
    </form>
  );
}

function Field({ label, name, error, ...props }: {
  label: string;
  name: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <label>{label}
      <input name={name} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props} />
      {error ? <span id={errorId} role="alert">{error}</span> : null}
    </label>
  );
}
