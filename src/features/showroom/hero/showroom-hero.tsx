import { HeroExperience } from "./hero-experience.client";
import { IndustryHub } from "../hub/industry-hub.client";
import { OnlevLogo } from "@/features/onlev/brand/onlev-logo";

export function ShowroomHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__sticky">
        <HeroExperience />

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
            <a className="hero__cta" href="#three-doors">
              <span>See your industry system</span>
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="M4 10h11M11 6l4 4-4 4" />
              </svg>
            </a>
            <p>Strategy · Website · Tools · Lead flow</p>
          </div>
        </div>

        <div className="hero__reveal">
          <IndustryHub />
        </div>

        <div className="hero__scroll-cue" aria-hidden="true">
          <span>Enter the showroom</span>
          <i />
        </div>

        <div className="hero__chapter" aria-hidden="true">
          <span>01</span>
          <i />
          <span>03</span>
        </div>
      </div>
      <div id="three-doors" className="hero__handoff" aria-hidden="true" />
    </section>
  );
}
