"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

type GuidanceStep = readonly [string, string, string];

export function GuidanceNavigator({ steps }: { steps: readonly GuidanceStep[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];
  if (!step) return null;
  const [when, title, copy] = step;
  return (
    <section className="il-guidance-nav" aria-labelledby="il-guidance-nav-title">
      <div className="il-guidance-nav__rail" aria-hidden="true"><span style={{ "--il-progress": `${((active + 1) / steps.length) * 100}%` } as CSSProperties} /></div>
      <div className="il-guidance-nav__intro"><p className="il-kicker">One step at a time</p><h2 id="il-guidance-nav-title">You do not need to solve everything today.</h2><p>Choose the moment you are in. The page will show only the next useful action.</p></div>
      <div className="il-guidance-nav__controls" role="tablist" aria-label="After-accident guidance steps">
        {steps.map(([label], index) => <button key={label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{label.replace(/^\d+\s·\s/, "")}</button>)}
      </div>
      <article className="il-guidance-nav__focus" role="tabpanel" aria-live="polite"><small>{when}</small><h3>{title}</h3><p>{copy}</p><div><button type="button" disabled={active === 0} onClick={() => setActive((value) => Math.max(0, value - 1))}>Previous</button><button type="button" disabled={active === steps.length - 1} onClick={() => setActive((value) => Math.min(steps.length - 1, value + 1))}>Next useful step</button></div></article>
      <details className="il-guidance-nav__all"><summary>See the complete guidance list</summary><ol>{steps.map(([label, heading, body]) => <li key={label}><strong>{label} — {heading}</strong><p>{body}</p></li>)}</ol></details>
    </section>
  );
}
