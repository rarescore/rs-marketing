import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { marketRows, realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Market Intelligence" };

export default function MarketPage() {
  return (
    <main className="re-main" id="real-estate-main">
      <PageIntro eyebrow="Illustrative market letter · Q2 2026" title="Read the market as a set of conditions, not a headline."><p>Objective sample figures, dated assumptions, and plain-language interpretation for a fictional Pasadena-area advisory demonstration.</p></PageIntro>
      <article className="re-market-letter">
        <header><p className="re-kicker">Field note 02 / 2026</p><h2>More listings do not create the same advantage for every buyer—or the same pressure for every seller.</h2></header>
        <div className="re-market-letter__copy"><p>Illustrative inventory has widened, but the change is uneven by property type, condition, and price band. Buyers can use that space to ask better questions. Sellers still need to remove ambiguity before launch.</p><p>These figures are sample content created to demonstrate information hierarchy. They are not current market facts and should not guide a real transaction.</p></div>
        <div className="re-market-table"><table><caption>Illustrative Pasadena and Altadena market comparison</caption><thead><tr><th scope="col">Measure</th><th scope="col">Pasadena</th><th scope="col">Altadena</th><th scope="col">Period</th></tr></thead><tbody>{marketRows.map((row) => <tr key={row.metric}><th scope="row">{row.metric}</th><td>{row.pasadena}</td><td>{row.altadena}</td><td>{row.period}</td></tr>)}</tbody></table></div>
        <section className="re-market-actions"><div><p className="re-kicker">For a buyer</p><h3>Use added choice to improve diligence, not to postpone every decision.</h3><Link href={`${realEstateBase}/buying`}>Open the buying process →</Link></div><div><p className="re-kicker">For a seller</p><h3>Make condition, pricing, and presentation easier to understand at first review.</h3><Link href={`${realEstateBase}/selling`}>Open the selling process →</Link></div></section>
      </article>
    </main>
  );
}
