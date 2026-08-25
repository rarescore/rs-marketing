import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlumbingCta, PlumbingPageIntro } from "@/features/demos/plumbing/plumbing-layout";
import { getService, plumbingBase, services } from "@/features/demos/plumbing/data";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = getService(slug); return service ? { title: service.name, description: service.short } : {}; }

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = getService(slug); if (!service) notFound();
  return <main className="pl-main pl-inner" id="plumbing-main"><PlumbingPageIntro code={`Service manual / ${service.name}`} title={service.name}><p>{service.short}</p></PlumbingPageIntro>
    <section className="pl-safety-note"><strong>Immediate safety comes first.</strong><p>For uncontrolled water, sewage exposure, gas odor, fire, or water near electricity, leave the affected area when needed and use the emergency guidance. Only use a known shutoff when it is safely accessible.</p><Link href={`${plumbingBase}/emergency`}>Open safety guidance →</Link></section>
    <div className="pl-service-manual"><section><span>01 / Signs to document</span><h2>What the home is showing</h2><ul>{service.symptoms.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>02 / Field evaluation</span><h2>What a technician checks</h2><ul>{service.checks.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>03 / Scope paths</span><h2>What the next step may involve</h2><ul>{service.paths.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
    <section className="pl-related-tool"><div><p className="pl-eyebrow">Related planning tool</p><h2>{service.toolLabel}</h2><p>Organize observations and assumptions before the onsite evaluation. The result remains preliminary.</p></div><Link className="pl-button pl-button--dark" href={`${plumbingBase}/tools/${service.tool}`}>Open tool <span aria-hidden="true">→</span></Link></section>
    <PlumbingCta title={`Prepare a ${service.name.toLowerCase()} request.`} copy="Share the service category, urgency, property type, and preferred contact window. The demo prepares a private preview without sending or retaining your information." href={`${plumbingBase}/request-service?service=${service.slug}`} />
  </main>;
}
