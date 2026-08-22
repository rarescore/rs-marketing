import { z } from "zod";

export const leadContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.email().optional(),
  preferredContactTime: z.string().trim().max(100).optional(),
  consentToContact: z.literal(true),
  source: z.string().trim().max(120),
});

export type LeadContact = z.infer<typeof leadContactSchema>;
