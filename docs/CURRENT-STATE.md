# Current State

Last updated: 2026-08-22

Current phase: **Stage 4 — Final art direction + alive pass implemented; source/regression acceptance is clean, while dependency-complete live-browser/GPU acceptance remains environment-blocked and is documented below**

## Stage 4 — Final art direction + alive pass — 2026-08-22

This pass starts from the completed Stage 3 motion system and intentionally avoids another architecture or tool rewrite. The goal is to remove the remaining inner-page pattern of “intro → list/cards → CTA” by adding visitor-led questions, page-specific interaction, stronger visual sequencing, and lighter supporting motion while preserving every existing signature cinematic and production boundary.

### Reference review and art-direction principle

- Re-reviewed KODE Immersive, Malvah Bitter Creek, Malvah Stewart & Partners, and current Awwwards immersive/3D work for authored composition, narrative transition, brand-specific motion, spatial continuity, and the discipline of using a few memorable interactions rather than animating every element.
- The final art-direction rule is: **a major page needs a reason to exist beyond its content inventory**. Inner pages now begin from the visitor’s likely question and give the page a task—compare, orient, trace, organize, or test—before falling back to ordinary content lists.
- No reference composition, identity, animation, or artwork was copied. The work remains within the existing ONLEV / Lev & On visual systems.

### Real Estate — search and neighborhood exploration

- Added `editorial-explorers.client.tsx` with two bounded interactive editorial experiences.
- Property Search now places a **Decision Compass** before the filters. Visitors can name the tradeoff they are actually solving—cost, place, condition, or timing—and move directly into the matching tool or search path. This makes the listings page about a decision rather than immediately presenting form controls.
- Fixed the Property Search System Lens result count so the recorded sample-property count is computed from the *new* filter values rather than the stale pre-change result set.
- Neighborhood Atlas now opens as a full-width **live neighborhood stage** instead of the shared generic page intro. Visitors can switch among the four sample areas and see the image, architecture, housing form, access, and concise editorial summary change in place before opening a folio.
- Existing long-form alternating atlas entries remain below the stage for complete accessible reading and direct links. The interaction supplements rather than hides the objective Fair-Housing-aware content.
- Added distinct desktop/tablet/mobile compositions; on mobile the live atlas becomes a vertical media + reading stack, while the Decision Compass uses a bounded horizontal priority selector rather than compressing desktop controls.

### Plumbing/Home Services — system first, service second

- Added `service-system-explorer.client.tsx` to the Services index.
- Visitors now start with the question **“Which part of the home is asking for attention?”** and can move through the actual service categories on a technical house-system schematic before opening the detailed service manual.
- The explorer changes its system trace, symptoms, service copy, and related tool in response to selection. It explicitly states that the interaction is orientation, not diagnosis.
- Service-detail manuals now use a restrained progressive system-line treatment so “what the home is showing → what a technician checks → what the next step may involve” reads as one technical sequence instead of three disconnected text boxes.
- The added technical motion is lightweight CSS and state response; it does not compete with the Stage 3 rendered sectional plumbing scene.

### Injury Law — progressive clarity instead of information volume

- Added `guidance-navigator.client.tsx` to **What To Do After An Accident**.
- The page now opens with the human reassurance **“You do not need to solve everything today.”** Visitors choose the moment they are in and receive one focused next action at a time, with Previous / Next useful step controls and a visible progress rail.
- The complete seven-item general guidance remains available in an expandable semantic list so no safety/legal information is lost or gated by JavaScript.
- Practice/process/prose pages received quieter record-line visual continuity and supporting motion rather than another cinematic treatment.
- Removed several presentational inline styles from Injury pages and replaced them with named art-direction classes, keeping typography, spacing, colors, and mobile behavior in the design system instead of scattered page markup.
- The Stage 2 six-stage Incident Review, confirmation state, no-send/privacy boundary, no-case-score rule, safety escalation, legal limitations, and medical safeguards remain byte-for-byte unchanged.

### ONLEV — capability demonstrated on secondary pages

- Added `system-proof-pulse.client.tsx` to the Systems route. Visitors can follow a customer signal through Search → Tool → Request → Outcome and see the customer intent, context preserved, system response, and business value at each stage.
- This turns the Systems page from a description of connected layers into a small working demonstration of the idea.
- The Work route’s preview stages now react with restrained perspective/light movement and more distinct internal geometry per vertical instead of three recolored versions of the same generic mock window.
- The Stage 1 ONLEV opening, Stage 3 signal-to-system cinematic, and final Three Doors chamber remain the parent site’s dominant motion moments. Stage 4 does not add another major cinematic merely to increase animation count.

### Supporting motion and restraint

- New hover, selection, and progress motion is short, interruptible, and tied to visitor intent.
- No new permanent requestAnimationFrame/setInterval loops were added by Stage 4.
- All four new interactive components contain semantic buttons/tab states and readable DOM content; navigation and essential information do not depend on pointer hover.
- Reduced-motion paths disable the new image entrance, flow pulse, transform movement, and animated progress transitions.
- Mobile breakpoints intentionally simplify large stages rather than shrinking desktop compositions.

### Performance / payload review

- Stage 4 adds **no new raster image, video, texture, GLB, font, or 4K media payload**. It reuses existing optimized Next/Image property imagery and existing design-system materials.
- Current `public/` payload remains approximately **5.7 MB total**; the largest runtime photographic files are the Real Estate JPGs at roughly **0.55–0.78 MB each**. The approved ONLEV master is ~1.05 MB but the live UI uses its smaller approved derivatives where appropriate.
- Stage 4 client interactions are state-driven and bounded. They do not add WebGL contexts or persistent frame loops.
- Existing Stage 3 R3F DPR caps, offscreen behavior, reduced-motion fallbacks, and context-loss fallbacks remain unchanged.

### Stage 4 verification completed here

- All 16 new/changed Stage 4 TS/TSX implementation files transpile cleanly with the globally available TypeScript 5.8.3 compiler.
- Compatibility production-contract suite passes **8/8**. The new Stage 4 contract verifies the Real Estate Decision Compass and Neighborhood Stage, Plumbing Service System Explorer, Injury Guidance Navigator, and ONLEV System Proof Pulse are actually wired into their pages, retain their safety language, and do not introduce timer/frame-loop animation code.
- Byte-for-byte preservation against the completed Stage 3 archive is confirmed for:
  - `real-estate/tool-engines.ts`
  - `plumbing/tool-engines.ts`
  - `injury-law/evaluate-review.ts`
  - `injury-law/incident-review.client.tsx`
  - `system-lens-store.ts`
  - `showroom-control.tsx`
  - `three-doors-scene.client.tsx`
  - Stage 1 `onlev-mechanism-scene.client.tsx`
