import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { PropertySearch } from "@/features/demos/real-estate/property-search.client";
import { PropertyDecisionCompass } from "@/features/demos/real-estate/editorial-explorers.client";

export const metadata: Metadata = { title: "Property Search" };

export default function ListingsPage() {
  return (
    <main className="re-main" id="real-estate-main">
      <PageIntro eyebrow="Sample property search" title="Find the fit. Keep the tradeoffs visible.">
        <p>Search fictional demonstration inventory across Pasadena and the San Gabriel foothills. Save properties and build a potential tour without creating an account.</p>
      </PageIntro>
      <PropertyDecisionCompass />
      <Suspense fallback={<div className="re-loading" role="status">Preparing property search…</div>}><PropertySearch /></Suspense>
    </main>
  );
}
