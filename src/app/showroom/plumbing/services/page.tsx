import type { Metadata } from "next";
import Link from "next/link";
import { PlumbingCta, PlumbingPageIntro } from "@/features/demos/plumbing/plumbing-layout";
import { ServiceSystemExplorer } from "@/features/demos/plumbing/service-system-explorer.client";
import { plumbingBase, services } from "@/features/demos/plumbing/data";

export const metadata: Metadata = { title: "Plumbing services" };

export default function ServicesPage() {
  return <main className="pl-main pl-inner" id="plumbing-main"><PlumbingPageIntro code="Service manual / 01" title="The right path starts with what the system is doing."><p>Choose the closest system. Each service page separates immediate safety, technician checks, scope variables, and an appropriate planning tool.</p></PlumbingPageIntro><ServiceSystemExplorer services={services} /><section className="pl-manual-index">{services.map((service, index) => <Link key={service.slug} href={`${plumbingBase}/services/${service.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{service.name}</h2><p>{service.short}</p></div><b>Open service path →</b></Link>)}</section><PlumbingCta title="Not sure which system applies?" copy="Use the safety-first triage to organize what you are seeing. It provides a service category and next action—not a diagnosis." href={`${plumbingBase}/tools/symptom-triage`} label="Start symptom triage" /></main>;
}
