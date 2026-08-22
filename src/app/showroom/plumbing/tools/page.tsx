import type { Metadata } from "next";
import Link from "next/link";
import { PlumbingPageIntro } from "@/features/demos/plumbing/plumbing-layout";
import { plumbingBase, tools } from "@/features/demos/plumbing/data";
export const metadata: Metadata = { title: "Home plumbing tools" };
export default function ToolsIndex() { return <main className="pl-main pl-inner" id="plumbing-main"><PlumbingPageIntro code="Owner field kit / 07 tools" title="Useful output before contact information."><p>Each tool turns homeowner observations into a downloadable or discussable brief. They guide preparation, never diagnose, price, approve, or certify code compliance.</p></PlumbingPageIntro><section className="pl-tools-index">{tools.map((tool, index) => <Link key={tool.slug} href={`${plumbingBase}/tools/${tool.slug}`} className={tool.featured ? "is-featured" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{tool.time}</small><h2>{tool.name}</h2><p>{tool.output}</p></div><b>Open tool →</b></Link>)}</section></main>; }
