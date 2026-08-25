# Site Architecture

Status: **Application boundary and route strategy locked; parent marketing site and all three demo systems implemented through Phase 8**

## Runtime architecture

Build one Next.js App Router application with four independently themed experiences:

1. Master marketing showroom
2. Real-estate demo
3. Plumbing and home-services demo
4. Injury-law demo

Use ordinary, crawlable routes. Do not use iframes, microfrontends, or one giant client-side page. Visual transitions may create continuity, but URLs, refresh, history, accessibility, and direct links remain authoritative.

Pages and layouts are Server Components by default. Browser APIs, GSAP, Motion interactions, Lenis, and R3F are isolated behind the smallest possible client boundaries.

## Planned routes

```text
/
├── /showroom
├── /systems
├── /process
├── /work
├── /contact
├── /privacy
├── /terms
├── /accessibility
└── /showroom
    ├── /real-estate
    │   ├── /listings
    │   ├── /listings/[slug]
    │   ├── /buying
    │   ├── /selling
    │   ├── /neighborhoods/[slug]
    │   └── /tools/[tool]
    ├── /plumbing
    │   ├── /services/[slug]
    │   ├── /service-areas/[slug]
    │   └── /tools/[tool]
    └── /injury-law
        ├── /practice-areas/[slug]
        ├── /attorneys/[slug]
        ├── /resources/[slug]
        └── /case-review
```

The Phase 8 parent routes are implemented. `/showroom` is an orientation redirect into the authoritative root Three Doors hub; every demo remains independently routed beneath `/showroom/[vertical]`.

## Source organization

```text
docs/                       Permanent product and quality source of truth
public/
├── models/                 Optimized GLB assets only
└── textures/               KTX2/WebP/AVIF and fallbacks
src/
├── app/                    Routes, layouts, metadata, route handlers
├── components/
│   ├── a11y/               Cross-feature accessibility helpers
│   ├── layout/             Container, Grid, Section
│   ├── three/              Canvas boundary and later shared scene utilities
│   └── ui/                 Themeable semantic primitives
├── config/                 Site and vertical registry
├── features/
│   ├── showroom/           Master showroom composition
│   ├── onlev/              Parent brand, navigation, marketing composition, forms, and supporting pages
│   ├── system-lens/        Owner-facing system explanation layer
│   └── demos/              Vertical-owned composition and tools
├── hooks/                  Browser interaction hooks
├── lib/                    Framework-agnostic utilities and library setup
├── providers/              Minimal client providers
├── schemas/                Input and server-boundary validation
└── styles/                 Tokens and global foundation
```

## Sharing boundaries

Share infrastructure, not visible page composition.

Shared:

- Semantic UI primitives
- Responsive layout utilities
- Accessibility patterns
- Motion tokens and reduced-motion behavior
- Canvas loading and fallback behavior
- Form validation and lead-boundary schemas
- Analytics event vocabulary
- CRM/notification adapters when implemented
- Tool result, sharing, and report infrastructure

Vertical-owned:

- Information architecture and page composition
- Display typography and brand voice
- Photography, 3D assets, and materials
- Motion personality
- Tool questions, rules, results, and disclaimers
- Conversion language and qualification logic

Target approximately 70% shared machinery and 30% authored presentation. This is not a quota; it prevents both duplication and reskinning.

## Data and lead lifecycle

```text
Anonymous visit and attribution
→ industry intent
→ meaningful tool interaction
→ useful result
→ explicit follow-up request
→ contact and consent
→ server validation and abuse controls
→ CRM adapter
→ confirmation and next action
```

Rules:

- The server is authoritative for lead creation and sensitive validation.
- URL state is limited to safe, shareable, non-sensitive tool state.
- Do not place injury answers, date of birth, psychological-impact responses, or private financial inputs in URLs or analytics.
- Analytics receives normalized event categories, not raw intake answers.
- CRM integration sits behind an adapter rather than being imported directly into features.
- Retention, deletion, access controls, encryption, and vendor agreements are defined before sensitive intake launches.
- Add rate limiting, honeypot protection, and a privacy-respecting challenge only when the form threat model requires it.

## 3D and motion loading

- R3F and GSAP must not enter the initial bundle for routes that do not use them.
- The semantic hero content renders before scene initialization.
- A route dynamically loads the scene client boundary only when needed.
- Only the selected vertical world loads at full fidelity.
- Non-visible canvases pause or unmount.
- Asset variants are capability-aware.

## Performance budgets

| Metric | Target |
|---|---:|
| LCP | <2.5s mobile p75 |
| INP | <200ms |
| CLS | <0.1 |
| Initial route JS before optional 3D | ~180–220KB gzipped maximum |
| Initial 3D payload | <1.5MB preferred |
| Route-specific 3D assets | <4MB preferred |
| Desktop animation | 60fps target |
| Reduced low-power tier | stable 30fps minimum |

Budgets are release constraints, not aspirational notes.

## SEO and demo disclosure

- Marketing routes receive complete metadata, canonical URLs, sitemap, and appropriate organization/service schema.
- Demo routes remain clearly labeled demonstrations and default to `noindex` until identity and content policies are finalized.
- Never publish fake LocalBusiness, LegalService, review, listing, or case-result structured data.
- All meaningful copy remains available outside canvas.
- `onlev.site` is the canonical marketing origin. The marketing route family has route metadata, an app icon, `robots.txt`, and `sitemap.xml`.
- The root metadata identifies ONLEV as the public parent brand. Demo titles inherit the ONLEV title template while retaining explicit fictional demonstration disclosures inside their layouts.

## Future marketplace seam

The vertical registry may eventually expand into a system manifest. Do not introduce tenant IDs, creator ownership, billing, permissions, or publishing workflows until the marketplace becomes a validated product requirement.
