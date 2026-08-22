import Link from "next/link";
import { OnlevLogo } from "../brand/onlev-logo";
import { ContactForm } from "../site/contact-form.client";
import { OnlevFooter } from "../site/onlev-footer";
import { OnlevHeader } from "../site/onlev-header.client";
import { MarketingMotion } from "../site/marketing-motion.client";

const systemLayers = [
  { name: "Positioning", detail: "A clear reason to choose you, expressed in language your market understands." },
  { name: "Experience", detail: "A responsive site designed around the decisions customers are already trying to make." },
  { name: "Useful tools", detail: "Interactive guidance that earns attention by helping before it asks." },
  { name: "Qualification", detail: "Context-aware forms that collect the right signal without creating friction." },
  { name: "Response", detail: "Routing and follow-up logic designed to make the next human action obvious." },
  { name: "Attribution", detail: "A traceable path from search and campaign to call, form, booking, and outcome." },
  { name: "Iteration", detail: "A measured system that can improve once real customer behavior is visible." },
];

const demos = [
  {
    slug: "estate",
    number: "01",
    label: "Real Estate",
    brand: "Atelier North",
    proof: "Property discovery, decision tools, tour planning, and a context-rich advisor handoff.",
    interaction: "Move Strategy Studio",
  },
  {
    slug: "service",
    number: "02",
    label: "Home Services",
    brand: "Field Standard",
    proof: "Emergency clarity, service triage, homeowner records, and prepared service requests.",
    interaction: "Whole-Home Plumbing Passport",
  },
  {
    slug: "law",
    number: "03",
    label: "Injury Law",
    brand: "Morrow & Vale",
    proof: "Trauma-aware guidance, evidence planning, and a calm path to human legal review.",
    interaction: "Incident & Impact Review",
  },
];

