export const verticals = {
  realEstate: {
    slug: "real-estate",
    label: "Real Estate",
    theme: "real-estate",
    flagshipTool: "Move Strategy Studio",
  },
  plumbing: {
    slug: "plumbing",
    label: "Plumbing & Home Services",
    theme: "plumbing",
    flagshipTool: "Whole-Home Plumbing Passport",
  },
  injuryLaw: {
    slug: "injury-law",
    label: "Injury Law",
    theme: "injury-law",
    flagshipTool: "Incident & Impact Review",
  },
} as const;

export type VerticalKey = keyof typeof verticals;
export type VerticalSlug = (typeof verticals)[VerticalKey]["slug"];
