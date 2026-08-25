import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/features/demos/real-estate/real-estate-layout";
import { realEstateBase, toolDirectory } from "@/features/demos/real-estate/data";

export const metadata: Metadata = { title: "Decision Tools" };

export default function ToolsPage() {
  return <main className="re-main" id="real-estate-main"><PageIntro eyebrow="Interactive decision tools" title="Useful output before a contact form."><p>Each tool answers one concrete question, shows assumptions, preserves editability, and keeps private financial details out of URLs, analytics, and saved state.</p></PageIntro><section className="re-tool-index"><div className="re-tool-index__head" aria-hidden="true"><span>Question answered</span><span>Output</span><span>Time</span></div>{toolDirectory.map((tool, index) => <Link key={tool.slug} className={index === 0 ? "re-tool-index__row re-tool-index__row--flagship" : "re-tool-index__row"} href={`${realEstateBase}/tools/${tool.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{tool.name}</h2><p>{tool.question}</p></div><strong>{tool.output}</strong><small>{tool.time}</small><b aria-hidden="true">→</b></Link>)}</section></main>;
}
