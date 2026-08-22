import { notFound } from "next/navigation";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { attorneys, getAttorney } from "@/features/demos/injury-law/data";

export function generateStaticParams(){return attorneys.map(({slug})=>({slug}));}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const person=getAttorney(slug);if(!person)notFound();
  return <main id="injury-main"><InjuryPageIntro eyebrow={person.role} title={person.name}><p>{person.focus}</p></InjuryPageIntro><section className="il-section"><div className="il-shell il-content-grid"><aside className="il-person" data-initials={person.initials} style={{minHeight:"430px"}}><h3>{person.name}</h3><p>Fictional profile</p></aside><article className="il-prose"><section><h2>Approach</h2><p>{person.approach}</p></section><section><h2>Demonstration disclosure</h2><p>This person and biography are fictional interface content. No bar admission, education, award, ranking, experience claim, case result, or professional qualification is represented.</p></section><section><h2>What a real profile should verify</h2><ul className="il-record-list"><li>Current role and direct responsibilities</li><li>Jurisdictions and bar status from authoritative records</li><li>Education, credentials, and memberships with permission</li><li>Approved biography and contact path</li></ul></section></article></div></section><InjuryCta title="Speak with the team, without pressure." copy="The contact pathway is a no-send preview and does not create an attorney-client relationship." /></main>;
}
