# RS Marketing

A production-ready marketing-agency website for **Rare Score Marketing**. It combines premium editorial design with clear pricing, original imagery, long-form articles, a live technical SEO audit, project intake, Stripe-ready checkout and responsive motion.

## What is included

- Home, services, pricing, audit, insights, article, contact, privacy, terms and 404 routes
- Monthly packages at $500, $1,000, $2,000 and $5,000
- Performance website offer beginning at $1,500
- Live server-side audit for metadata, headings, crawl signals, media, mobile setup and trust foundations
- Transparent audit limitation: keyword rankings require Search Console or a rank-data provider
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

1. Create a GitHub repository and upload the contents of this folder.
2. Import the repository at Vercel.
3. Use the default Vite settings: build command `npm run build`, output directory `dist`.
4. Add the environment variables from `.env.example`.
5. Deploy, connect the final domain and replace `https://rsmarketing.com` in `public/robots.txt` and `public/sitemap.xml` if the domain differs.

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

The audit endpoint validates the target, blocks private-network destinations, limits redirects and response size, and analyzes one public HTML page. It checks observable technical/on-page signals. It does not claim to be a complete security, accessibility, backlink, analytics, competitor or keyword-rank audit.

## Brand assets

- `public/rs-marketing-logo.svg` — horizontal wordmark
- `public/rs-marketing-mark.svg` — compact mark
- `public/favicon.svg` — browser icon

The artwork in `public/assets` is supplied in responsive WebP sizes. Icons are code-native Lucide SVGs rather than generated icon images.
