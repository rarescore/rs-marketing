import {
  Aperture, BarChart3, Bot, Code2, Compass, FileSearch, Globe2,
  MapPin, Megaphone, Search, Sparkles, Target, Video, Workflow,
} from 'lucide-react'

export const plans = [
  {
    id: 'foundation', name: 'Foundation', price: 500, eyebrow: 'Show up consistently',
    description: 'A disciplined content baseline for a business that needs to look active, current, and credible.',
    bestFor: 'New or local businesses building a dependable presence',
    features: ['2 managed social channels', '8 branded posts per month', '2 AI-assisted short videos', 'Monthly content calendar', 'Profile and bio optimization', 'Monthly performance snapshot', 'One revision round per asset'],
    notIncluded: 'Paid media management and advertising spend',
  },
  {
    id: 'momentum', name: 'Momentum', price: 1000, eyebrow: 'Build a creative rhythm', popular: true,
    description: 'More video, more testing, and active publishing across the channels your buyers actually use.',
    bestFor: 'Businesses ready to turn consistency into measurable interest',
    features: ['3 managed social channels', '12 branded posts per month', '6 AI-assisted short videos', 'Publishing and scheduling', 'Comment monitoring 3× weekly', 'Monthly strategy session', 'Hook and format testing', 'Google Business Profile tune-up'],
    notIncluded: 'Advertising spend; campaign management available as an add-on',
  },
  {
    id: 'demand', name: 'Demand Engine', price: 2000, eyebrow: 'Create and capture demand',
    description: 'An integrated content and lead system built to produce calls, forms, and useful conversion data.',
    bestFor: 'Service businesses with a proven offer and room to grow',
    features: ['Up to 4 managed channels', '16 short-form videos per month', '20 total social assets', 'Meta or TikTok campaign management', 'One conversion landing page', 'Google Business Profile management', 'Lead-source tracking setup', 'Weekly creative optimization', 'Monthly reporting and action plan'],
    notIncluded: 'Advertising spend; Google Ads can replace one social ad channel',
  },
  {
    id: 'leader', name: 'Market Leader', price: 5000, eyebrow: 'Own the category',
    description: 'Senior-led, full-funnel execution for a company that wants one accountable growth partner.',
    bestFor: 'Established operators scaling locations, markets, or high-value offers',
    features: ['5-channel content system', 'Up to 30 short-form videos', 'Daily publishing cadence', 'Meta, Instagram, TikTok and Google Ads management', 'SEO strategy and 2 authority articles monthly', 'Local SEO and review workflow', 'Landing-page and conversion optimization', 'CRM and lead-routing consultation', 'Weekly performance meeting', 'Priority production queue'],
    notIncluded: 'Advertising spend, creator fees, and third-party software',
  },
]

export const services = [
  { icon: Video, title: 'AI video studio', text: 'Concepts, scripts, generated scenes, editing, hooks, captions and channel-ready versions. Every batch is reviewed by a human before it ships.', deliverables: ['Short-form ads', 'Organic series', 'Creative variants'] },
  { icon: Aperture, title: 'Social production', text: 'A deliberate publishing system—not random posts. We map themes to buyer questions, produce the assets, schedule them, and learn from response.', deliverables: ['Content calendars', 'Design and copy', 'Publishing'] },
  { icon: Target, title: 'Paid acquisition', text: 'Campaign structure, audience strategy, creative testing and lead routing for Meta, Instagram, TikTok and Google.', deliverables: ['Campaign builds', 'Creative testing', 'Lead optimization'] },
  { icon: Search, title: 'Search & content', text: 'Technical SEO, search-intent planning, useful editorial content and internal linking designed to compound rather than chase vanity traffic.', deliverables: ['Technical SEO', 'Content systems', 'On-page optimization'] },
  { icon: MapPin, title: 'Local visibility', text: 'Google Business Profile, service structure, review workflows and local landing pages that make it easier to find and trust the business.', deliverables: ['GBP management', 'Review workflow', 'Local pages'] },
  { icon: Code2, title: 'Performance websites', text: 'Fast, accessible, search-ready websites with clear offer architecture, clean tracking and conversion paths built for mobile first.', deliverables: ['From $1,500', 'Analytics setup', 'Schema and technical SEO'] },
  { icon: Workflow, title: 'Lead operations', text: 'Form strategy, qualification, CRM handoff and response-speed design so paid attention does not disappear inside an inbox.', deliverables: ['Lead routing', 'CRM consultation', 'Follow-up maps'] },
  { icon: Sparkles, title: 'Custom projects', text: 'Launch films, offer pages, sales collateral, platform setups and unusual creative challenges scoped around the outcome.', deliverables: ['Fixed-scope quotes', 'Clear milestones', 'Owner handoff'] },
]

