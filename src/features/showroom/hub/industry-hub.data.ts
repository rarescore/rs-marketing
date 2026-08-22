import type { IndustrySlug } from "@/features/showroom/hero/hero-scroll-store";

export interface IndustryHubItem {
  slug: IndustrySlug;
  number: string;
  name: string;
  shortName: string;
  doorLabel: string;
  need: string;
  tool: string;
  outcome: string;
  route: `/showroom/${IndustrySlug}`;
}

export const industryHubItems: readonly IndustryHubItem[] = [
  {
    slug: "real-estate",
    number: "01",
    name: "Real Estate",
    shortName: "Real Estate",
    doorLabel: "REAL ESTATE",
    need: "A seller needs a clear first move—and confidence that the timing works.",
    tool: "Move Strategy Studio",
    outcome: "A consultation with timing, priorities, and readiness already understood.",
    route: "/showroom/real-estate",
  },
  {
    slug: "plumbing",
    number: "02",
    name: "Home Services / Plumbing",
    shortName: "Plumbing",
    doorLabel: "PLUMBING",
    need: "A homeowner sees warning signs but cannot tell what is urgent or who to call.",
    tool: "Whole-Home Plumbing Passport",
    outcome: "The correct service request arrives with useful property context and risk flags.",
    route: "/showroom/plumbing",
  },
  {
    slug: "injury-law",
    number: "03",
    name: "Personal Injury Law",
    shortName: "Injury Law",
    doorLabel: "INJURY LAW",
    need: "An injured person is unsure what matters, what to document, or what to do next.",
    tool: "Incident & Impact Review",
    outcome: "A clearer next step and a better-prepared request for attorney review.",
    route: "/showroom/injury-law",
  },
] as const;

export function getIndustryHubItem(slug: IndustrySlug): IndustryHubItem {
  return industryHubItems.find((item) => item.slug === slug) ?? industryHubItems[0]!;
}
