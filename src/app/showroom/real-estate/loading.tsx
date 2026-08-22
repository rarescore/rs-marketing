export default function RealEstateLoading() {
  return (
    <main className="re-main re-loading" aria-busy="true" aria-label="Loading Atelier North">
      <p className="re-kicker">Atelier North</p>
      <div className="re-loading__line" />
      <span>Preparing the next folio…</span>
    </main>
  );
}

