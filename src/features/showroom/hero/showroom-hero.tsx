import { HeroExperience } from "./hero-experience.client";
import { IndustryHub } from "../hub/industry-hub.client";
import { OnlevLogo } from "@/features/onlev/brand/onlev-logo";

export function OnlevOpening() {
  return (
    <section className="onlev-opening" aria-labelledby="hero-title">
      <div className="onlev-opening__architecture" aria-hidden="true">
        <div className="onlev-opening__plane onlev-opening__plane--one" />
        <div className="onlev-opening__plane onlev-opening__plane--two" />
        <div className="onlev-opening__signal"><i /><i /><i /></div>
        <OnlevLogo compact inverse />
      </div>

      <header className="hero__header" aria-label="ONLEV">
        <a className="hero__brand" href="#hero-title" aria-label="ONLEV, home">
          <OnlevLogo inverse />
        </a>
        <p>onlev.site / Client-acquisition systems</p>
      </header>

      <div className="hero__opening">
        <p className="hero__kicker">Built for the moment of decision</p>
        <h1 id="hero-title">When someone needs you, your website has one job.</h1>
        <p className="hero__support">
          Turn the moment they search into the moment they choose you.
        </p>
        <div className="hero__actions">
          <a className="hero__cta" href="#onlev">
            <span>See what ONLEV builds</span>
            <svg aria-hidden="true" viewBox="0 0 20 20">
              <path d="M4 10h11M11 6l4 4-4 4" />
            </svg>
          </a>
          <p>Strategy · Website · Tools · Lead flow</p>
        </div>
      </div>

      <div className="onlev-opening__chapter" aria-hidden="true">
        <span>ONLEV / 01</span><i /><span>Scroll to enter</span>
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
