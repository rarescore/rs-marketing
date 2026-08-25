"use server";

import { z } from "zod";

const consultationSchema = z.object({
  name: z.string().trim().min(2,"Enter your name.").max(80),
  phone: z.string().trim().min(7,"Enter a phone number with at least 7 digits.").max(30),
  email: z.union([z.literal(""),z.string().trim().email("Enter a valid email address.").max(120)]),
  contactTime: z.enum(["morning","afternoon","evening","anytime"],{error:"Choose a preferred contact time."}),
  adultStatus: z.enum(["yes","prefer-not"],{error:"Choose one option."}),
  intent: z.enum(["review","next-steps","existing-counsel","business-owner"],{error:"Choose what you would like help with."}),
  source: z.enum(["consultation","case-review-result"]),
  consent: z.literal("on",{error:"Confirm the demonstration may process these details for the no-send preview."}),
  website: z.string().max(0,"Unable to process this request."),
});

export type InjuryConsultationState={success:boolean;message:string;errors?:Record<string,string[]>;receipt?:string};
export async function submitInjuryConsultation(_previous:InjuryConsultationState,formData:FormData):Promise<InjuryConsultationState>{
  const parsed=consultationSchema.safeParse({name:formData.get("name"),phone:formData.get("phone"),email:formData.get("email"),contactTime:formData.get("contactTime"),adultStatus:formData.get("adultStatus"),intent:formData.get("intent"),source:formData.get("source"),consent:formData.get("consent"),website:formData.get("website")??""});
  if(!parsed.success)return{success:false,message:"Review the highlighted fields.",errors:parsed.error.flatten().fieldErrors};
  return{success:true,message:"Consultation preview prepared. Nothing was sent to a law firm, stored, or placed in a CRM, and no attorney-client relationship was created.",receipt:`MV-DEMO-${Date.now().toString().slice(-6)}`};
}
