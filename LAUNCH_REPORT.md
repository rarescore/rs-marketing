# LG Growth Studio launch report

Tested build: 2.0.0  
Test environment: local Vite production preview  
Test date: August 2, 2026

## Verified

- Production build completes successfully.
- ESLint passes with zero errors.
- Vitest: 2 files, 5 tests, all passing.
- Visual route suite: 20 route/viewport combinations, zero failures.
- Viewports: 390 × 844 and 1440 × 1000.
- Routes: home, services, pricing, audit, audit report, insights, article, contact, privacy and 404.
- Each tested route has one H1, a main landmark, no failed images, no visible unclipped horizontal overflow and no browser-console errors.
- Responsive generated images range from approximately 26–43 KB at 840 px and 78–123 KB at 1680 px.
- Audit API syntax passes and automated tests confirm private-network destinations are rejected.
- The audit result opens on a dedicated report page with an animated top score, six animated category bars, plain-language findings, verified rank status and repair actions.
- The optional Google position check reports an exact page/position only when `SERPER_API_KEY`, keyword and location context are available; otherwise the interface states that rank data is not connected.
- Contact fallback test passes when email delivery is unconfigured.

## Lighthouse — local production preview

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Scores are from the included source before third-party analytics, advertising pixels, consent software, live checkout or production hosting are added. Retest the final public URL; external scripts and hosting can change these results.

## Production configuration still required

- Final domain and canonical/sitemap URLs
- Stripe keys and Price IDs
- Resend key and verified sending domain
- Final service agreement and jurisdiction-specific legal review
- Analytics, Search Console and consent configuration
- Optional Serper key for location-aware Google position checks
- Real client proof when available and authorized
- Stripe webhook/onboarding workflow after a purchase

## Primary conversion behavior

- With Stripe configured, plan buttons open hosted Stripe Checkout.
- Without Stripe configured, plan buttons open a preselected project inquiry.
- With Resend configured, project forms deliver to `hello.rarescore@gmail.com`.
- Without Resend configured, the form offers a prefilled direct-email fallback.
