# ONLEV Experience Rebuild — Phase 0 Audit

Audited: 2026-08-24  
Scope: repository architecture and current showroom behavior only. No application code, routes, styling, packages, or parent ONLEV pages were changed.

## 1. Repository shape

The project is a single Next.js App Router application, not a monorepo.

- `src/app/` — App Router pages, layouts, metadata, server actions, loading/error boundaries
- `src/features/onlev/` — parent ONLEV brand, marketing, header/footer, contact and marketing motion
- `src/features/showroom/` — ONLEV opening, Three Doors scene/hub, demo switcher and legacy gateway shell
- `src/features/demos/real-estate/` — Atelier North presentation, search, stores, lead flow, tools and System Lens panel
- `src/features/demos/plumbing/` — Field Standard presentation, request flow, tool engines, tools and System Lens panel
- `src/features/demos/injury-law/` — Morrow & Vale presentation, cinematic Hero, review engine, consultation and System Lens panel
- `src/features/system-lens/` — shared, scope-separated owner-view event store
- `src/components/` — small shared layout, UI, accessibility and Three.js primitives
- `src/lib/motion/` — current GSAP registration point
- `src/hooks/` — current Lenis hook
- `src/providers/` — root Motion preference provider
- `src/styles/` — global tokens and base rules
- `public/` — brand marks, real-estate imagery, ONLEV cinematic studies and the Injury Law environment plate
- `tests/` — five production-contract tests covering tools, routes/metadata and unfinished/inert-link markers

The root App Router layout is `src/app/layout.tsx`. It supplies metadata, Geist fonts, structured organization data and `AppProviders`. Each showroom has its own App Router layout and imports only its vertical CSS:

- `src/app/showroom/real-estate/layout.tsx` → `real-estate.css`
- `src/app/showroom/plumbing/layout.tsx` → `plumbing.css`
- `src/app/showroom/injury-law/layout.tsx` → `injury.css`

That separation is important: the three verticals are already independent page families rather than theme variants of one visible template.

## 2. Installed technical stack

### Required Phase 1 dependency check

| Package | Status | Installed version / note |
|---|---|---|
| `gsap` | **EXISTING** | `^3.15.0` |
| `lenis` | **EXISTING** | `^1.3.26` |
| `three` | **EXISTING** | `^0.185.1` |
| `@react-three/fiber` | **EXISTING** | `^9.7.0` |
| `@react-three/drei` | **EXISTING** | `^10.7.8` |
| `@react-three/postprocessing` | **EXISTING** | `^3.0.5` |
| `postprocessing` | **EXISTING** | `^6.39.4` |
| `zustand` | **EXISTING** | `^5.0.15` |

Missing from the required Phase 1 list: **none**. Phase 1 should not reinstall or upgrade these packages.

Other existing foundation:

- Next.js `16.3.2`, App Router
- React / React DOM `19.2.8`
- TypeScript `^5`
- Tailwind CSS `^4` plus `@tailwindcss/postcss`
- `@gsap/react` `^2.1.2`
- Motion `^13.1.1`, imported from `motion/react` for ordinary UI and reduced-motion preference. The legacy package name `framer-motion` is not installed.
- Zod `^4.4.3` for server-input validation
- Geist `^1.7.2`
- CVA, `clsx`, and `tailwind-merge` for shared primitives

## 3. Current motion and 3D implementation

### Shared motion foundation that already exists

- `src/lib/motion/gsap.client.ts` registers and exports GSAP, ScrollTrigger and Flip once.
- `src/hooks/use-smooth-scroll.ts` contains a correct Lenis-to-GSAP ticker connection: Lenis emits to `ScrollTrigger.update`, GSAP drives `lenis.raf(time * 1000)`, lag smoothing is disabled, touch synchronization is off, reduced motion bypasses it, and cleanup removes the ticker/destroys Lenis.
- The Lenis hook is **not currently mounted anywhere**. Current public cinematic work therefore uses native document scrolling with ScrollTrigger.
- `src/providers/app-providers.tsx` wraps the app in `MotionConfig` with user reduced-motion preference and a shared UI easing.
- `src/styles/base.css` supplies native smooth scrolling and disables it under reduced motion.
- React View Transitions are already named around portal entry and some page transitions.

### Shared 3D foundation that already exists

