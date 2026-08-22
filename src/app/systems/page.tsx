import type { Metadata } from "next";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { DefinitionRows, MarketingPage, PageCta } from "@/features/onlev/site/marketing-page";

export const metadata: Metadata = {
  title: "What We Build",
  description: "See how ONLEV combines positioning, websites, useful tools, lead capture, follow-up, and attribution into one client-winning system.",
  alternates: { canonical: "/systems" },
};

const rows = [
  { label: "01 / Position", title: "Make the choice understandable.", body: "The system begins with the offer, the market, and the actual reason a customer should choose this business. Positioning and conversion copy turn expertise into a clear decision." },
  { label: "02 / Help", title: "Give value before asking for attention.", body: "Industry-specific tools help a visitor compare, plan, document, or prepare. Their output is useful on its own and creates higher-quality context when the visitor wants help." },
  { label: "03 / Capture", title: "Ask for the right signal at the right moment.", body: "Contextual calls to action, qualification, consent, and structured forms reduce generic inquiries and preserve what the visitor was doing when they raised their hand." },
  { label: "04 / Respond", title: "Make the next human action obvious.", body: "Routing, acknowledgements, reminders, calendars, CRM handoffs, and call flows are configured around real response capacity—not an imaginary automation diagram." },
  { label: "05 / Learn", title: "Connect marketing activity to a business outcome.", body: "Source, campaign, entry page, meaningful interaction, call or form, and downstream status can be connected without recording sensitive raw answers." },
];

export default function SystemsPage() {
  return (
    <OnlevShell>
      <MarketingPage marker="S / 01" eyebrow="What ONLEV builds" title="The website is one layer of the answer." introduction="A complete ONLEV engagement connects customer understanding, useful interaction, lead context, response infrastructure, and measurement into one deliberately designed system.">
        <section className="onlev-page-band" data-onlev-reveal>
          <p className="onlev-kicker">The connected scope</p>
          <div className="onlev-page-band__words" aria-label="Typical ONLEV system scope"><span>Positioning</span><span>Brand direction</span><span>Website</span><span>Customer tools</span><span>Qualification</span><span>CRM routing</span><span>Follow-up</span><span>Attribution</span><span>Analytics</span><span>Iteration</span></div>
        </section>
        <DefinitionRows rows={rows} />
        <section className="onlev-system-map" aria-labelledby="system-map-title">
          <div data-onlev-reveal><p className="onlev-kicker">A useful boundary</p><h2 id="system-map-title">Automation supports the relationship. It does not impersonate it.</h2></div>
          <div className="onlev-system-map__diagram" data-onlev-reveal>
            <div><span>Customer</span><strong>Need becomes clear</strong></div><i aria-hidden="true" /><div><span>System</span><strong>Context is preserved</strong></div><i aria-hidden="true" /><div><span>Team</span><strong>A human can respond well</strong></div>
          </div>
          <p data-onlev-reveal>Production scope may include CRM, email, SMS, scheduling, call tracking, analytics, hosting, local-search foundations, security, and consent infrastructure. The exact stack is chosen after the workflow is understood.</p>
        </section>
        <PageCta />
      </MarketingPage>
    </OnlevShell>
  );
}
