# ONLEV Cloud-AI Continuation Note

Use this note as the handoff prompt and technical boundary for the next visual-production pass.

## Start here

1. Read `docs/CURRENT-STATE.md`, `docs/DESIGN-SYSTEM.md`, `docs/MOTION-SYSTEM.md`, `docs/SITE-ARCHITECTURE.md`, and `docs/QUALITY-GATES.md`.
2. Inspect the current root experience and these files before changing anything:
   - `src/app/page.tsx`
   - `src/features/showroom/hero/showroom-hero.tsx`
   - `src/features/showroom/hero/hero-experience.client.tsx`
   - `src/features/showroom/hero/three-doors-scene.client.tsx`
   - `src/features/showroom/hero/hero.css`
   - `src/features/showroom/hub/industry-hub.client.tsx`
   - `src/features/showroom/hub/industry-hub.css`
   - `src/features/onlev/marketing/onlev-marketing.tsx`
3. Preserve the locked order: **ONLEV opening → complete ONLEV story → final Three Doors hub → selected demo**.
4. Do not redesign the Real Estate, Plumbing, or Injury Law websites. Do not weaken their tools, forms, privacy boundaries, System Lens integration, or showroom controls.

## Honest current limitation

The implementation is technically complete and the final doors are real interactive R3F geometry, not flat illustrations. However, the ONLEV opening is still an authored CSS architectural composition, and the Three Doors environment is procedural geometry. It does not yet have the model, material, lighting, and cinematic-media specificity of a commissioned KODE/Malvah-level production.

The next pass should be a **visual-production pass**, not another information-architecture rewrite.

## How to make it materially better

### 1. Replace generic procedural surfaces with authored production assets

- Create three genuinely different architectural portal assemblies, not one door recolored three times.
- Model frames, jambs, hinges, handles, reveals, thresholds, wall returns, ceiling coves, and believable room depth.
- Give each portal a clear material story:
  - Real Estate: warm oxidized bronze, dark oak or smoked timber, limestone, warm architectural light.
  - Plumbing: dark technical enamel, brushed steel, copper, precision blue task light, visible mechanical depth.
  - Injury Law: ink-blackened metal, deep oxblood textile/wood, archival glass or vellum, calm directional light.
- Use authored GLB/glTF assets with baked normal, roughness, AO, and light information. Optimize with Meshopt or Draco and KTX2/Basis textures. Avoid shipping raw 4K PNG/JPEG maps.
- Keep the semantic DOM links over each portal. The 3D canvas is visual enhancement; accessibility and navigation must never depend on raycasting alone.

### 2. Upgrade the ONLEV opening with genuine cinematic motion

- If a high-quality cinematic generator such as Runway or Higgsfield is available, create real rendered motion rather than panning or zooming a still.
- The sequence should depict ONLEV as a systems company: signal entering an architectural mechanism, layers aligning, pathways connecting, then resolving into the ONLEV mark and the existing headline composition.
- Target a restrained 6–10 second seamless visual loop or a short scroll-addressable rendered sequence. No mandatory loader, no long forced intro, no stock “futuristic particles,” and no random glossy shapes.
- Render at 16:9 with a clean center-right subject area so the live HTML headline remains readable on the left. Produce a separate vertical/mobile crop rather than shrinking the desktop video.
- Export production derivatives such as AV1/WebM and H.265/MP4 with a poster frame. Preload metadata only; keep semantic headline and CTA visible before media is ready.
- Reduced motion must show a deliberately composed final frame with a short opacity reveal only.

### 3. Make the final portal hover feel physically convincing

- Response must begin in under 100 ms on pointer entry or keyboard focus.
- Use the existing active-industry store as the single state source.
- Animate the selected door on its actual hinge with weight: slight initial latch release, controlled acceleration, slow settle. Do not use a flat scale, fake zoom, or endless idle movement.
- Shift key light, room exposure, and camera target subtly toward the selected world. Keep camera travel small enough to avoid motion sickness.
- Reveal meaningful moving details inside each world: architectural daylight/shadow change, calibrated plumbing flow/gauge response, and Injury Law record planes resolving into order.
- Clicking the same door must continue into the existing portal transition. Do not reintroduce a separate “Enter” button.

### 4. Preserve performance while increasing fidelity

- Desktop high tier: full assets, shadows, selective post-processing, DPR capped around 1.5.
- Tablet tier: lower DPR, reduced shadows, no expensive post-processing.
- Mobile/reduced-motion/low-capability tier: authored static or lightweight CSS/WebGL alternative with the same labels and direct links.
- Stop rendering while the final chamber is offscreen. Avoid per-frame React state updates, new object allocation inside `useFrame`, animated layout properties, and multiple scroll controllers.
- Budget the portal scene as a lazy chunk. Prefer a small number of well-authored meshes over high triangle counts and layered post effects.

## Non-negotiable art-direction rules

- ONLEV must remain mineral paper, graphite, nickel, signal blue, and restrained warm metal—not a black-and-gold luxury template.
- No generic neon gradients, particle fog, cheap glass cards, floating blobs, oversized filler text, or identical card grids.
- Do not invent awards, clients, testimonials, performance statistics, ROI, or prices.
- Do not copy KODE, Malvah, or Awwwards references. Match their authorship, restraint, spatial composition, and finish.
- The parent ONLEV experience must remain stronger and more memorable than any one demo while the three demos retain distinct identities.

## Acceptance gate for the cloud pass

- Inspect the complete root journey at 390, 768, 1440, and 1920 widths.
- Test direct door hover, focus, keyboard activation, touch activation, forward entry, and showroom return.
- Verify the visitor cannot scroll beyond the final selection chamber before choosing a door.
- Check normal and reduced-motion paths, WebGL failure fallback, media failure fallback, loading state, and context loss.
- Confirm no blank/black frames, label collisions, bad crops, horizontal overflow, console errors, or dead links.
- Profile the hover sequence and camera movement for stable frame pacing.
- Run TypeScript, ESLint, tests, and the production build.
- Update `docs/CURRENT-STATE.md` with exact assets added, budgets, test evidence, and any honest limitations.

## Validation commands

```bash
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm test
pnpm build
```

Do not call the work complete merely because it builds. The final decision is visual: the opening and Three Doors must look commissioned, physically believable, and specific to ONLEV rather than AI-generated decoration.
