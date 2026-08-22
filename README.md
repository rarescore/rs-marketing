# Three Doors Showroom

A premium live showroom for industry-specific client-acquisition website systems serving real estate, plumbing/home services, and injury law.

## Source of truth

Read these before implementation:

1. `docs/MASTER-BRIEF.md`
2. `docs/CURRENT-STATE.md`
3. The domain document relevant to the change

Locked decisions may change only through the protocol in the master brief.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm check
```

The production build currently uses Next.js with Webpack because Turbopack's CSS worker cannot bind its local helper port in the managed build environment. This is an implementation constraint, not a product decision.

## Current scope

Phase 2 contains documentation, design tokens, foundational UI/layout/accessibility primitives, and isolated motion/3D infrastructure. It intentionally does not contain the public hero, industry hub, System Lens, or demo websites.
