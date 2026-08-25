# Demo Requirements

Status: **Product requirements locked; content, expert review, and implementation pending**

## Cross-demo requirements

Every demo must:

- Feel like a real commissioned website with its own identity, composition, voice, and navigation
- Be independently routed, refresh-safe, shareable, and keyboard operable
- Include realistic detail routes, not only a polished homepage
- Offer one flagship tool with a genuinely useful result
- Give value before contact capture when practical
- Keep a discreet `Return to showroom`, `Switch industry`, `System Lens`, and `Get this system` control
- Work without WebGL and under reduced motion
- Use no fabricated testimonials, awards, rankings, reviews, case values, listings, or results
- Clearly disclose that it is a demonstration while avoiding intrusive watermarks
- Keep forms and task flows visually stable
- Pass the quality gates in `QUALITY-GATES.md`

## Real-estate demo

### Required information architecture

- Market-specific homepage
- Property search
- Listing-detail routes
- Buying
- Selling
- Neighborhood pages
- Market intelligence
- Tools
- Agent/team
- Client stories once verifiable content exists
- Consultation

### Flagship tool: Move Strategy Studio

Inputs may include transaction goal, property, loan balance, timing, target market, financing status, property condition, offer priorities, and relocation constraints.

Outputs:

- Personalized 30/60/90-day plan
- Seller-net scenarios
- Buy-first versus sell-first comparison
- Preparation priorities
- Recommended next conversation
- Downloadable report

Supporting tools:

- Offer Comparison Lab
- True Monthly Cost Explorer
- Seller Readiness Report
- Tour Builder
- Objective Neighborhood Comparison

### Guardrails

- No steering by protected characteristics
- Objective neighborhood data only, with source and date
- Financial estimates show assumptions and are not lending advice
- Listing data must be licensed, clearly fictional, or explicitly labeled sample data
- Fair Housing and local advertising review precedes production launch

## Plumbing and home-services demo

### Required information architecture

- Immediate emergency/non-emergency split
- Persistent phone and request-service actions
- Services and service details
- Service areas
- Technician, licensing, insurance, and trust content
- Planning and triage tools
- Maintenance membership
- Reviews once verifiable
- About
- Resources
- Contact and booking

### Flagship tool: Whole-Home Plumbing Passport

The tool records property age, supply and drain materials, equipment, fixture inventory, shutoff locations, observations, history, and owner-provided photos.

Outputs:

- Downloadable property record
- Maintenance schedule
- Age-based risk flags
- Inspection questions
- Appropriate service categories
- Optional reminder plan

Supporting tools:

- Symptom-to-Action Triage
- Water Heater Demand and Recovery Planner
- Fixture-Unit and Branch Capacity Guide
- Pressure and Flow Field Worksheet
- Repipe Scope Builder
- Sewer/Drain Evidence Checklist

### Guardrails

- Emergency guidance prioritizes safety and shutoff instructions
- Tools do not diagnose conclusively
- Capacity and pipe guidance is preliminary
- Show assumptions, units, and confidence limits
- Local codes and authority-having-jurisdiction requirements supersede outputs
- Licensed-plumber review is required before production use

## Injury-law demo

### Required information architecture

- Calm homepage with urgent next actions
- Case evaluation
- Practice areas
- What to do after an accident
- Process and timeline
- Attorney profiles
- Results with jurisdiction-appropriate disclaimers and only verifiable claims
- Client stories once verifiable
- Resources
- Confidential consultation

### Flagship tool: Incident & Impact Review

Question groups:

1. Immediate safety and medical needs
2. Jurisdiction, incident type, and date
3. Parties and insurance involvement
4. Medical care already received
5. Physical pain and symptom changes
6. Daily activity and mobility limitations
7. Work and financial disruption
8. Optional psychological effects, always including `Prefer not to answer`
9. Evidence and documentation
10. Existing insurer communication

Result categories:

- Immediate safety or medical action
- Time-sensitive attorney review
- Evidence-preservation steps
- Documentation gaps
- General next-step information

The result must not calculate settlement value, guarantee eligibility, declare representation, or present a legal conclusion.

### Contact sequence

After the useful result, request only what is needed for follow-up:

- Name
- Phone
- Preferred contact time
- Email if useful
- Explicit contact consent

Ask whether the person is 18 or older when required. Full date of birth is deferred to a secure secondary intake only if attorney review establishes a legitimate need and the interface explains that need.

### Guardrails

- Limit initial information to what is reasonably necessary for review
- Do not store sensitive answers in URLs, analytics, or local storage
- Provide understandable no-attorney-client-relationship and confidentiality notices approved for the jurisdiction
- Preserve a human escalation route
- A tasteful accident-aftermath viewpoint may support the signature Hero when it avoids impact depiction, bodies, gore, injury imagery, shock audio, fear tactics, and coercive copy. Immediate safety and an exit route remain available outside the cinematic layer.
- Attorney review is required for rules, claims, disclaimers, deadlines, privacy, retention, and contact consent

## Tool-output quality

Every tool result must include:

- The inputs and assumptions that materially affected it
- Clear next actions
- Confidence or limitation language where appropriate
- Edit/back behavior without data loss
- Accessible status announcements
- Print or download behavior only after the underlying result is correct
- Contact capture that does not conceal the result
