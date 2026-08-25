import type { Metadata } from "next";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { MarketingPage, PageCta } from "@/features/onlev/site/marketing-page";

export const metadata: Metadata = {
  title: "Process",
  description: "How ONLEV discovers, designs, builds, connects, and improves a custom client-acquisition system.",
  alternates: { canonical: "/process" },
};

const phases = [
  ["01", "Fit + system audit", "We review the offer, market, current site, lead sources, qualification, response process, data boundaries, and the business constraint worth solving.", "Outcome: a decision on fit and a focused opportunity map."],
  ["02", "Strategy + architecture", "We define positioning, customer journeys, page and tool architecture, conversion moments, operational handoffs, measurement, and production dependencies.", "Outcome: a signed-off system blueprint and scope."],
  ["03", "Art direction + experience", "We create the visual world, typography, responsive compositions, interaction prototypes, content direction, and signature moments appropriate to the business.", "Outcome: a design system and approved key journeys."],
  ["04", "Build + integration", "We implement the responsive site, tools, structured forms, server validation, integrations, consent, attribution, analytics, accessibility, and performance foundation.", "Outcome: a complete staged system with real workflows connected."],
  ["05", "QA + launch", "We test devices, browsers, routes, forms, motion, reduced motion, performance, data handling, integrations, fallbacks, and operational readiness.", "Outcome: a controlled launch with documented ownership."],
  ["06", "Measure + improve", "After enough real signal exists, we study the customer path and downstream lead outcomes to prioritize improvements that matter.", "Outcome: evidence-led iteration, not random redesign."],
] as const;

export default function ProcessPage() {
  return (
    <OnlevShell>
      <MarketingPage marker="P / 02" eyebrow="The engagement" title="Clarity before screens. Operations before automation." introduction="The process is designed to keep the work specific: every design decision connects to a customer need, every integration connects to a real owner, and every launch dependency is visible.">
        <section className="onlev-process-ledger" aria-label="ONLEV engagement phases">
          {phases.map(([number, title, body, outcome]) => (
            <article key={number} data-onlev-reveal><span>{number}</span><h2>{title}</h2><p>{body}</p><strong>{outcome}</strong></article>
          ))}
        </section>
        <section className="onlev-page-split">
          <div data-onlev-reveal><p className="onlev-kicker">What we need from you</p><h2>Access to the truth of the business.</h2></div>
          <div data-onlev-reveal><p>We need the real offer, real constraints, real response capacity, and access to the people who know how customers decide. Fast feedback matters; performative workshops do not.</p><ul><li>One accountable decision-maker</li><li>Subject-matter access</li><li>Source materials and production permissions</li><li>Integration and compliance stakeholders when required</li><li>Honest definitions of a qualified opportunity and successful response</li></ul></div>
        </section>
        <PageCta title="A good process should make the investment easier to understand." />
      </MarketingPage>
    </OnlevShell>
  );
}
