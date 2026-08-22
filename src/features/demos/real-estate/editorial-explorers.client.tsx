"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Neighborhood } from "./data";
import { realEstateBase } from "./data";

const decisions = [
  { label: "Cost", question: "What monthly ownership number still leaves room to live?", note: "See principal, taxes, insurance, HOA, maintenance and reserves together.", href: `${realEstateBase}/tools/true-monthly-cost`, action: "Model the monthly cost" },
  { label: "Place", question: "Which daily routines should the address make easier?", note: "Compare access, housing form, architecture, parks and services without demographic steering.", href: `${realEstateBase}/neighborhoods`, action: "Explore the neighborhood atlas" },
  { label: "Condition", question: "What are you willing to repair, improve or simply live with?", note: "Keep condition and scope visible before a beautiful room makes the decision for you.", href: `${realEstateBase}/listings`, action: "Compare sample properties" },
  { label: "Timing", question: "Does the move need to happen in 30, 60 or 90 days?", note: "Sequence financing, sale preparation, search and diligence around the actual deadline.", href: `${realEstateBase}/tools/move-strategy-studio`, action: "Build the move sequence" },
] as const;

export function PropertyDecisionCompass() {
  const [active, setActive] = useState(0);
  const item = decisions[active];
  return (
    <section className="re-decision-compass" aria-labelledby="re-decision-title">
      <div className="re-decision-compass__intro">
        <p className="re-kicker">Before the filters</p>
        <h2 id="re-decision-title">What does the next home need to solve?</h2>
        <p>Search works better when the tradeoff is named first.</p>
      </div>
      <div className="re-decision-compass__workbench">
        <div className="re-decision-compass__tabs" role="tablist" aria-label="Move priorities">
          {decisions.map((decision, index) => (
            <button key={decision.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{decision.label}</button>
          ))}
        </div>
        <div className="re-decision-compass__answer" role="tabpanel" aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")} / 04</span>
          <h3>{item.question}</h3>
          <p>{item.note}</p>
          <Link href={item.href}>{item.action} <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

export function NeighborhoodStage({ neighborhoods }: { neighborhoods: Neighborhood[] }) {
  const [active, setActive] = useState(0);
  const area = neighborhoods[active] ?? neighborhoods[0];
  if (!area) return null;
  return (
    <section className="re-neighborhood-stage" aria-labelledby="re-neighborhood-stage-title">
      <div className="re-neighborhood-stage__media">
        <Image key={area.slug} src={area.image} alt={`Sample architectural view representing ${area.name}`} fill priority sizes="(max-width: 768px) 100vw, 62vw" />
        <div className="re-neighborhood-stage__counter" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(neighborhoods.length).padStart(2, "0")}</div>
      </div>
      <div className="re-neighborhood-stage__panel">
        <p className="re-kicker">Objective neighborhood atlas</p>
        <h1 id="re-neighborhood-stage-title">Explore the foothills by what you can observe.</h1>
        <p className="re-neighborhood-stage__question">What changes when the architecture, access and daily pattern change?</p>
        <div className="re-neighborhood-stage__tabs" role="tablist" aria-label="Neighborhoods">
          {neighborhoods.map((item, index) => <button key={item.slug} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}
        </div>
        <div className="re-neighborhood-stage__readout" role="tabpanel" aria-live="polite">
          <h2>{area.name}</h2><p>{area.summary}</p>
          <dl><div><dt>Architecture</dt><dd>{area.architecture}</dd></div><div><dt>Housing</dt><dd>{area.housing}</dd></div><div><dt>Access</dt><dd>{area.access}</dd></div></dl>
          <Link className="re-button re-button--light" href={`${realEstateBase}/neighborhoods/${area.slug}`}>Open {area.name} folio <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