- Public-asset size audit confirms no accidental heavy Stage 4 media was introduced.
- The exact repository test command still fails in raw Node because this environment has no project loader/dependencies for `.ts` imports. The established compatibility harness transpiles the three pure engine modules first and then executes the complete contracts successfully.
- A direct headless Chromium attempt against a static Stage 4 visual harness also hangs under the container browser policy. Combined with the absent `node_modules` / unavailable `pnpm`, this means a genuine live Next.js visual comparison at 390 / 768 / 1440 / 1920 / 4K, GPU frame pacing measurement, blank-frame inspection, and production build cannot honestly be marked as passed here.
- **Required release gate in a dependency-complete environment:** run `pnpm exec tsc --noEmit`, `pnpm exec eslint .`, `pnpm test`, `pnpm build`, then perform the specified live-browser viewport and GPU/performance pass. The source is prepared for that gate; this document does not falsify it.

## Stage 3 — Cinematic motion + signature experiences — 2026-08-22

This stage is intentionally limited to motion/art direction and signature experiences. It preserves the Stage 2 Lev & On identity system, six-stage Injury Review, legal/medical/privacy safeguards, core tool engines, System Lens, showroom controls, Three Doors scene, and the Stage 1 ONLEV opening mechanism. No information architecture or demo-tool redesign was performed.

### Reference study and motion standard

- Reviewed KODE Immersive plus Malvah's Bitter Creek and Stewart & Partners work, and Awwwards immersive/3D references for composition, transition discipline, 2D/3D continuity, and motion-as-brand-system rather than decorative animation. No reference was copied.
- The Stage 3 rule is now explicit in implementation: major signature moments use actual time-evolving 3D geometry, lighting, camera paths, and material response. No signature sequence is implemented as a pan, parallax, or zoom over a still image.
- A Seedance 2.0-capable video generator is available as an optional connected app, but it was not connected/callable during this pass. Stage 3 therefore uses genuine real-time WebGL rendering for the cinematic sequences instead of pretending a still-image treatment is generated video. The code structure leaves room for later video augmentation without making essential content depend on it.

### ONLEV parent — strongest motion system

- Preserved the existing authored ONLEV mechanism opening and final Three Doors chamber unchanged.
- Added `src/features/onlev/marketing/system-cinematic.client.tsx`, a second signature ONLEV sequence inside the dark flow section. A signal travels through five spatial alignment gates; the gates physically rotate/settle into order as the signal advances, expressing intent → context → response as a rendered system rather than a diagram animation.
- The sequence uses real R3F geometry, Catmull-Rom signal travel, dynamic lighting, ACES tone mapping, bounded DPR, a one-shot completion state, reduced-motion/static fallback, and WebGL context-loss fallback.
- Parent ONLEV now has three distinct high-value motion moments: opening mechanism, mid-story signal-to-system cinematic, and final Three Doors physical portal chamber. Supporting sections keep restrained reveal motion rather than competing with those signatures.

### Injury Law — disruption → uncertainty → clarity

- Rebuilt `clarity-scene.client.tsx` into a restrained POV accident-resolution sequence rather than abstract floating records alone. The sequence includes a dark road field, windshield plane, non-gory fracture lines, opposing light sources, a short controlled camera disturbance, glare collapse, and then record planes resolving into a calm ordered field.
- The scene deliberately avoids bodies, blood, sirens, impact sensationalism, legal-fighter imagery, or case-value theater. Its visual arc is disruption → uncertainty → clarity.
- The Injury landing headline and actions no longer compete with the cinematic. `home-hero.client.tsx` now waits for the scene's `onResolved` handoff before running the Stage 2 typed/spelled headline and supporting-action reveal. Reduced-motion/mobile paths show the content immediately.
- The two actions remain exactly **Start Incident Review** and **What To Do Now**; the six-stage review and all safety/legal/privacy boundaries remain unchanged.

### Real Estate — architectural walkthrough + editorial portfolio

- Added `architectural-sequence.client.tsx`, a genuine rendered architectural camera path that moves from exterior/courtyard context through a threshold into an interior spatial composition. It uses modeled walls, glazing, slab/floor, furniture volumes, pool/water surface, sun/key lighting, fog/depth, and an authored Catmull-Rom camera path.
- The existing listing image remains beneath the Canvas only as an honest media/WebGL fallback; the signature desktop experience is not a moving JPG.
- Added a subtle Exterior → Threshold → Interior progress legend and capability/reduced-motion fallback. Desktop DPR is bounded to 1.4.
- The property presentation has been pushed further into an editorial folio: the lead property becomes an oversized long-form visual field and the remaining properties become a sticky architectural index with more generous sequencing and hover emphasis rather than a generic equal-card grid.

### Plumbing/Home Services — mechanical system motion

- Added `plumbing-system-scene.client.tsx`, a distinct technical cutaway with actual 3D pipe runs, TubeGeometry, moving flow beads, water-heater vessel, pressure gauge, sectional frame, and independent supply / heated / drainage material language.
- The scene uses a dark field-plate aesthetic, calibrated blue/copper/steel material cues, physical light, and bounded camera movement. It does not copy Real Estate camera language or Injury Law disruption language.
- The existing SVG technical diagram remains the mobile/reduced-motion/WebGL fallback and is hidden when the rendered system is active. No cartoon pipes, fake countdowns, or diagnosis/pricing claims were added.

### Performance and fallback behavior

- All four new/updated signature canvases cap DPR between 1.35 and 1.45 on desktop.
- Real Estate and Plumbing only enable the new rendered scenes above desktop breakpoints; mobile/reduced-motion paths retain authored lightweight alternatives.
- ONLEV and Injury sequences settle into `frameloop="demand"` after their one-shot sequences complete, rather than running unnecessary permanent loops.
- WebGL context loss returns to an existing authored static/SVG/image fallback; essential copy, links, safety guidance, forms, and navigation remain semantic DOM.
- No new 4K raster texture payload was added for these WebGL experiences, avoiding a large bandwidth cost while true generated-video media remains unconnected.

