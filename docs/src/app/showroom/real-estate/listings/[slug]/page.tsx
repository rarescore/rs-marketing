import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/features/demos/real-estate/lead-form.client";
import { ListingActions, ListingGallery } from "@/features/demos/real-estate/listing-actions.client";
import { formatPrice, getListing, listings, realEstateBase } from "@/features/demos/real-estate/data";

export function generateStaticParams() { return listings.map(({ slug }) => ({ slug })); }

type ListingPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  return { title: listing ? `${listing.address} — Sample Listing` : "Sample Listing" };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  const related = listings.filter((item) => item.slug !== listing.slug).slice(0, 2);

  return (
    <main className="re-main" id="real-estate-main">
      <ListingGallery listing={listing} />
      <div className="re-listing-title">
        <div><p className="re-kicker">{listing.neighborhood} · Fictional sample listing</p><h1>{listing.address}</h1><p>{listing.locality}</p></div>
        <div className="re-listing-price"><strong>{formatPrice(listing.price)}</strong><ListingActions listing={listing} /></div>
      </div>
      <div className="re-listing-facts">
        <span><b>{listing.beds}</b>Bedrooms</span><span><b>{listing.baths}</b>Bathrooms</span><span><b>{listing.area.toLocaleString()}</b>Square feet</span><span><b>{listing.year}</b>Year built</span><span><b>{listing.type}</b>Typology</span>
      </div>
      <section className="re-listing-story">
        <div><p className="re-kicker">Property reading</p><h2>A house understood in plan, material, and daily use.</h2></div>
        <div><p>{listing.description}</p><p>This fictional property demonstrates an editorial listing system. It is not available for sale and is not connected to MLS data.</p></div>
      </section>
      <section className="re-listing-details">
        <div><p className="re-kicker">Features</p><ul>{listing.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
        <div><p className="re-kicker">Location context</p><h2>{listing.neighborhood}</h2><p>Explore objective notes on housing type, architecture, access, parks, daily services, and sample market activity.</p><Link className="re-button" href={`${realEstateBase}/neighborhoods/${listing.neighborhoodSlug}`}>Open neighborhood folio <span aria-hidden="true">→</span></Link></div>
      </section>
      <section className="re-showing" id="request-showing">
        <div><p className="re-kicker">Showing request · Demonstration</p><h2>See this property in context.</h2><p>The property, route, and preferred timing would be carried into the follow-up record automatically. This preview validates but does not send or retain your information.</p><Link href={`${realEstateBase}/tools/true-monthly-cost`}>Explore the true monthly cost first →</Link></div>
        <LeadForm defaultIntent="listing" context={`Showing request: ${listing.address}`} compact />
      </section>
      <section className="re-related">
        <div className="re-section__head"><p className="re-kicker">Related sample properties</p><h2>Continue the comparison.</h2></div>
        <div>{related.map((item) => <Link key={item.slug} href={`${realEstateBase}/listings/${item.slug}`}><Image src={item.image} alt={item.alt} width={900} height={680} /><h3>{item.address}</h3><p>{formatPrice(item.price)} · {item.neighborhood}</p></Link>)}</div>
      </section>
    </main>
  );
}
