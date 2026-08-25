import type { Metadata } from "next";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { LegalPage } from "@/features/onlev/site/legal-page";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <OnlevShell><LegalPage title="Terms of Use" updated="August 22, 2026" introduction="These project-stage terms describe the ONLEV marketing showroom and fictional industry demonstrations. Final commercial terms require qualified review before production launch.">
    <h2>Demonstration status</h2><p>The Real Estate, Home Services, and Injury Law experiences are fictional demonstrations created to show design and system capability. Business names, properties, market figures, people, scenarios, service areas, credentials, receipts, and contact outcomes are illustrative unless clearly stated otherwise.</p>
    <h2>No professional advice</h2><p>Tools provide general planning and educational output. They are not legal, medical, financial, tax, lending, appraisal, inspection, engineering, plumbing-code, or other licensed professional advice. They do not diagnose, approve, certify, guarantee, calculate legal deadlines, or establish representation.</p>
    <h2>No service relationship</h2><p>Using a demo tool or preparing a preview form does not create an attorney-client, broker-client, contractor-customer, agency, advisory, or ONLEV client relationship. No service is scheduled and no lead is delivered by the local preview.</p>
    <h2>Acceptable use</h2><p>Do not attempt to disrupt, misuse, scrape sensitive flows, introduce malicious input, impersonate another person, or rely on fictional demo details as real-world guidance. Use the showroom only for lawful evaluation of the ONLEV concept.</p>
    <h2>Intellectual property</h2><p>The ONLEV identity, showroom, authored demo brands, interface compositions, copy, and code are project assets. Third-party platform names and libraries remain the property of their respective owners. Commercial reuse requires an applicable agreement.</p>
    <h2>Availability and changes</h2><p>The preview may change, move, or be unavailable without notice. No warranty is made that every demonstration is complete for a production jurisdiction, vendor, or business.</p>
    <h2>Production review</h2><p>Before launch, ONLEV must establish the operating entity, governing law, dispute terms, warranty and liability language, service contact, accessibility and privacy processes, and any required vertical disclosures.</p>
  </LegalPage></OnlevShell>;
}
