import Link from "next/link";
import { OnlevShell } from "@/features/onlev/site/onlev-shell";

export default function NotFound() {
  return (
    <OnlevShell>
      <section className="onlev-state-page" aria-labelledby="not-found-title">
        <div className="onlev-state-page__code" aria-hidden="true">404</div>
        <div>
          <p className="onlev-kicker">Outside the showroom map</p>
          <h1 id="not-found-title">This door does not lead anywhere.</h1>
          <p>The page may have moved, or the address may be incomplete. The showroom and the complete system demos are still available.</p>
          <div className="onlev-state-page__actions">
            <Link className="onlev-button onlev-button--dark" href="/">Return to ONLEV</Link>
            <Link href="/#three-doors">Open the Three Doors showroom</Link>
          </div>
        </div>
      </section>
    </OnlevShell>
  );
}
