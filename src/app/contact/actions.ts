"use server";

import { z } from "zod";

const walkthroughSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z.string().trim().min(7, "Enter a phone number with at least 7 digits.").max(30),
  company: z.string().trim().min(2, "Enter your business name.").max(120),
  industry: z.enum(["real-estate", "home-services", "injury-law", "other"], {
    error: "Choose the closest industry.",
  }),
  challenge: z.string().trim().min(10, "Tell us a little more about the current constraint.").max(1200),
  timing: z.enum(["soon", "quarter", "planning", "unsure"], { error: "Choose a timing." }),
  consent: z.literal("on", { error: "Confirm that ONLEV may follow up about this request." }),
  website: z.string().max(0, "Unable to process this request."),
});

export type WalkthroughState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  receipt?: string;
};

export async function submitWalkthrough(
  _previous: WalkthroughState,
  formData: FormData,
): Promise<WalkthroughState> {
  const parsed = walkthroughSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    industry: formData.get("industry"),
    challenge: formData.get("challenge"),
    timing: formData.get("timing"),
    consent: formData.get("consent"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Review the highlighted fields. Nothing has been submitted.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: "Your walkthrough request is validated for this preview. No information was sent or retained because production delivery has not been connected.",
    receipt: `ONLEV-PREVIEW-${Date.now().toString().slice(-6)}`,
  };
}