export const processSteps = [
  { number: '01', title: 'Find the constraint', text: 'We audit the offer, audience, funnel and evidence. The first task is deciding what is actually preventing growth.' },
  { number: '02', title: 'Build the signal', text: 'We create a clear message, a distinctive visual system and channel-native ideas people can understand quickly.' },
  { number: '03', title: 'Run controlled tests', text: 'Hooks, formats, pages and audiences change one variable at a time, so the result teaches us something useful.' },
  { number: '04', title: 'Compound what works', text: 'Winning patterns become repeatable campaigns, search assets and operating systems—not one lucky post.' },
]

export const faqs = [
  ['Is advertising spend included?', 'No. Your subscription covers strategy, production and management. Media spend is paid directly to the advertising platform, so you keep control and complete visibility.'],
  ['Do you guarantee leads or rankings?', 'No credible agency can guarantee a specific ranking or number of leads without controlling the market, offer, budget and sales process. We guarantee a defined scope, transparent reporting and disciplined optimization.'],
  ['Are the videos fully automated?', 'AI can expand production speed, but human judgment directs the concept, brand fit, editing and final quality check. We use AI as a production advantage—not as an excuse for generic output.'],
  ['How long before we know what works?', 'Paid campaigns can generate useful signals within weeks. Organic content and SEO need a longer runway. We recommend evaluating creative every 30 days and compounding search work over at least 3–6 months.'],
  ['Can I cancel?', 'Plans are billed monthly. We recommend a three-month runway because stopping after the first test destroys the learning loop. Final cancellation terms can be set in your service agreement.'],
  ['Who owns the assets and accounts?', 'You retain ownership of approved final assets and your advertising, analytics and social accounts after invoices are paid, subject to any licensed third-party elements stated in your agreement.'],
  ['Can you work with my existing website or team?', 'Yes. We can operate as the production and growth layer around your current staff, or scope a focused repair, landing page or SEO sprint.'],
  ['What is included in the $1,500 website?', 'A focused, mobile-first business site beginning at five core pages, on-page SEO, analytics setup, structured data, contact flow and launch handoff. Complex ecommerce, custom apps and large migrations are quoted separately.'],
]

