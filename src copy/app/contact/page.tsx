import type { Metadata } from "next";
import { ContactForm } from "@/features/onlev/site/contact-form.client";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { MarketingPage } from "@/features/onlev/site/marketing-page";

export const metadata: Metadata = {
  title: "Request This System",
  description: "Request a personalized ONLEV walkthrough for your business, market, lead flow, and customer journey.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <OnlevShell>
      <MarketingPage marker="C / 04" eyebrow="Request this system" title="Start with the point where customers stop choosing you." introduction="Tell us where the current journey loses clarity, context, or momentum. We’ll use that to prepare a focused fit conversation—not a generic capabilities call.">
        <section className="onlev-contact-layout">
          <aside data-onlev-reveal>
            <p className="onlev-kicker">Before you send</p>
            <h2>A few useful expectations.</h2>
            <dl><div><dt>Response</dt><dd>A human review, not an automated pitch sequence.</dd></div><div><dt>First conversation</dt><dd>Fit, business constraint, customer journey, response operation, and production readiness.</dd></div><div><dt>Investment</dt><dd>Custom scope after discovery. No cheap tiers and no invented price before the work is understood.</dd></div><div><dt>Privacy</dt><dd>The local preview validates but does not send or retain your details. Production delivery requires approved infrastructure.</dd></div></dl>
            <p>Prefer email? <a href="mailto:hello@onlev.site">hello@onlev.site</a></p>
          </aside>
          <ContactForm />
        </section>
      </MarketingPage>
    </OnlevShell>
  );
}
