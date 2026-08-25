import Link from "next/link";
import type { ReactNode } from "react";
import { firmName, lawPhoneDisplay, lawPhoneHref } from "./data";

const nav = [["What To Do Now", "/after-an-accident"], ["Accidents", "/practice-areas"], ["How We Help", "/process"], ["Attorneys", "/attorneys"], ["Resources", "/resources"], ["Contact", "/consultation"]] as const;

export function InjuryLayout({ children }: { children: ReactNode }) {
  return <div className="il-site" data-theme="injury-law">
    <a className="il-skip" href="#injury-main">Skip to main content</a>
    <div className="il-utility"><span>California personal injury counsel</span><a href={lawPhoneHref}>Call now <strong>{lawPhoneDisplay}</strong></a></div>
    <header className="il-header">
      <Link className="il-brand" href="/" aria-label={`${firmName}, home`}><span className="il-brand__mark" aria-hidden="true"><i/><i/><i/></span><span><strong>LEV &amp; ON</strong><small>LAW FIRM</small></span></Link>
      <nav className="il-nav" aria-label="Primary navigation">{nav.map(([label, href])=><Link key={href} href={href}>{label}</Link>)}</nav>
      <div className="il-header__actions"><a href={lawPhoneHref}>{lawPhoneDisplay}</a><Link className="il-button il-button--ink il-header__cta" href="/#tell-us">Free Case Review</Link></div>
      <details className="il-menu"><summary>Menu</summary><nav aria-label="Mobile navigation">{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav></details>
    </header>
    {children}
    <footer className="il-footer">
      <div className="il-footer__identity"><p className="il-footer__brand">LEV &amp; ON LAW FIRM</p><p>California personal-injury counsel.</p><a href={lawPhoneHref}>{lawPhoneDisplay}</a><a href="mailto:hello.rarescore@gmail.com">hello.rarescore@gmail.com</a><small>Office address, intake hours, languages, and individual California Bar details are awaiting firm verification and will not be invented.</small></div>
      <div className="il-footer__links"><nav aria-label="Firm navigation"><strong>Firm</strong><Link href="/process">How We Help</Link><Link href="/process">Our Process</Link><Link href="/attorneys">Attorneys</Link><Link href="/consultation">Contact</Link><Link href="/#tell-us">Free Case Review</Link></nav><nav aria-label="Information navigation"><strong>Information</strong><Link href="/after-an-accident">What To Do Now</Link><Link href="/practice-areas">Accidents</Link><Link href="/resources">Resources</Link><Link href="/sitemap.xml">Sitemap</Link></nav><nav aria-label="Legal navigation"><strong>Legal</strong><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/accessibility">Accessibility</Link><Link href="/advertising">Attorney Advertising</Link></nav></div>
      <p className="il-disclosure">This website provides general information and is not legal advice. Submitting a form does not create an attorney-client relationship. Representation begins only after conflicts review and a written agreement. Have all legal and advertising language reviewed by a licensed California attorney before publication.</p>
    </footer>
    <div className="il-mobile-actions" aria-label="Immediate actions"><a href={lawPhoneHref}>Call Now</a><Link href="/#tell-us">Request a Call</Link></div>
  </div>;
}

export function InjuryPageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <header className="il-page-intro"><p className="il-eyebrow">{eyebrow}</p><h1>{title}</h1><div>{children}</div></header>; }
export function InjuryCta({ title, copy, href="/#free-case-review", label="Request a Free Review" }: { title:string; copy:string; href?:string; label?:string }) { return <section className="il-cta"><div><p className="il-eyebrow">Prepared from the first call</p><h2>{title}</h2></div><div><p>{copy}</p><Link className="il-button il-button--paper" href={href}>{label}<span aria-hidden="true">→</span></Link></div></section>; }
