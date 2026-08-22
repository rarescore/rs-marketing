"use client";

import Link from "next/link";
import { useState } from "react";
import type { PlumbingService } from "./data";
import { plumbingBase } from "./data";

export function ServiceSystemExplorer({ services }: { services: PlumbingService[] }) {
  const [active, setActive] = useState(0);
  const service = services[active] ?? services[0];
  if (!service) return null;
  return (
    <section className="pl-system-explorer" aria-labelledby="pl-system-explorer-title">
      <header><p className="pl-eyebrow">Interactive service map</p><h2 id="pl-system-explorer-title">Which part of the home is asking for attention?</h2><p>Choose the closest system. This is orientation, not a diagnosis.</p></header>
      <div className="pl-system-explorer__body">
        <div className="pl-system-explorer__schematic" aria-hidden="true">
          <div className="pl-system-explorer__house"><i /><i /><i /><i /></div>
          <div className={`pl-system-explorer__trace pl-system-explorer__trace--${active % 4}`} />
          <span>SUPPLY</span><span>HEAT</span><span>DRAIN</span><span>FIXTURE</span>
        </div>
        <div className="pl-system-explorer__controls" role="tablist" aria-label="Plumbing systems">
          {services.map((item, index) => <button key={item.slug} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><small>{String(index + 1).padStart(2, "0")}</small><strong>{item.name}</strong></button>)}
        </div>
        <div className="pl-system-explorer__readout" role="tabpanel" aria-live="polite">
          <span>What you may notice</span><h3>{service.name}</h3><p>{service.short}</p>
          <ul>{service.symptoms.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          <div><Link href={`${plumbingBase}/services/${service.slug}`}>Open service path →</Link><Link href={`${plumbingBase}/tools/${service.tool}`}>{service.toolLabel} →</Link></div>
        </div>
      </div>
    </section>
  );
}
