import type { Metadata } from "next";
import Link from "next/link";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { MarketingPage, PageCta } from "@/features/onlev/site/marketing-page";

export const metadata: Metadata = {
  title: "Live Systems",
  description: "Experience ONLEV's complete live demonstration systems for Real Estate, Home Services, and Injury Law.",
  alternates: { canonical: "/work" },
};

const systems = [
  { n: "01", vertical: "Real Estate", brand: "Atelier North", route: "/showroom/real-estate", tool: "/showroom/real-estate/tools/move-strategy-studio", identity: "Architectural market folio", story: "A high-consideration property journey that turns browsing into preparation, preparation into context, and context into an advisor conversation.", proof: ["Property search + listing detail", "Buying, selling, neighborhoods, intelligence", "Six working decision tools", "Contextual showing and consultation flows"] },
  { n: "02", vertical: "Home Services", brand: "Field Standard", route: "/showroom/plumbing", tool: "/showroom/plumbing/tools/plumbing-passport", identity: "Technical house-systems manual", story: "A homeowner experience that separates emergency guidance from planned work, makes symptoms easier to communicate, and prepares a useful service request.", proof: ["Emergency-first routing", "Service and territory architecture", "Seven working homeowner tools", "Prepared service request flow"] },
  { n: "03", vertical: "Injury Law", brand: "Morrow & Vale", route: "/showroom/injury-law", tool: "/showroom/injury-law/case-review", identity: "The Clear Record", story: "A trauma-aware legal journey that replaces pressure with orientation, gives practical next steps, and preserves a calm path to confidential human review.", proof: ["Practice areas + after-accident guidance", "Process, attorneys, and resources", "Ten-part Incident & Impact Review", "Result-first consultation path"] },
];

export default function WorkPage() {
  return (
    <OnlevShell>
      <MarketingPage marker="W / 03" eyebrow="Live systems" title="The proof is interactive." introduction="These businesses sell different kinds of trust. Their websites should not share a skin, a motion preset, or a conversion script. Enter each one and use the system as a customer would.">
        <section className="onlev-work-list">
          {systems.map((system) => (
            <article className={`onlev-work-item onlev-work-item--${system.n}`} key={system.n} data-onlev-reveal>
              <div className="onlev-work-item__meta"><span>{system.n}</span><p>{system.vertical}</p><small>{system.identity}</small></div>
              <div className="onlev-work-item__scene" aria-hidden="true"><div><i /><i /><i /></div><strong>{system.brand}</strong></div>
              <div className="onlev-work-item__copy"><h2>{system.brand}</h2><p>{system.story}</p><ul>{system.proof.map((item) => <li key={item}>{item}</li>)}</ul><div><Link href={system.route}>Enter the complete site <span aria-hidden="true">↗</span></Link><Link href={system.tool}>Start with the flagship tool <span aria-hidden="true">→</span></Link></div></div>
            </article>
          ))}
        </section>
        <PageCta title="Picture this depth with your business inside it." body="The demos are not packages to recolor. They show the level of strategy, usefulness, and finish a custom ONLEV engagement can bring to your market." />
      </MarketingPage>
    </OnlevShell>
  );
}
