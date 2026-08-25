import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialCta, PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Selling" };

const saleStages = [
  ["Diagnose", "Read the property, likely buyer, condition, timing, and competitive set."],
  ["Prepare", "Prioritize only the work that improves clarity, confidence, or market readiness."],
  ["Position", "Choose a pricing and launch posture that fits the evidence—not a promise."],
  ["Present", "Build the photography, floor-plan, narrative, and showing experience around what is specific."],
  ["Evaluate", "Compare price, terms, concessions, contingencies, timing, and execution risk together."],
  ["Negotiate & close", "Manage the chosen offer through diligence, appraisal, title, and the next move."],
] as const;

export default function SellingPage() {
  return (
    <main className="re-main" id="real-estate-main">
      <PageIntro eyebrow="Selling advisory" title="Build the sale around the move that follows."><p>Pricing, preparation, presentation, and negotiation work better when the next housing decision is part of the same plan.</p></PageIntro>
      <section className="re-sale-case">
        <div className="re-sale-case__image"><Image src="/images/real-estate/spanish-courtyard.jpg" alt="Sample Spanish Colonial property used to demonstrate presentation planning" fill sizes="(max-width: 768px) 100vw, 52vw" /></div>
        <div><p className="re-kicker">Property diagnosis</p><h2>Not every improvement belongs on the list.</h2><p>Separate must-address condition, presentation clarity, optional polish, and work that is unlikely to return its time or cost. Then connect the preparation schedule to photography, launch, and your desired move date.</p><Link className="re-button" href={`${realEstateBase}/tools/seller-readiness`}>Build a readiness report <span aria-hidden="true">→</span></Link></div>
      </section>
      <section className="re-sale-sequence"><p className="re-kicker">The sale file</p><ol>{saleStages.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
      <section className="re-offer-callout"><div><p className="re-kicker">Offer evaluation</p><h2>The highest number and the strongest path are not always the same.</h2></div><div><p>Review net, financing, contingencies, concessions, close timing, occupancy, and confidence in execution without hiding the tradeoffs behind a score.</p><Link className="re-button re-button--light" href={`${realEstateBase}/tools/offer-comparison`}>Compare sample offers <span aria-hidden="true">→</span></Link></div></section>
      <EditorialCta title="Start with a property and timing conversation." copy="No instant valuation theater. Establish condition, timing, and the next move before choosing a launch strategy." href={`${realEstateBase}/consultation?intent=selling`} label="Discuss a sale" />
    </main>
  );
}