export function OnlevMarketing() {
  return (
    <div className="onlev-marketing" id="onlev">
      <MarketingMotion />
      <OnlevHeader />

      <section className="onlev-bridge" aria-labelledby="onlev-bridge-title">
        <div className="onlev-bridge__identity" data-onlev-reveal>
          <OnlevLogo compact inverse />
          <p>ONLEV / onlev.site</p>
        </div>
        <div className="onlev-bridge__statement" data-onlev-reveal>
          <p className="onlev-kicker">The visible layer is only the beginning</p>
          <h2 id="onlev-bridge-title">The website is the visible layer. <em>The system wins the response.</em></h2>
          <p>ONLEV builds complete client-winning digital systems for businesses whose next customer is already searching.</p>
        </div>
        <div className="onlev-signal" aria-hidden="true">
          <div className="onlev-signal__frame"><span>Intent</span><i /><span>Response</span></div>
          <div className="onlev-signal__beam" />
          <div className="onlev-signal__core"><OnlevLogo compact inverse /></div>
        </div>
      </section>

      <section className="onlev-proof" id="proof" aria-labelledby="onlev-proof-title">
        <div className="onlev-section-heading" data-onlev-reveal>
          <p className="onlev-kicker">Three systems. Working proof.</p>
          <h2 id="onlev-proof-title">Don’t take our word for it. Use the work.</h2>
          <p>Each demo is a complete, independently art-directed customer journey—not a screenshot, template, or concept reel.</p>
        </div>
        <div className="onlev-proof__list">
          {demos.map((demo) => (
            <article className={`onlev-proof-card onlev-proof-card--${demo.slug}`} key={demo.slug} data-onlev-reveal>
              <div className="onlev-proof-card__top">
                <span>{demo.number}</span><p>{demo.label}</p><small>Live system</small>
              </div>
              <div className="onlev-proof-card__stage" aria-hidden="true">
                <div className="onlev-proof-card__window">
                  <i /><i /><i />
                  <div><span /><span /><span /></div>
                </div>
                <span className="onlev-proof-card__tool">{demo.interaction}</span>
              </div>
              <div className="onlev-proof-card__body">
                <div><p className="onlev-proof-card__brand">{demo.brand}</p><h3>{demo.proof}</h3></div>
                <div className="onlev-proof-card__actions">
                  <a href="#three-doors">Choose this industry in the final showroom <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="onlev-proof__more"><Link href="/work">See how the three systems differ <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="onlev-blueprint" id="systems" aria-labelledby="onlev-blueprint-title">
        <div className="onlev-blueprint__intro" data-onlev-reveal>
          <p className="onlev-kicker">What ONLEV builds</p>
          <h2 id="onlev-blueprint-title">One connected acquisition system. Seven deliberate layers.</h2>
          <p>A polished page can make an impression. A connected system can capture intent, preserve context, prompt the right response, and show what created the opportunity.</p>
          <Link className="onlev-text-link" href="/systems">Explore the complete system <span aria-hidden="true">→</span></Link>
        </div>
        <ol className="onlev-blueprint__layers">
          {systemLayers.map((layer, index) => (
            <li key={layer.name} data-onlev-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{layer.name}</h3>
              <p>{layer.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="onlev-flow" aria-labelledby="onlev-flow-title">
        <div className="onlev-section-heading onlev-section-heading--light" data-onlev-reveal>
          <p className="onlev-kicker">What happens underneath</p>
          <h2 id="onlev-flow-title">A customer raises their hand. The system keeps the context.</h2>
        </div>
        <div className="onlev-flow__track" data-onlev-line aria-label="Example customer-to-business flow">
          <div><span>01</span><strong>Search intent</strong><p>Source and entry context</p></div>
          <div><span>02</span><strong>Useful interaction</strong><p>Need and readiness signal</p></div>
          <div><span>03</span><strong>Qualified request</strong><p>Consent and routing context</p></div>
          <div><span>04</span><strong>Human follow-up</strong><p>Clear next action</p></div>
          <div><span>05</span><strong>Attribution</strong><p>Outcome connected to source</p></div>
        </div>
        <div className="onlev-flow__notes">
          <p data-onlev-reveal><span>Automation is support, not theater.</span> We design reminders, routing, acknowledgements, and handoffs around the way your team can genuinely respond.</p>
          <p data-onlev-reveal><span>Your infrastructure stays legible.</span> Production integrations, data retention, permissions, and ownership are documented—not hidden behind a black box.</p>
        </div>
      </section>

      <section className="onlev-process" id="process" aria-labelledby="onlev-process-title">
        <div className="onlev-process__heading" data-onlev-reveal>
          <p className="onlev-kicker">How the engagement works</p>
          <h2 id="onlev-process-title">We start with how the business wins—not what the homepage should look like.</h2>
        </div>
        <div className="onlev-process__steps">
          <article data-onlev-reveal><span>01 / Understand</span><h3>Map the real decision journey.</h3><p>Offer, market, customer questions, lead quality, response capacity, tools, proof, and operational constraints.</p></article>
          <article data-onlev-reveal><span>02 / Design</span><h3>Author the system and its world.</h3><p>Positioning, brand direction, information architecture, conversion language, tool logic, interface, and motion.</p></article>
          <article data-onlev-reveal><span>03 / Build</span><h3>Connect experience to response.</h3><p>Responsive implementation, forms, qualification, integrations, analytics, accessibility, performance, and QA.</p></article>
          <article data-onlev-reveal><span>04 / Improve</span><h3>Measure the path, not vanity.</h3><p>Once real behavior exists, refine the points that affect qualified requests and the team’s ability to act on them.</p></article>
        </div>
        <Link className="onlev-text-link" href="/process">See the full engagement <span aria-hidden="true">→</span></Link>
      </section>

      <section className="onlev-investment" id="investment" aria-labelledby="onlev-investment-title">
        <div className="onlev-investment__lead" data-onlev-reveal>
          <p className="onlev-kicker">Investment</p>
          <h2 id="onlev-investment-title">This is a custom business system—not a package of pages.</h2>
          <p>Every engagement is scoped after a fit conversation because the useful work changes with the industry, tools, integrations, content, territory, and response operation.</p>
          <Link className="onlev-button" href="/contact">Request a scope conversation <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="onlev-investment__spec" data-onlev-reveal>
          <div><span>Engagement model</span><strong>Custom, fixed scope after discovery</strong></div>
          <div><span>Built for</span><strong>Established, lead-driven local businesses</strong></div>
          <div><span>Usually includes</span><strong>Strategy, design, build, tools, lead flow, integrations, and launch QA</strong></div>
          <div><span>Scope changes with</span><strong>Content, data, tools, locations, integrations, compliance, and production media</strong></div>
          <p>We do not publish a fictional “starting at” number before confirming what the business actually needs. The walkthrough ends with a clear recommendation and, when there is a fit, a defined scope and investment.</p>
        </div>
      </section>

      <section className="onlev-fit" aria-labelledby="onlev-fit-title">
        <div data-onlev-reveal><p className="onlev-kicker">A strong fit</p><h2 id="onlev-fit-title">You are serious about the moment a prospect decides who to call.</h2></div>
        <div className="onlev-fit__columns">
          <div data-onlev-reveal><h3>ONLEV is built for you when…</h3><ul><li>Qualified leads materially affect the business.</li><li>Your current site cannot explain the difference in your service.</li><li>Your team can support a deliberate response process.</li><li>You want useful customer tools, not feature theater.</li><li>You are ready to treat digital as operating infrastructure.</li></ul></div>
          <div data-onlev-reveal><h3>It is probably not the right fit when…</h3><ul><li>You only need a few pages put online quickly.</li><li>Lowest upfront cost is the primary decision.</li><li>There is no owner for lead response or follow-up.</li><li>You want invented proof, guarantees, or manipulative urgency.</li><li>You are looking for an off-the-shelf template license.</li></ul></div>
        </div>
      </section>

      <section className="onlev-request" id="request" aria-labelledby="onlev-request-title">
        <div className="onlev-request__intro" data-onlev-reveal>
          <p className="onlev-kicker">Request this system</p>
          <h2 id="onlev-request-title">Show us how your business gets chosen.</h2>
          <p>We’ll review the current path, identify the strongest opportunity, and prepare a personalized walkthrough. No generic sales deck.</p>
          <dl><div><dt>First step</dt><dd>A focused fit conversation</dd></div><div><dt>What to bring</dt><dd>Your offer, market, current site, and biggest lead-flow constraint</dd></div><div><dt>What you get</dt><dd>A clear recommendation on whether a custom system makes sense</dd></div></dl>
        </div>
        <ContactForm compact />
      </section>

      <OnlevFooter />
    </div>
  );
}
