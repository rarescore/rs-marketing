# Design System

Status: **Master showroom direction locked; vertical typography and production font files require licensing before final art direction**

## ONLEV production identity

- Parent company: **ONLEV**
- Primary domain: **onlev.site**
- Approved mark: architectural square frame with compact ON / LEV construction and a warm-metal V beam
- Production component: `src/features/onlev/brand/onlev-logo.tsx`
- Transparent assets: `public/brand/onlev-mark.svg`, `onlev-mark-light.svg`, and `onlev-mark-dark.svg`
- App icon: `src/app/icon.svg`

The mark geometry and composition are locked. Navigation uses the mark plus ONLEV word label; narrow responsive use may use the mark or compact word treatment. Light and dark variants preserve proportions and clear space. Gold remains a brand-material accent rather than the parent website palette.

Phase 8 extends the master palette with a restrained light editorial field for the marketing explanation layer: mineral paper, graphite ink, muted nickel, signal blue for system logic/action, and warm metal only for identity details. This is an authored companion to the dark architectural showroom, not a replacement for it.

Implementation sources:

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/components/ui/`
- `src/components/layout/`

## Design thesis

The master showroom is museum-grade, editorial, and architectural. It uses matte mineral surfaces, directional light, restrained metal details, and generous negative space. Glass appears only when it behaves like a real display or aperture; glassmorphism is not the card system.

The signature visual risk is the Three Doors spatial structure. Everything surrounding it should be calm, legible, and disciplined.

## Master palette

| Primitive | Value | Purpose |
|---|---:|---|
| Obsidian | `#101216` | Master canvas |
| Bone | `#F3F0E9` | Primary dark-mode text |
| Nickel | `#9BA3AD` | Secondary material reference |
| Signal blue | `#5F79FF` | Primary action and active state |
| Signal blue deep | `#4058D8` | Depth and pressed states |
| Warm beam | `#E6B56F` | Selective warmth and directional-light motif |

Components consume semantic tokens such as `--color-canvas`, `--color-surface`, `--color-ink`, `--color-line`, and `--color-accent`. Raw palette values do not belong inside feature components.

## Vertical themes

### Real estate

- Canvas `#171513`
- Surface `#211E1A`
- Text `#F2ECDF`
- Muted text `#C0B6A5`
- Accent `#BFA06A`
- Materials: limestone, espresso, muted brass, architectural daylight

### Plumbing and home services

- Canvas `#F4F6F7`
- Surface `#FFFFFF`
- Text `#102437`
- Muted text `#486074`
- Accent `#1769AA`
- Materials: enamel, galvanized steel, workwear blue, controlled safety amber

### Injury law

- Canvas `#F1EDE3`
- Surface `#FAF7F0`
- Text `#172334`
- Muted text `#596271`
- Accent `#7D2F3F`
- Materials: parchment, ink navy, restrained oxblood, soft daylight

Theme overrides change semantic tokens through `data-theme`; components remain structurally consistent without becoming visually identical.

## Typography

### Intended licensed system

- Master sans: **FK Grotesk Neue** or a metrically tested equivalent
- Master utility: **Berkeley Mono** or a metrically tested equivalent
- Real-estate display: a high-contrast editorial serif selected during vertical art direction
- Plumbing display: a sturdy condensed grotesk selected during vertical art direction
- Injury-law display: a dignified humanist serif selected during vertical art direction

Until licenses and font files are supplied, the code-safe foundation uses the self-hosted Geist Sans and Geist Mono package. This is an implementation fallback, not a change to the art direction.

### Scale

| Role | Token | Range |
|---|---|---|
| Display XL | `--type-display-xl` | 56–112px fluid |
| Display LG | `--type-display-lg` | 44–88px fluid |
| Heading 1 | `--type-heading-1` | 40–72px fluid |
| Heading 2 | `--type-heading-2` | 32–52px fluid |
| Heading 3 | `--type-heading-3` | 24–32px fluid |
| Body large | `--type-body-lg` | 17–19px fluid |
| Body | `--type-body` | 16px |
| Small | `--type-small` | 14px |
| Label | `--type-label` | 12px |

Display tracking targets `-0.03em` to `-0.05em`; body text uses natural tracking. Body line height is 1.55–1.7. Long-form measure is capped at 70 characters.

## Spacing and rhythm

The base rhythm is 4px with primary grouping on 8px increments.

Available steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, and 128px.

Section tiers:

- Compact: 48–64px
- Standard: 80–96px
- Cinematic: 96–128px

Do not invent one-off spacing values in feature code without documenting the reason.

## Grid and layout

- Maximum content width: 1440px
- Adaptive gutter: 16–48px
- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns
- Grid gap: 16–32px fluid
- Reference widths: 375, 768, 1024, and 1440px
- Use `min-height: 100dvh`, never a fixed `100vh` assumption on mobile
- Primary content appears first on mobile; decorative depth may be reduced or removed

## Shape, borders, elevation

- Small radius: 4px
- Standard radius: 8px
- Tool and form radius: 12px maximum
- Pills are reserved for status, compact filters, or true capsule controls
- Borders communicate structure; use semantic line color
- Elevation is rare and tinted by the environment, not generic black drop shadows

## Buttons

Foundation variants:

- **Primary:** one per view; signal-blue action
- **Secondary:** bordered surface action
- **Quiet:** low-emphasis action with no permanent border
- **Danger:** destructive actions only

Rules:

- Minimum interactive height: 44px; primary sizes are 48px and 56px
- Use an explicit verb that describes the result
- Provide hover, pressed, focus, loading, disabled, success, and error behavior
- Press feedback must not shift surrounding layout
- Icon-only buttons require an accessible name

## Forms

- Every field has a persistent visible label
- Placeholder text never replaces a label
- Helper and error text are programmatically associated with the field
- Validate on blur or submit, not aggressively on every keystroke
- Multi-error submissions receive a focusable error summary and inline errors
- Use semantic input types and autocomplete tokens
- Preserve entered data when navigating backward through a multi-step flow
- Tool results should usually precede contact capture
- Sensitive answers never appear in URLs, analytics payloads, or local storage

## Foundational primitives

Implemented:

- Button and button variants
- Input, textarea, select
- Field label, description, and error
- Surface
- Container
- Responsive grid
- Section spacing
- Skip link
- Motion provider
- R3F canvas boundary

Primitives own semantics, sizing, focus, and theme behavior. Feature components own domain composition and copy.

## Iconography

Use one consistent SVG icon family per visual world. Structural emoji are prohibited. Decorative icons are hidden from assistive technology; meaningful icons receive text alternatives; icon controls receive accessible names and states.

## Accessibility floor

- WCAG 2.2 AA target
- Body text contrast at least 4.5:1
- Large text and meaningful non-text elements at least 3:1 where applicable
- Visible 3px focus treatment
- Logical keyboard order
- Semantic headings and landmarks
- No hover-only meaning
- No canvas-only navigation
- Zoom and text scaling remain enabled
- Reduced-motion behavior is designed, not treated as a bug fix

## Anti-patterns

- Generic neon-purple SaaS aesthetic
- Green/orange funnel palette suggested by automated style matching
- Glass-card walls
- Constant glow, bloom, particles, or motion
- Identical hero/card/grid composition across all demos
- Random radii and arbitrary spacing
- Unverified social proof
- Typography chosen solely because it is free
