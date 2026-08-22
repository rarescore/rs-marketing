"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { plumbingBase } from "./data";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

const symptoms = [["Active leak", "leaks-and-shutoffs", "Supply isolation"], ["No hot water", "water-heaters", "Water heating"], ["Low pressure", "pressure-and-flow", "Pressure & flow"], ["Drain / sewer", "drains-and-sewers", "Drainage"]] as const;

export function MechanicalHero() {
  const root = useRef<HTMLDivElement>(null);
  const record = useSystemLens((state) => state.record);
  useGSAP(() => {
    const frame = root.current;
    if (!frame) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } }).from(frame, { opacity: 0, y: 12, duration: 0.52 }).from("[data-assembly=system]", { opacity: 0, y: 8, stagger: 0.08, duration: 0.38 }, "-=0.28").from("[data-assembly=needle]", { rotate: -42, transformOrigin: "50% 86%", duration: 0.52 }, "-=0.28");
    });
    return () => media.revert();
  }, { scope: root });

  return <div className="pl-mechanical" ref={root} data-assembly="frame">
    <div className="pl-mechanical__top"><span>WHOLE-HOME SYSTEM / LIVE ORIENTATION</span><span>FIELD PLATE 01</span></div>
    <div className="pl-house-section" aria-label="Simplified house plumbing systems diagram">
      <svg viewBox="0 0 760 500" role="img" aria-labelledby="pl-diagram-title pl-diagram-desc">
        <title id="pl-diagram-title">House plumbing systems section</title><desc id="pl-diagram-desc">A technical section showing water supply, water heating, fixtures, shutoffs, and drainage as separate labeled systems.</desc>
        <path className="pl-house" d="M73 211 380 53l307 158v231H73Z" /><path className="pl-level" d="M73 330h614M380 53v389" />
        <g data-assembly="system" className="pl-supply"><path d="M108 430V245h225v-74M108 309h111v-70M333 309h101v-70M108 382h478v-132" /><circle cx="108" cy="430" r="9" /><path d="m96 407 24 24m0-24-24 24" /></g>
        <g data-assembly="system" className="pl-hot"><path d="M588 389v-139H434M588 315H333v-76M588 355H219V239" /><rect x="551" y="360" width="74" height="69" rx="7" /></g>
        <g data-assembly="system" className="pl-drain"><path d="M219 257v140l50 36h312M434 257v140l-50 36" /><path d="M197 250h44m171 0h44" /></g>
        <g data-assembly="system" className="pl-fixtures"><rect x="187" y="205" width="64" height="34" rx="3" /><rect x="402" y="205" width="64" height="34" rx="3" /><path d="M553 245h70v25h-70" /></g>
        <g className="pl-gauge" transform="translate(560 92)"><circle cx="44" cy="44" r="38" /><path d="M17 56a30 30 0 1 1 54 0" /><path data-assembly="needle" d="m44 45 18-18" /><circle cx="44" cy="45" r="4" /><text x="44" y="71" textAnchor="middle">PSI</text></g>
      </svg>
      <div className="pl-system-key" aria-hidden="true"><span><i className="is-supply" /> Cold supply</span><span><i className="is-hot" /> Heated supply</span><span><i className="is-drain" /> Drainage</span></div>
    </div>
    <div className="pl-symptom-dock"><p>What brought you here?</p><div>{symptoms.map(([label, slug, response]) => <Link key={slug} href={`${plumbingBase}/tools/symptom-triage?symptom=${slug}`} onClick={() => record({ scope: "plumbing", type: "service_category_identified", signal: label, response: `${response} pathway identified`, value: "A better-prepared service conversation", status: "derived" })}>{label}<span aria-hidden="true">↗</span></Link>)}</div></div>
  </div>;
}
