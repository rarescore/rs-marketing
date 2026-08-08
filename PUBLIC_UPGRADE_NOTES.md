# LG Growth Studio — Public Content / SEO / Mobile Upgrade

## Major changes

- Replaced the previous “Nothing works alone” relay with a longer scroll-controlled spatial Growth Engine animation.
  - Five connected modules: Website, Search, Content, Paid Growth, Automation.
  - Scroll-controlled 3D depth, active-stage storytelling, signal paths and a central visual reactor with no logo/text inside it.
  - No permanent requestAnimationFrame loop; work is scheduled only while scrolling/resizing.
- Added a Research Library to the homepage and main navigation.
- Added 11 original long-form research articles (10 requested + 1 additional redesign article).
  - Every article is 1,500+ words.
  - Unique title, primary keyword, secondary keywords, meta description, headings, FAQ and cited research sources.
  - Static pre-rendered HTML copies are generated at build time so article text/meta/schema are in the server response, not dependent on client-side JavaScript.
  - Article + BreadcrumbList + FAQPage JSON-LD.
  - Canonical URLs, Open Graph metadata, Twitter cards, sitemap image entries and RSS feed.
- Added 11 local article hero visuals at 1600×900 plus 800×450 mobile variants.
- Added a build-time SEO generator (`scripts/generate-seo.mjs`).
  - Set `VITE_SITE_URL` to the final live domain before build.
  - Generates canonical article pages, sitemap.xml, robots.txt and feed.xml.
- Added an animated 404 experience plus Vercel fallback routing intended to return HTTP 404 for unknown routes.
- Added app-like mobile quick navigation and viewport-safe spacing.
- Added expanded mobile layout rules for articles, research hub, growth engine and long-form pages.
- Added 200 unique development-only testimonial story fixtures with varied lengths and scenarios, including security recovery and long-running broken-site rebuild scenarios.

## Important review integrity rule

The 200 generated testimonial stories are **development fixtures**, not verified customer reviews. They are intentionally disabled in production by default. To test the 200-review interface locally, set:

`VITE_SHOW_SAMPLE_REVIEWS=true`

Do not publish fictional testimonials as customer reviews. Populate `verifiedReviews` with real customer feedback before enabling public review proof.

## Article word counts

All published research pieces meet the requested 1,500-word minimum. Current range: roughly 1,520–1,720 words.

## SEO score note

The site is structured to pursue a strong Lighthouse/technical SEO result, but no responsible implementation can guarantee a permanent “100/100 SEO score.” Lighthouse score depends on the final deployed domain, server response, assets, third-party scripts, crawlability and runtime conditions. The content/technical changes in this pass remove many preventable SEO issues and make the research library directly crawlable.

## Before launch

1. Set `VITE_SITE_URL` to the exact production domain in Vercel.
2. Confirm that the generated sitemap uses that domain.
3. Replace/enable only verified client reviews.
4. Test Vercel 404 response headers after deployment.
5. Run Lighthouse and Search Console URL Inspection on the production URLs.
6. Submit `/sitemap.xml` in Search Console.