export const articles = [
  {
    slug: 'search-is-an-information-architecture-problem',
    title: 'Search is an information architecture problem before it is a keyword problem',
    dek: 'Ranking rarely begins with writing more. It begins with making the business easier for search engines—and people—to understand.',
    category: 'Search strategy', minutes: 8, image: '/assets/seo-terrain.webp',
    sections: [
      { h: 'The page is not the strategy', p: ['A page can mention a valuable phrase twenty times and still remain structurally invisible. Search systems must infer what the business does, who it serves, which page is authoritative, and whether the site deserves to be cited. When five pages compete for the same idea, navigation hides the important service, or every location page says nearly the same thing, the problem is not a missing keyword. It is unresolved meaning.', 'Strong SEO therefore starts with an inventory. Every page needs a job, a primary intent and a place in the hierarchy. Service pages explain the commercial offer. Articles answer questions that appear before the buyer is ready. Comparison pages help evaluate alternatives. Location pages provide real local context. Internal links show the relationship between those ideas. This structure lets authority accumulate instead of scattering.'] },
      { h: 'Build around decisions, not traffic', p: ['The highest-volume query is often not the most useful query. A local operator may gain more from fifty monthly searches with urgent commercial intent than five thousand broad visits from readers outside the service area. Good planning follows the buyer’s decision: recognize the problem, understand the options, compare providers, reduce risk and act.', 'That journey creates a content map. Each asset should move a real person forward and connect to a sensible next step. Traffic becomes valuable when it enters a designed path; otherwise it is a number that looks impressive in a report and disappears.'] },
      { h: 'Technical quality is permission to compete', p: ['Fast rendering, stable layouts, useful titles, a valid canonical, crawlable navigation, structured data and accessible content do not guarantee first place. They remove avoidable reasons to lose. Technical SEO is the floor beneath reputation, relevance and usefulness.', 'The practical sequence is simple: repair indexation and duplication, establish the page hierarchy, improve the pages closest to revenue, publish evidence-rich supporting content, and measure queries—not just positions. The goal is not a perfect audit screenshot. It is a site whose meaning becomes clearer every month.'] },
      { h: 'A better operating metric', p: ['Track the number of qualified search entrances that reach a commercial page, not just total organic sessions. Add conversions, assisted conversions, query growth and coverage of high-intent topics. That scorecard rewards a useful search system instead of a publishing treadmill.'] },
    ],
  },
  {
    slug: 'creative-testing-without-content-chaos',
    title: 'Creative testing without content chaos',
    dek: 'More assets do not create more learning unless the ideas are organized so the result can teach you what to do next.',
    category: 'Creative systems', minutes: 7, image: '/assets/creative-testing.webp',
    sections: [
      { h: 'Volume is not the same as variation', p: ['Ten videos that repeat the same promise with different background music are not ten meaningful tests. They are one idea wearing ten outfits. A useful creative program separates the variables: the problem being named, the promise being made, the proof being shown, the opening pattern, the spokesperson, the pacing and the call to action.', 'This does not mean every piece should feel clinical. It means the team knows why each version exists. One batch might compare a direct problem statement against a surprising demonstration. Another might hold the hook constant while changing proof from explanation to customer evidence. The audience gets variety; the operator gets information.'] },
      { h: 'The hook earns attention; proof earns belief', p: ['Short-form creative is often discussed as if the first two seconds are the entire campaign. The opening matters because nothing else can work if it is skipped. But attention without belief becomes empty reach. The middle must demonstrate the mechanism, make the outcome concrete or reduce a meaningful objection.', 'The strongest ads create a small argument. They name a familiar tension, reveal a new way to interpret it, show why the offer resolves it, and make the next action feel proportionate. “Book now” is more believable after the viewer understands what happens next.'] },
      { h: 'AI makes judgment more valuable', p: ['Generative tools can produce scenes, voices, variants and edits faster than a traditional workflow. That increases the supply of output, not automatically the supply of good ideas. When production becomes cheaper, taste, strategy and selection become the scarce layer.', 'A responsible workflow keeps people in control of claims, brand tone, likeness, continuity and final approval. AI is most powerful when it gives the creative director more shots at a difficult concept and gives the media buyer fresh, structured experiments before fatigue sets in.'] },
      { h: 'Create a learning library', p: ['Tag each concept by audience, tension, promise, proof and format. Record spend, watch behavior, qualified actions and sales feedback. Over time, the library reveals durable patterns that can inform landing pages, search content and sales conversations. That is how content becomes an asset rather than a monthly expense.'] },
    ],
  },
  {
    slug: 'local-growth-is-a-trust-routing-system',
    title: 'Local growth is a trust-routing system',
    dek: 'The winning local presence connects visibility, evidence and response speed. Optimizing only the profile leaves revenue between the steps.',
    category: 'Local growth', minutes: 9, image: '/assets/local-signal.webp',
    sections: [
      { h: 'Being found is only the first handoff', p: ['A customer searching for an urgent service is not browsing like an audience member. They are reducing uncertainty under time pressure. They compare proximity, availability, relevance, reviews, photos, clarity of the offer and how quickly the business responds. Every signal hands trust to the next.', 'A complete local system aligns the Google Business Profile, website, directory information, service categories, location context and review language. If one source shows different hours or a different phone number, the system creates hesitation exactly when the buyer wants certainty.'] },
      { h: 'Reviews are operational data', p: ['Reviews influence conversion, but they also contain a map of what customers value and fear. Recurring mentions of communication, cleanliness, speed or pricing transparency should shape website copy and creative. Repeated complaints reveal a process problem marketing cannot safely hide.', 'A review workflow should ask at a sensible moment, make the path easy and route unhappy customers toward resolution without suppressing honest feedback. The goal is not a perfect-looking score. It is visible evidence of a business that consistently handles the work.'] },
      { h: 'Response speed is part of media performance', p: ['A campaign can deliver an affordable lead and still fail if nobody answers for three hours. In local services, the distance between click and human response often determines whether the advertising “worked.” That makes call handling, text follow-up, qualification and scheduling part of the growth system.', 'Track answered-call rate, time to first response, booked-job rate and revenue by source. Those numbers explain much more than cost per lead alone. A slightly more expensive lead that answers, books and buys is more valuable than a cheap form submission that never connects.'] },
      { h: 'Own the next useful question', p: ['The local brand that explains the process, cost drivers, preparation and common failure points becomes easier to trust. Useful pages and videos can answer those questions before the call, improve search coverage and make sales conversations shorter. Local authority is built when every touchpoint makes the next decision easier.'] },
    ],
  },
  {
    slug: 'the-real-job-of-a-marketing-website',
    title: 'The real job of a marketing website',
    dek: 'A premium site should not decorate uncertainty. It should organize a difficult decision and make the next step feel safe.',
    category: 'Web & conversion', minutes: 6, image: '/assets/growth-engine.webp',
    sections: [
      { h: 'Clarity is a design material', p: ['A visitor does not experience strategy documents, brand workshops or a component library. They experience the next screen. The first screen must establish who the offer is for, what changes after buying and what action is available. Sophisticated visuals can deepen that message, but they cannot replace it.', 'This is why premium design often feels unusually calm. Hierarchy removes decisions. Spacing separates ideas. Motion directs attention. Proof appears near the claim it supports. The visitor is never forced to assemble the offer from fashionable fragments.'] },
      { h: 'Trust needs proximity', p: ['A testimonial at the bottom cannot rescue an unsupported promise at the top. Evidence should live beside the decision: a sample deliverable near the service, an explanation of scope near the price, ownership terms near the commitment, and a clear limitation near the audit.', 'New agencies should resist inventing scale. Transparent process, strong sample work and specific boundaries create more durable trust than fake logos or anonymous praise. Credibility grows when the site makes it easy to verify what will happen next.'] },
      { h: 'Performance is psychological', p: ['Speed is not only a technical score. Delay makes a business feel less capable. Layout shifts feel unstable. A difficult mobile menu creates work. Accessibility failures quietly tell part of the audience that the experience was not built for them.', 'Conversion optimization begins by removing that friction. Compress media, reserve image space, keep forms short, make errors useful, preserve keyboard access and respect reduced-motion settings. The result is not merely faster; it feels more trustworthy.'] },
      { h: 'Design for the operating system behind the page', p: ['A form needs an owner, a response target and a destination. An audit needs a methodology. A subscription needs onboarding. Analytics needs decisions attached to events. The site becomes a growth asset only when its promises connect to an operating process after the click.'] },
    ],
  },
]

export const nav = [
  ['Services', '/services'], ['Pricing', '/pricing'], ['Free audit', '/audit'], ['Insights', '/insights'], ['Contact', '/contact'],
]

export const seoDefaults = {
  title: 'LG Growth Studio | AI Creative, SEO & Paid Growth',
  description: 'LG Growth Studio creates performance websites, AI video, SEO, paid media and local growth systems for ambitious businesses.',
}

export const capabilityIcons = [Megaphone, Globe2, Bot, FileSearch, Compass, BarChart3]
