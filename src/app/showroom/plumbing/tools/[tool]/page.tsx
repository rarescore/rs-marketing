import { Suspense, type ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool, tools } from "@/features/demos/plumbing/data";
import PassportTool from "@/features/demos/plumbing/tools/passport.client";
import TriageTool from "@/features/demos/plumbing/tools/triage.client";
import WaterHeaterTool from "@/features/demos/plumbing/tools/water-heater.client";
import BranchGuideTool from "@/features/demos/plumbing/tools/branch-guide.client";
import PressureFlowTool from "@/features/demos/plumbing/tools/pressure-flow.client";
import RepipeTool from "@/features/demos/plumbing/tools/repipe.client";
import SewerTool from "@/features/demos/plumbing/tools/sewer.client";

const components: Record<string, ComponentType> = { "plumbing-passport": PassportTool, "symptom-triage": TriageTool, "water-heater-planner": WaterHeaterTool, "fixture-branch-guide": BranchGuideTool, "pressure-flow-worksheet": PressureFlowTool, "repipe-scope-builder": RepipeTool, "sewer-evidence-checklist": SewerTool };
export function generateStaticParams() { return tools.map(({ slug }) => ({ tool: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> { const { tool } = await params; const item = getTool(tool); return item ? { title: item.name, description: item.output } : {}; }
export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) { const { tool } = await params; const item = getTool(tool); const Component = components[tool]; if (!item || !Component) notFound(); return <main className="pl-main pl-tool-page" id="plumbing-main"><Suspense fallback={<div className="pl-loading" aria-busy="true"><span>Preparing field tool…</span></div>}><Component /></Suspense></main>; }
