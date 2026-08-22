import Link from "next/link";
import type { ReactNode } from "react";
import { ShowroomControl } from "@/features/showroom/showroom-control";
import { LevOnBrand } from "@/features/demos/shared/lev-on-brand";
import { SystemLensPanel } from "./system-lens-panel.client";
import { realEstateBase } from "./data";

const navigation = [
  ["Properties", `${realEstateBase}/listings`],
  ["Buy", `${realEstateBase}/buying`],
  ["Sell", `${realEstateBase}/selling`],
  ["Neighborhoods", `${realEstateBase}/neighborhoods`],
  ["Market", `${realEstateBase}/market-intelligence`],
  ["Tools", `${realEstateBase}/tools`],
] as const;

export function RealEstateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="re-site" data-theme="real-estate">
      <a className="re-skip" href="#real-estate-main">Skip to main content</a>
      <header className="re-header">
        <Link className="re-brand" href={realEstateBase} aria-label="Lev & On Residential, home">
          <LevOnBrand descriptor="Residential" />
        </Link>
        <nav className="re-nav" aria-label="Real Estate">
          {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="re-header__cta" href={`${realEstateBase}/tools/move-strategy-studio`}>Plan a move</Link>
        <details className="re-menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile Real Estate navigation">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href={`${realEstateBase}/team`}>Advisor</Link>
            <Link href={`${realEstateBase}/consultation`}>Consultation</Link>
          </nav>
        </details>
      </header>
      {children}
      <footer className="re-footer">
        <div>
          <Link className="re-brand" href={realEstateBase} aria-label="Lev & On Residential, home"><LevOnBrand descriptor="Residential" compact /></Link>
          <p>Residential advisory for Pasadena, Altadena, and the San Gabriel foothills.</p>
        </div>
        <nav aria-label="Footer">
          <Link href={`${realEstateBase}/listings`}>Properties</Link>
          <Link href={`${realEstateBase}/market-intelligence`}>Market intelligence</Link>
          <Link href={`${realEstateBase}/team`}>Advisor</Link>
          <Link href={`${realEstateBase}/client-stories`}>Move scenarios</Link>
          <Link href={`${realEstateBase}/consultation`}>Consultation</Link>
        </nav>
        <p className="re-disclosure">A fictional brand and sample-data demonstration. Properties, advisor, market figures, and requests are illustrative and are not MLS inventory or real brokerage services.</p>
      </footer>
      <SystemLensPanel />
      <ShowroomControl current="real-estate" systemLensEnabled getThisSystemHref={`${realEstateBase}/consultation?audience=business-owner`} />
    </div>
  );
}

export function Folio({ children }: { children: ReactNode }) {
  return <div className="re-folio">{children}</div>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <header className="re-page-intro">
      <p className="re-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <div>{children}</div>
    </header>
  );
}

export function EditorialCta({ title, copy, href, label }: { title: string; copy: string; href: string; label: string }) {
  return (
    <section className="re-editorial-cta">
      <p className="re-kicker">A useful next conversation</p>
      <h2>{title}</h2>
      <p>{copy}</p>
      <Link className="re-button re-button--light" href={href}>{label}<span aria-hidden="true">→</span></Link>
    </section>
  );
}
