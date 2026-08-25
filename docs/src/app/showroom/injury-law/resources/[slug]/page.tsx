import { notFound } from "next/navigation";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { getResource, resources } from "@/features/demos/injury-law/data";

export function generateStaticParams(){return resources.map(({slug})=>({slug}));}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const resource=getResource(slug);if(!resource)notFound();
  return <main id="injury-main"><InjuryPageIntro eyebrow={`${resource.category} · ${resource.readTime} · General information`} title={resource.title}><p>{resource.summary}</p></InjuryPageIntro><section className="il-section"><div className="il-shell il-content-grid"><aside className="il-annotation"><strong>Scope</strong>Educational demonstration content. Not legal or medical advice. Rules and deadlines vary by jurisdiction.</aside><article className="il-prose">{resource.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article></div></section><InjuryCta title="Need a more personal orientation?" copy="The guided review provides general next steps first and keeps sensitive answers in page memory only." /></main>;
}
