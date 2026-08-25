import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { MechanicalHero } from "@/features/demos/plumbing/mechanical-hero.client";
import { PlumbingCta } from "@/features/demos/plumbing/plumbing-layout";
import { demoPhoneDisplay, demoPhoneHref, plumbingBase, services, tools } from "@/features/demos/plumbing/data";

export const metadata: Metadata = { title: "Plumbing service, made legible" };

export default function PlumbingHome() {
  return <main className="pl-main" id="plumbing-main">
    <ViewTransition name="portal-plumbing" share="portal-morph" default="none"><section className="pl-hero">
      <div className="pl-hero__copy"><p className="pl-eyebrow">Residential plumbing · Pasadena foothills</p><h1>Know what is happening. Know what comes next.</h1><p className="pl-hero__lead">A complete service system for urgent problems, planned work, and the records your home should have.</p>
        <div className="pl-decision" aria-label="Choose urgent or planned service"><div className="pl-decision__urgent"><p>Active leak, no water, gas concern, or sewage?</p><a href={demoPhoneHref}>Call demo line <strong>{demoPhoneDisplay}</strong></a><Link href={`${plumbingBase}/emergency`}>See immediate safety guidance</Link></div><div><p>Diagnosing, maintaining, or planning?</p><Link className="pl-button pl-button--primary" href={`${plumbingBase}/request-service`}>Request service</Link><Link href={`${plumbingBase}/tools`}>Use a planning tool</Link></div></div>
      </div><MechanicalHero />
    </section></ViewTransition>
    <section className="pl-trust-rail" aria-label="Demonstration operating model"><span>01 / Clear intake</span><span>02 / Documented findings</span><span>03 / Options before work</span><span>04 / Property record updated</span></section>
    <section className="pl-service-index"><header><p className="pl-eyebrow">Service index</p><h2>Start with the system, not a sales pitch.</h2><p>Each pathway explains what to notice, what a technician would check, and what can affect scope.</p></header><div>{services.map((service, index) => <Link key={service.slug} href={`${plumbingBase}/services/${service.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{service.name}</strong><p>{service.short}</p><b aria-hidden="true">→</b></Link>)}</div></section>
    <section className="pl-passport-feature"><div className="pl-passport-feature__record" aria-hidden="true"><span>PROPERTY SYSTEM RECORD</span><div><i>Supply</i><b>Document</b></div><div><i>Water heating</i><b>Document</b></div><div><i>Drainage</i><b>Document</b></div><div><i>Shutoffs</i><b>Locate</b></div><small>Owner-held · Downloadable · Private by default</small></div><div><p className="pl-eyebrow">Signature tool · {tools[0].time}</p><h2>A Plumbing Passport for the whole home.</h2><p>Build a useful record of known materials, equipment, fixtures, shutoffs, observations, and inspection questions. Download the record before deciding whether to contact anyone.</p><Link className="pl-button pl-button--dark" href={`${plumbingBase}/tools/plumbing-passport`}>Build my Plumbing Passport <span aria-hidden="true">→</span></Link></div></section>
    <section className="pl-process"><header><p className="pl-eyebrow">A documented service path</p><h2>Less uncertainty at every handoff.</h2></header><ol><li><span>01</span><h3>Describe</h3><p>Choose the symptom, urgency, and known property context.</p></li><li><span>02</span><h3>Review</h3><p>The right service category and preparation notes reach the request.</p></li><li><span>03</span><h3>Evaluate</h3><p>Onsite conditions, measurements, access, and applicable requirements are checked.</p></li><li><span>04</span><h3>Document</h3><p>Findings, options, and owner-held system records stay understandable.</p></li></ol></section>
    <section className="pl-tool-rail"><header><p className="pl-eyebrow">Field tools</p><h2>Arrive at the conversation better prepared.</h2></header><div>{tools.slice(1, 5).map((tool) => <Link href={`${plumbingBase}/tools/${tool.slug}`} key={tool.slug}><small>{tool.time}</small><h3>{tool.name}</h3><p>{tool.output}</p><span aria-hidden="true">Open worksheet →</span></Link>)}</div></section>
    <PlumbingCta title="Tell us what the home is showing you." copy="Start with an urgent/non-urgent choice, service category, property type, and preferred contact window. This demonstration prepares a request but sends and retains nothing." />
  </main>;
}
