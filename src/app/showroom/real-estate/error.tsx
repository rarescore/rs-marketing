"use client";

export default function RealEstateError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="re-main re-empty re-route-error">
      <p className="re-kicker">Folio interrupted</p>
      <h1>This page did not resolve cleanly.</h1>
      <p>Your saved properties and tour remain in this browser. Try the page again without leaving the Real Estate experience.</p>
      <button className="re-button re-button--solid" type="button" onClick={reset}>Try again</button>
    </main>
  );
}