### Stage 3 verification completed here

- All eight changed/new TS/TSX files transpile cleanly with the globally available TypeScript compiler.
- The established compatibility production-contract suite passes **7/7**, including the prior Real Estate/Plumbing/Injury engine checks, Stage 2 branding/review lock, source hygiene, and a new Stage 3 contract verifying that ONLEV, Injury Law, Real Estate, and Plumbing signature experiences use actual R3F Canvas/useFrame rendered motion and not parallax/pan-zoom still-image substitutes.
- Byte-for-byte preservation against the completed Stage 2 archive is confirmed for `real-estate/tool-engines.ts`, `plumbing/tool-engines.ts`, `injury-law/evaluate-review.ts`, `system-lens-store.ts`, `showroom-control.tsx`, `three-doors-scene.client.tsx`, and the Stage 1 `onlev-mechanism-scene.client.tsx`.
- Exact project commands remain environment-blocked: `pnpm exec tsc --noEmit`, `pnpm exec eslint .`, `pnpm test`, and `pnpm build` all return `pnpm: command not found`; Corepack attempts to obtain pnpm but cannot reach the npm registry, and `node_modules` is absent.
- Because dependencies cannot be installed or built here, a real Next.js browser acceptance run (390 / 768 / 1440 / 1920), GPU frame pacing, blank-frame detection, and live console inspection cannot honestly be represented as passed in this container. These remain required in the dependency-complete execution environment before production release.

## Stage 2 — Brand + Injury Law corrections — 2026-08-22

This stage is intentionally limited to identity correction and the Injury Law visitor flow. It does **not** begin the next major cinematic-asset production stage and does not redesign the Real Estate, Plumbing/Home Services, System Lens, showroom controls, Three Doors geometry, or Stage 1 ONLEV mechanism.

### Approved identity master and Lev & On family

- Replaced the reconstructed/substitute ONLEV mark with the user's supplied approved boxed master artwork. The exact source bytes are preserved at `public/brand/onlev-approved-master.png`; the UI uses lossless crops/size derivatives of that same artwork at `public/brand/onlev-approved-boxed.png` and `public/brand/onlev-approved-boxed-512.png`.
- The approved source and in-project master share SHA-256 `e8d5d4041b27d36154d5bdf8f23d4956b4267edb20333c3cc4a35812291ca1d2`. No alternate geometry is generated for the live ONLEV identity.
- `OnlevLogo` now renders the approved artwork rather than authored SVG paths. App metadata, manifest icon, and application icon use derivatives of the same approved asset. The old substitute ONLEV SVG marks were removed.
- The three demos now share one intentional identity family while retaining their existing vertical-specific art direction:
  - **Lev & On Residential** — Real Estate.
  - **Lev & On Home Services** — Plumbing/Home Services.
  - **Lev & On Injury Counsel** — Injury Law.
- Added the shared `LevOnBrand` component, which uses the same approved ONLEV boxed mark and changes only the descriptive Lev & On lockup. The prior unrelated demo-brand marks/names are no longer present in `src`.
- Removed the remaining reconstructed boxed mark from the generated Open Graph composition; it now uses a text-only ONLEV label rather than presenting an alternate logo.

### Injury Law landing correction

- The Injury Law opening message now reveals as an authored character-by-character typed/spelled sequence after entry: **“After an accident, the next step should be clear.”**
- The sequence is semantic and accessible: the full message remains the H1 accessibility label while visual character spans are presentation-only. Reduced-motion users receive the complete sentence immediately with no typing animation.
- The first two actions are now exactly **Start Incident Review** and **What To Do Now**. The existing Injury Law R3F clarity scene remains in place; no new major cinematic media/assets were generated in Stage 2.

### Incident Review reduction

- Reduced the Incident & Impact Review from ten screens to **six calm stages**:
  1. **What happened** — broad accident type, timing, and jurisdiction.
  2. **Injuries & care** — immediate safety, medical attention, and broad pain/symptom change.
  3. **Physical impact** — ongoing physical limits in daily activity.
  4. **Life impact** — work/daily-life disruption plus optional psychological impact.
  5. **Evidence & insurance** — broad evidence and insurer-contact status.
  6. **Next step** — contact/readiness preference.
- Broad-category privacy boundaries remain intact: no names, narratives, exact addresses, claim numbers, uploaded evidence, exact financial amounts, diagnosis requests, case scoring, deadline calculation, or value estimation. Psychological impact remains optional.
- Immediate safety and medical escalation remains available and can override normal progression when appropriate. The deterministic `evaluate-review.ts` safety/legal engine was intentionally left byte-for-byte unchanged from Stage 1.
- Exclusive “none / not sure / prefer not / not applicable” choices now clear contradictory detailed selections. Validation language was softened so the review reads like a guided conversation rather than an examination.
- The result is shorter and action-oriented: **Right now**, **Preserve**, and **Bring to a conversation**, with assumptions/limits available in a disclosure. The detailed local print/download path remains available.
- After the optional post-review callback preview, the polished confirmation state now says **“Thank you. We received your review.”** and **“A member of the team will call you shortly.”** It simultaneously preserves the demo truth boundary: nothing is actually sent or retained and no attorney-client relationship is created.

### Stage 2 verification completed here

- Stage 2 source invariants pass: six review stages; all required incident/care/impact/evidence/insurance/readiness categories present; exact landing CTAs and confirmation copy present; no prior unrelated demo-brand names remain under `src`; the approved master exists and matches the supplied source hash.
- All 24 changed TS/TSX files transpile cleanly with the globally available TypeScript compiler.
- The pure Real Estate, Plumbing, and Injury Law engines were transpiled locally and the production contract suite passed under the local compatibility harness, including the new Stage 2 branding/review contract.
- Core out-of-scope implementation remains byte-identical to the Stage 1 archive: Real Estate and Plumbing calculation engines, Injury `evaluate-review.ts`, System Lens store, showroom control, Three Doors scene, and the Stage 1 ONLEV mechanism scene.
- Full project `tsc`/ESLint/build cannot be represented as passed here because the archive has no installed dependencies and registry access is blocked. Direct Chromium rendering also remains blocked/hanging under the container policy. Therefore live Next.js browser acceptance at 390/768/1440/1920 and real frame-pacing/console inspection still require the dependency-complete execution environment.

## Cloud visual-production pass — 2026-08-22

