"use server";

import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  phone: z.string().trim().min(7, "Enter a phone number with at least 7 digits.").max(30),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.").max(120)]),
  urgency: z.enum(["active", "contained", "planning", "not-sure"]),
  service: z.enum(["leaks-and-shutoffs", "water-heaters", "drains-and-sewers", "pressure-and-flow", "repiping-and-branches", "fixtures-and-installation", "not-sure"]),
  propertyType: z.enum(["house", "condo", "multifamily", "commercial", "other"]),
  contactWindow: z.string().trim().min(1, "Choose a preferred contact window.").max(80),
  context: z.string().trim().max(800, "Keep notes under 800 characters.").optional(),
  source: z.string().trim().max(100).optional(),
  consent: z.literal("on", { error: "Confirm this demo may process the form for the preview." }),
  website: z.string().max(0, "Unable to process this request."),
});

export type PlumbingRequestState = { success: boolean; message: string; errors?: Record<string, string[]>; receipt?: string };

export async function submitPlumbingRequest(_previous: PlumbingRequestState, formData: FormData): Promise<PlumbingRequestState> {
  const parsed = requestSchema.safeParse({ name: formData.get("name"), phone: formData.get("phone"), email: formData.get("email"), urgency: formData.get("urgency"), service: formData.get("service"), propertyType: formData.get("propertyType"), contactWindow: formData.get("contactWindow"), context: formData.get("context"), source: formData.get("source"), consent: formData.get("consent"), website: formData.get("website") ?? "" });
  if (!parsed.success) return { success: false, message: "Review the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  return { success: true, message: "Demo request prepared. Nothing was dispatched, transmitted to a service company, or retained by this demonstration.", receipt: `FS-DEMO-${Date.now().toString().slice(-6)}` };
}
