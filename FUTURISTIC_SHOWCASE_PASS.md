# Futuristic Showcase Pass

The pomegranate seed sequence was intentionally left untouched.

## Visual system
- Added a restrained custom cursor for pointer devices.
- Added cross-document View Transition CSS with graceful fallback.
- Added depth, perspective and 3D motion to the before/after website transformation.
- Turned the process section into a depth/tunnel treatment tied to the existing scroll progress.
- Replaced the homepage review rail with a 3D orbit/cylinder review showcase; the full review page remains paginated/readable.
- Added a dedicated "Built differently" 3D capability scene.
- Added depth/hover polish to the existing pricing accordion without changing its pricing structure.
- Rebuilt the audit scanning visual as a radar/orbit scene while keeping the real audit request intact.
- Added a sticky audit navigation rail for long reports.
- Added a contextual human-review prompt after 15 seconds in the audit experience.
- Restored bottom activity toasts. Because no live event source is connected, these are explicitly labeled "Demo activity" and should be wired to real events before being presented as live customer activity.

## Research direction
The 2026 stack research pointed to GSAP for precise scroll/timeline animation, Motion for React UI transitions, and React Three Fiber/Three.js for true 3D. This pass deliberately stays on the existing GSAP/Lenis/React stack and CSS 3D so the project does not gain another large dependency while the current environment cannot install `@vitejs/plugin-react`. React Three Fiber is the logical next layer if bespoke GLB models/shaders are added later.

## Performance/accessibility
- 3D scenes use CSS transforms and existing scroll values rather than extra canvas/WebGL instances.
- `prefers-reduced-motion` disables continuous orbital/spinning effects.
- Custom cursor is disabled on touch/coarse pointer devices.