The current implementation brief is now preserved in `docs/CLOUD-AI-CONTINUATION.md`. This pass intentionally changes only the ONLEV opening, root ordering, and final Three Doors chamber. The complete Real Estate, Plumbing, Injury Law, `/showroom` route family, showroom control, and System Lens source trees remain byte-identical to the incoming `ONLEV-production-source-2026-08-22.zip` archive.

### Root journey and opening

- Root order is now **ONLEV opening → complete ONLEV story → final Three Doors chamber → selected demo**. The Three Doors chamber is the terminal section of `/`; there is no marketing content below it to scroll past before selection.
- Added a dedicated `src/features/onlev/opening/` feature with semantic headline/CTA available on first render and a capability-gated React Three Fiber cinematic layer on desktop.
- Added `public/models/onlev-mechanism.glb`, an authored ONLEV mechanism built from mineral-paper, graphite, nickel, signal-blue, and restrained warm-metal material groups. The mechanism contains nested alignment frames, system rails/nodes, and the warm-metal V beam; a live signal follows a spatial path while the mechanism and camera resolve into alignment.
- Mobile, reduced-motion, low-capability, WebGL-failure, model-loading-failure, and context-loss paths retain a deliberately composed light ONLEV poster; they do not depend on the Canvas for headline, CTA, or navigation.
- The opening Canvas uses a maximum DPR of **1.45** on the high tier and **1.18** otherwise, omits post-processing below the high tier, and stops its render loop while offscreen. Scroll progress is written to a small Zustand store; the R3F loop reads with `getState()` rather than generating per-frame React state updates.

### Three authored portal assemblies

- Added three separate gateway assets instead of one recolored frame:
  - `portal-real-estate-frame.glb` — limestone wall returns, oxidized bronze reveal/threshold.
  - `portal-plumbing-frame.glb` — dark technical enamel, brushed-steel frame, copper linework, precision hardware.
  - `portal-injury-law-frame.glb` — blackened metal, oxblood reveal, archival vellum transom/threshold.
- The live R3F scene adds a different hinged door leaf to each assembly: smoked-timber/bronze Real Estate, enamel/copper/steel Plumbing, and oxblood/archival/nickel Injury Law.
- Full assembly reference exports (`portal-real-estate.glb`, `portal-plumbing.glb`, and `portal-injury-law.glb`) are included with the asset-generation script at `scripts/generate-onlev-production-assets.py`; runtime uses the lighter frame assets plus the physically animated R3F leaves/interiors.
- Runtime GLB payload added by this pass is **47,680 bytes (~46.6 KiB)** across the ONLEV mechanism and three frame assets. All seven new GLB/reference exports total **95,892 bytes (~93.6 KiB)**. They are local assets with no third-party media dependency.

### Portal interaction and meaningful world response

- Each visible portal is now the semantic Next.js `Link` itself. Pointer entry, pointer-down/touch, and keyboard focus all set the existing active-industry store immediately; accessibility and navigation never depend on R3F raycasting.
- Removed the separate Enter control. Clicking/activating the same portal continues into the existing `portal-forward` route transition. Modified clicks and reduced-motion users retain direct-link behavior.
- Door movement is a second-order hinge response with an initial latch-release impulse, controlled acceleration, damping, and settle. Entry opens the chosen leaf further without flat scaling or fake camera zoom.
- Camera target and key light bias subtly toward the active portal. Real Estate daylight/blinds settle into a clearer architectural state, Plumbing gauge/flow responds only to active selection and no longer runs an idle loop, and Injury Law record planes resolve from slight disorder into alignment.
- The Three Doors Canvas is capability tiered, post-processing is high-tier only, DPR is capped at **1.45**, and rendering stops when the chamber is offscreen. WebGL context loss and scene errors return to the functional semantic/CSS architecture.

### Responsive/fallback composition

- Final-chamber mobile portal and hit regions were moved into a lower visual band so the heading and fallback architecture do not occupy the same vertical area.
- Reduced motion renders a deliberately static final chamber with live semantic links and no scroll-scrub requirement.
- The ONLEV opening remains light/mineral rather than black-and-gold; the final showroom remains a dark architectural chamber so the transition into the three distinct demos retains contrast.

### Verification completed in this environment

- **Preservation:** `src/features/demos`, `src/app/showroom`, `src/features/showroom/showroom-control.tsx`, and `src/features/system-lens` compare byte-for-byte with the incoming source archive.
- **Changed-source syntax/transpile check:** all 10 changed/new TS/TSX entry files transpile cleanly with the globally available TypeScript compiler.
- **Production-contract logic:** the three pure evaluation engines were transpiled locally and the existing contract assertions plus route/source invariants passed.
- **Source invariants:** no `TODO`, `FIXME`, or literal inert `href="#"` marker exists under `src`.
- **Asset inspection:** all seven generated GLBs load as valid `trimesh.Scene` files. Runtime assets have bounded geometry/material sets and no external texture/media URI.

### Validation that could not be honestly completed here

- The archive does not include `node_modules` and this container does not have `pnpm`. Corepack attempted to obtain the locked `pnpm@11.19.0`, but npm registry DNS is blocked (`EAI_AGAIN registry.npmjs.org`). Therefore the exact required `pnpm exec tsc --noEmit`, `pnpm exec eslint .`, `pnpm test`, and `pnpm build` commands cannot be executed against installed project dependencies in this environment.
- Browser automation is restricted by the container policy. Playwright navigation to both local HTTP and `file://` content was rejected with `ERR_BLOCKED_BY_ADMINISTRATOR`; direct headless Chromium also hung under the same policy. A non-browser print renderer was rejected as an acceptance substitute because it does not support the project's modern viewport/media/CSS behavior. Therefore **390 / 768 / 1440 / 1920 visual acceptance, live console inspection, actual frame-pacing profiling, and browser-level hover/focus/touch/context-loss verification remain unverified here**.
- No Runway or Higgsfield-class cinematic generator is connected in this execution environment. The opening upgrade is genuine authored R3F mechanism/camera/light motion, not pre-rendered cinematic media.
- The newly generated GLBs are compact geometry + PBR material-factor assets. They do **not** yet include commissioned baked normal/AO/KTX2 texture sets. That remains the main material-fidelity gap between this cloud pass and a specialist 3D production studio deliverable.

### Required final acceptance on a dependency-complete machine

Run:

```bash
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm test
pnpm build
```

