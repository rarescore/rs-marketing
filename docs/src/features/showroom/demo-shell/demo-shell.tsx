import Link from "next/link";
import { ViewTransition } from "react";
import { ShowroomControl } from "@/features/showroom/showroom-control";
import { getIndustryHubItem } from "@/features/showroom/hub/industry-hub.data";
import type { IndustrySlug } from "@/features/showroom/hero/hero-scroll-store";

const phaseByIndustry: Record<IndustrySlug, string> = {
  "real-estate": "Phase 5",
  plumbing: "Phase 6",
  "injury-law": "Phase 7",
};

export function DemoShell({ industry }: { industry: IndustrySlug }) {
  const item = getIndustryHubItem(industry);
  const theme = industry === "plumbing" ? "plumbing" : industry;

  return (
    <main className="demo-shell" data-theme={theme} id="main-content">
      <ViewTransition
        name={`portal-${industry}`}
        share="portal-morph"
        default="none"
      >
        <section className="demo-shell__gateway" aria-labelledby="demo-shell-title">
          <div className="demo-shell__architecture" aria-hidden="true">
            <i /><i /><i /><i />
          </div>
          <header className="demo-shell__header">
            <Link href={`/?industry=${industry}#three-doors`} transitionTypes={["portal-back"]}>
              <span className="showroom-control__mark" aria-hidden="true"><i /><i /><i /></span>
              <span>Three Doors</span>
            </Link>
            <p>Demonstration route / {phaseByIndustry[industry]}</p>
          </header>
          <div className="demo-shell__content">
            <p className="demo-shell__eyebrow">{item.name} system</p>
            <h1 id="demo-shell-title">This is where the live experience opens.</h1>
            <p>
              The gateway and route are complete. The client-ready demo will be
              authored in {phaseByIndustry[industry]}; unfinished pages and tools have
              not been fabricated to fill this space.
            </p>
            <Link className="demo-shell__return" href={`/?industry=${industry}#three-doors`} transitionTypes={["portal-back"]}>
              Return to the Three Doors
            </Link>
          </div>
          <footer className="demo-shell__footer">
            <span>{item.tool}</span>
            <span>Live demo pending</span>
          </footer>
        </section>
      </ViewTransition>
      <ShowroomControl current={industry} />
    </main>
  );
}
