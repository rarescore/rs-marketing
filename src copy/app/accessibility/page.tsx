import type { Metadata } from "next";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";
import { LegalPage } from "@/features/onlev/site/legal-page";

export const metadata: Metadata = { title: "Accessibility", alternates: { canonical: "/accessibility" } };

export default function AccessibilityPage() {
  return <OnlevShell><LegalPage title="Accessibility" updated="August 22, 2026" introduction="ONLEV is being built toward WCAG 2.2 Level AA. Accessibility is part of the system architecture, not a launch-week overlay.">
    <h2>What the experience supports</h2><p>Meaningful content and navigation exist in semantic HTML; industry destinations remain ordinary links; forms use visible labels and inline errors; focus treatments are visible; keyboard order follows the page; touch targets are intentionally sized; and text scaling and browser zoom remain enabled.</p>
    <h2>Motion and 3D</h2><p>The showroom uses purposeful 3D and scroll choreography. Essential messaging and actions do not depend on WebGL. Reduced-motion users receive authored static or crossfade alternatives, ambient loops stop, large camera travel is removed, and no route requires a mandatory intro.</p>
    <h2>Forms and sensitive journeys</h2><p>Forms provide persistent labels, semantic input types, server validation, error summaries, consent language, and focus-managed feedback. Sensitive Injury Law review steps avoid unnecessary detail and provide stable mobile layouts and human-help routes.</p>
    <h2>Known project-stage limitations</h2><p>Final licensed font files, production media, third-party widgets, CRM forms, scheduling, analytics, and vendor integrations are not yet connected. Each can change accessibility behavior and must be audited after integration. Cross-browser assistive-technology testing remains part of final release validation.</p>
    <h2>Feedback</h2><p>If something prevents access, contact <a href="mailto:accessibility@onlev.site">accessibility@onlev.site</a> with the page, device, browser, assistive technology, and a description of the barrier. The address is reserved for the production feedback process and is not represented as a live staffed inbox in this preview.</p>
  </LegalPage></OnlevShell>;
}
