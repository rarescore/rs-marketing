import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { toolDirectory } from "@/features/demos/real-estate/data";
import { RealEstateTool, type RealEstateToolSlug } from "@/features/demos/real-estate/tools.client";

export function generateStaticParams() { return toolDirectory.map(({ slug }) => ({ tool: slug })); }
type ToolPageProps = { params: Promise<{ tool: string }> };
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> { const { tool } = await params; return { title: toolDirectory.find((item) => item.slug === tool)?.name ?? "Decision Tool" }; }

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool } = await params; const item = toolDirectory.find((entry) => entry.slug === tool); if (!item) notFound();
  return <main className="re-main" id="real-estate-main"><PageIntro eyebrow={`${item.time} working session`} title={item.name}><p>{item.question} The result appears before any optional consultation path.</p></PageIntro><div className="re-tool-workspace"><div className="re-tool-workspace__brief"><p className="re-kicker">Expected output</p><h2>{item.output}</h2><p>All figures are illustrative and all material assumptions remain visible. Edit answers without losing the rest of the working session.</p></div><RealEstateTool slug={item.slug as RealEstateToolSlug} /></div></main>;
}
