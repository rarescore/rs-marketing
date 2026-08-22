"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

export function SystemLensPanel() {
  const open = useSystemLens((state) => state.openScope === "real-estate");
  const allEvents = useSystemLens((state) => state.events);
  const events = useMemo(() => allEvents.filter((event) => event.scope === "real-estate"), [allEvents]);
  const setOpen = useSystemLens((state) => state.setOpen);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) titleRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false, "real-estate");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <aside className="re-lens" data-open={open} aria-hidden={!open} inert={!open} aria-labelledby="system-lens-title">
      <header>
        <div>
          <p>Owner view · Demonstration</p>
          <h2 id="system-lens-title" tabIndex={-1} ref={titleRef}>System Lens</h2>
        </div>
        <button type="button" onClick={() => { setOpen(false, "real-estate"); requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-lens-toggle]")?.focus()); }}>Close</button>
      </header>
      <p className="re-lens__intro">See how normal customer actions become useful follow-up context—without exposing private answers or pretending an external CRM has run.</p>
      <div className="re-lens__head" aria-hidden="true"><span>Customer signal</span><span>System response</span><span>Business value</span></div>
      {events.length ? (
        <ol aria-live="polite">
          {events.map((event) => (
            <li key={event.id}>
              <span>{event.signal}</span><span>{event.response}</span><span>{event.value}</span>
              <small>{event.status === "demo-preview" ? "Preview only" : event.status}</small>
            </li>
          ))}
        </ol>
      ) : (
        <div className="re-lens__empty"><p>No customer signal yet.</p><p>Search, save a property, or use a planning tool to reveal the system beneath the experience.</p></div>
      )}
    </aside>
  );
}
