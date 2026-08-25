"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitPlumbingRequest, type PlumbingRequestState } from "@/app/showroom/plumbing/actions";
import { services } from "./data";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

const initialState: PlumbingRequestState = { success: false, message: "" };

export function RequestForm({ initialService = "not-sure", initialUrgency = "planning", source = "request-service" }: { initialService?: string; initialUrgency?: string; source?: string }) {
  const [state, action, pending] = useActionState(submitPlumbingRequest, initialState);
  const [files, setFiles] = useState<string[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);
  const record = useSystemLens((store) => store.record);
  useEffect(() => { if (state.message) statusRef.current?.focus(); if (state.success) record({ scope: "plumbing", type: "service_request_prepared", signal: "Service request completed", response: "No-send request preview prepared", value: "Qualified context without a false dispatch claim", status: "demo-preview" }); }, [state.message, state.success, record]);
  return <form className="pl-request-form" action={action} noValidate>
    {state.message && <div className={`pl-form-status ${state.success ? "is-success" : "is-error"}`} role={state.success ? "status" : "alert"} tabIndex={-1} ref={statusRef}><strong>{state.success ? "Request preview ready" : "Some details need attention"}</strong><p>{state.message}</p>{state.receipt && <small>Preview reference {state.receipt}</small>}</div>}
    <input type="hidden" name="source" value={source.slice(0, 100)} />
    <div className="pl-form-grid"><label>Full name<input name="name" autoComplete="name" aria-invalid={!!state.errors?.name} />{state.errors?.name && <small>{state.errors.name[0]}</small>}</label><label>Phone<input name="phone" type="tel" autoComplete="tel" aria-invalid={!!state.errors?.phone} />{state.errors?.phone && <small>{state.errors.phone[0]}</small>}</label><label>Email <span>optional</span><input name="email" type="email" autoComplete="email" aria-invalid={!!state.errors?.email} />{state.errors?.email && <small>{state.errors.email[0]}</small>}</label><label>Preferred contact window<select name="contactWindow" defaultValue=""><option value="" disabled>Select a window</option><option>Morning</option><option>Midday</option><option>Afternoon</option><option>Any time</option></select>{state.errors?.contactWindow && <small>{state.errors.contactWindow[0]}</small>}</label></div>
    <fieldset><legend>Condition</legend><div className="pl-choice-row">{[["active", "Active now"], ["contained", "Contained"], ["planning", "Planning"], ["not-sure", "Not sure"]].map(([value, label]) => <label key={value}><input type="radio" name="urgency" value={value} defaultChecked={initialUrgency === value} /><span>{label}</span></label>)}</div>{state.errors?.urgency && <small>{state.errors.urgency[0]}</small>}</fieldset>
    <div className="pl-form-grid"><label>Closest service category<select name="service" defaultValue={services.some(({ slug }) => slug === initialService) ? initialService : "not-sure"}>{services.map((service) => <option value={service.slug} key={service.slug}>{service.name}</option>)}<option value="not-sure">Not sure</option></select></label><label>Property type<select name="propertyType" defaultValue="house"><option value="house">Single-family house</option><option value="condo">Condo / townhome</option><option value="multifamily">Multifamily</option><option value="commercial">Commercial</option><option value="other">Other</option></select></label></div>
    <label>What are you observing? <span>optional</span><textarea name="context" rows={5} maxLength={800} placeholder="Where it is happening, when it started, and whether it is active or contained." /></label>
    <label className="pl-upload">Photos <span>optional · local preview only</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { const accepted = Array.from(event.target.files ?? []).filter((file) => file.size <= 8_000_000 && ["image/jpeg", "image/png", "image/webp"].includes(file.type)).slice(0, 4); setFiles(accepted.map((file) => file.name)); if (accepted.length) record({ scope: "plumbing", type: "photo_context_added", signal: "Photo context selected", response: "Local-only preview attached to intake", value: "Better preparation without exposing filenames", status: "observed" }); }} /><small>Up to four JPG, PNG, or WebP files, 8 MB each. In this demo, files stay in browser memory, are not submitted, and clear on refresh.</small>{files.length > 0 && <strong>{files.length} local preview {files.length === 1 ? "file" : "files"} selected</strong>}</label>
    <label className="pl-consent"><input type="checkbox" name="consent" /><span>I understand this is a fictional demonstration and consent to processing this form only to create the no-send preview.</span></label>{state.errors?.consent && <small>{state.errors.consent[0]}</small>}
    <label className="pl-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="pl-button pl-button--primary pl-submit" type="submit" disabled={pending}>{pending ? "Preparing…" : "Prepare request preview"}</button>
  </form>;
}
