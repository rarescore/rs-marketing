export const plumbingBase = "/showroom/plumbing";

export const demoPhoneDisplay = "(555) 014-7000";
export const demoPhoneHref = "tel:+15550147000";

export type PlumbingService = {
  slug: string;
  name: string;
  short: string;
  symptoms: string[];
  checks: string[];
  paths: string[];
  tool: string;
  toolLabel: string;
};

export const services: PlumbingService[] = [
  {
    slug: "leaks-and-shutoffs",
    name: "Leaks & shutoffs",
    short: "Active leaks, hidden moisture, fixture isolation, and main shutoff planning.",
    symptoms: ["Visible dripping or pooling", "Water meter movement with fixtures off", "Staining, damp cabinetry, or musty odor"],
    checks: ["Active source and affected zone", "Fixture stops and main shutoff access", "Pressure, visible connections, and adjacent materials"],
    paths: ["Safe isolation and repair", "Targeted opening or leak-location plan", "Shutoff replacement and documentation"],
    tool: "symptom-triage",
    toolLabel: "Open symptom triage",
  },
  {
    slug: "water-heaters",
    name: "Water heating",
    short: "Tank, tankless, recovery, temperature, venting, and replacement planning.",
    symptoms: ["No or inconsistent hot water", "Recovery no longer matches household use", "Visible corrosion, moisture, or unusual sound"],
    checks: ["Equipment type, age, fuel, and location", "Demand pattern and temperature rise", "Venting, drain pan, shutoffs, and access"],
    paths: ["Serviceable component review", "Capacity and recovery planning", "Replacement scope and inspection questions"],
    tool: "water-heater-planner",
    toolLabel: "Plan hot-water demand",
  },
  {
    slug: "drains-and-sewers",
    name: "Drains & sewer",
    short: "Recurring stoppages, slow fixtures, cleanout access, and evidence-led next steps.",
    symptoms: ["One slow or blocked fixture", "Multiple fixtures backing up", "Recurring odor, gurgling, or exterior overflow"],
    checks: ["Affected fixtures and recurrence", "Cleanout location and prior work", "Camera evidence and pipe material where known"],
    paths: ["Fixture or branch clearing", "Main-line inspection and cleaning", "Repair-scope evidence gathering"],
    tool: "sewer-evidence-checklist",
    toolLabel: "Build an evidence checklist",
  },
  {
    slug: "pressure-and-flow",
    name: "Pressure & flow",
    short: "Low pressure, pressure drop, high static pressure, and practical field measurements.",
    symptoms: ["Weak flow at one or many fixtures", "Large drop when fixtures run together", "Banging, failed supply lines, or high gauge reading"],
    checks: ["Static and residual pressure", "Observed test flow and elevation", "Regulator, service, branch, and fixture conditions"],
    paths: ["Fixture-specific correction", "Regulator or service review", "Branch and repipe scope planning"],
    tool: "pressure-flow-worksheet",
    toolLabel: "Record pressure and flow",
  },
  {
    slug: "repiping-and-branches",
    name: "Repiping & branches",
    short: "Whole-home supply planning, fixture additions, access, disruption, and inspection sequencing.",
    symptoms: ["Recurring leaks across separate areas", "Known aging or restricted supply material", "Renovation or fixture expansion"],
    checks: ["Existing materials and routing", "Fixture inventory, pressure, and simultaneous use", "Access, patching, occupancy, and permit path"],
    paths: ["Targeted branch replacement", "Phased zone work", "Whole-home scope with documented assumptions"],
    tool: "repipe-scope-builder",
    toolLabel: "Build a preliminary scope",
  },
  {
    slug: "fixtures-and-installation",
    name: "Fixtures & installation",
    short: "Faucets, toilets, disposals, appliances, and remodel fixture coordination.",
    symptoms: ["Fixture leak or poor operation", "New appliance or fixture planned", "Multiple fixtures changing in one project"],
    checks: ["Connection, stop, drain, and mounting conditions", "Manufacturer requirements", "Branch capacity and inspection needs"],
    paths: ["Like-for-like replacement", "Connection or branch correction", "Coordinated remodel scope"],
    tool: "fixture-branch-guide",
    toolLabel: "Review fixture and branch demand",
  },
];

export const serviceAreas = [
  { slug: "pasadena", name: "Pasadena", zip: "911", note: "Core demonstration service territory" },
  { slug: "altadena", name: "Altadena", zip: "91001", note: "Core demonstration service territory" },
  { slug: "south-pasadena", name: "South Pasadena", zip: "91030", note: "Scheduled service territory" },
  { slug: "sierra-madre", name: "Sierra Madre", zip: "91024", note: "Scheduled service territory" },
] as const;

export const tools = [
  { slug: "plumbing-passport", name: "Whole-Home Plumbing Passport", output: "A downloadable property systems record", time: "7–10 min", featured: true },
  { slug: "symptom-triage", name: "Symptom-to-Action Triage", output: "Safety-first category and next action", time: "2 min", featured: false },
  { slug: "water-heater-planner", name: "Water Heater Demand + Recovery Planner", output: "Demand assumptions and recovery band", time: "4 min", featured: false },
  { slug: "fixture-branch-guide", name: "Fixture / Branch Capacity Guide", output: "Preliminary branch demand worksheet", time: "4 min", featured: false },
  { slug: "pressure-flow-worksheet", name: "Pressure + Flow Worksheet", output: "A printable field measurement record", time: "3 min", featured: false },
  { slug: "repipe-scope-builder", name: "Repipe Scope Builder", output: "Zones, complexity, and site questions", time: "5 min", featured: false },
  { slug: "sewer-evidence-checklist", name: "Sewer / Drain Evidence Checklist", output: "An inspection-ready evidence brief", time: "3 min", featured: false },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
