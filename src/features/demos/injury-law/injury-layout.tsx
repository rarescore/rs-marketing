import Link from "next/link";
import type { ReactNode } from "react";
import { firmName, lawPhoneDisplay, lawPhoneHref } from "./data";

const nav = [["What to do now", "/after-an-accident"], ["Practice areas", "/practice-areas"], ["Our process", "/process"], ["Resources", "/resources"]] as const;

export function InjuryLayout({ children }: { children: ReactNode }) {
  return <div className="il-site" data-theme="injury-law">
    <a className="il-skip" href="#injury-main">Skip to main content</a>
    <div className="il-utility"><span>California personal injury counsel</span><a href={lawPhoneHref}>Call now <strong>{lawPhoneDisplay}</strong></a></div>
    <header className="il-header">
      <Link className="il-brand" href="/" aria-label={`${firmName}, home`}><span className="il-brand__mark" aria-hidden="true"><i/><i/><i/></span><span><strong>LEV &amp; ON</strong><small>LAW FIRM</small></span></Link>
      <nav className="il-nav" aria-label="Primary navigation">{nav.map(([label, href])=><Link key={href} href={href}>{label}</Link>)}</nav>
      <Link className="il-button il-button--ink il-header__cta" href="/#free-case-review">Free Case Review</Link>
      <details className="il-menu"><summary>Menu</summary><nav aria-label="Mobile navigation">{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}<Link href="/consultation">Contact</Link></nav></details>
    </header>
    {children}
    <footer className="il-footer">
      <div><p className="il-footer__brand">LEV &amp; ON LAW FIRM</p><p>Early action. Serious preparation. Direct answers.</p><a href={lawPhoneHref}>{lawPhoneDisplay}</a></div>
      <nav aria-label="Footer navigation"><Link href="/practice-areas">Practice areas</Link><Link href="/resources">Resources</Link><Link href="/consultation">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/advertising">Attorney Advertising</Link><Link href="/accessibility">Accessibility</Link></nav>
      <p className="il-disclosure">Attorney Advertising. This website provides general information, not legal advice. Sending a form does not create an attorney-client relationship. Representation begins only after a conflicts check and a written agreement. Do not send confidential or time-sensitive information through this website. No outcome is promised or guaranteed.</p>
    </footer>
    <div className="il-mobile-actions" aria-label="Immediate actions"><a href={lawPhoneHref}>Call Now</a><Link href="/#free-case-review">Free Case Review</Link></div>
  </div>;
}

export function InjuryPageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <header className="il-page-intro"><p className="il-eyebrow">{eyebrow}</p><h1>{title}</h1><div>{children}</div></header>; }
export function InjuryCta({ title, copy, href="/#free-case-review", label="Request a Free Review" }: { title:string; copy:string; href?:string; label?:string }) { return <section className="il-cta"><div><p className="il-eyebrow">Prepared from the first call</p><h2>{title}</h2></div><div><p>{copy}</p><Link className="il-button il-button--paper" href={href}>{label}<span aria-hidden="true">→</span></Link></div></section>; }
