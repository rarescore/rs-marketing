import type { Metadata } from "next";
import Link from "next/link";
import { EditorialCta, PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Buying" };

const stages = [
  ["Prepare", "Make the cost boundary and timing real before inventory sets the pace.", "True Monthly Cost", "tools/true-monthly-cost"],
  ["Brief", "Define location, architecture, condition, and tradeoffs in language the search can use.", "Move Strategy Studio", "tools/move-strategy-studio"],
  ["Search", "Review a smaller, better-explained set of properties and keep your reasoning visible.", "Property search", "listings"],
  ["Tour", "Group properties into a coherent route and record the questions each visit needs to answer.", "Tour Builder", "tools/tour-builder"],
  ["Position", "Compare price, financing, contingencies, and timeline before writing an offer.", "Offer Comparison Lab", "tools/offer-comparison"],
  ["Diligence & close", "Coordinate inspection, insurance, appraisal, title, funds, and the handoff into ownership.", "Start a conversation", "consultation"],
] as const;

export default function BuyingPage() {
  return (
    <main className="re-main" id="real-estate-main">
      <PageIntro eyebrow="Buying advisory" title="A search process built for decisions, not volume."><p>Know what you can carry, what you can compromise on, and how you will respond before the right property creates urgency.</p></PageIntro>
      <section className="re-journey" aria-labelledby="buyer-journey"><div className="re-journey__title"><p className="re-kicker">The buying sequence</p><h2 id="buyer-journey">Six working sessions.</h2></div><ol>{stages.map(([title, copy, tool, href], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div><Link href={`${realEstateBase}/${href}`}>{tool} →</Link></li>)}</ol></section>
      <section className="re-buying-note"><div><p className="re-kicker">Financing preparation</p><h2>Payment is only one part of readiness.</h2></div><div><p>Review lender options, cash-to-close, insurance availability, reserve comfort, repair exposure, and the timeline attached to each funding path.</p><p className="re-data-note">Educational planning only. Cost estimates are not lending advice or a loan quote.</p><Link className="re-button" href={`${realEstateBase}/tools/true-monthly-cost`}>Explore true monthly cost <span aria-hidden="true">→</span></Link></div></section>
      <EditorialCta title="Create a buyer brief before the search gets loud." copy="Bring timing, cost boundaries, property priorities, and financing progress into one focused first conversation." href={`${realEstateBase}/consultation?intent=buying`} label="Discuss buying" />
    </main>
  );
}
