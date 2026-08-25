import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const faultAnswerSchema = z.enum(["yes", "no", "not-sure"]);
export const injuryAnswerSchema = z.enum(["yes", "no", "not-sure"]);
export const accidentWhenSchema = z.enum(["today", "yesterday", "last-7-days", "more-than-week", "exact-date", "not-sure"]);

export const leadSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  phone: z.string().trim().min(7, "Enter a valid US phone number.").max(30).transform((value, context) => {
    const parsed = parsePhoneNumberFromString(value, "US");
    if (!parsed?.isValid()) {
      context.addIssue({ code: "custom", message: "Enter a valid US phone number." });
      return z.NEVER;
    }
    return parsed.number;
  }),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.").max(160)]),
  preferredContactTime: z.enum(["", "morning", "afternoon", "evening", "anytime"]),
  faultAnswer: faultAnswerSchema,
  injuryAnswer: injuryAnswerSchema,
  accidentWhen: accidentWhenSchema,
  accidentDate: z.union([z.literal(""), z.iso.date()]),
  source: z.string().trim().min(1).max(120),
  consent: z.literal("on", { error: "Confirm that Lev & On may contact you about your request." }),
  website: z.string().max(0, "Unable to process this request."),
  turnstileToken: z.string().max(4096),
}).superRefine((value, context) => {
  if (value.accidentWhen === "exact-date" && !value.accidentDate) {
    context.addIssue({ code: "custom", path: ["accidentDate"], message: "Choose the accident date or select Not sure." });
  }
  if (value.accidentDate && value.accidentDate > new Date().toISOString().slice(0, 10)) {
    context.addIssue({ code: "custom", path: ["accidentDate"], message: "The accident date cannot be in the future." });
  }
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
export type LeadActionState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Record<string, string[]>;
  leadId?: string;
  firstName?: string;
  phoneLastFour?: string;
};
export const initialLeadState: LeadActionState = { status: "idle", message: "" };
