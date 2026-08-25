"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

export function InjurySystemLens() {
  const open = useSystemLens((state) => state.openScope === "injury-law");
  const allEvents = useSystemLens((state) => state.events);
  const events = useMemo(() => allEvents.filter((event) => event.scope === "injury-law"), [allEvents]);
  const setOpen = useSystemLens((state) => state.setOpen);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) titleRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false, "injury-law");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <aside className="il-lens" aria-labelledby="il-lens-title">
      <div className="il-lens__head">
        <div><p className="il-eyebrow">Owner view · Preview only</p><h2 id="il-lens-title" tabIndex={-1} ref={titleRef}>System Lens</h2></div>
        <button type="button" onClick={() => { setOpen(false, "injury-law"); requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-lens-toggle]")?.focus()); }}>Close</button>
      </div>
      <p className="il-lens__empty">See the system beneath a calm client experience. Medical, pain, psychological, financial, insurer, incident, and contact details never appear here.</p>
      {events.length ? <ol>{events.map((event) => <li className="il-lens__event" key={event.id}><small>{event.status === "demo-preview" ? "Preview only" : event.status}</small><p><strong>{event.signal}</strong></p><p>{event.response}</p><p>{event.value}</p></li>)}</ol> : <p className="il-lens__empty">No normalized system signal yet. Start the Incident &amp; Impact Review or prepare a consultation to reveal the owner-facing orchestration.</p>}
    </aside>
  );
}
