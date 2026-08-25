import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialCta } from "@/features/demos/real-estate/real-estate-layout";
import { realEstateBase } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Advisor" };

export default function TeamPage() {
  return (
    <main className="re-main" id="real-estate-main">
      <section className="re-team-hero"><div className="re-team-hero__image"><Image src="/images/real-estate/elena-ward.jpg" alt="Elena Ward, fictional advisor used for this demonstration" fill priority sizes="(max-width: 768px) 100vw, 50vw" /></div><div><p className="re-kicker">Fictional advisor · Demonstration identity</p><h1>Elena Ward</h1><p>A sample advisory practice built around property reading, decision sequencing, and clear client communication across Pasadena and the foothills.</p><Link className="re-button" href={`${realEstateBase}/consultation`}>Begin a conversation <span aria-hidden="true">→</span></Link></div></section>
      <section className="re-method"><div><p className="re-kicker">How the advisory works</p><h2>One decision record from first brief to close.</h2></div><div><p>The demonstration shows how search criteria, property interest, tour planning, cost assumptions, seller preparation, and follow-up context can stay connected instead of being recreated in each conversation.</p><p>Elena Ward is not a real licensee, and no credentials, awards, production figures, or client results are claimed. A production version would display verified licensing, brokerage, and advertising disclosures here.</p></div></section>
      <section className="re-principles"><h2>Working principles</h2><dl><div><dt>Evidence before urgency</dt><dd>Use property facts, current documents, and visible assumptions before making a recommendation.</dd></div><div><dt>Tradeoffs stay visible</dt><dd>Keep cost, condition, timing, and execution risk together instead of hiding them behind a score.</dd></div><div><dt>Local context without steering</dt><dd>Describe housing, architecture, access, parks, services, and market activity objectively.</dd></div></dl></section>
      <EditorialCta title="Bring the decision that is hardest to sequence." copy="Start with buying, selling, doing both, or one specific property. The first conversation should reduce uncertainty—not create another sales funnel." href={`${realEstateBase}/consultation`} label="Start a consultation" />
    </main>
  );
}
