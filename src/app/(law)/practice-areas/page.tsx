import Link from "next/link";
import { InjuryCta, InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { practiceAreas } from "@/features/demos/injury-law/data";

const groups = [
  { title: "On the road", copy: "Crashes involving drivers, commercial vehicles, riders, passengers, cyclists, and pedestrians.", slugs: ["car-accidents", "truck-accidents", "motorcycle-accidents", "rideshare-accidents", "pedestrian-accidents", "bicycle-accidents"] },
  { title: "On someone else’s property", copy: "Incidents where a changing condition, notice, maintenance, or control of the space may matter.", slugs: ["unsafe-property"] },
  { title: "When life changes", copy: "Serious injury and fatal-loss matters that require a longer view of care, work, family, and financial consequences.", slugs: ["serious-injuries", "wrongful-death"] },
];

export const metadata = { title: "Practice Areas", description: "Personal injury matters handled by Lev & On Law Firm." };
export default function Page() { return <main id="injury-main">
  <InjuryPageIntro eyebrow="Personal injury practice" title="Start with what happened—not a legal label."><p>Choose the situation closest to yours. If none fits neatly, call us. Real events rarely arrive in perfect categories.</p></InjuryPageIntro>
  <section className="il-section"><div className="il-shell il-practice-groups">{groups.map((group) => <section key={group.title}><header><h2>{group.title}</h2><p>{group.copy}</p></header><div className="il-matter-list">{group.slugs.map((slug) => { const area = practiceAreas.find((item) => item.slug === slug)!; return <Link href={`/practice-areas/${area.slug}`} key={area.slug}><h3>{area.name}</h3><p>{area.short}</p><i aria-hidden="true">→</i></Link>; })}</div></section>)}</div></section>
  <InjuryCta title="Not sure where your situation fits?" copy="Tell us what happened. The first call is for sorting the facts, not choosing the perfect category." />
  </main>; }
