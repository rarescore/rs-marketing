# Motion System

Status: **Principles and tokens locked; showroom, three demo personalities, and ONLEV marketing choreography implemented through Phase 8**

## ONLEV marketing motion

The parent marketing layer uses short transform/opacity reading-order reveals, a single system-flow line draw, precise hover feedback, and spatial continuity from the completed showroom. It does not add a second hero spectacle after the Three Doors sequence.

Marketing reveals keep content in the accessibility tree, run only under `prefers-reduced-motion: no-preference`, use compositor properties, and clean up through a scoped GSAP media context. Reduced motion renders the final composition and preserves short state/color feedback.

## Purpose

Motion explains cause, hierarchy, spatial continuity, and system behavior. It does not decorate every available surface.

The master experience spends its largest motion budget on one signature sequence: the Three Doors hero becoming the industry hub and then transitioning into a chosen demo.

## Motion hierarchy

1. **Signature spatial motion:** hero, hub, and demo-entry continuity
2. **Navigation transitions:** orientation between routes and views
3. **Content reveals:** guide reading order
4. **Control feedback:** hover, focus, press, validation, success
5. **Ambient motion:** only when it reinforces material or atmosphere

## Timing tokens

| Role | Token | Duration |
|---|---|---:|
| Immediate response | `--motion-instant` | 100ms |
| Control feedback | `--motion-control` | 160ms |
| Component state | `--motion-component` | 280ms |
| Content reveal | `--motion-reveal` | 520ms |
| Spatial transition | `--motion-spatial` | 900ms |

Exits should generally use 60–70% of the corresponding entrance duration. Staggers should remain near 30–50ms and stop before a sequence feels delayed.

## Easing

- Enter: `cubic-bezier(0.16, 1, 0.3, 1)`
- Exit: `cubic-bezier(0.7, 0, 0.84, 0)`
- Move between visible states: `cubic-bezier(0.65, 0, 0.35, 1)`
- Scroll-scrubbed progress: linear mapping with damped camera/object response

## Tool ownership

- CSS: hover, focus, press, and simple state changes
- Motion for React: component presence, layout, and route-adjacent transitions
- GSAP: the bounded hero/hub master timeline, ScrollTrigger, and Flip continuity
- Lenis: optional desktop smooth scrolling, enabled only after testing and disabled for reduced motion
- React Three Fiber: the Three Doors spatial environment and purposeful 3D moments
- Postprocessing: selective and capability-gated; no default effect stack

Do not use two libraries to control the same property on the same element.

## Signature sequence requirements

The eventual Three Doors sequence must:

- Begin with readable HTML content before WebGL is ready
- Make all three industries available as semantic controls
- Keep input interruptible during every transition
- Preserve a direct deep link to each demo
- Use one short pinned sequence at most
- Avoid scroll hijacking
- Provide an immediate skip route
- End in a stable interactive state
- Degrade to an art-directed still and crossfade

## Vertical motion personalities

- **Real estate:** measured camera glides, long architectural reveals, restrained parallax
- **Plumbing:** precise mechanical movement, diagram assembly, fluid but controlled instrumentation
- **Injury law:** quiet uncertainty-to-clarity transitions, no shock effects or aggressive velocity

Shared timing tokens may be tuned through theme-specific multipliers, but the personalities must remain distinct.

## Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Disable smooth scrolling and scroll scrubbing
- Replace camera travel with a cut or short crossfade
- Stop ambient loops
- Render final states immediately
- Retain all content, controls, progress, and orientation
- Do not leave a scene frozen midway through its narrative

The root Motion provider uses user preference, and CSS motion tokens collapse to 1ms.

## Performance rules

- Animate transform and opacity wherever possible
- Avoid layout-affecting animation of width, height, top, and left
- Batch DOM reads and writes
- Use one R3F canvas for the hub
- Pause or unmount offscreen scenes
- Default reusable canvas to `frameloop="demand"`
- Cap device pixel ratio to 2 desktop and lower it by capability on mobile
- Target under 16ms frame work for 60fps desktop
- Accept stable 30fps only on explicitly degraded low-power tiers
- Dispose of geometries, materials, textures, listeners, GSAP contexts, triggers, and Lenis instances on exit

## Capability tiers

- **Full:** desktop-class GPU, normal motion preference, adequate connection
- **Reduced:** lower DPR, fewer effects, lighter geometry and textures
- **Fallback:** HTML/CSS plus art-directed image; no WebGL dependency

Viewport width alone does not determine capability.

## Verification

- Test entrance, midpoint, and final frames
- Verify rapid repeated interactions cancel cleanly
- Test forward, backward, refresh, and direct-link navigation
- Test keyboard and touch equivalents
- Inspect frame rate and long tasks on real hardware
- Confirm reduced-motion behavior communicates the same story
