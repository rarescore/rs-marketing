# RS Marketing

A production-ready marketing-agency website for **Rare Score Marketing**. It combines a white-and-evergreen cinematic visual system with clear pricing, original imagery, long-form articles, a live technical SEO audit, project intake, Stripe-ready checkout and responsive motion.

## What is included

- Home, services, pricing, audit, insights, article, contact, privacy, terms and 404 routes
- Monthly packages at $500, $1,000, $2,000 and $5,000
- Performance website offer beginning at $1,500
- Dedicated audit report route with animated score and category bars, plain-language findings, repair pricing and contact/purchase actions
- Live server-side audit for metadata, headings, crawl signals, media, mobile setup and trust foundations
- Optional location-aware Google position check through Serper; exact rankings are never invented when the provider is not connected
- Automated repair range based on observed issue severity
- Stripe Checkout integration with a contact fallback when Stripe is not configured
- Resend email delivery with a direct-email fallback
- Original RS logo files and original generated campaign imagery
- Responsive images, route splitting, reduced-motion support, metadata, canonical URLs, schema, sitemap and robots rules
- Automated visual QA and tests

## Run locally

```bash
npm install
npm run dev
```

Build and verify:

```bash
npm run lint
npm test
npm run build
npm run preview
```

## Recommended deployment

Keep this code in GitHub and import the repository into **Vercel**. Vercel is recommended because the audit, contact and checkout features use the serverless files in `/api`. GitHub Pages can host the visual site but cannot run those API endpoints.

1. Keep the previous IQ website in its current repository. Create a **new** GitHub repository for RS Marketing.
2. Upload the contents of this folder so `package.json` sits at the repository root. The downloadable ZIP is already packaged this way.
3. Import the new repository as a new Vercel project. A paid domain is not required; the free `vercel.app` address works.
4. Keep **Root Directory** blank (repository root), choose Vite, use build command `npm run build`, and output directory `dist`.
5. Add the environment variables from `.env.example`.
6. Deploy, then replace `https://rsmarketing.com` in `public/robots.txt` and `public/sitemap.xml` when the final address is known.

## Payments

Create four recurring Stripe Prices and one one-time website Price, then set:

- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_FOUNDATION`
- `STRIPE_PRICE_MOMENTUM`
- `STRIPE_PRICE_DEMAND`
- `STRIPE_PRICE_LEADER`
- `STRIPE_PRICE_WEBSITE`

Until those values exist, every “Start this plan” button safely opens a pre-filled project inquiry instead of failing.

## Contact email

Create a Resend API key, verify the sending domain, set `RESEND_API_KEY`, and update the `from` address in `api/contact.js` if the final domain is not `rsmarketing.com`. The inbox is currently set to `hello.rarescore@gmail.com`.

## Before accepting live payments

- Replace the placeholder legal entity/domain details in Privacy and Terms and have the final documents reviewed for the business jurisdiction.
- Confirm service-agreement language, cancellation notice, revision limits, asset ownership and media-spend terms.
- Configure Stripe prices and webhook-based onboarding/fulfillment.
- Add real client testimonials or case studies only after permission and verification. The launch build intentionally contains no invented testimonials, client logos or results.
- Connect GA4/Search Console only after configuring the required consent behavior.
- Run Lighthouse on the final production URL because hosting, analytics, consent tools and ad pixels can change scores.

## Audit methodology and limits

The audit endpoint validates the target, blocks private-network destinations, limits redirects and response size, and analyzes one public HTML page. It checks observable technical/on-page signals. If `SERPER_API_KEY` is configured and the visitor supplies a keyword, it also checks up to 100 search results for the submitted domain and reports the estimated position and result page. Without that key, the report clearly labels exact ranking as not connected. It does not claim to be a complete security, accessibility, backlink, analytics, competitor or ranking audit.

## Brand assets

- `public/rs-marketing-logo.svg` — horizontal wordmark
- `public/rs-marketing-mark.svg` — compact mark
- `public/favicon.svg` — browser icon
- `public/assets/rs-logo-white.png` — cleaned full-resolution supplied logo on white
- `public/assets/rs-logo-white.webp` — optimized website master
- `public/assets/rs-logo-lockup.webp` — cropped lockup variant

The artwork in `public/assets` is supplied in responsive WebP sizes. Icons are code-native Lucide SVGs rather than generated icon images.
