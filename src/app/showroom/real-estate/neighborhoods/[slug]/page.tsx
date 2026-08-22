import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNeighborhood, listings, neighborhoods, realEstateBase } from "@/features/demos/real-estate/data";

export function generateStaticParams() { return neighborhoods.map(({ slug }) => ({ slug })); }
type NeighborhoodPageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> { const { slug } = await params; return { title: getNeighborhood(slug)?.name ?? "Neighborhood" }; }

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { slug } = await params; const area = getNeighborhood(slug); if (!area) notFound();
  const areaListings = listings.filter((listing) => listing.neighborhoodSlug === area.slug);
  return (
    <main className="re-main" id="real-estate-main">
      <section className="re-neighborhood-hero"><div><p className="re-kicker">Neighborhood folio · Objective sample data</p><h1>{area.name}</h1><p>{area.summary}</p></div><div className="re-neighborhood-hero__image"><Image src={area.image} alt={`Sample architectural streetscape representing ${area.name}`} fill priority sizes="(max-width: 768px) 100vw, 60vw" /></div></section>
      <div className="re-neighborhood-facts"><dl><div><dt>Housing</dt><dd>{area.housing}</dd></div><div><dt>Architecture</dt><dd>{area.architecture}</dd></div><div><dt>Sample price range</dt><dd>{area.priceRange}</dd></div><div><dt>Access</dt><dd>{area.access}</dd></div><div><dt>Parks and open space</dt><dd>{area.parks}</dd></div><div><dt>Daily services</dt><dd>{area.dailyLife}</dd></div></dl><p>Sample editorial record · Observed August 2026 · Verify current municipal, transit, property, and market sources.</p></div>
      <section className="re-neighborhood-reading"><div><p className="re-kicker">Reading the area</p><h2>Start with property form and daily movement.</h2></div><div><p>Lot shape, slope, street width, construction era, and access patterns can vary block by block. Use this folio to frame questions—not to decide who should live here.</p><Link className="re-button" href={`${realEstateBase}/tools/neighborhood-comparison`}>Compare objective criteria <span aria-hidden="true">→</span></Link></div></section>
      <section className="re-area-listings"><p className="re-kicker">Available sample property</p>{areaListings.length ? areaListings.map((listing) => <Link key={listing.slug} href={`${realEstateBase}/listings/${listing.slug}`}><Image src={listing.image} alt={listing.alt} width={1200} height={900} /><div><h2>{listing.address}</h2><p>{listing.type} · {listing.beds} beds · {listing.area.toLocaleString()} sq ft</p></div></Link>) : <div className="re-empty"><h2>No sample property in this folio.</h2><p>Open the full search to see inventory across the demonstration market.</p><Link className="re-button" href={`${realEstateBase}/listings`}>Open property search</Link></div>}</section>
    </main>
  );
}
