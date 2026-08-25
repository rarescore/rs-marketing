"use client";

import { useState } from "react";
import Link from "next/link";

const matters = [
  { name: "Car Accidents", slug: "car-accidents", evidence: ["Scene photographs", "Vehicle damage", "Police reports", "Witness information", "Traffic or security cameras", "Dashcam recordings"] },
  { name: "Truck Accidents", slug: "truck-accidents", evidence: ["Electronic vehicle data", "Driver logs", "Inspection records", "Cargo information", "Vehicle damage", "Witness information"] },
  { name: "Motorcycle Accidents", slug: "motorcycle-accidents", evidence: ["Motorcycle and helmet condition", "Roadway photographs", "Vehicle damage", "Witness information", "Traffic cameras", "Medical documentation"] },
  { name: "Rideshare Accidents", slug: "rideshare-accidents", evidence: ["Rideshare app status", "Trip receipts", "Platform messages", "Vehicle damage", "Police reports", "Insurance communications"] },
  { name: "Pedestrian Accidents", slug: "pedestrian-accidents", evidence: ["Traffic or security cameras", "Scene photographs", "Signal timing", "Witness information", "Driver records", "Medical documentation"] },
  { name: "Bicycle Accidents", slug: "bicycle-accidents", evidence: ["Bicycle and helmet condition", "Ride-app data", "Scene photographs", "Vehicle damage", "Traffic cameras", "Witness information"] },
  { name: "Unsafe Property and Falls", slug: "unsafe-property", evidence: ["Property photographs", "Incident reports", "Security cameras", "Inspection records", "Maintenance records", "Witness information"] },
  { name: "Serious Injuries", slug: "serious-injuries", evidence: ["Medical documentation", "Future-care records", "Wage and employment records", "Daily-life documentation", "Accessibility costs", "Insurance records"] },
  { name: "Wrongful Death", slug: "wrongful-death", evidence: ["Official reports", "Medical documentation", "Incident evidence", "Household records", "Wage and employment records", "Insurance records"] },
] as const;

export function EvidenceBoard() {
  const [active, setActive] = useState(0);
  const matter = matters[active] ?? matters[0];

  return <section className="il-evidence" aria-labelledby="evidence-heading">
    <div className="il-shell">
      <header className="il-evidence__head">
        <div><p className="il-eyebrow">Accident and evidence explorer</p><h2 id="evidence-heading">Different accidents leave different evidence behind.</h2></div>
        <p>The type of accident changes what should be preserved, who may be responsible, which insurance policies may apply, and how quickly important information can disappear.</p>
      </header>
      <div className="il-evidence__board">
        <div className="il-evidence__tabs" aria-label="Choose an accident type">
          {matters.map((item, index) => <button key={item.slug} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}
        </div>
        <div className="il-evidence__file" aria-live="polite">
          <div className="il-evidence__file-label"><span>Evidence file</span><b>{String(active + 1).padStart(2, "0")} / {String(matters.length).padStart(2, "0")}</b></div>
          <h3>{matter.name}</h3>
          <p>Evidence that may be relevant includes:</p>
          <ul>{matter.evidence.map((item) => <li key={item}><span aria-hidden="true" />{item}</li>)}</ul>
          <p className="il-evidence__note">The evidence needed depends on the facts of the incident. This list is a starting point, not a statement that every item applies.</p>
          <Link href={`/practice-areas/${matter.slug}`}>Explore {matter.name} <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <Link className="il-evidence__all" href="/practice-areas">Explore Your Type of Accident <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
