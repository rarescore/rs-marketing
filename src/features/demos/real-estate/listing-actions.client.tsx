"use client";

import Image from "next/image";
import { useState } from "react";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import type { Listing } from "./data";
import { useRealEstateStore } from "./real-estate-store";

export function ListingGallery({ listing }: { listing: Listing }) {
  const [index, setIndex] = useState(0);
  const image = listing.gallery[index] ?? listing.image;
  return (
    <div className="re-gallery">
      <div className="re-gallery__main"><Image key={image} src={image} alt={`${listing.address}, sample property image ${index + 1} of ${listing.gallery.length}`} fill priority loading="eager" sizes="100vw" /></div>
      <div className="re-gallery__rail" aria-label="Property images">
        <p>{String(index + 1).padStart(2, "0")} / {String(listing.gallery.length).padStart(2, "0")}</p>
        {listing.gallery.map((src, imageIndex) => <button key={src} type="button" aria-pressed={imageIndex === index} onClick={() => setIndex(imageIndex)}><Image src={src} alt="" width={120} height={80} /></button>)}
      </div>
    </div>
  );
}

export function ListingActions({ listing }: { listing: Listing }) {
  const saved = useRealEstateStore((state) => state.saved);
  const tour = useRealEstateStore((state) => state.tour);
  const toggleSaved = useRealEstateStore((state) => state.toggleSaved);
  const toggleTour = useRealEstateStore((state) => state.toggleTour);
  const record = useSystemLens((state) => state.record);

  const isSaved = saved.includes(listing.slug);
  const inTour = tour.includes(listing.slug);
  return (
    <div className="re-listing-actions">
      <button type="button" aria-pressed={isSaved} onClick={() => { toggleSaved(listing.slug); record({ type: "property_saved", signal: isSaved ? "Property removed from saved list" : "Property saved", response: "Listing preference kept for this demo session", value: "A future conversation can start with the property already known", status: "observed" }); }}>{isSaved ? "Saved" : "Save property"}</button>
      <button type="button" aria-pressed={inTour} onClick={() => { toggleTour(listing.slug); record({ type: "tour_item_added", signal: "Property selected for a tour", response: "Showing itinerary context prepared", value: "Less back-and-forth before scheduling", status: "demo-preview" }); }}>{inTour ? "Added to tour" : "Add to tour"}</button>
    </div>
  );
}
