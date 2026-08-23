import Link from "next/link";
import { OnlevLogo } from "../brand/onlev-logo";

const demoLinks = [
  ["Real Estate", "/showroom/real-estate"],
  ["Home Services", "/showroom/plumbing"],
  ["Injury Law", "/showroom/injury-law"],
] as const;

export function OnlevFooter() {
  return (
    <footer className="onlev-footer">
      <div className="onlev-footer__lead">
        <OnlevLogo inverse />
        <p>Client-winning digital systems, designed around how local businesses actually get chosen.</p>
        <Link href="/contact">Request a personalized walkthrough <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="onlev-footer__grid">
        <div>
          <p className="onlev-footer__label">Explore</p>
          <Link href="/systems">What we build</Link>
          <Link href="/process">How it works</Link>
          <Link href="/work">Live systems</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <p className="onlev-footer__label">Showroom</p>
          {demoLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div>
          <p className="onlev-footer__label">Company</p>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
          <a href="mailto:hello@onlev.site">hello@onlev.site</a>
        </div>
      </div>
      <div className="onlev-footer__bottom">
        <p>© {new Date().getFullYear()} ONLEV. onlev.site</p>
        <p>Designed for clarity. Built for response.</p>
      </div>
    </footer>
  );
}
