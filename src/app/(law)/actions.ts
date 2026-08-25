"use server";
import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { leadSubmissionSchema, type LeadActionState } from "@/schemas/lead";
import { notifyFirm, sendVisitorConfirmation } from "@/lib/intake/email";
import { pipelineConfigured, verifyTurnstile } from "@/lib/intake/security";

export async function submitLead(_previous: LeadActionState, formData: FormData): Promise<LeadActionState> {
  if (!pipelineConfigured()) return { status: "error", message: "Online requests are temporarily unavailable. Please call (818) 913-6158." };
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const parsed = leadSubmissionSchema.safeParse({
    fullName: formData.get("fullName"), phone: formData.get("phone"), email: formData.get("email") ?? "",
    preferredContactTime: formData.get("preferredContactTime") ?? "", faultAnswer: formData.get("faultAnswer"), injuryAnswer: formData.get("injuryAnswer"),
    accidentWhen: formData.get("accidentWhen"), accidentDate: formData.get("accidentDate") ?? "", source: formData.get("source"),
    consent: formData.get("consent"), website: formData.get("website") ?? "", turnstileToken: formData.get("cf-turnstile-response") ?? "",
  });
  if (!parsed.success) return { status: "error", message: "Check the highlighted information and try again.", errors: parsed.error.flatten().fieldErrors };
  const lead = parsed.data;
  try {
    if (!(await verifyTurnstile(lead.turnstileToken, ip))) return { status: "error", message: "We could not verify this request. Please try again or call us now." };
    const bucket = Math.floor(Date.now() / (15 * 60 * 1000));
    const leadId = createHash("sha256").update(`${lead.phone}:${lead.source}:${bucket}`).digest("hex").slice(0, 24);
    await notifyFirm(leadId, lead);
    try { await sendVisitorConfirmation(leadId, lead); } catch { /* Firm delivery already succeeded. */ }
    return { status: "success", message: "Your request has been received.", leadId, firstName: lead.fullName.split(/\s+/)[0] || "there", phoneLastFour: lead.phone.slice(-4) };
  } catch { return { status: "error", message: "We could not deliver your request. Please try again or call (818) 913-6158 now." }; }
}
