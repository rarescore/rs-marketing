# LG Growth Studio — 2026 conversion/story redesign

Implemented from the agreed page-by-page direction:

1. Hero restored to scroll-controlled pomegranate sequence. Seeds are visible on initial load and the frame sequence advances only as the user scrolls. The sequence ends at the next section and uses requestAnimationFrame interpolation/high-DPI canvas rendering.
2. Homepage rewritten around the story: attention -> first-impression problem -> transformation -> process -> proof -> pricing -> objections -> next action.
3. Homepage audit no longer expands inside the homepage. The hero audit input sends the visitor to `/audit?url=...`.
4. `/audit` is a dedicated analysis workspace. Loading, Lighthouse/technical analysis, score breakdown, issue mapping and next actions all stay on that page.
5. Score colors: red 0–39, amber 40–64, green 65–84, dark green 85–100.
6. Reviews preview remains on the homepage. `/reviews` contains 200 development review records, 20 per page, with pagination. Replace development placeholder review content with verified customer reviews before public launch.
7. Existing expandable pricing-card concept retained. Pricing: Website from $1,500; Foundation $750/mo; Growth $2,000/mo; Custom.
8. `/build-website` is now a dedicated guided configurator. Completing the questions leads to a real summary and actionable Submit/Reserve options instead of a dead end.
9. Homepage is deliberately shorter. Detailed service explanations belong on subpages.
10. Motion is restrained: pomegranate sequence, review rail, ScrollReveal headings, card expansion and dedicated audit loading. No unnecessary background effects.
