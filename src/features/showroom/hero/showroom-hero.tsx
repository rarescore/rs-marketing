import { HeroExperience } from "./hero-experience.client";
import { IndustryHub } from "../hub/industry-hub.client";
import { OnlevLogo } from "@/features/onlev/brand/onlev-logo";
import { OnlevOpeningExperience } from "./onlev-opening-experience.client";

export function OnlevOpening() {
  return (
    <section className="onlev-opening" aria-labelledby="hero-title">
      <div className="onlev-opening__sticky">
        <OnlevOpeningExperience />

        <header className="hero__header" aria-label="ONLEV">
          <a className="hero__brand" href="#hero-title" aria-label="ONLEV, home">
            <OnlevLogo inverse />
          </a>
          <p>onlev.site / Client-acquisition systems</p>
        </header>

        <div className="onlev-opening__beats">
          <div className="hero__opening" data-opening-beat="opening">
            <p className="hero__kicker">Built for the moment of decision</p>
            <h1 id="hero-title">When someone needs you, your website has one job.</h1>
            <p className="hero__support">Turn the moment they search into the moment they choose you.</p>
            <div className="hero__actions">
              <a className="hero__cta" href="#onlev">
                <span>See what ONLEV builds</span>
                <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
              </a>
              <p>Strategy · Website · Tools · Lead flow</p>
            </div>
          </div>
          <div className="onlev-opening__beat onlev-opening__beat--system" data-opening-beat="system">
            <p className="hero__kicker">Seven connected layers</p>
            <h2>Not pages assembled. A system engineered to respond.</h2>
            <p>Positioning, experience, useful tools, qualification, response, attribution, and iteration—designed as one operation.</p>
          </div>
          <div className="onlev-opening__beat onlev-opening__beat--final" data-opening-beat="final">
            <p className="hero__kicker">ONLEV / Client-winning systems</p>
            <h2>The visible layer is only the beginning.</h2>
            <p>Continue into the architecture behind the experience.</p>
          </div>
        </div>

        <div className="onlev-opening__chapter onlev-opening__progress" aria-hidden="true">
          <span>ONLEV / 01</span><b><i /></b><span>Scroll to assemble</span>
        </div>
      </div>
    </section>
  );
}

export function ShowroomCoda() {
  return (
    <section className="showroom-coda" aria-labelledby="showroom-coda-title">
      <p className="hero__kicker">Your business does not fit a template</p>
      <h2 id="showroom-coda-title">The three doors prove the system. Yours is built around the way you win work.</h2>
      <div>
        <a className="hero__cta" href="/contact"><span>Request your walkthrough</span><span aria-hidden="true">↗</span></a>
        <a href="#hero-title">Return to ONLEV <span aria-hidden="true">↑</span></a>
      </div>
    </section>
  );
}

export function ShowroomHero() {
  return (
    <section id="three-doors" className="hero hero--hub" aria-labelledby="industry-hub-title">
      <div className="hero__sticky">
        <HeroExperience mode="hub" />

        <header className="hero__header" aria-label="ONLEV showroom">
          <a className="hero__brand" href="#hero-title" aria-label="Back to ONLEV opening">
            <OnlevLogo inverse />
          </a>
          <p>Final chapter / Choose your industry</p>
        </header>

        <div className="hero__reveal">
          <IndustryHub />
        </div>
      </div>
    </section>
  );
}
