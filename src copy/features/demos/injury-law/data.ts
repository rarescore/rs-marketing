export const injuryBase = "/showroom/injury-law";

export const demoLawPhoneDisplay = "(555) 013-2400";
export const demoLawPhoneHref = "tel:+15550132400";

export type PracticeArea = {
  slug: string;
  name: string;
  short: string;
  firstSteps: string[];
  records: string[];
  review: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "motor-vehicle-collisions",
    name: "Motor vehicle collisions",
    short: "Car, rideshare, commercial vehicle, and multi-vehicle incidents.",
    firstSteps: ["Prioritize medical care and safety", "Preserve the incident report and scene information", "Keep insurer communications and repair records together"],
    records: ["Photos and video", "Witness and report information", "Medical and work-impact records"],
    review: ["How the incident occurred", "Available coverage and involved parties", "Treatment history, limitations, and documentation gaps"],
  },
  {
    slug: "pedestrian-and-cyclist-incidents",
    name: "Pedestrian & cyclist incidents",
    short: "Roadway incidents involving people walking, cycling, or using mobility devices.",
    firstSteps: ["Seek appropriate medical care", "Preserve clothing, equipment, and device data", "Identify nearby cameras and witnesses promptly"],
    records: ["Helmet, bicycle, or device condition", "Route and location details", "Transit, business, or residential camera sources"],
    review: ["Road design and visibility", "Driver and witness information", "Physical, mobility, and work effects"],
  },
  {
    slug: "unsafe-property-incidents",
    name: "Unsafe property incidents",
    short: "Falls and injuries connected to a potentially hazardous property condition.",
    firstSteps: ["Address immediate care needs", "Photograph the condition before it changes if safely possible", "Record when, where, and to whom the incident was reported"],
    records: ["Condition and location photographs", "Incident reports and witness details", "Footwear and relevant objects preserved in current condition"],
    review: ["Notice of the condition", "Ownership and control of the location", "Medical, functional, and financial effects"],
  },
  {
    slug: "serious-and-catastrophic-injury",
    name: "Serious & life-changing injury",
    short: "Incidents with lasting medical, mobility, cognitive, or caregiving consequences.",
    firstSteps: ["Follow qualified medical guidance", "Name one person to organize records and communications", "Document new equipment, care, transportation, and home-support needs"],
    records: ["Care plans and specialist records", "Accessibility and caregiving costs", "Work, education, and daily-function changes"],
    review: ["Long-term care and support", "Multiple sources of coverage", "How the injury changes daily life over time"],
  },
  {
    slug: "wrongful-death",
    name: "Wrongful death",
    short: "Calm, family-centered guidance after a fatal incident.",
    firstSteps: ["Let urgent family and practical needs come first", "Designate one trusted contact for records and calls", "Preserve notices, reports, and expense records without rushing decisions"],
    records: ["Official and medical records", "Household and financial documents", "Relevant incident evidence and communications"],
    review: ["Who may have legal authority to act", "Available evidence and coverage", "Jurisdiction-specific rights and timing with counsel"],
  },
];

export type Attorney = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  approach: string;
  initials: string;
};

export const attorneys: Attorney[] = [
  {
    slug: "mara-vale",
    name: "Mara Vale",
    role: "Founding attorney · fictional demonstration profile",
    focus: "Serious injury, vehicle incidents, and family guidance",
    approach: "Mara’s demonstration profile is built around clear explanations, careful documentation, and making room for clients to decide without pressure.",
    initials: "MV",
  },
  {
    slug: "james-morrow",
    name: "James Morrow",
    role: "Attorney · fictional demonstration profile",
    focus: "Evidence review, insurance issues, and complex incident timelines",
    approach: "James’s demonstration profile emphasizes early evidence preservation and translating a complicated record into understandable choices.",
    initials: "JM",
  },
  {
    slug: "elena-park",
    name: "Elena Park",
    role: "Client support director · fictional demonstration profile",
    focus: "Intake, record coordination, and accessible client communication",
    approach: "Elena’s demonstration profile shows how a client support team can keep next steps, appointments, and document requests organized.",
    initials: "EP",
  },
];

export type Resource = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export const resources: Resource[] = [
  {
    slug: "build-an-incident-record",
    title: "How to build an incident record without reliving every detail",
    category: "Documentation",
    readTime: "6 min",
    summary: "A calm framework for organizing dates, care, expenses, and communications.",
    sections: [
      { heading: "Start with a simple chronology", body: "List the incident, major appointments, work changes, and important calls in date order. A usable record can be brief; consistency matters more than perfect prose." },
      { heading: "Keep originals intact", body: "Save original files and messages. Work from copies when annotating. Avoid editing source photos or deleting messages because they feel repetitive." },
      { heading: "Separate facts from questions", body: "Use one column for what happened and another for questions to raise with a qualified professional. This makes the record easier to review without turning uncertainty into a conclusion." },
    ],
  },
  {
    slug: "documenting-symptoms-and-daily-changes",
    title: "Documenting symptoms and changes in daily life",
    category: "Health record",
    readTime: "5 min",
    summary: "How to keep useful notes while leaving medical decisions to qualified clinicians.",
    sections: [
      { heading: "Use observable language", body: "Record what changed: sleep interrupted, stairs avoided, time away from work, or help needed with a task. Avoid trying to diagnose the cause yourself." },
      { heading: "Connect notes to dates", body: "Short dated entries can help clinicians and counsel understand progression. Include appointments, new restrictions, and whether a symptom is improving, stable, or changing." },
      { heading: "Seek care for concerns", body: "A website cannot assess medical urgency. New, worsening, or concerning symptoms should be discussed with an appropriate medical professional." },
    ],
  },
  {
    slug: "before-speaking-with-an-insurer",
    title: "Before a detailed conversation with an insurer",
    category: "Insurance",
    readTime: "4 min",
    summary: "Questions to organize before a recorded statement, release, or broad authorization.",
    sections: [
      { heading: "Know what is being requested", body: "Ask whether a statement will be recorded, what documents are requested, and whether a form is a release or authorization. Keep a copy of every request." },
      { heading: "Do not guess", body: "If you do not know an answer, say so rather than estimating. Dates, speeds, medical details, and future effects may require records or professional review." },
      { heading: "Get jurisdiction-specific advice", body: "Obligations and deadlines differ. A lawyer licensed in the relevant jurisdiction can explain what applies to a particular situation." },
    ],
  },
];

export const processStages = [
  ["Orient", "Understand immediate needs, the incident, and the people involved."],
  ["Preserve", "Identify records, physical evidence, witnesses, and time-sensitive sources."],
  ["Document", "Organize medical care, symptoms, daily limitations, and financial disruption."],
  ["Review", "A qualified attorney evaluates law, coverage, responsibility, and available paths."],
  ["Decide", "The client chooses whether and how to proceed after clear explanation."],
] as const;

export function getPracticeArea(slug: string) { return practiceAreas.find((item) => item.slug === slug); }
export function getAttorney(slug: string) { return attorneys.find((item) => item.slug === slug); }
export function getResource(slug: string) { return resources.find((item) => item.slug === slug); }