Then inspect `/` at **390, 768, 1440, and 1920 px**, including normal/reduced motion, first-load fallback, WebGL/model failure, context loss, direct hover, keyboard focus/Enter, touch, forward demo entry, showroom return, horizontal overflow, console state, and frame pacing. Do not mark this cloud pass visually complete until those browser checks are observed.

## Phase 9 working state

- Rebuilt the Three Doors signature as a genuine procedural React Three Fiber showroom rather than a flat illustrated doorway or still-image zoom. The scene now contains dimensional architectural frames, hinged physical door leaves, metal/clearcoat materials, grounded shadows, reflective floor and ceiling architecture, authored studio lighting, fog, selective bloom/vignette, and a real camera dolly with lateral movement and target changes.
- Each industry has an authored 3D world behind its door: an architectural residential interior; a working plumbing gauge, flow rings, pipework, and equipment assembly; and an Injury Law record room whose fractured information resolves toward a calm lit path. Hover, focus, and keyboard industry selection change the camera aim, door angle, light, and world-specific mechanism; portal entry opens the selected door further.
- Removed the fallback poster zoom from the signature timeline. Desktop cinematic motion is rendered geometry/camera/light choreography, while mobile remains the intentionally simplified non-WebGL architectural composition required by the motion system.
- Removed the showroom’s runtime HDR-preset dependency and replaced it with local procedural lightformers. The Canvas waits for rendered frames before crossfading from the semantic fallback, recovers to that fallback on WebGL context loss, caps DPR by capability, removes postprocessing on the tablet tier, and stops its render loop offscreen.
- Hardened the Injury Law signature sequence so its finite rendered motion stops the Canvas after completion, retains pause/resume, offers replay, waits for real frames before appearing, and restores the static fallback after WebGL context loss.
- Added production metadata infrastructure: generated Open Graph image, Twitter card, web manifest, responsive theme colors, Organization structured data, branded root 404, and branded global recovery page. Existing sitemap, robots, canonical metadata, favicon/icon, legal pages, and per-demo recovery states remain intact.
- Increased footer navigation touch targets across ONLEV, Real Estate, Plumbing, and Injury Law. Corrected two broken parent-site links to the Plumbing Passport.
- Added built-in production-contract tests for the Real Estate, Plumbing, and Incident Review evaluation engines; required routes and metadata; and inert-link/unfinished-marker prevention.

### Phase 9 verification recorded so far

- TypeScript, ESLint, five production-contract tests, and the Webpack production build pass. The build generates **87** routes and metadata endpoints.
- An optimized production server completed a representative 59-route smoke pass. A server-rendered internal-link crawl followed **103** same-origin destinations with zero broken destinations.
- The root server response contains the complete positioning, supporting line, primary CTA, industry-hub messaging, semantic architectural fallback, and structured data before WebGL is available.
- The root’s server-referenced initial JavaScript is approximately **280 KB gzip-equivalent**; the Three.js/R3F showroom remains a conditional dynamic chunk and mobile/reduced-motion paths do not mount it.
- No runtime scene asset depends on a third-party media host.
- Remaining acceptance item: repeat the visual desktop/tablet/mobile, forward/reverse scroll, hover/focus, reduced-motion, and console inspection after the embedded preview tab is refreshed. The tab currently retains Chrome’s pre-restart `ERR_CONNECTION_REFUSED` document even though the production server and HTTP checks are healthy. Phase 9 is not marked complete until this visual gate is honestly repeated.

## Complete

### Phase 8 — ONLEV parent brand and marketing system

- Locked the parent company as **ONLEV** with primary domain **onlev.site**. Reproduced the approved framed ON / LEV identity as a production React component plus transparent, light, dark, and app-icon SVG treatments. The final V retains the warm-metal beam concept; gold is concentrated in the identity rather than becoming the entire site palette.
- Rebranded the completed showroom header and root metadata to ONLEV without redesigning the Phase 3 Hero or Phase 4 Industry Hub.
- Completed the root journey after the showroom handoff: ONLEV definition; live proof through all three complete demos and flagship tools; the seven connected system layers; customer-to-team response flow; automation/follow-up infrastructure; engagement process; custom investment position; fit criteria; walkthrough request; final CTA; and footer.
- Added complete parent routes for `/systems`, `/process`, `/work`, `/contact`, `/privacy`, `/terms`, and `/accessibility`; `/showroom` now orients visitors back to the authoritative Three Doors hub.
- Added marketing metadata, canonical origin, Open Graph defaults, ONLEV app icon, `robots.txt`, and `sitemap.xml`. Demo routes remain excluded from the marketing robots allow set until production identities and policies are finalized.
- Added a Zod-validated, honeypot-protected, consent-based ONLEV walkthrough Server Action and responsive form with persistent labels, inline errors, focus-managed summaries, and a truthful no-send/no-retention preview receipt.
- Added scoped GSAP reading-order and system-line motion using transform/opacity only. Content remains semantic and accessible before animation; reduced motion receives final static compositions and retains control feedback.
- Added the approved KODE, Malvah, and Awwwards craft references to the inherited Phase 8 review standard without copying their designs.

### Retained foundation and showroom

- Phase 2 architecture and design/motion systems remain intact.
- The Phase 3 Three Doors Hero and Phase 4 Interactive Industry Hub remain unchanged.
- The `portal-real-estate` entry transition, reverse return to `/?industry=real-estate#three-doors`, and cross-demo showroom navigation remain functional.
- All three industry doors now resolve to complete, independent live demo systems.

### Phase 7 — Injury Law system (Stage 1 identity superseded in Stage 2)

- Stage 1 established an explicitly fictional, trauma-aware Injury Law demonstration built around **The Clear Record**; Stage 2 now presents it as **Lev & On Injury Counsel** using the shared approved Lev & On identity family. Its vertical art direction remains: parchment, ink navy, restrained oxblood, translucent vellum, humanist editorial typography, and scattered information resolving into an understandable chronology.
- Added the complete route family: homepage; practice-area index and five generated detail routes; emergency-readable after-accident guide; case process; attorney/team index and three generated fictional profile routes; resources/proof index and three generated article routes; consultation; and Incident & Impact Review.
- Added a genuine real-time R3F signature Hero sequence. Translucent record planes and one oxblood chronology line move from slight uncertainty into registration, then rest. The sequence is not a zoom, pan, or parallax over a still. Semantic copy and actions render independently; mobile and reduced motion receive the composed fallback without WebGL.
- Added immediate safety and medical guidance before legal marketing, a persistent human-help route, restrained claims, no invented credentials/results/testimonials/rankings, and route-specific legal/medical/jurisdiction disclosures.
- Added a Zod-validated, honeypot-protected, no-send/no-retention consultation adapter requesting only name, phone, optional email, preferred time, adult-status choice without date of birth, intent, and explicit consent.
- Added branded loading and generic recovery states that never expose sensitive error details.

