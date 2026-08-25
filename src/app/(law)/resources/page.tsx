import Link from "next/link";
import { InjuryPageIntro } from "@/features/demos/injury-law/injury-layout";
import { resources } from "@/features/demos/injury-law/data";

export const metadata = { title: "Accident Resources", description: "Practical California accident guides from Lev & On Law Firm." };
export default function Page() { const featured = resources[0]!; const rest = resources.slice(1); return <main id="injury-main">
  <InjuryPageIntro eyebrow="Practical guides" title="Start with the question in front of you."><p>These guides are general information, not a substitute for advice about your facts. Read what helps now and leave the rest for later.</p></InjuryPageIntro>
  <section className="il-section"><div className="il-shell"><Link className="il-resource-feature" href={`/resources/${featured.slug}`}><small>{featured.category} · {featured.readTime}</small><h2>{featured.title}</h2><p>{featured.summary}</p><span>Read the guide →</span></Link><div className="il-resource-list">{rest.map((resource) => <Link href={`/resources/${resource.slug}`} key={resource.slug}><small>{resource.category} · {resource.readTime}</small><h2>{resource.title}</h2><p>{resource.summary}</p><span aria-hidden="true">→</span></Link>)}</div></div></section>
  </main>; }
