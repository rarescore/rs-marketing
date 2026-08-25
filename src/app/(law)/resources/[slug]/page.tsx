import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { getResource, resources } from "@/features/demos/injury-law/data";

export function generateStaticParams() { return resources.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const resource = getResource((await params).slug); return resource ? { title: resource.title, description: resource.summary } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resource = getResource((await params).slug); if (!resource) notFound();
  return <main id="injury-main">
    <InjuryPageIntro eyebrow={`${resource.category} · ${resource.readTime}`} title={resource.title}><p>{resource.summary}</p></InjuryPageIntro>
    <section className="il-section"><div className="il-shell il-content-grid"><aside className="il-annotation"><strong>General information</strong>This guide cannot account for every fact, deadline, policy, or jurisdiction. Do not use it to calculate a legal deadline.</aside><article className="il-prose"><section><h2>The short answer</h2><p className="il-prose__lead">{resource.answer}</p></section><section><h2>What you can do now</h2><ul className="il-record-list">{resource.steps.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>What often causes trouble</h2><ul className="il-record-list">{resource.mistakes.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>When a lawyer may help</h2><p>{resource.whenCounselHelps}</p></section><section><h2>Sources and next reading</h2><ul>{resource.sources.map((source) => <li key={source.href}><a href={source.href} rel="noreferrer">{source.label}</a></li>)}</ul><h3>Related guides</h3><ul>{resource.relatedArticles.map((slug) => <li key={slug}><Link href={`/resources/${slug}`}>{resources.find((item) => item.slug === slug)?.title || slug}</Link></li>)}</ul></section></article></div></section>
    <InjuryCta title="Need an answer tied to your facts?" copy="A focused conversation can separate the urgent questions from the ones that can wait." />
  </main>;
}
