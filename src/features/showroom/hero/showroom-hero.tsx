import { HeroExperience } from "./hero-experience.client";
import { IndustryHub } from "../hub/industry-hub.client";
import { OnlevLogo } from "@/features/onlev/brand/onlev-logo";

export function ShowroomHero() {
  return (
    <section className="hero hero--final" aria-labelledby="industry-hub-title">
      <div className="hero__sticky">
        <HeroExperience />

        <header className="hero__header" aria-label="ONLEV final showroom">
          <a className="hero__brand" href="#onlev-opening-title" aria-label="ONLEV, back to opening">
            <OnlevLogo inverse />
          </a>
          <p>Final chamber / choose a live system</p>
        </header>

        <div className="hero__reveal">
          <IndustryHub />
        </div>

        <div className="hero__chapter" aria-hidden="true">
          <span>03</span>
          <i />
          <span>Choose</span>
        </div>
      </div>
      <div id="three-doors" className="hero__handoff" aria-hidden="true" />
    </section>
  );
}
