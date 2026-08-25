import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlumbingCta, PlumbingPageIntro } from "@/features/demos/plumbing/plumbing-layout";
import { getServiceArea, plumbingBase, serviceAreas } from "@/features/demos/plumbing/data";

export function generateStaticParams() { return serviceAreas.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const area = getServiceArea(slug); return area ? { title: `${area.name} service area` } : {}; }
export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const area = getServiceArea(slug); if (!area) notFound();
  return <main className="pl-main pl-inner" id="plumbing-main"><PlumbingPageIntro code="Territory field note" title={`${area.name} service path`}><p>{area.note}. Coverage, scheduling, fees, and arrival windows shown here are intentionally not promised by this fictional demonstration.</p></PlumbingPageIntro><section className="pl-area-plate"><div><span>POSTAL PREFIX</span><strong>{area.zip}</strong></div><div><span>INTAKE STATUS</span><strong>Request eligible for review</strong></div><div><span>NEXT CONFIRMATION</span><strong>Address + real team availability</strong></div></section><section className="pl-prose"><h2>Prepare the useful context.</h2><p>Choose the closest service category, note whether the condition is active or contained, and provide a preferred contact window. For an immediate hazard, use safety guidance first.</p><div className="pl-inline-actions"><Link className="pl-button pl-button--dark" href={`${plumbingBase}/request-service?area=${area.slug}`}>Request service</Link><Link className="pl-button" href={`${plumbingBase}/emergency`}>Emergency guidance</Link></div></section><PlumbingCta title="A service request should reach the right queue." copy="The system can attach territory and service context without exposing private answers inside the owner-facing System Lens." /></main>;
}
