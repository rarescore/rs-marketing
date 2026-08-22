import type { Metadata } from "next";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { LegalPage } from "@/features/onlev/site/legal-page";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <OnlevShell><LegalPage title="Privacy Policy" updated="August 22, 2026" introduction="This policy explains the current ONLEV showroom preview. It must be reviewed and updated against the final hosting, analytics, lead-delivery, and vendor configuration before production launch.">
    <h2>Current preview behavior</h2><p>The marketing contact form is a demonstration. It validates entries on the server and returns a fictional receipt, but no information is delivered to ONLEV, stored in a database, added to a CRM, or used for follow-up.</p>
    <h2>Information a production request may collect</h2><p>A production walkthrough request may collect name, business name, email, phone, industry, preferred timing, the business challenge supplied by the requester, and consent. ONLEV should collect only what is necessary to respond and scope the requested service.</p>
    <h2>Showroom tools and sensitive information</h2><p>The three demo systems apply stricter vertical-specific rules. Injury Law review answers remain in volatile page memory and are not included in contact payloads, URLs, browser storage, analytics, or System Lens. Demo financial and service-planning inputs are not used for marketing analytics.</p>
    <h2>Analytics, attribution, and cookies</h2><p>No production analytics or advertising stack is represented as connected in this preview. Before launch, ONLEV must identify every measurement and storage technology, document its purpose and retention, configure consent where required, and avoid sending raw sensitive form answers to analytics.</p>
    <h2>Service providers and retention</h2><p>Final hosting, CRM, communications, scheduling, call tracking, analytics, and security providers have not been selected for production. This policy will name applicable categories, lawful purposes, retention periods, access controls, deletion paths, and cross-border processing once those decisions are made.</p>
    <h2>Your choices</h2><p>Production users should be able to request access, correction, or deletion where applicable and withdraw consent for optional communications. Contact <a href="mailto:privacy@onlev.site">privacy@onlev.site</a> for privacy questions. The address is reserved for the approved production process and is not represented as a live staffed inbox in this preview.</p>
    <h2>Policy boundary</h2><p>This is a responsible project-stage policy, not legal advice or a substitute for jurisdiction-specific privacy review. ONLEV must complete legal review before enabling production data collection.</p>
  </LegalPage></OnlevShell>;
}