### Incident & Impact Review

- Stage 2 reduces the browser-memory-only guided review to six conversational stages covering incident/timing/location; injuries and medical attention; ongoing physical impact; work/daily-life/optional psychological impact; evidence and insurance; and contact readiness.
- Every sensitive section uses broad categories only. Psychological questions are optional and include equal-weight “Prefer not to answer.” No names, narratives, claim numbers, addresses, documents, exact amounts, or files are requested.
- The deterministic evaluation engine returns safety guidance, human-review timing, evidence-preservation actions, documentation gaps, general next steps, assumptions, and limitations. It does not generate a score, eligibility decision, fault percentage, settlement estimate, deadline calculation, diagnosis, or representation promise.
- The useful result appears before optional contact capture. Raw review answers are never submitted with the contact form, written to URLs/storage/analytics, or exposed to System Lens.
- Print and local text download contain only the general action plan and limitations, not raw answers.

### Phase 6 — Plumbing/Home Services system (Stage 1 identity superseded in Stage 2)

- Stage 1 established a distinct fictional home-services system built around calibrated industrial-product precision; Stage 2 now presents it as **Lev & On Home Services** using the shared approved Lev & On identity family while retaining enamel/galvanized/workwear materials, sectional service manuals, and a live house-systems cutaway.
- Added the complete route family: homepage; emergency guidance; request service; services and six generated detail routes; service areas and four generated area routes; maintenance; company; resources; contact; tools index; and seven generated tool routes.
- Made the emergency/non-emergency decision, demo call path, request path, and broad safety guidance server-rendered and immediately available without animation, a quiz, or contact capture.
- Added a functional ZIP-based demonstration territory check, contextual service links, mobile emergency/request actions, truthful fictional operating disclosures, and code/inspection/licensed-review guardrails.
- Added a Plumbing-specific Zod-validated no-retention service-request adapter with honeypot, consent, inline errors, focus-managed status, fictional receipt, and client-memory-only photo selection. Files, filenames, property details, measurements, and contact fields never enter System Lens, URLs, local storage, or the server response.
- Namespaced the shared System Lens event store by vertical so Plumbing and Real Estate signals remain isolated. Plumbing maps service intent, emergency routing, Passport progress, tool results, photo-context presence, and prepared requests without exposing private answers or implying dispatch/CRM behavior.

### Working Plumbing tools

1. **Whole-Home Plumbing Passport** — a private browser-memory property record with materials, equipment, shutoffs, observations, review questions, local-only photo context, Back/Edit flow, and downloadable owner record.
2. **Symptom-to-Action Triage** — deterministic red-flag override, broad safety path, service category, timing guidance, and human escalation without diagnosis.
3. **Water Heater Demand + Recovery Planner** — visible peak-demand, recovery, first-hour, temperature-rise, efficiency, and uncertainty assumptions without equipment approval.
4. **Fixture / Branch Capacity Guide** — a deliberately preliminary demand worksheet with a versioned demonstration profile and explicit non-code-compliance boundary.
5. **Pressure + Flow Worksheet** — static/residual pressure, observed flow, elevation adjustment, test delta, field notes, and printable/downloadable record without causal diagnosis.
6. **Repipe Scope Builder** — planning zones, coordination band, access/occupancy/finish questions, and discussion brief without instant price or material prescription.
7. **Sewer / Drain Evidence Checklist** — recurrence, affected locations, camera/cleanout/material evidence, readiness gaps, exposure safety, and inspection questions without declaring blockage or failure.

### Phase 5 — Real Estate system (Stage 1 identity superseded in Stage 2)

- Stage 1 established a distinct fictional residential-advisory system; Stage 2 now presents it as **Lev & On Residential** using the shared approved Lev & On identity family while retaining its architectural-journal direction: limestone paper, charcoal ink, restrained brass, editorial serif typography, folio grids, and project-owned generated imagery.
- Added the complete route system:
  - `/showroom/real-estate`
  - property search and four generated listing-detail routes
  - buying and selling journeys
  - neighborhood index and four generated neighborhood-detail routes
  - market intelligence
  - advisor/team
  - illustrative move scenarios
  - consultation/contact
  - tools index and six generated tool-detail routes
- Built functional property search with location, maximum-price, bedroom, bathroom, property-type, and relevant-feature filters. Criteria are shareable in the URL.
- Built listing galleries, property facts, architectural narratives, saved-property controls, tour controls, neighborhood context, related properties, and contextual showing requests.
- Added objective, Fair-Housing-aware neighborhood folios; dated illustrative market intelligence; a fictional advisor profile; and explicitly illustrative scenarios instead of fabricated testimonials.
- Added context-aware consultation/showing forms with Zod server validation, honeypot protection, explicit consent, inline errors, focus-managed feedback, and truthful demo receipts. The preview does not send or retain contact data.
- Added route loading, empty, error, and retry states where applicable.

### Working Real Estate tools

1. **Move Strategy Studio** — buying/selling/both intent, timing, financing, condition, constraints, budget, seller-net assumptions, path tradeoffs, and a downloadable/printable 30/60/90-day brief.
2. **Offer Comparison Lab** — price, estimated net-before-payoff, financing, contingency, close timing, and reliability considerations without an opaque winner score.
3. **True Monthly Cost** — principal and interest, property tax, insurance, HOA, and maintenance allowance with visible assumptions and exclusions.
4. **Seller Readiness Report** — condition, timing, and preparation signals converted into a prioritized plan with inspection/contractor/permit limits.
5. **Tour Builder** — persisted fictional listing IDs, reordering, removal, preferred date/time, and a coordinated demo-itinerary handoff.
6. **Neighborhood Comparison** — two dated records compared by housing, architecture, sample price range, access, parks, and daily services without protected-class steering.

### System Lens and showroom controls

