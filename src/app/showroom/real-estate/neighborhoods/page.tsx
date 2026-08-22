import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NeighborhoodStage } from "@/features/demos/real-estate/editorial-explorers.client";
import { neighborhoods, realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Neighborhood Atlas" };

export default function NeighborhoodsPage() {
  return (
    <main className="re-main" id="real-estate-main">
      <NeighborhoodStage neighborhoods={neighborhoods} />
      <div className="re-atlas-note"><p>All ranges and market activity are illustrative sample data dated August 2026. Verify current property and municipal sources before making a housing decision.</p><Link href={`${realEstateBase}/tools/neighborhood-comparison`}>Open side-by-side comparison →</Link></div>
      <section className="re-atlas">
        {neighborhoods.map((area, index) => <article key={area.slug} className={index % 2 ? "re-atlas-entry re-atlas-entry--reverse" : "re-atlas-entry"}>
          <Link className="re-atlas-entry__image" href={`${realEstateBase}/neighborhoods/${area.slug}`}><Image src={area.image} alt={`Sample architectural view representing ${area.name}`} width={1800} height={1200} sizes="(max-width: 768px) 100vw, 56vw" /></Link>
          <div><p className="re-kicker">Atlas entry {String(index + 1).padStart(2, "0")}</p><h2><Link href={`${realEstateBase}/neighborhoods/${area.slug}`}>{area.name}</Link></h2><p>{area.summary}</p><dl><div><dt>Housing</dt><dd>{area.housing}</dd></div><div><dt>Architecture</dt><dd>{area.architecture}</dd></div><div><dt>Sample range</dt><dd>{area.priceRange}</dd></div></dl><Link className="re-button" href={`${realEstateBase}/neighborhoods/${area.slug}`}>Open neighborhood folio <span aria-hidden="true">→</span></Link></div>
        </article>)}
      </section>
    </main>
  );
}
