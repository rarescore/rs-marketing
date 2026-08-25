import Link from "next/link";
import { InjuryHero } from "@/features/demos/injury-law/home-hero.client";
import { ConsultationForm } from "@/features/demos/injury-law/consultation-form.client";
import { lawPhoneDisplay, lawPhoneHref, practiceAreas, processStages, resources } from "@/features/demos/injury-law/data";
import { pipelineConfigured } from "@/lib/intake/security";

export default function Page() {
  const onlineReady = pipelineConfigured();
  return <main id="injury-main">
    <InjuryHero onlineReady={onlineReady} />
    <section className="il-call-strip"><div><strong>Need a person, not another webpage?</strong><span>Call and tell us what happened in your own words.</span></div><a href={lawPhoneHref}>Call {lawPhoneDisplay}</a></section>

    <section className="il-section"><div className="il-shell il-story-grid">
      <div><p className="il-eyebrow">The first conversation</p><h2>You do not need to have it all figured out.</h2></div>
      <div><p>After an accident, facts arrive out of order. Symptoms change. Insurance calls before you know what matters. Our first job is to slow that down and sort the immediate questions from the ones that can wait.</p><p>Bring what you have. We’ll ask about the incident, your health, the available records, and any approaching deadlines. If we cannot help, we will say so plainly.</p></div>
    </div></section>

    <section className="il-section il-section--ink"><div className="il-shell">
      <div className="il-section__head"><div><p className="il-eyebrow">Ways we help</p><h2>Different accidents leave different evidence behind.</h2></div><p>Start with the situation closest to yours. Each page explains what tends to matter first without pretending every case follows the same script.</p></div>
      <div className="il-matter-list">{practiceAreas.slice(0, 6).map((area, index) => <Link href={`/practice-areas/${area.slug}`} key={area.slug}><b>{String(index + 1).padStart(2, "0")}</b><h3>{area.name}</h3><p>{area.short}</p><i aria-hidden="true">→</i></Link>)}</div>
      <Link className="il-inline-link" href="/practice-areas">See every practice area →</Link>
    </div></section>

    <section className="il-checklist"><div className="il-shell il-content-grid"><div><p className="il-eyebrow">If this just happened</p><h2>Care first. Preserve what you can. Leave the rest for later.</h2><Link className="il-button il-button--paper" href="/after-an-accident">Open the accident checklist</Link></div><ul><li>Get appropriate medical help</li><li>Save original photos and video</li><li>Keep names, reports, and insurance messages</li><li>Write down where cameras or witnesses may be found</li></ul></div></section>

    <section className="il-section"><div className="il-shell"><div className="il-section__head"><div><p className="il-eyebrow">What happens next</p><h2>A process you can follow.</h2></div><p>There is no useful reason to bury the next step in legal language.</p></div><ol className="il-process">{processStages.map(([heading, copy], index) => <li key={heading}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{heading}</h3><p>{copy}</p></div></li>)}</ol></div></section>

    <section className="il-section il-resources-home"><div className="il-shell"><div className="il-section__head"><div><p className="il-eyebrow">Read what helps now</p><h2>One practical question at a time.</h2></div><Link href="/resources">Browse all guides →</Link></div><div className="il-resource-grid">{resources.slice(0, 3).map((resource) => <article className="il-resource-card" key={resource.slug}><small>{resource.category} · {resource.readTime}</small><h3>{resource.title}</h3><p>{resource.summary}</p><Link href={`/resources/${resource.slug}`}>Read the guide →</Link></article>)}</div></div></section>

    <section className="il-final-contact"><div className="il-shell il-content-grid"><div><p className="il-eyebrow">Free case review</p><h2>Start with the facts you know.</h2><p>We’ll return your call and ask for anything else we need. To speak now, call <a href={lawPhoneHref}>{lawPhoneDisplay}</a>.</p></div><ConsultationForm source="homepage-footer" onlineReady={onlineReady} /></div></section>
  </main>;
}
