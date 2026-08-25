export type ReviewAnswers = Record<string, string[]>;
export type ReviewGuidance = {
  safetyActions: string[];
  reviewTiming: string;
  evidenceActions: string[];
  documentationGaps: string[];
  generalNextSteps: string[];
  assumptions: string[];
  appliedRuleIds: string[];
};

const has=(answers:ReviewAnswers,key:string,value:string)=>answers[key]?.includes(value)??false;
const any=(answers:ReviewAnswers,key:string,values:string[])=>values.some(value=>has(answers,key,value));

export function evaluateIncidentReview(answers:ReviewAnswers):ReviewGuidance{
  const safetyActions:string[]=[];const evidenceActions:string[]=[];const documentationGaps:string[]=[];const generalNextSteps:string[]=[];const assumptions:string[]=[];const appliedRuleIds:string[]=[];
  if(any(answers,"safety",["danger","urgent-care"])){safetyActions.push("Address immediate safety first. Call 911 for immediate danger and seek appropriate medical care for severe, new, or worsening symptoms.");appliedRuleIds.push("SAFETY-01");}
  else{safetyActions.push("Continue to monitor safety and medical needs. A website cannot assess medical urgency; contact an appropriate medical professional about concerning changes.");appliedRuleIds.push("SAFETY-02");}
  if(!any(answers,"care",["emergency","doctor","specialist","therapy","other-care"])){generalNextSteps.push("If you have symptoms or health concerns, consider discussing them with an appropriate healthcare professional. This is not a diagnosis or treatment instruction.");appliedRuleIds.push("CARE-01");}
  if(!has(answers,"evidence","photos"))documentationGaps.push("Original scene, condition, vehicle, or property photographs, if they exist and can be preserved safely.");
  if(!has(answers,"evidence","report"))documentationGaps.push("Incident or police report number, or a note explaining whether a report was made.");
  if(!has(answers,"evidence","witness"))documentationGaps.push("Witness names and contact details, if any are known.");
  if(!has(answers,"evidence","medical"))documentationGaps.push("Care instructions, appointment records, and a dated symptom/change record.");
  if(!has(answers,"evidence","work"))documentationGaps.push("Work absence, restriction, expense, and household-support records where applicable.");
  if(documentationGaps.length)appliedRuleIds.push("DOCS-01");
  evidenceActions.push("Preserve original files, messages, reports, and physical items. Work from copies and avoid editing source material.");
  if(any(answers,"incident-type",["vehicle","pedestrian","cyclist"]))evidenceActions.push("Identify vehicle, roadway, device, report, witness, and possible camera records before routine systems overwrite them.");
  if(has(answers,"incident-type","property"))evidenceActions.push("Preserve the location and condition record, incident reporting details, footwear or involved objects, and possible maintenance or camera sources.");
  if(has(answers,"insurance","statement"))evidenceActions.push("Keep the request for a recorded statement and note who requested it, the insurer, and the proposed timing.");
  if(any(answers,"insurance",["release","offer"]))evidenceActions.push("Keep complete copies of any release, authorization, or offer and seek qualified review before relying on a generic explanation.");
  appliedRuleIds.push("EVIDENCE-01");
  const timeSensitive=any(answers,"insurance",["statement","release","offer","deadline-mentioned"])||has(answers,"incident-age","days-weeks")||any(answers,"evidence",["camera-risk","physical-item"]);
  const reviewTiming=timeSensitive?"Prompt human review may be useful because an outside request, perishable evidence source, or timing issue may need jurisdiction-specific attention.":"A human consultation may still be useful to check jurisdiction, applicable timing, evidence, coverage, and documentation gaps. This is not a finding about case eligibility.";
  appliedRuleIds.push(timeSensitive?"REVIEW-02":"REVIEW-01");
  if(any(answers,"pain",["worsening","new-symptoms"]))generalNextSteps.push("Record changes in plain, dated language and discuss new, worsening, or concerning symptoms with an appropriate medical professional.");
  if(any(answers,"daily",["mobility","self-care","household","caregiving","driving","sleep-limit"]))generalNextSteps.push("Keep brief dated notes about tasks you cannot do, do differently, or need help with. Observable changes are more useful than trying to diagnose yourself.");
  if(any(answers,"work",["missed","reduced","job-change","expenses"]))generalNextSteps.push("Collect work schedules, restrictions, pay records, employer communications, receipts, and other records that reflect practical disruption.");
  if(any(answers,"psych",["anxiety","sleep","avoidance","concentration","distress"]))generalNextSteps.push("If emotional or behavioral changes are concerning, consider discussing them with an appropriate qualified professional. Keep private notes only if doing so feels helpful and safe.");
  generalNextSteps.push("Prepare questions about jurisdiction, applicable deadlines, insurer requests, available coverage, and what information a lawyer would need next.");
  assumptions.push("This guidance uses only broad categories selected during this page visit.","It does not diagnose an injury, determine fault, calculate a deadline, estimate value, decide whether a case exists, or create representation.","Rules differ by jurisdiction and require review by a qualified attorney.");
  return{safetyActions,reviewTiming,evidenceActions,documentationGaps,generalNextSteps,assumptions,appliedRuleIds};
}