- `src/components/three/scene-canvas.tsx` is a generic R3F shell with Suspense, a `[1, 2]` DPR cap, demand rendering, a perspective camera and a WebGL fallback prop.
- It is currently not used by the authored ONLEV or Injury scenes; those scenes create direct `Canvas` instances because they need custom lifecycle and quality behavior.

### Existing rendered scenes

1. `src/features/showroom/hero/onlev-monument-scene.client.tsx`
   - Direct R3F Canvas, real geometry/camera/light choreography, Drei lightformers and restrained postprocessing.
   - Dynamically imported and capability-gated by the ONLEV opening client island.

2. `src/features/showroom/hero/three-doors-scene.client.tsx`
   - Direct R3F Canvas with three physical hinged portals, world-specific geometry, shadows, lighting, camera response and postprocessing.
   - Dynamically imported by `hero-experience.client.tsx`; frame loop stops when offscreen.

3. `src/features/demos/injury-law/clarity-scene.client.tsx`
   - Dynamically imported by the Injury Law Hero.
   - Renders glass fragments, rain, light points, camera travel, bloom/noise/vignette over a fixed project-owned environment plate.
   - Uses `frameloop="always"` while mounted; unlike the Three Doors scene, it does not currently stop when the long homepage Hero is offscreen.

4. `src/features/demos/plumbing/mechanical-hero.client.tsx`
   - GSAP-authored DOM/CSS mechanical assembly, not WebGL.

5. Real Estate
   - Image-led editorial HTML/CSS and Next Image. There is no R3F scene or cinematic master timeline in the Real Estate family today.

There are no GLB/glTF models in the repository. `public/models/` and `public/textures/` contain README placeholders only. There are no `public/3d`, `public/sequences`, or `public/video` asset trees yet.

## 4. Current showroom route and product map

### Door 01 — Atelier North / Real Estate

Base: `/showroom/real-estate`  
Market: Pasadena, Altadena and the San Gabriel foothills  
Identity and data are explicitly fictional/sample content.

| Route | Current behavior |
|---|---|
| `/showroom/real-estate` | Editorial home with an image-led Hero, featured property, move-decision framing, property selection, tool proof, objective market excerpt, fictional advisor and consultation CTA. |
| `/listings` | Functional property search. Filters location, price, beds, baths, property type and features; search criteria can be represented in the URL. Results use the four fictional listings. |
| `/listings/[slug]` | Four statically generated listing pages. Each has opening imagery, facts, gallery controls, architectural description, features, save/tour actions, neighborhood context, related properties and a contextual showing-request form. |
| `/buying` | Buying advisory story with cost, tour and offer-comparison paths; directs to a contextual buyer consultation. |
| `/selling` | Selling advisory, property-presentation case, sequencing and Seller Readiness path; avoids instant-valuation claims. |
| `/neighborhoods` | Objective neighborhood atlas for four areas, deliberately avoiding demographic or protected-class steering. |
| `/neighborhoods/[slug]` | Four statically generated neighborhood folios with architecture, housing, price, access, parks, daily services and available sample-property context. |
| `/market-intelligence` | Dated illustrative Q2 2026 market letter/table with explicit sample-data limitations. |
| `/team` | Editorial fictional advisor profile for Elena Ward. |
| `/client-stories` | Illustrative move scenarios rather than invented testimonials or outcomes. |
| `/consultation` | Context-aware, Zod-validated demonstration lead form; validates but does not send or retain contact information. |
| `/tools` | Directory for the six working decision tools. |
| `/tools/[tool]` | Statically generated interactive tool workspace for each tool listed below. Results appear before optional consultation. |

Sample listings verified in `src/features/demos/real-estate/data.ts`:

- 1480 Cañon View Drive — $3,250,000
- 612 Arroyo Terrace — $2,395,000
- 94 Oakshade Lane — $1,875,000
- 37 Granite Court — $1,645,000

Working Real Estate tools:

1. Move Strategy Studio
2. True Monthly Cost
3. Offer Comparison Lab
4. Seller Readiness Report
5. Tour Builder
6. Neighborhood Comparison

Important implementation files:

- `src/features/demos/real-estate/real-estate-layout.tsx`
- `src/features/demos/real-estate/data.ts`
- `src/features/demos/real-estate/property-search.client.tsx`
- `src/features/demos/real-estate/listing-actions.client.tsx`
- `src/features/demos/real-estate/tools.client.tsx`
- `src/features/demos/real-estate/tool-engines.ts`
- `src/features/demos/real-estate/lead-form.client.tsx`
- `src/features/demos/real-estate/real-estate-store.ts`
- `src/features/demos/real-estate/real-estate.css`

### Door 02 — Field Standard / Plumbing

Base: `/showroom/plumbing`  
Identity, territory, phone, licensing and operational claims are explicitly fictional.

| Route | Current behavior |
|---|---|
| `/showroom/plumbing` | Emergency-aware home with a CSS/GSAP mechanical Hero, immediate emergency and request paths, service-system orientation, Passport/tool proof and request CTA. |
| `/services` | Manual-style index for six service systems. |
| `/services/[slug]` | Six statically generated service detail pages with safety boundary, likely professional checks, scope variables, related planning tool and prepared request path. |
| `/emergency` | Immediate safety and call/request guidance; it is not gated by animation or a form. |
| `/request-service` | Zod-validated, honeypot-protected demonstration request flow. Contact/property/file selections are not retained or sent. |
| `/service-areas` | Territory index plus functional ZIP demonstration matcher. |
| `/service-areas/[slug]` | Four statically generated area pages for Pasadena, Altadena, South Pasadena and Sierra Madre. |
| `/maintenance` | Owner-record-led maintenance model tied to the Whole-Home Plumbing Passport. |
| `/about` | Fictional company standards, professional handoff and production-verification requirements. |
| `/resources` | Homeowner education and technical/safety boundary content. |
| `/contact` | Human/service contact orientation with demo phone and request routes. |
| `/tools` | Directory for seven working homeowner/planning tools. |
| `/tools/[tool]` | Seven statically generated interactive tool routes, each mapped to a dedicated client component. |

Service systems verified in `src/features/demos/plumbing/data.ts`:

- Leaks and shutoffs
- Water heaters
- Drains and sewers
- Pressure and flow
- Repiping and branches
- Fixtures and installation

Working Plumbing tools:

1. Whole-Home Plumbing Passport
2. Symptom-to-Action Triage
3. Water Heater Demand + Recovery Planner
4. Fixture / Branch Capacity Guide
5. Pressure + Flow Worksheet
6. Repipe Scope Builder
7. Sewer / Drain Evidence Checklist

Important implementation files:

- `src/features/demos/plumbing/plumbing-layout.tsx`
- `src/features/demos/plumbing/data.ts`
- `src/features/demos/plumbing/mechanical-hero.client.tsx`
- `src/features/demos/plumbing/request-form.client.tsx`
- `src/features/demos/plumbing/area-checker.client.tsx`
- `src/features/demos/plumbing/tool-engines.ts`
- `src/features/demos/plumbing/tools/`
- `src/features/demos/plumbing/plumbing.css`

### Door 03 — Morrow & Vale / Injury Law

Base: `/showroom/injury-law`  
Fictional educational demonstration; no legal/medical advice, representation, eligibility decision, score, value estimate or outcome claim.

| Route | Current behavior |
|---|---|
| `/showroom/injury-law` | Scroll-controlled hybrid 3D accident-aftermath Hero, immediate safety/human-help paths, short orientation questions, practice/process/resources proof and consultation CTA. |
| `/after-an-accident` | Emergency-readable safety, care and evidence-preservation guide with immediate 911 path. |
| `/case-review` | Ten-part Incident & Impact Review covering safety, context, parties/coverage, care, physical impact, daily limitations, work/financial disruption, optional psychological effects, evidence and insurance. Returns general guidance before optional contact. Answers remain volatile page memory. |
| `/practice-areas` | Practice-area index with general-information framing. |
| `/practice-areas/[slug]` | Five statically generated educational pages: motor-vehicle, pedestrian/cyclist, unsafe-property, serious/catastrophic injury and wrongful death. |
| `/attorneys` | Fictional team index; no invented credentials or rankings. |
| `/attorneys/[slug]` | Three statically generated fictional profiles for Mara Vale, James Morrow and Elena Park. |
| `/process` | Five-stage orientation/preservation/documentation/review/decision process with explicit limitations. |
| `/resources` | Educational library and proof-standard explanation. |
| `/resources/[slug]` | Three statically generated general-information articles about incident records, symptom/daily-change documentation and insurer conversations. |
| `/consultation` | Zod-validated, consent-based no-send/no-retention consultation preview. |

