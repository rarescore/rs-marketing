import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { EditorialCta } from "@/features/demos/real-estate/real-estate-layout";
import { ArchitecturalSequence } from "@/features/demos/real-estate/architectural-sequence.client";
import { formatPrice, listings, realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Residential advisory for Pasadena" };

export default function RealEstateDemoPage() {
  const [lead, ...rest] = listings;
  if (!lead) return null;

  return (
    <main className="re-main" id="real-estate-main">
      <ViewTransition name="portal-real-estate" share="portal-morph" default="none">
        <section className="re-hero" aria-labelledby="re-home-title">
          <div className="re-hero__image">
            <Image src={lead.image} alt="" fill priority loading="eager" sizes="100vw" />
            <ArchitecturalSequence />
          </div>
          <div className="re-hero__content">
            <div className="re-hero__copy">
              <p className="re-kicker">Pasadena · Altadena · San Gabriel foothills</p>
              <h1 id="re-home-title">A clear way through a consequential move.</h1>
              <p>Property search, sale strategy, and decision tools led by one local advisory practice.</p>
              <Link className="re-button re-button--light" href={`${realEstateBase}/listings`}>Explore sample properties <span aria-hidden="true">→</span></Link>
            </div>
            <Link className="re-hero__folio" href={`${realEstateBase}/listings/${lead.slug}`}>
              <p>Current property edit · Sample listing</p>
              <strong>{lead.address}</strong>
              <p>{formatPrice(lead.price)} · {lead.beds} bed · {lead.area.toLocaleString()} sq ft</p>
            </Link>
          </div>
        </section>
      </ViewTransition>

      <section className="re-section re-section--light">
        <div className="re-section__head">
          <p className="re-kicker">The current property edit</p>
          <h2>Four houses. Four different decisions.</h2>
          <p>Sample inventory selected to demonstrate how the system handles architectural detail, practical criteria, and context—not just a photo grid.</p>
        </div>
        <div className="re-property-edit re-property-edit--editorial">
          <Link className="re-property-lead" href={`${realEstateBase}/listings/${lead.slug}`}>
            <Image src={lead.image} alt={lead.alt} width={1800} height={1200} loading="eager" sizes="(max-width: 768px) 100vw, 65vw" />
            <div className="re-property-lead__caption">
              <p className="re-kicker">{lead.neighborhood} · Sample property</p>
              <h3>{lead.address}</h3>
              <p>{formatPrice(lead.price)} · {lead.beds} bd · {lead.baths} ba · {lead.area.toLocaleString()} sq ft</p>
            </div>
          </Link>
          <div className="re-property-list">
            {rest.map((listing) => (
              <Link className="re-property-row" key={listing.slug} href={`${realEstateBase}/listings/${listing.slug}`}>
                <Image src={listing.image} alt="" width={160} height={160} sizes="88px" />
                <div><h3>{listing.address}</h3><p>{listing.neighborhood} · {formatPrice(listing.price)}</p></div>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
            <Link className="re-button" href={`${realEstateBase}/listings`}>Open property search <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="re-split" aria-label="Buying and selling pathways">
        <article>
          <p className="re-kicker">Buying</p>
          <h2>Search with a brief, not a browser habit.</h2>
          <p>Clarify cost, place, property condition, and offer position before the right house appears.</p>
          <Link className="re-button" href={`${realEstateBase}/buying`}>See the buying process <span aria-hidden="true">→</span></Link>
        </article>
        <article>
          <p className="re-kicker">Selling</p>
          <h2>Decide what matters before market day.</h2>
          <p>Sequence preparation, pricing, presentation, and offer review around the move you are actually making.</p>
          <Link className="re-button" href={`${realEstateBase}/selling`}>Plan a sale <span aria-hidden="true">→</span></Link>
        </article>
      </section>

      <section className="re-market-note">
        <div><p className="re-kicker">Market note · Illustrative Q2 2026</p><h2>More choice. Less room for vague positioning.</h2></div>
        <div className="re-market-note__copy">
          <p>Sample inventory has widened unevenly across the foothill markets. Well-prepared houses still earn concentrated attention; ambiguous condition and pricing require more patience.</p>
          <div><p>Use the market letter for dated, objective sample figures and the assumptions behind them.</p><Link className="re-button re-button--light" href={`${realEstateBase}/market-intelligence`}>Read market intelligence <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="re-tool-feature">
        <div className="re-tool-feature__diagram" aria-hidden="true"><span>30 / 60 / 90 day move plan</span></div>
        <div className="re-tool-feature__copy">
          <p className="re-kicker">Move Strategy Studio</p>
          <h2>Turn a complicated move into a workable sequence.</h2>
          <p>Answer a focused set of questions about buying, selling, timing, financing, property condition, and constraints. Leave with a personalized plan before sharing contact information.</p>
          <Link className="re-button re-button--solid" href={`${realEstateBase}/tools/move-strategy-studio`}>Build my move plan <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="re-advisor">
        <div className="re-advisor__image"><Image src="/images/real-estate/elena-ward.jpg" alt="Elena Ward, a fictional advisor used in this demonstration" width={1200} height={1500} sizes="(max-width: 768px) 100vw, 44vw" /></div>
        <div><p className="re-kicker">The advisor · Fictional demonstration identity</p><h2>Advice shaped around the decision, not the transaction.</h2><p>Elena Ward is a fictional advisor created for this demonstration. Her role illustrates a client experience grounded in local property knowledge, clear preparation, and a documented next step.</p><Link className="re-button" href={`${realEstateBase}/team`}>How the advisory works <span aria-hidden="true">→</span></Link></div>
      </section>

      <EditorialCta title="Begin with the move, not a generic form." copy="Tell us whether you are buying, selling, doing both, or asking about one property. The next questions adjust to that context." href={`${realEstateBase}/consultation`} label="Start a consultation" />
    </main>
  );
}
