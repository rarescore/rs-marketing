# Mobile Optimization Pass — Aug 2026

This build treats mobile as its own composition rather than a scaled desktop layout.

## Runtime changes
- Lenis smooth scrolling is disabled on touch/coarse-pointer devices and <=900px. Mobile uses native scrolling.
- The pomegranate hero no longer depends on GSAP ScrollTrigger on phones. It uses passive native scroll events throttled with requestAnimationFrame.
- Mobile pomegranate decoding is reduced from 12 sprite textures to 6, with a persistent poster fallback until sprites are ready.
- Canvas DPR remains capped on mobile.
- Click-spark canvas and simulated activity popups are hidden on phones to remove unnecessary paint/compositing work.

## Layout changes
- 64px app-style mobile header with safe-area support.
- Full-width, 16px audit inputs to prevent iOS auto-zoom.
- Rebuilt hero, audit, process, autopsy, growth-engine, reviews, pricing, articles, builder and footer layouts for narrow viewports.
- Desktop 3D scenes are flattened/simplified on mobile rather than squeezed into the viewport.
- Reviews use one native-swipe card per viewport.
- Pricing becomes readable full-width tap cards.
- Long-form articles use a single editorial reading column and full-width hero media.
- Dedicated audit scanning/report views are reorganized for one-handed phone reading.

## Performance approach
Research followed web.dev guidance to favor transform/opacity animations over layout/paint-heavy properties and MDN guidance for reduced-motion support. Mobile removes blur-heavy/3D effects while preserving meaningful movement.
