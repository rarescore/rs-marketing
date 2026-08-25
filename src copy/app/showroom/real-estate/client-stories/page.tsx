import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Illustrative Move Scenarios" };

const scenarios = [
  ["Buy and sell", "A current home, a target school-year move date, and no appetite for temporary housing.", "Compare buy-first and sell-first paths; establish preparation and financing questions before searching."],
  ["First purchase", "A stable monthly boundary, uncertain maintenance exposure, and two preferred areas.", "Build a true-cost range, objective neighborhood comparison, and focused tour brief."],
  ["Property sale", "An architecturally distinct house with deferred systems work and a flexible move date.", "Separate must-address condition from optional presentation work; align launch timing with the next move."],
] as const;

export default function StoriesPage() {
  return <main className="re-main" id="real-estate-main"><PageIntro eyebrow="Illustrative move scenarios · Not testimonials" title="See the process without invented praise."><p>These fictional scenarios demonstrate decision structure only. They are not client accounts, quotes, outcomes, or performance claims.</p></PageIntro><section className="re-scenarios">{scenarios.map(([title, context, response], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><dl><div><dt>Decision context</dt><dd>{context}</dd></div><div><dt>Advisory response</dt><dd>{response}</dd></div></dl><Link href={`${realEstateBase}/tools/move-strategy-studio`}>Model this kind of move →</Link></article>)}</section></main>;
}
