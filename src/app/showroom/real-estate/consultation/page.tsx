import type { Metadata } from "next";
import { LeadForm } from "@/features/demos/real-estate/lead-form.client";

export const metadata: Metadata = { title: "Consultation" };

type ConsultationPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ConsultationPage({ searchParams }: ConsultationPageProps) {
  const query = await searchParams;
  const owner = query.audience === "business-owner";
  const intent = query.intent === "buying" || query.intent === "selling" ? query.intent : owner ? "owner" : "general";
  return (
    <main className="re-main re-contact" id="real-estate-main">
      <div className="re-contact__intro"><p className="re-kicker">{owner ? "Showroom consultation" : "Lev & On Residential consultation · Demonstration"}</p><h1>{owner ? "See this system with your market and brand." : "Begin with the decision in front of you."}</h1><p>{owner ? "This owner-facing path is separate from the fictional brokerage. Use it to preview how the website, tools, qualification, and follow-up system could fit a real practice." : "Choose the context, preferred timing, and only the details useful for a first conversation. This demonstration validates but does not send or retain the request."}</p><dl><div><dt>What happens here</dt><dd>Server validation and a demo receipt</dd></div><div><dt>What does not happen</dt><dd>No brokerage contact, CRM record, email, or data retention</dd></div></dl></div>
      <div className="re-contact__form"><LeadForm defaultIntent={intent} context={owner ? "Owner requested this system" : "General Real Estate consultation"} /></div>
    </main>
  );
}
