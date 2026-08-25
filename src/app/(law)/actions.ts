"use server";
import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { directMessageSchema, leadSubmissionSchema, type LeadActionState } from "@/schemas/lead";
import { notifyFirm, notifyFirmDirect, sendVisitorConfirmation } from "@/lib/intake/email";
import { pipelineConfigured, verifyTurnstile } from "@/lib/intake/security";

export async function submitLead(_previous: LeadActionState, formData: FormData): Promise<LeadActionState> {
  if (!pipelineConfigured()) return { status: "error", message: "Online requests are temporarily unavailable. Your information was not sent. Please call (818) 913-6158." };
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const raw = {
    fullName: formData.get("fullName"), phone: formData.get("phone"), email: formData.get("email") ?? "",
    preferredContactTime: formData.get("preferredContactTime") ?? "", faultAnswer: formData.get("faultAnswer"), injuryAnswer: formData.get("injuryAnswer"),
    accidentWhen: formData.get("accidentWhen"), accidentDate: formData.get("accidentDate") ?? "", source: formData.get("source"),
    accidentType: formData.get("accidentType") ?? "", accidentLocation: formData.get("accidentLocation") ?? "", medicalAttention: formData.get("medicalAttention") ?? "not-sure",
    consent: formData.get("consent"), website: formData.get("website") ?? "", turnstileToken: formData.get("cf-turnstile-response") ?? "",
  };
  const parsed = leadSubmissionSchema.safeParse(raw);
  const values = { fullName: String(raw.fullName ?? ""), phone: String(raw.phone ?? ""), email: String(raw.email ?? ""), preferredContactTime: String(raw.preferredContactTime ?? ""), consent: String(raw.consent ?? "") };
  if (!parsed.success) return { status: "error", message: "Check the highlighted information and try again.", errors: parsed.error.flatten().fieldErrors, values };
  const lead = parsed.data;
  try {
    if (!(await verifyTurnstile(lead.turnstileToken, ip))) return { status: "error", message: "The security check did not complete. Your information was not sent. Refresh the page or call us now.", values };
    const bucket = Math.floor(Date.now() / (15 * 60 * 1000));
    const leadId = createHash("sha256").update(`${lead.phone}:${lead.source}:${bucket}`).digest("hex").slice(0, 24);
    await notifyFirm(leadId, lead);
    try { await sendVisitorConfirmation(leadId, lead); } catch { /* Firm delivery already succeeded. */ }
    return { status: "success", message: "Your request has been received.", leadId, firstName: lead.fullName.split(/\s+/)[0] || "there", phoneLastFour: lead.phone.slice(-4) };
  } catch { return { status: "error", message: "We could not deliver your request. Your information was not sent. Please try again or call (818) 913-6158 now.", values }; }
}

export async function submitDirectMessage(_previous: LeadActionState, formData: FormData): Promise<LeadActionState> {
  if (!pipelineConfigured()) return { status: "error", message: "Online messages are temporarily unavailable. Your information was not sent. Please call (818) 913-6158." };
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const raw = { fullName: formData.get("fullName"), contactDetail: formData.get("contactDetail"), preferredContactMethod: formData.get("preferredContactMethod"), message: formData.get("message") ?? "", source: formData.get("source"), consent: formData.get("consent"), website: formData.get("website") ?? "", turnstileToken: formData.get("cf-turnstile-response") ?? "" };
  const parsed = directMessageSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: "Check the information and try again." };
  try {
    if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) return { status: "error", message: "The security check did not complete. Your information was not sent." };
    const bucket = Math.floor(Date.now() / (15 * 60 * 1000));
    const leadId = createHash("sha256").update(`${parsed.data.contactDetail}:${parsed.data.source}:${bucket}`).digest("hex").slice(0, 24);
    await notifyFirmDirect(leadId, parsed.data);
    return { status: "success", message: "Your message has been received.", leadId, firstName: parsed.data.fullName.split(/\s+/)[0] || "there" };
  } catch { return { status: "error", message: "We could not deliver your message. Your information was not sent. Please try again or call (818) 913-6158." }; }
}