Important implementation files:

- `src/features/demos/injury-law/injury-layout.tsx`
- `src/features/demos/injury-law/home-hero.client.tsx`
- `src/features/demos/injury-law/clarity-scene.client.tsx`
- `src/features/demos/injury-law/incident-review.client.tsx`
- `src/features/demos/injury-law/evaluate-review.ts`
- `src/features/demos/injury-law/consultation-form.client.tsx`
- `src/features/demos/injury-law/data.ts`
- `src/features/demos/injury-law/injury.css`

## 5. Shared components and contracts that must not be globally restyled

The rebuild should preserve these cross-site contracts and avoid global selectors that change them incidentally:

- `src/app/layout.tsx` and `src/providers/app-providers.tsx`
- `src/styles/tokens.css` and `src/styles/base.css`
- `src/components/ui/button.tsx`
- `src/components/ui/form-controls.tsx`
- `src/components/ui/surface.tsx`
- `src/components/layout/container.tsx`
- `src/components/layout/grid.tsx`
- `src/components/layout/section.tsx`
- `src/components/a11y/skip-link.tsx`
- `src/features/showroom/showroom-control.tsx`
- `src/features/system-lens/system-lens-store.ts`
- the three vertical System Lens panels
- the three vertical consultation/request adapters and their server actions
- `src/features/onlev/**` and the completed parent showroom/Three Doors files under `src/features/showroom/hero` and `src/features/showroom/hub`

Vertical visual work should remain scoped beneath `.re-site`, `.pl-site`, and `.il-site`. The vertical layouts themselves may be rebuilt only in their assigned phase; they should not be replaced by a shared visual shell.

## 6. Reuse versus replacement

### Reuse

- App Router route trees, metadata/loading/error boundaries and server/client separation
- all tool engines and client workflows
- Zod server-action validation and no-send/no-retention adapters
- System Lens scope isolation and normalized event model
- ShowroomControl exit/switch behavior and portal routes
- central GSAP registration, the Lenis ticker wiring and reduced-motion provider
- capability-gating, dynamic-import, context-loss and offscreen-frame-loop patterns from the completed parent scenes
- the project-owned Real Estate imagery and Injury environment plate where quality is sufficient
- vertical CSS scoping and semantic HTML as the content/SEO source of truth

### Replace or substantially re-author in later approved phases

- Real Estate home/page-family composition, menu, galleries, transitions and neighborhood/property exploration
- Plumbing’s DOM-only mechanical Hero with the approved infrastructure-camera journey
- Injury Law’s current homepage-only camera sequence and separate ten-step form presentation with one connected camera/question journey
- duplicated direct-Canvas lifecycle code with a tested shared Canvas/quality/error shell where doing so does not erase vertical art direction
- route-to-route hard cuts inside each showroom with vertical-specific carry transitions

The useful systems should be treated as protected product logic. Presentation may be re-authored around them; engines, privacy boundaries and working output should not be rewritten merely to support cinematic styling.

## 7. Asset inventory and gaps

### Current project-owned visual assets

- Six Real Estate JPEGs under `public/images/real-estate/`, approximately 232–820 KB each
- Injury Law environment plate: `public/media/injury-aftermath-environment.jpg`, approximately 408 KB
- Four ONLEV cinematic PNG studies under `public/media/onlev-cinematic/`, approximately 1.5–1.74 MB each
- ONLEV SVG marks under `public/brand/`

The ONLEV cinematic PNG studies are not referenced by current source and are repository weight rather than a current runtime cost.

### Gaps

- No GLB/glTF models
- No authored 3D textures
- No cinematic video or image-sequence assets
- No plumbing architectural shell, pipe network or building sectional asset
- Real Estate has only six source images for four listings, four neighborhoods, selling and advisor coverage; three listing galleries contain only one unique image. This is the main asset ceiling for a truly editorial property experience.
- Injury Law has one environment plate; a six-stage camera journey will require additional dimensional geometry or a deliberately authored layered scene, not repeated scaling of that plate.

## 8. Performance and architecture risks

