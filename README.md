# Lev & On Law Firm — Standalone Website
A production-oriented Next.js personal-injury website with a cinematic three-question intake and email delivery through Resend.

## Run locally
```bash
pnpm install
pnpm dev
```

## Configure inquiries
Copy `.env.example` to `.env.local`. Add a Resend API key, a verified sender address, and Cloudflare Turnstile keys. Completed inquiries are emailed to `hello.rarescore@gmail.com`. Online submission remains disabled when the required credentials are missing; telephone links remain available.

## Verify and build
```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Legal policies, consent language, and article drafts require attorney approval before public launch. Article routes are noindex until reviewed by a named attorney and assigned a review date.
