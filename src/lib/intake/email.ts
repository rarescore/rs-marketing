import { Resend } from "resend";
import type { LeadSubmission } from "@/schemas/lead";
import { lawPhoneDisplay } from "@/features/demos/injury-law/data";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character] ?? character));
}
function client() {
  if (!process.env.RESEND_API_KEY) throw new Error("Lead email is not configured.");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function notifyFirm(leadId: string, lead: LeadSubmission) {
  const from = process.env.INTAKE_FROM_EMAIL;
  if (!from) throw new Error("Lead email is not configured.");
  const { data, error } = await client().emails.send({
    from, to: "hello.rarescore@gmail.com", replyTo: lead.email || undefined,
    subject: `New case-review request — ${lead.fullName}`,
    html: `<h1>New case-review request</h1><p><strong>Lead ID:</strong> ${escapeHtml(leadId)}</p><p><strong>Name:</strong> ${escapeHtml(lead.fullName)}</p><p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p><p><strong>Email:</strong> ${escapeHtml(lead.email || "Not provided")}</p><p><strong>Preferred time:</strong> ${escapeHtml(lead.preferredContactTime || "No preference")}</p><hr><p><strong>Someone else may have caused it:</strong> ${escapeHtml(lead.faultAnswer)}</p><p><strong>Injured:</strong> ${escapeHtml(lead.injuryAnswer)}</p><p><strong>When:</strong> ${escapeHtml(lead.accidentWhen)}</p><p><strong>Exact date:</strong> ${escapeHtml(lead.accidentDate || "Not provided")}</p><p><strong>Source:</strong> ${escapeHtml(lead.source)}</p><p><strong>Submitted:</strong> ${new Date().toISOString()}</p>`,
  }, { idempotencyKey: `firm-intake-${leadId}` });
  if (error || !data?.id) throw new Error("The intake notification was not accepted.");
  return data.id;
}

export async function sendVisitorConfirmation(leadId: string, lead: LeadSubmission) {
  if (!lead.email || !process.env.INTAKE_FROM_EMAIL) return;
  const firstName = lead.fullName.split(/\s+/)[0] || "there";
  await client().emails.send({
    from: process.env.INTAKE_FROM_EMAIL, to: lead.email,
    subject: "We received your request — Lev & On Law Firm",
    html: `<h1>Thank you, ${escapeHtml(firstName)}.</h1><p>Your request has been received. A member of the Lev & On Law Firm intake team will contact you shortly.</p><p>If you need to speak now, call <a href="tel:+18189136158">${lawPhoneDisplay}</a>.</p><p>Submitting a request does not create an attorney-client relationship.</p>`,
  }, { idempotencyKey: `visitor-confirmation-${leadId}` });
}
