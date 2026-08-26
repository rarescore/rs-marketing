# Lev & On Law Firm website

A production-ready Next.js personal-injury website with a reversible three-question intake, responsive scroll animation, Resend email delivery, and Cloudflare Turnstile abuse protection.

## Run locally

Install dependencies, copy `.env.example` to `.env.local`, and add the required values before starting the site.

```bash
pnpm install
pnpm dev
```

## Enable online inquiries

1. Verify the sending domain in Resend and create an API key.
2. Create a Turnstile widget for the production hostname.
3. Set `RESEND_API_KEY`, `INTAKE_FROM_EMAIL`, `INTAKE_TO_EMAIL`, `TURNSTILE_SECRET_KEY`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the deployment environment.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin before building.

If Resend, Turnstile, or their configuration is unavailable, the form displays a direct telephone fallback and does not imply that an inquiry was sent.

For automated local testing, Cloudflare’s documented always-pass keys are:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Use real hostname-restricted keys in production. A valid Resend API key and verified sender domain are still required for delivery.

## Media

The four supplied GIFs are converted to optimized WebP frame sequences under `public/media/scroll/`. The crash sequence drives the hero, while the other three sequences appear as lazy-loaded scroll stories farther down the homepage. This frame-based approach responds directly to scroll and is reliable on iPhone Safari without depending on autoplay video behavior.

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```