- `System Lens` and `Get this system` are active inside all three completed route families.
- System Lens maps customer signals to system response and business value without showing raw financial or contact answers. Unconnected behavior is labeled preview-only.
- Saved properties and tour order persist locally using stable fictional listing IDs only. Financial inputs, form fields, and tool answers do not enter URLs, analytics, System Lens, or local storage.
- Injury Law records only normalized events such as review completion, evidence-plan preparation, broad documentation-gap presence, human-review prompting, and consultation-preview preparation. It never records incident, medical, pain, psychological, financial, insurer, evidence, or contact answers.
- Lens opening is scoped by vertical, and each vertical retains an independent bounded event history so cross-demo navigation does not reveal or automatically open another vertical’s Lens.

## Locked decisions

- The public parent identity is **ONLEV** and the canonical domain is **onlev.site**.
- The approved ONLEV identity master is the exact user-supplied boxed artwork preserved at `public/brand/onlev-approved-master.png`. UI/icon derivatives may crop or resize that same artwork losslessly but must not redraw, reinterpret, or substitute its geometry. All three demos use the same mark through the Lev & On identity family.
- ONLEV is not a black-and-gold website. Parent marketing uses mineral paper, graphite, nickel, signal blue, and restrained warm metal while preserving the dark architectural showroom.
- The Three Doors remains ONLEV's signature showroom experience. The completed Hero and Industry Hub are not to be replaced by a new parent-brand hero.
- ONLEV sells custom client-winning business systems, not ordinary websites or cheap page tiers. Engagement investment is defined after discovery as a clear fixed scope; do not invent a starting price, ROI, client, award, testimonial, or result.
- The ONLEV marketing contact adapter remains explicitly no-send/no-retention until approved CRM, messaging, consent, security, retention, and operational ownership are connected.

- The product remains a live showroom for client-acquisition systems, not a portfolio or template gallery.
- The parent Three Doors Hero and Hub are complete and must not be redesigned by a demo phase.
- Demos retain independent vertical art direction and client-ready composition, but Stage 2 intentionally unifies their master identity as the **Lev & On** family.
- Real Estate’s identity is the **architectural market folio**, not luxury-template gloss, a card dashboard, or copied showroom styling.
- Properties, advisor, market figures, and scenarios remain unmistakably fictional or illustrative. Do not add invented reviews, awards, transaction counts, or performance claims.
- Neighborhood content remains objective and Fair-Housing-aware. Do not add demographic steering, school-rank shortcuts, or “best for” claims.
- Financial assumptions and limits stay visible. Outputs are not lending, appraisal, legal, tax, inspection, or investment advice.
- Contact capture remains context-aware and consent-based. Production CRM/storage behavior is never implied by the demo adapter.
- Major signature Hero motion must use genuine cinematic motion/video when a suitable generator is available. Do not simulate video by zooming, panning, or parallaxing a still. The current Real Estate Hero therefore uses an honest static generated image; the available presenter-video tool is technically unsuitable for cinematic architectural footage.
- Essential content and navigation never depend on WebGL or cinematic media.
- Mobile and reduced-motion paths remain authored alternatives.
- Plumbing/Home Services is **Lev & On Home Services** within the shared Lev & On identity family; its retained vertical art direction is visible competence, technical house-system diagrams, mechanical information design, and calibrated assembly motion. Do not add cartoon pipes, mascots, generic stock-plumber imagery, fake gauges, urgent countdowns, invented licensing/reviews, or SaaS-card gloss.
- Plumbing outputs remain preliminary homeowner records. They do not diagnose, price, size, approve, certify code compliance, or replace onsite evaluation, manufacturer instructions, permits, applicable code, licensed review, or the authority having jurisdiction.
- Emergency access is immediate and never gated. Broad safety content requires licensed and jurisdictional review before production.
- Major signature video remains conditional on a suitable genuine cinematic generator. The available presenter-video capability is not appropriate for service cinematography; this phase therefore uses an honest authored technical cutaway and bounded mechanical animation rather than simulated video from still imagery.
- Injury Law’s identity is **The Clear Record**: uncertainty resolving into a calm, legible chronology. Do not add crash reenactments, shattered-windshield POV, sirens, blood, injured-body imagery, gavels, scales, glossy gold law-firm clichés, fear tactics, case-value calculators, or aggressive “fighter” copy.
- Injury Law safety, medical, legal, insurance, timing, consent, advertising, and jurisdiction content requires qualified review before production. The website never diagnoses, decides eligibility, estimates value, computes a deadline, guarantees an outcome, or implies that consultation establishes representation.
- Injury Law review answers remain volatile page memory only. No review answer may enter a URL, browser storage, cookie, analytics event, Lens event, contact payload, server-action closure, log, or external adapter.
- Major Injury Law Hero motion uses a real rendered WebGL sequence because the installed stack supports procedural rendered motion but no suitable general-purpose cinematic video generator is callable. It must never be replaced by a fake still-image pan/zoom/parallax.

## Intentionally not built

- Phase 9 project-wide final polish, performance profiling on production infrastructure, and cross-browser assistive-technology certification
- Production MLS/IDX, CRM, email, SMS, scheduling, analytics, call tracking, or document storage
- Real lead delivery or contact-data retention
- Final licensed vertical font files and commissioned/documented plumbing photography
- Genuine cinematic footage for the Real Estate Hero because no suitable non-presenter video generator is currently callable
- Production legal intake, evidence upload, deadline calculation, case evaluation, attorney matching, representation acceptance, or privileged messaging

## Known production dependencies

- Licensed fonts, brokerage identity, jurisdictional disclosures, Fair Housing/legal review, and verified market-data sources
- MLS/IDX provider and listing-data license
- CRM, messaging, scheduling, call tracking, analytics, consent, encryption, retention, deletion, and abuse-control decisions
- Real client proof and permissions before replacing illustrative scenarios
- A suitable cinematic generation pipeline if the Real Estate Hero is upgraded from its static fallback
- Real plumbing business identity, verified license/insurance/team/service terms, licensed safety and technical review, jurisdiction profiles, signed photo storage, EXIF stripping, malware scanning, scheduling/dispatch/CRM adapters, and production call handling
- Real injury-law firm identity, verified attorney credentials and jurisdictions, attorney-reviewed content/rules, advertising review, secure intake infrastructure, encryption, access controls, retention/deletion policy, conflict checking, rate limiting, consent records, and approved CRM/call handling
- Git status/diff commands remain unavailable because Apple developer command-line tools are not installed; validation uses local TypeScript, ESLint, Next.js, and browser paths.

