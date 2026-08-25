import Link from "next/link";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { injuryBase, practiceAreas } from "@/features/demos/injury-law/data";

export const metadata = { title: "Practice Areas" };
export default function Page(){return <main id="injury-main"><InjuryPageIntro eyebrow="Practice areas" title="Practical orientation for different kinds of incidents."><p>Start with care, preservation, and a clear record. A qualified attorney—not a website—can apply jurisdiction-specific law.</p></InjuryPageIntro><section className="il-section"><div className="il-shell"><div className="il-matter-list">{practiceAreas.map((area,index)=><Link key={area.slug} href={`${injuryBase}/practice-areas/${area.slug}`}><b>{String(index+1).padStart(2,"0")}</b><h3>{area.name}</h3><p>{area.short}</p><i aria-hidden="true">↗</i></Link>)}</div></div></section><InjuryCta title="Not sure which category fits?" copy="The Incident & Impact Review begins with the situation in plain language and produces a useful orientation without declaring eligibility." href={`${injuryBase}/case-review`} label="Start the review" /></main>}