1. **Smooth-scroll ownership is unresolved.** Lenis is installed and correctly wrapped but unused. Native `scroll-behavior: smooth` is active globally. If Lenis is mounted later, native smooth behavior and any second ticker must be explicitly coordinated so only one system owns continuous scrolling.
2. **Canvas lifecycle is duplicated.** Parent ONLEV, Three Doors and Injury Law each create direct Canvas instances instead of using `SceneCanvas`. Their quality, fallback and lifecycle behavior can drift.
3. **Injury Law renders continuously.** Its current Canvas uses `frameloop="always"` and does not pause after the long Hero leaves the viewport. This is a concrete GPU/battery risk.
4. **Postprocessing/transmission cost.** Injury Law uses transmissive glass plus bloom/noise/vignette. The parent scenes also use postprocessing. Quality tiers need to disable or reduce effects before DPR is allowed to dominate frame time.
5. **No common camera-path math.** Existing scenes mutate cameras inside `useFrame`; there is no shared keyframe interpolation contract for position, rotation, lookAt and FOV.
6. **GSAP registration is partly duplicated.** The Injury Hero imports/registers ScrollTrigger directly instead of using the existing central module.
7. **Real Estate media breadth is too small.** Next Image handles optimization, but the same few images are reused across listings, neighborhoods and selling. Multiple home images are marked eager; Phase 2 should preserve only the true LCP priority.
8. **Large unused studies.** Four unreferenced ONLEV PNGs total roughly 6.5 MB. They do not currently load, but should not be accidentally preloaded or copied into future sequences.
9. **Global CSS payload.** Root `globals.css` imports parent Hero, hub, demo-shell and ONLEV CSS for every route. Vertical CSS is correctly route-scoped and should stay that way.
10. **Client islands are mostly healthy.** Pages/layouts remain Server Components and interactive systems are isolated. Future canvas work must preserve this and avoid moving a showroom page tree behind `use client`.
11. **No cross-showroom eager 3D load today.** Existing heavy R3F scenes are route/capability gated or dynamically imported. The rebuild should retain this property.
12. **State/privacy contracts differ intentionally.** Real Estate persists only stable fictional listing/tour IDs locally; System Lens stores normalized in-memory events; Injury answers remain page memory only. A shared persistence abstraction could violate these boundaries.

## 9. Recommended Phase 1 folder plan

The prompt suggests top-level `src/motion` and `src/three`, but this repository already has the equivalent separation under `src/lib`, `src/hooks`, and `src/components`. Creating parallel top-level trees would duplicate conventions. The recommended plan is:

```text
src/lib/motion/
  gsap.client.ts              # existing; remains the only plugin registration point
  easing.ts
  motion-tokens.ts
  reduced-motion.ts
  scroll-utils.ts

src/hooks/
  use-smooth-scroll.ts        # existing; adapt rather than duplicate
  use-scroll-scene.ts

src/components/motion/
  smooth-scroll-provider.client.tsx
  scroll-scene.client.tsx
  page-transition.client.tsx
  text-reveal.client.tsx
  image-reveal.client.tsx

src/lib/three/
  camera-path.ts              # framework-independent interpolation/keyframe types
  quality.ts

src/components/three/
  scene-canvas.tsx            # existing; evolve into CanvasShell behavior
  canvas-error-boundary.tsx
  camera-rig.tsx
  camera-path.tsx
  lighting-rig.tsx
  quality-manager.tsx
  webgl-fallback.tsx
  performance-monitor.client.tsx

public/3d/{shared,real-estate,injury-law,plumbing}/
public/textures/{shared,real-estate,injury-law,plumbing}/
public/sequences/{real-estate,injury-law,plumbing}/
public/video/{real-estate,injury-law,plumbing}/
```

This gives Phase 1 the requested responsibilities without creating a second architecture beside `src/lib/motion`, `src/hooks`, and `src/components/three`. The internal `/dev/motion-lab` route should be the only consumer until Phase 1 is accepted.

## 10. Phase 0 conclusion

The repository does not need another package-install or application scaffold. It already has a strong functional product layer, separated vertical routes, semantic fallbacks, consent-aware demo forms, isolated stores, GSAP, Lenis and a mature R3F stack. The next technical need is consolidation and proof: one shared scroll/camera lifecycle demonstrated in an internal motion lab before any showroom is rebuilt.

Phase 0 made no application change. Phase 1 remains blocked until explicit acceptance.
