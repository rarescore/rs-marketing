"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

export function PlumbingSystemLens() {
  const open = useSystemLens((state) => state.openScope === "plumbing");
  const allEvents = useSystemLens((state) => state.events);
  const events = useMemo(() => allEvents.filter((event) => event.scope === "plumbing"), [allEvents]);
  const setOpen = useSystemLens((state) => state.setOpen);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) titleRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false, "plumbing");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <aside className="pl-lens" data-open={open} aria-hidden={!open} inert={!open} aria-labelledby="pl-lens-title">
      <header><div><p>Owner view · Demonstration</p><h2 id="pl-lens-title" tabIndex={-1} ref={titleRef}>System Lens</h2></div><button type="button" onClick={() => { setOpen(false, "plumbing"); requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-lens-toggle]")?.focus()); }}>Close</button></header>
      <p className="pl-lens__intro">See how a homeowner signal becomes useful service context. Private answers, measurements, addresses, filenames, and contact details never appear here.</p>
      <div className="pl-lens__labels" aria-hidden="true"><span>Customer signal</span><span>Service response</span><span>Business value</span></div>
      {events.length ? <ol aria-live="polite">{events.map((event) => <li key={event.id}><span>{event.signal}</span><span>{event.response}</span><span>{event.value}</span><small>{event.status === "demo-preview" ? "Preview only" : event.status}</small></li>)}</ol> : <div className="pl-lens__empty"><p>No service signal yet.</p><p>Choose a symptom, build a Passport, or prepare a request to reveal the system beneath the interface.</p></div>}
    </aside>
  );
}
