"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import { formatPrice, listings, realEstateBase } from "./data";
import { useRealEstateStore } from "./real-estate-store";

export function PropertySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const [location, setLocation] = useState(query.get("location") ?? "all");
  const [maxPrice, setMaxPrice] = useState(Number(query.get("max")) || 4000000);
  const [beds, setBeds] = useState(Number(query.get("beds")) || 0);
  const [baths, setBaths] = useState(Number(query.get("baths")) || 0);
  const [type, setType] = useState(query.get("type") ?? "all");
  const [feature, setFeature] = useState(query.get("feature") ?? "all");
  const saved = useRealEstateStore((state) => state.saved);
  const tour = useRealEstateStore((state) => state.tour);
  const toggleSaved = useRealEstateStore((state) => state.toggleSaved);
  const toggleTour = useRealEstateStore((state) => state.toggleTour);
  const record = useSystemLens((state) => state.record);

  const results = useMemo(() => listings.filter((listing) =>
    (location === "all" || listing.neighborhoodSlug === location) &&
    listing.price <= maxPrice && listing.beds >= beds && listing.baths >= baths &&
    (type === "all" || listing.type === type) &&
    (feature === "all" || listing.features.some((item) => item.toLowerCase().includes(feature)))
  ), [baths, beds, feature, location, maxPrice, type]);

  function applyFilters(next: { location?: string; maxPrice?: number; beds?: number; baths?: number; type?: string; feature?: string }) {
    const values = { location, maxPrice, beds, baths, type, feature, ...next };
    const params = new URLSearchParams();
    if (values.location !== "all") params.set("location", values.location);
    if (values.maxPrice < 4000000) params.set("max", String(values.maxPrice));
    if (values.beds > 0) params.set("beds", String(values.beds));
    if (values.baths > 0) params.set("baths", String(values.baths));
    if (values.type !== "all") params.set("type", values.type);
    if (values.feature !== "all") params.set("feature", values.feature);
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
    record({ type: "search_intent", signal: "Property criteria selected", response: "Search intent summarized without personal data", value: `${results.length} relevant sample properties can guide follow-up`, status: "derived" });
  }

  function reset() {
    setLocation("all"); setMaxPrice(4000000); setBeds(0); setBaths(0); setType("all"); setFeature("all");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="re-search">
      <form className="re-search__filters" onSubmit={(event) => event.preventDefault()} aria-label="Property filters">
        <label>Location<select value={location} onChange={(e) => { setLocation(e.target.value); applyFilters({ location: e.target.value }); }}><option value="all">All areas</option><option value="linda-vista">Linda Vista</option><option value="san-rafael-hills">San Rafael Hills</option><option value="altadena-foothills">Altadena Foothills</option><option value="sierra-madre-village">Sierra Madre Village</option></select></label>
        <label>Maximum price<select value={maxPrice} onChange={(e) => { const value = Number(e.target.value); setMaxPrice(value); applyFilters({ maxPrice: value }); }}><option value="4000000">No maximum</option><option value="2000000">$2,000,000</option><option value="2500000">$2,500,000</option><option value="3500000">$3,500,000</option></select></label>
        <label>Bedrooms<select value={beds} onChange={(e) => { const value = Number(e.target.value); setBeds(value); applyFilters({ beds: value }); }}><option value="0">Any</option><option value="3">3+</option><option value="4">4+</option></select></label>
        <label>Bathrooms<select value={baths} onChange={(e) => { const value = Number(e.target.value); setBaths(value); applyFilters({ baths: value }); }}><option value="0">Any</option><option value="2">2+</option><option value="3">3+</option></select></label>
        <label>Property type<select value={type} onChange={(e) => { setType(e.target.value); applyFilters({ type: e.target.value }); }}><option value="all">All types</option><option value="Architectural">Architectural</option><option value="Spanish Colonial">Spanish Colonial</option><option value="Craftsman">Craftsman</option></select></label>
        <label>Feature<select value={feature} onChange={(e) => { setFeature(e.target.value); applyFilters({ feature: e.target.value }); }}><option value="all">Any feature</option><option value="pool">Pool</option><option value="solar">Solar</option><option value="studio">Studio</option><option value="garden">Garden</option></select></label>
        <button type="button" onClick={reset}>Clear filters</button>
      </form>
      <div className="re-search__bar"><p aria-live="polite"><strong>{results.length}</strong> sample {results.length === 1 ? "property" : "properties"}</p><p>{saved.length} saved · {tour.length} in tour</p></div>
      {results.length ? (
        <div className="re-search__results">
          {results.map((listing, index) => (
            <article className={index === 0 ? "re-search-property re-search-property--lead" : "re-search-property"} key={listing.slug}>
              <Link className="re-search-property__image" href={`${realEstateBase}/listings/${listing.slug}`}>
                <Image src={listing.image} alt={listing.alt} fill loading={index === 0 ? "eager" : "lazy"} sizes={index === 0 ? "(max-width: 768px) 100vw, 65vw" : "(max-width: 768px) 100vw, 32vw"} />
              </Link>
              <div className="re-search-property__body">
                <p className="re-kicker">{listing.neighborhood} · Sample listing</p>
                <h2><Link href={`${realEstateBase}/listings/${listing.slug}`}>{listing.address}</Link></h2>
                <p>{formatPrice(listing.price)} · {listing.beds} bd · {listing.baths} ba · {listing.area.toLocaleString()} sq ft</p>
                <div className="re-search-property__actions">
                  <button type="button" aria-pressed={saved.includes(listing.slug)} onClick={() => { toggleSaved(listing.slug); record({ type: "property_saved", signal: saved.includes(listing.slug) ? "Property removed from saved list" : "Property saved", response: "Preference attached to this session", value: "Advisor can prepare a more relevant shortlist", status: "observed" }); }}>{saved.includes(listing.slug) ? "Saved" : "Save"}</button>
                  <button type="button" aria-pressed={tour.includes(listing.slug)} onClick={() => { toggleTour(listing.slug); record({ type: "tour_item_added", signal: "Property added to a tour", response: "Tour context assembled", value: "A coordinated showing request can be prepared", status: "demo-preview" }); }}>{tour.includes(listing.slug) ? "In tour" : "Add to tour"}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="re-empty"><p className="re-kicker">No exact matches</p><h2>Widen one criterion.</h2><p>Try a higher maximum price, fewer bedrooms, or all property types. Your current filters are preserved until you clear them.</p><button className="re-button" type="button" onClick={reset}>Reset property search</button></div>
      )}
    </div>
  );
}
