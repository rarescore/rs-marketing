import Link from "next/link";
import type { ReactNode } from "react";
import { ShowroomControl } from "@/features/showroom/showroom-control";
import { LevOnBrand } from "@/features/demos/shared/lev-on-brand";
import { demoPhoneDisplay, demoPhoneHref, plumbingBase } from "./data";
import { PlumbingSystemLens } from "./system-lens-panel.client";

const nav = [
  ["Services", `${plumbingBase}/services`],
  ["Service areas", `${plumbingBase}/service-areas`],
  ["Plumbing Passport", `${plumbingBase}/tools/plumbing-passport`],
  ["Resources", `${plumbingBase}/resources`],
  ["Company", `${plumbingBase}/about`],
] as const;

export function PlumbingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pl-site" data-theme="plumbing">
      <a className="pl-skip" href="#plumbing-main">Skip to main content</a>
      <div className="pl-utility">
        <span>Pasadena foothills · Fictional service demonstration</span>
        <a href={demoPhoneHref} aria-label={`Call demo service line ${demoPhoneDisplay}`}>Service line <strong>{demoPhoneDisplay}</strong></a>
      </div>
      <header className="pl-header">
        <Link className="pl-brand" href={plumbingBase} aria-label="Lev & On Home Services, home">
          <LevOnBrand descriptor="Home Services · Plumbing" />
        </Link>
        <nav className="pl-nav" aria-label="Plumbing demo">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="pl-button pl-button--primary pl-header__request" href={`${plumbingBase}/request-service`}>Request service</Link>
        <details className="pl-menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile plumbing navigation">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href={`${plumbingBase}/maintenance`}>Maintenance plan</Link>
            <Link href={`${plumbingBase}/contact`}>Contact</Link>
          </nav>
        </details>
      </header>
      {children}
      <footer className="pl-footer">
        <div><p className="pl-brandline">LEV &amp; ON / HOME SERVICES · PLUMBING</p><p>Clear findings. Documented options. A practical next step.</p></div>
        <nav aria-label="Plumbing footer">
          <Link href={`${plumbingBase}/services`}>Services</Link>
          <Link href={`${plumbingBase}/tools`}>Planning tools</Link>
          <Link href={`${plumbingBase}/maintenance`}>Maintenance</Link>
          <Link href={`${plumbingBase}/contact`}>Contact</Link>
        </nav>
        <p className="pl-disclosure">Lev &amp; On Home Services is a fictional demonstration brand. Phone, license, territory, requests, technical outputs, and operating claims are illustrative. Tool results are preliminary and do not replace onsite evaluation, manufacturer instructions, permits, applicable code, or the authority having jurisdiction.</p>
      </footer>
      <div className="pl-mobile-actions" aria-label="Service actions">
        <a className="pl-mobile-actions__urgent" href={demoPhoneHref}>Urgent? Call</a>
        <Link href={`${plumbingBase}/request-service`}>Request service</Link>
      </div>
      <PlumbingSystemLens />
      <ShowroomControl current="plumbing" systemLensEnabled getThisSystemHref={`${plumbingBase}/contact?audience=business-owner`} />
    </div>
  );
}

export function PlumbingPageIntro({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return <header className="pl-page-intro"><p className="pl-eyebrow">{code}</p><h1>{title}</h1><div>{children}</div></header>;
}

export function PlumbingCta({ title, copy, href = `${plumbingBase}/request-service`, label = "Request service" }: { title: string; copy: string; href?: string; label?: string }) {
  return <section className="pl-cta"><div><p className="pl-eyebrow">Next action</p><h2>{title}</h2></div><div><p>{copy}</p><Link className="pl-button pl-button--light" href={href}>{label}<span aria-hidden="true">→</span></Link></div></section>;
}
