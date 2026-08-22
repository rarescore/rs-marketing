"use client";

import { useState } from "react";

const signals = [
  { label: "Search", input: "‘Who can help me?’", context: "Entry source + need", response: "Useful page + next action", outcome: "A visitor understands the fit" },
  { label: "Tool", input: "‘Help me decide.’", context: "Selections + readiness", response: "Useful result first", outcome: "A higher-context conversation" },
  { label: "Request", input: "‘I want to talk.’", context: "Consent + relevant intent", response: "Routed human follow-up", outcome: "The team knows why they raised a hand" },
  { label: "Outcome", input: "‘What happened next?’", context: "Source + interaction + status", response: "Attribution without raw sensitive answers", outcome: "The business can learn what works" },
] as const;

export function SystemProofPulse() {
  const [active, setActive] = useState(0);
  const signal = signals[active] ?? signals[0];
  return (
    <section className="onlev-proof-pulse" aria-labelledby="onlev-proof-pulse-title">
      <div className="onlev-proof-pulse__head"><p className="onlev-kicker">Touch the system</p><h2 id="onlev-proof-pulse-title">Follow one customer signal all the way through.</h2><p>ONLEV is not describing a stack. It is designing what happens between intent and a useful human response.</p></div>
      <div className="onlev-proof-pulse__stage">
        <div className="onlev-proof-pulse__tabs" role="tablist" aria-label="Customer signal stages">{signals.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}</div>
        <div className="onlev-proof-pulse__line" aria-hidden="true"><i style={{ transform: `translateX(${active * 100}%)` }} /></div>
        <div className="onlev-proof-pulse__readout" role="tabpanel" aria-live="polite"><div><span>Customer</span><strong>{signal.input}</strong></div><div><span>Context kept</span><strong>{signal.context}</strong></div><div><span>System response</span><strong>{signal.response}</strong></div><div><span>Business value</span><strong>{signal.outcome}</strong></div></div>
      </div>
    </section>
  );
}
