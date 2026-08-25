"use client";
import { useState } from "react";
import Link from "next/link";
import { plumbingBase } from "./data";
import { useSystemLens } from "@/features/system-lens/system-lens-store";

export function AreaChecker() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<"inside" | "outside" | null>(null);
  const record = useSystemLens((state) => state.record);
  function check(event: React.FormEvent) {
    event.preventDefault();
    const inside = /^(911|91001|91024|91030)/.test(zip.trim());
    setResult(inside ? "inside" : "outside");
    record({ scope: "plumbing", type: "service_category_identified", signal: "Service area checked", response: inside ? "Demonstration territory matched" : "Outside-area path shown", value: "Fewer dead-end requests", status: "derived" });
  }
  return <section className="pl-area-checker"><form onSubmit={check}><label htmlFor="area-zip">ZIP code</label><div><input id="area-zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} value={zip} onChange={(event) => { setZip(event.target.value); setResult(null); }} placeholder="e.g. 91103" required /><button className="pl-button pl-button--primary" type="submit">Check area</button></div></form>{result && <div className="pl-area-result" role="status" tabIndex={-1}>{result === "inside" ? <><strong>This ZIP matches the fictional demonstration territory.</strong><p>A real team would confirm the exact address and current availability before promising service.</p><Link href={`${plumbingBase}/request-service`}>Prepare a request →</Link></> : <><strong>This ZIP is outside the fictional demonstration territory.</strong><p>A production system would offer a verified referral or a call-back request—not imply unavailable coverage.</p><Link href={`${plumbingBase}/contact`}>Ask about coverage →</Link></>}</div>}</section>;
}
