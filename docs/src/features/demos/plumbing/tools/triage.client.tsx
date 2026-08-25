"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { triage, type ToolResult } from "../tool-engines";
import { ToolFrame, Result, downloadRecord } from "./tool-shared";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

const symptomOptions = [["leak", "Leak / water"], ["hot", "No hot water"], ["pressure", "Low pressure"], ["drain", "Slow / blocked drain"], ["sewer", "Sewage / main backup"]] as const;
const symptomPreset: Record<string, string> = { "leaks-and-shutoffs": "leak", "water-heaters": "hot", "pressure-and-flow": "pressure", "drains-and-sewers": "drain" };

export default function TriageTool() {
  const [result, setResult] = useState<ToolResult | null>(null);
  const record = useSystemLens((state) => state.record);
  const searchParams = useSearchParams();
  const initialSymptom = symptomPreset[searchParams.get("symptom") ?? ""] ?? "leak";

  return <ToolFrame eyebrow="Tool 02 / Safety first" title="Symptom-to-Action Triage" intro="Organize a symptom into a safe service pathway. Red-flag answers override every ordinary result.">
    <form className="pl-tool-form" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const next = triage({ symptom: String(data.get("symptom")), active: data.get("active") === "yes", hazard: String(data.get("hazard")), multiple: data.get("multiple") === "yes" });
      setResult(next);
      record({ scope: "plumbing", type: next.title.includes("Immediate") ? "emergency_intent_identified" : "triage_completed", signal: "Symptom triage completed", response: next.title, value: "Safer routing and clearer service context", status: "derived" });
    }}>
      <fieldset><legend>Closest symptom</legend><div className="pl-choice-grid">{symptomOptions.map(([value, label]) => <label key={value}><input type="radio" name="symptom" value={value} defaultChecked={initialSymptom === value} /><span>{label}</span></label>)}</div></fieldset>
      <fieldset><legend>Is the condition active right now?</legend><div className="pl-choice-row"><label><input type="radio" name="active" value="yes" /><span>Yes</span></label><label><input type="radio" name="active" value="no" defaultChecked /><span>No / contained</span></label></div></fieldset>
      <label>Immediate hazard<select name="hazard" defaultValue="none"><option value="none">None observed</option><option value="gas">Gas odor or fire</option><option value="electric">Water near electricity</option><option value="danger">Immediate danger to people</option></select></label>
      <fieldset><legend>Are multiple fixtures or areas affected?</legend><div className="pl-choice-row"><label><input type="radio" name="multiple" value="yes" /><span>Yes</span></label><label><input type="radio" name="multiple" value="no" defaultChecked /><span>No / not sure</span></label></div></fieldset>
      <button className="pl-button pl-button--primary" type="submit">Show safe next action</button>
    </form>
    {result && <Result result={result} cta="Prepare this service request" onDownload={() => downloadRecord("field-standard-triage.txt", `${result.title}\n\n${result.summary}\n\nNext actions:\n- ${result.actions.join("\n- ")}`)} />}
  </ToolFrame>;
}
