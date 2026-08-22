import { OnlevLogo } from "@/features/onlev/brand/onlev-logo";
import { OnlevOpeningExperience } from "./onlev-opening-experience.client";

export function OnlevOpening() {
  return (
    <section className="onlev-opening" aria-labelledby="onlev-opening-title">
      <div className="onlev-opening__sticky">
        <OnlevOpeningExperience />

        <header className="onlev-opening__header" aria-label="ONLEV">
          <a className="onlev-opening__brand" href="#onlev-opening-title" aria-label="ONLEV, home">
            <OnlevLogo />
          </a>
          <p>onlev.site / Client-acquisition systems</p>
        </header>

        <div className="onlev-opening__copy">
          <p className="onlev-opening__kicker">Systems for the moment of decision</p>
          <h1 id="onlev-opening-title">When someone needs you, your website has one job.</h1>
          <p className="onlev-opening__support">
            Turn the moment they search into the moment they choose you.
          </p>
          <a className="onlev-opening__cta" href="#onlev-story">
            <span>See how the system works</span>
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M10 4v11M6 11l4 4 4-4" /></svg>
          </a>
        </div>

        <div className="onlev-opening__index" aria-hidden="true">
          <span>Signal</span><i /><span>System</span><i /><span>Response</span>
        </div>
      </div>
    </section>
  );
}
