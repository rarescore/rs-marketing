import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { getPracticeArea, practiceAreas } from "@/features/demos/injury-law/data";

export function generateStaticParams() { return practiceAreas.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const area = getPracticeArea((await params).slug); return area ? { title: area.name, description: area.short } : {}; }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const area = getPracticeArea((await params).slug); if (!area) notFound();
  return <main id="injury-main">
    <InjuryPageIntro eyebrow="Practice area" title={area.name}><p>{area.short}</p></InjuryPageIntro>
    <section className="il-section"><div className="il-shell il-story-grid"><div><p className="il-eyebrow">What makes this different</p><h2>The details worth noticing early.</h2></div><div><p>{area.involves}</p><p>No single fact decides a claim. A useful review looks at how the pieces fit together and what may become harder to recover with time.</p></div></div></section>
    <section className="il-section il-section--ink"><div className="il-shell il-content-grid"><aside className="il-annotation"><strong>Begin here</strong>Take care of urgent health and safety needs first. Then preserve what already exists; do not recreate or edit original evidence.</aside><article className="il-prose"><section><h2>What to do first</h2><ul className="il-record-list">{area.firstSteps.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>What a review looks for</h2><ul className="il-record-list">{area.review.map((item) => <li key={item}>{item}</li>)}</ul></section></article></div></section>
    <section className="il-section"><div className="il-shell il-content-grid"><aside className="il-annotation"><strong>The insurance layer</strong>{area.insurance}</aside><article className="il-prose"><section><h2>Records that can help</h2><ul className="il-record-list">{area.records.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Questions people ask</h2>{area.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section></article></div></section>
    <InjuryCta title="Talk through the facts you have." copy="You do not need to wait for every record or every answer before requesting a call." />
  </main>;
}
