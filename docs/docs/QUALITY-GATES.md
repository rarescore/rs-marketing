# Quality Gates

Status: **Mandatory release criteria**

No phase is complete because it “looks done.” It is complete when its applicable gates pass and `CURRENT-STATE.md` records the result.

## Product clarity

- A muted five-second test communicates that this is a showroom for three client-acquisition website systems.
- The offer remains understandable with WebGL disabled.
- Every view has one visually primary action.
- Copy describes customer or business outcomes in plain language.
- The System Lens explains value without exposing developer jargon.

## Visual quality

- The master experience follows the architectural museum direction.
- The Three Doors concept is the single dominant signature.
- The demos differ in composition, typography, materials, motion, and voice—not only color.
- Spacing, type, radii, borders, and elevation derive from tokens.
- No generic template sections, glass-card wall, visual noise, or unearned decoration.
- Real content lengths are used for visual review.
- Review screenshots at 375, 768, 1024, and 1440px.

## Accessibility

- WCAG 2.2 AA target
- Semantic landmarks and logical heading order
- Skip link and visible focus
- Complete keyboard operation
- Touch targets at least 44×44 CSS pixels for primary controls
- Body contrast at least 4.5:1
- Meaning is not carried by color, sound, hover, or canvas alone
- Forms have labels, descriptions, specific inline errors, and focus management
- Route changes restore orientation and move focus appropriately
- Reduced motion preserves content and navigation
- Zoom and text scaling do not break the layout

## Performance

- LCP <2.5 seconds mobile p75
- INP <200ms
- CLS <0.1
- No essential content waits for 3D
- Initial route JS stays within the documented budget
- Initial 3D payload is preferably <1.5MB
- Stable 60fps target on full desktop tier
- Stable 30fps minimum on reduced tier
- Offscreen canvases stop or unmount
- Models and textures are optimized and licensed
- No memory leak after repeated route transitions

## Engineering

Required commands:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

All must exit successfully.

Additional requirements:

- Server Components by default
- Small explicit client boundaries
- No secrets in client code or `NEXT_PUBLIC_` unless intentionally public
- Feature code does not import another vertical’s presentation components
- All server inputs validated with schemas
- Loading, empty, error, and retry states exist where relevant
- WebGL context failure has a functional fallback
- GSAP, listeners, timers, Lenis, and 3D resources clean up on unmount
- No console errors, hydration warnings, missing assets, or broken links

## Content and ethics

- No fake proof or unverifiable claims
- Demo/sample data is unmistakably labeled
- Injury content is trauma-aware and non-sensational
- Real-estate content avoids discriminatory steering
- Plumbing output states code and inspection limits
- Tool assumptions and limitations are visible
- Contact consent is clear, specific, and recorded

## Privacy and security

- Data minimization documented per form
- Sensitive fields do not enter URLs, analytics, or local storage
- Encryption in transit and at rest for sensitive intake
- Access, retention, and deletion policies defined before launch
- CRM and vendors reviewed for the data they receive
- Abuse controls applied at server boundaries
- Legal review completed for the relevant jurisdiction before production intake

## Phase 2 acceptance

- All seven source-of-truth documents exist and agree
- Next.js, TypeScript, Tailwind, R3F, GSAP, and Motion foundation installed
- Semantic design tokens and vertical overrides exist
- Foundational buttons, forms, layout, surface, accessibility, motion, and canvas primitives exist
- No hero, hub, demo, or full marketing page has been built
- Typecheck, lint, and production build pass
- `CURRENT-STATE.md` accurately identifies Phase 3

## Permanent external craft benchmarks

These are quality references, never templates to copy. Future phases inherit their standard of art direction, typography, authored pacing, dimensional craft, transitions, responsive recomposition, and visual polish while preserving this project's original business, accessibility, performance, privacy, and ethical requirements.

- [KODE Immersive](https://kodeimmersive.com/) — benchmark for a singular spatial thesis, restrained interface chrome, and interaction integrated with story.
- [Malvah / Bitter Creek](https://www.malvah.co/projects/bittercreek) — benchmark for editorial media rhythm, project-specific pacing, and typographic control.
- [Malvah / Stewart & Partners](https://www.malvah.co/projects/stewartandpartners) — benchmark for translating one brand idea coherently between flat and dimensional states.
- [Awwwards / Finely Crafted](https://www.awwwards.com/sites/finely-crafted) — benchmark for immersive WebGL craft, custom transitions, and a deliberate mobile alternative.
- [Awwwards 3D / immersive collection](https://www.awwwards.com/websites/3d/) — continuing calibration set for current 3D, motion, responsive, and interaction quality.

Reference constraints:

- Study principles and execution quality, not recognizable compositions, navigation systems, palettes, assets, or motion signatures.
- A vertical's interaction model must remain suitable for its real user context. Injury Law must not become an experimental 3D tour, audio experience, or trauma spectacle.
- No benchmark overrides semantic HTML, immediate access, reduced motion, privacy, legal/medical boundaries, or mobile usability.
- “Premium” is not satisfied by generic reveal animations, glass cards, still-image parallax, or decorative WebGL.

## Phase 8 parent-site acceptance

- ONLEV and `onlev.site` are consistent across metadata, navigation, footer, contact, and supporting routes.
- The approved framed ON / LEV mark remains recognizable in navigation, responsive, transparent, light, dark, and app-icon contexts without turning the site into a black-and-gold theme.
- The completed Three Doors Hero and Industry Hub remain the dominant signature and hand off continuously into the marketing explanation layer.
- The site proves capability through direct access to all three complete demos and their flagship tools.
- What ONLEV builds, system layers, automation/follow-up, process, investment, fit, contact, final CTA, footer, privacy, terms, and accessibility are complete.
- Investment is positioned as custom fixed scope after discovery; no cheap tiers, invented starting price, ROI, proof, clients, awards, or results appear.
- The walkthrough request has server validation, honeypot, consent, inline errors, focus-managed feedback, and an explicit no-send/no-retention preview receipt.
- Desktop, tablet, authored mobile, reduced motion, route links, demo regressions, console state, and the production build pass before Phase 9.
