import Link from "next/link";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { attorneys, injuryBase } from "@/features/demos/injury-law/data";

export const metadata={title:"Attorneys"};
export default function Page(){return <main id="injury-main"><InjuryPageIntro eyebrow="Fictional demonstration team" title="People who explain, organize, and listen."><p>These profiles demonstrate how a real firm could present verified people and roles. They do not represent licensed professionals or invented credentials.</p></InjuryPageIntro><section className="il-section"><div className="il-shell"><div className="il-people">{attorneys.map(person=><article className="il-person" data-initials={person.initials} key={person.slug}><h3>{person.name}</h3><p>{person.role}</p><p>{person.focus}</p><Link href={`${injuryBase}/attorneys/${person.slug}`}>Read demonstration profile</Link></article>)}</div></div></section><InjuryCta title="The right first conversation should make the path clearer." copy="Request a no-pressure demonstration consultation. No information is sent or retained." /></main>}
