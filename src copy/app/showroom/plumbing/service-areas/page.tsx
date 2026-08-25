import type { Metadata } from "next";
import Link from "next/link";
import { PlumbingCta, PlumbingPageIntro } from "@/features/demos/plumbing/plumbing-layout";
import { plumbingBase, serviceAreas } from "@/features/demos/plumbing/data";
import { AreaChecker } from "@/features/demos/plumbing/area-checker.client";

export const metadata: Metadata = { title: "Service areas" };
export default function AreasPage() { return <main className="pl-main pl-inner" id="plumbing-main"><PlumbingPageIntro code="Territory / demonstration coverage" title="Check the service path before sharing your details."><p>This fictional territory demonstrates how a real service business can qualify location openly, without publishing dozens of repetitive city pages.</p></PlumbingPageIntro><AreaChecker /><section className="pl-area-list">{serviceAreas.map((area, index) => <Link href={`${plumbingBase}/service-areas/${area.slug}`} key={area.slug}><span>{String(index + 1).padStart(2, "0")}</span><h2>{area.name}</h2><p>{area.note}</p><b>Area notes →</b></Link>)}</section><PlumbingCta title="Inside the demonstration territory?" copy="Prepare the service category and property context. Availability and timing would be confirmed by a real service team." /></main>; }
