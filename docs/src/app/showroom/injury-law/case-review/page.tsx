import Link from "next/link";
import { IncidentReview } from "@/features/demos/injury-law/incident-review.client";
import { injuryBase } from "@/features/demos/injury-law/data";
export const metadata={title:"Incident & Impact Review"};
export default function Page(){return <main id="injury-main" className="il-review"><header className="il-review__header"><div><p className="il-eyebrow">Incident &amp; Impact Review</p><strong>General guidance first. Contact is optional.</strong></div><p className="il-review__privacy">Answers stay only in this page’s memory and clear on refresh or exit. They are not saved, sent, placed in URLs, or shown in analytics or System Lens. Do not enter names, claim numbers, exact addresses, documents, or narratives.</p><Link className="il-button il-button--line" href={`${injuryBase}/after-an-accident`}>Immediate guide</Link></header><IncidentReview/></main>}
