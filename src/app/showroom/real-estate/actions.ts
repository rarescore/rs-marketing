"use server";

import { z } from "zod";

const demoLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z.string().trim().min(7, "Enter a phone number with at least 7 digits.").max(30),
  intent: z.enum(["buying", "selling", "both", "listing", "general", "owner"]),
  timing: z.string().trim().min(1, "Choose a preferred timing.").max(60),
  message: z.string().trim().max(800).optional(),
  context: z.string().trim().max(120).optional(),
  consent: z.literal("on", { error: "Confirm that this demonstration may process the form for this preview." }),
  website: z.string().max(0, "Unable to process this request."),
});

export type DemoLeadState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  receipt?: string;
};

export async function submitDemoLead(_previous: DemoLeadState, formData: FormData): Promise<DemoLeadState> {
  const parsed = demoLeadSchema.safeParse({
    name: formData.get("name"), email: formData.get("email"), phone: formData.get("phone"),
    intent: formData.get("intent"), timing: formData.get("timing"), message: formData.get("message"),
    context: formData.get("context"), consent: formData.get("consent"), website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { success: false, message: "Review the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  return {
    success: true,
    message: "Demo request prepared. No information was sent to a brokerage or retained by this demonstration.",
    receipt: `AN-DEMO-${Date.now().toString().slice(-6)}`,
  };
}