## Phase 9 gate

- Final implementation, automated validation, route integrity, metadata, fallback, 3D-performance, and production-server checks are complete.
- The locked identities, conversion logic, privacy boundaries, fictional disclosures, professional-review limits, and independent composition of Phases 0–8 remain intact.
- The final live visual acceptance pass is pending only because the embedded preview tab has not reconnected after the local server restart. This is recorded as a verification limitation, not silently treated as a pass.
- Production integrations, legal/professional review, licensed media/fonts, genuine Real Estate cinematic footage, and real business identities remain explicit external dependencies rather than polish-phase assumptions.

## Phase 8 verification record

Verified on 2026-08-22:

- TypeScript, ESLint, and the Webpack production build passed; 85 pages and metadata routes were generated across ONLEV, the showroom, and all three demos.
- The root experience was visually inspected through the complete showroom-to-marketing handoff and every major Phase 8 section. Forward and reverse scrolling restored correct opening/final states, the ONLEV header remained stable, and all reveal elements reached their intended final state.
- ONLEV routes `/systems`, `/process`, `/work`, `/contact`, `/privacy`, `/terms`, and `/accessibility` rendered with meaningful headings, canonical metadata, no framework overlay, and no horizontal overflow. `/showroom` returned visitors to the Three Doors hub.
- Direct entry into Real Estate, Plumbing, and Injury Law was regression-checked on mobile with no horizontal overflow or parent-site overlay. All parent proof links use authoritative demo and flagship-tool routes.
- Responsive review covered 1280 desktop, 1024 tablet, and 390 mobile. The mobile Hero stayed out of WebGL, the marketing handoff recomposed intentionally, navigation opened with visible focus and a 44px-plus control, and forms collapsed to single-column controls without overflow.
- Empty walkthrough submission returned a focusable error summary and nine field-level validation signals. A complete fictional submission returned an ONLEV preview receipt and explicit no-send/no-retention explanation.
- The final fresh browser pass found no duplicate IDs, no unlabeled visible form controls, no error overlay, and no console errors. The only warning is the already documented upstream development-only `THREE.Clock` deprecation from R3F.
- Reduced-motion behavior was verified in implementation: GSAP motion is opt-in through `prefers-reduced-motion: no-preference`, CSS final states remain visible, and the existing Hero/mobile capability branches remain unchanged.

## Phase 7 verification record

Verified on 2026-08-22:

- TypeScript, ESLint, and the Webpack production build passed; 74 pages were generated across the showroom and all three completed demos.
- All 19 Injury Law route variants rendered with meaningful headings, no framework overlay, and no horizontal overflow at the tablet breakpoint; an invalid practice-area slug returned the final 404 state.
- The original ten-part Incident & Impact Review was verified in Phase 7; Stage 2 supersedes that UI with the six-stage conversational review while retaining the same deterministic safety/legal evaluation engine. Empty-step validation, immediate safety override, Back/Edit state, result-first ordering, evidence and documentation guidance, assumptions, limitations, and human escalation were exercised.
- Empty post-result contact submission returned server-validated field errors; a complete fictional submission returned an explicit no-send/no-retention/no-relationship receipt without transmitting review answers.
- Injury Law System Lens displayed only normalized event categories. Cross-navigation confirmed the open Injury Lens did not open or reveal events in Real Estate or Plumbing.
- Responsive checks covered 1440 desktop, 1024 tablet, and 390 mobile. Mobile uses the authored static Hero composition with no Canvas; review and consultation routes have no horizontal document overflow and suppress the general mobile action bar during the sensitive form flow.
- The signature sequence has a finite rendered alignment motion with a visible pause control; reduced motion skips WebGL and displays the final composed fallback. The browser harness does not expose reduced-motion emulation, so the media-query and live preference branches were verified by implementation inspection.
- A fresh desktop load produced no framework overlay or console errors. R3F emits one development-only upstream `THREE.Clock` deprecation warning; it does not affect rendering or production compilation.
- Real Estate and Plumbing home routes were regression-checked after Lens scoping changes: both retained their expected headings, no horizontal overflow, no error overlay, and closed vertical-specific Lens state.

## Phase 6 verification record

Verified on 2026-08-22:

- TypeScript, ESLint, and the Webpack production build passed; 56 pages were generated across the showroom and both completed demos.
- All 27 Plumbing route variants rendered with meaningful headings and no framework overlay; invalid service/tool routes returned 404.
- Forward portal entry and reverse showroom return completed successfully.
- Emergency guidance is semantic server content; urgent and non-urgent actions remain immediately available.
- All seven tools produced useful outputs; the Passport completed its Back/Edit/result path; the service-area matcher exercised inside and outside states.
- Empty request submission returned server-validated errors; a complete fictional submission returned an explicit no-send/no-retention receipt.
- Plumbing System Lens event mapping was exercised, and cross-navigation confirmed Real Estate does not display Plumbing signals.
- Responsive checks covered desktop, tablet, and the authored mobile breakpoint with no horizontal document overflow; fixed mobile service actions remain separated from showroom controls.
- Reduced-motion behavior was verified through implementation inspection because the browser harness exposes no media-emulation capability.
- After correcting a React store-selector loop and a GSAP scoped-target warning, a fresh browser tab produced zero console warnings/errors and no framework overlay.

## Phase 5 verification record

Verified on 2026-08-22:

- TypeScript, ESLint, and production build passed; 30 pages were generated.
- Every Real Estate route variant rendered without error overlays or horizontal overflow.
- Forward portal entry and reverse showroom return both completed successfully.
- Search URL state, zero-result/reset recovery, saved properties, and tour persistence were exercised.
- All six tools produced useful results; Tour Builder persisted a property and prepared a dated itinerary.
- Empty lead submission returned server-validated errors; a complete fictional submission returned an explicit no-send receipt.
- System Lens event mapping, open/focus/close/inert behavior, and focus return were exercised.
- Responsive passes covered 1440×900, 1024×768, 820×1180, and 390×844.
- Homepage, neighborhood, listings, tools, forms, and mobile navigation were visually inspected with no remaining clipping or broken composition.
- Reduced-motion behavior was verified through implementation inspection because the browser harness exposes no media-emulation capability.
- A fresh browser pass across homepage, search, and the flagship tool produced zero console warnings/errors and no framework overlay.
