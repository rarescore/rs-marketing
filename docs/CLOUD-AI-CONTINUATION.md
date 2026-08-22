# ONLEV Cloud-AI Continuation

This document is the implementation boundary for the visual-production pass begun on 2026-08-22.

## Locked journey

**ONLEV opening → complete ONLEV story → final Three Doors hub → selected demo**

The Real Estate, Plumbing, and Injury Law demo websites are already complete systems. Do not redesign them or weaken their tools, forms, privacy boundaries, System Lens integration, or showroom controls.

## Visual-production target

The parent ONLEV experience must remain stronger and more memorable than any one demo while preserving each demo's distinct identity. This pass is visual production, not an information-architecture rewrite.

### ONLEV opening

- Present ONLEV as a systems company through a real mechanism/signal/alignment visual rather than decorative particles or a still-image pan.
- Preserve immediate semantic HTML positioning and CTA before any cinematic layer is ready.
- Use mineral paper, graphite, nickel, signal blue, and restrained warm metal. Do not turn ONLEV into a black-and-gold luxury template.
- Desktop may use a high-quality cinematic layer; mobile, reduced-motion, low-capability, media-failure, or WebGL-failure paths must retain a deliberately composed static alternative.
- No mandatory loader, forced intro, generic neon gradients, particle fog, glossy random forms, floating blobs, or filler text.

### Final Three Doors

- Three portals must be genuinely different architectural assemblies, not one door recolored three times.
- Real Estate: limestone / oxidized bronze / smoked timber / warm architectural light.
- Plumbing: technical enamel / brushed steel / copper / calibrated cool task light / mechanical depth.
- Injury Law: blackened metal / oxblood / archival vellum or glass / calm directional light.
- Keep semantic DOM links over the portals. Navigation and accessibility must never depend on raycasting.
- Hover or keyboard focus must begin the selected door response immediately. The selected door opens on its real hinge with a latch-release/weight/settle response.
- Selection may subtly bias key light, room exposure, and camera target. Avoid large or sickness-inducing camera travel.
- The same door click must continue into the existing portal transition. Do not add a separate Enter button.
- World detail motion must communicate meaning and settle; do not run decorative idle loops.

### Performance and fallback tiers

- High desktop: authored assets, shadows, selective post-processing, DPR capped around 1.5.
- Tablet: reduced DPR and shadows, no expensive post-processing.
- Mobile/reduced-motion/low-capability: authored static/lightweight fallback with the same labels and direct links.
- Stop rendering when the chamber is offscreen.
- Avoid per-frame React state, per-frame object allocation, animated layout properties, and multiple scroll controllers.
- Keep the portal scene lazy and prefer a small number of authored meshes to brute-force triangle counts/effects.

## Art-direction constraints

- No generic AI decoration, neon-gradient spectacle, glass-card wall, cheap blobs, particle fog, or oversized filler text.
- Do not invent awards, clients, testimonials, performance statistics, ROI, or prices.
- KODE, Malvah, and Awwwards work are craft benchmarks only. Do not copy their recognizable compositions, assets, navigation, or motion signatures.

## Acceptance gate

Inspect the complete root journey at 390, 768, 1440, and 1920 widths. Test hover, focus, keyboard activation, touch activation, forward entry, showroom return, reduced motion, WebGL failure, loading/failure fallback, and context loss. The root must end at the selection chamber; there must be no post-hub content to scroll past before selecting a door. Check for blank/black frames, collisions, bad crops, horizontal overflow, console errors, dead links, and unstable frame pacing.

Required commands when dependencies/tooling are available:

```bash
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm test
pnpm build
```

Do not call the pass complete because it builds. Visual acceptance remains the deciding gate.
