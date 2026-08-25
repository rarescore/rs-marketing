import type { ReactNode } from "react";
import Link from "next/link";
import { MarketingMotion } from "./marketing-motion.client";

export function MarketingPage({
  eyebrow,
  title,
  introduction,
  marker,
  children,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  marker: string;
  children: ReactNode;
}) {
  return (
    <div className="onlev-page">
      <MarketingMotion />
      <header className="onlev-page-hero">
        <div className="onlev-page-hero__index"><span>{marker}</span><i /></div>
        <div>
          <p className="onlev-kicker">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <p>{introduction}</p>
      </header>
      {children}
    </div>
  );
}

export function PageCta({
  title = "Let’s map the system your business actually needs.",
  body = "Request a personalized walkthrough. We’ll start with your market, lead flow, and response operation—not a prewritten package.",
}: { title?: string; body?: string }) {
  return (
    <section className="onlev-page-cta" data-onlev-reveal>
      <div><p className="onlev-kicker">The next useful step</p><h2>{title}</h2></div>
      <div><p>{body}</p><Link className="onlev-button" href="/contact">Request your walkthrough <span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}

export function DefinitionRows({ rows }: { rows: Array<{ label: string; title: string; body: string }> }) {
  return (
    <div className="onlev-definition-rows">
      {rows.map((row) => (
        <article key={row.label} data-onlev-reveal>
          <span>{row.label}</span><h2>{row.title}</h2><p>{row.body}</p>
        </article>
      ))}
    </div>
  );
}
