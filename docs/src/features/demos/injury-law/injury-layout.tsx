import Link from "next/link";
import type { ReactNode } from "react";
import { ShowroomControl } from "@/features/showroom/showroom-control";
import { InjurySystemLens } from "./system-lens-panel.client";
import { demoLawPhoneDisplay, demoLawPhoneHref, injuryBase } from "./data";

const nav = [
  ["What to do now", `${injuryBase}/after-an-accident`],
  ["Case review", `${injuryBase}/case-review`],
  ["Practice areas", `${injuryBase}/practice-areas`],
  ["Attorneys", `${injuryBase}/attorneys`],
  ["Resources", `${injuryBase}/resources`],
] as const;

export function InjuryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="il-site" data-theme="injury-law">
      <a className="il-skip" href="#injury-main">Skip to main content</a>
      <div className="il-utility">
        <span>California demonstration · not a real law firm</span>
        <a href={demoLawPhoneHref}>Human help <strong>{demoLawPhoneDisplay}</strong></a>
      </div>
      <header className="il-header">
        <Link className="il-brand" href={injuryBase} aria-label="Morrow and Vale, home">
          <span className="il-brand__mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>MORROW &amp; VALE</strong><small>INJURY COUNSEL · DEMONSTRATION</small></span>
        </Link>
        <nav className="il-nav" aria-label="Injury law demonstration">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="il-button il-button--ink il-header__cta" href={`${injuryBase}/consultation`}>Talk with someone</Link>
        <details className="il-menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile injury law navigation">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href={`${injuryBase}/process`}>How the process works</Link>
            <Link href={`${injuryBase}/consultation`}>Consultation</Link>
          </nav>
        </details>
      </header>
      {children}
      <footer className="il-footer">
        <div><p className="il-footer__brand">MORROW &amp; VALE</p><p>Clarity first. Decisions without pressure.</p></div>
        <nav aria-label="Injury law footer">
          <Link href={`${injuryBase}/after-an-accident`}>Immediate guide</Link>
          <Link href={`${injuryBase}/case-review`}>Incident review</Link>
          <Link href={`${injuryBase}/process`}>Process</Link>
          <Link href={`${injuryBase}/consultation`}>Contact</Link>
        </nav>
        <p className="il-disclosure">Morrow &amp; Vale is a fictional brand and this is an educational interface demonstration. It is not a law firm, does not provide legal or medical advice, does not send or retain submitted information, and does not create an attorney-client relationship. Deadlines and rights vary by jurisdiction; speak with a qualified lawyer about a specific situation.</p>
      </footer>
      <div className="il-mobile-actions" aria-label="Immediate actions">
        <a href={demoLawPhoneHref}>Call human help</a>
        <Link href={`${injuryBase}/case-review`}>Start review</Link>
      </div>
      <InjurySystemLens />
      <ShowroomControl current="injury-law" systemLensEnabled getThisSystemHref={`${injuryBase}/consultation?audience=business-owner`} />
    </div>
  );
}

export function InjuryPageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <header className="il-page-intro"><p className="il-eyebrow">{eyebrow}</p><h1>{title}</h1><div>{children}</div></header>;
}

export function InjuryCta({ title, copy, href = `${injuryBase}/consultation`, label = "Request a conversation" }: { title: string; copy: string; href?: string; label?: string }) {
  return <section className="il-cta"><div><p className="il-eyebrow">A human next step</p><h2>{title}</h2></div><div><p>{copy}</p><Link className="il-button il-button--paper" href={href}>{label}<span aria-hidden="true">→</span></Link></div></section>;
}
