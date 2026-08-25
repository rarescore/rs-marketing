"use client";

import Link from "next/link";
import { useSystemLens } from "@/features/system-lens/system-lens-store";
import { industryHubItems } from "./hub/industry-hub.data";
import type { IndustrySlug } from "./hero/hero-scroll-store";

export function ShowroomControl({
  current,
  systemLensEnabled = false,
  getThisSystemHref,
}: {
  current: IndustrySlug;
  systemLensEnabled?: boolean;
  getThisSystemHref?: string;
}) {
  const lensOpen = useSystemLens((state) => state.openScope === current);
  const toggleLens = useSystemLens((state) => state.toggle);

  return (
    <details className="showroom-control">
      <summary aria-label="Open showroom controls">
        <span className="showroom-control__mark" aria-hidden="true"><i /><i /><i /></span>
        <span>Exit / Switch</span>
      </summary>
      <div className="showroom-control__panel">
        <p>Three Doors</p>
        <nav aria-label="Showroom navigation">
          <Link href="/#onlev">
            <span>Back to ONLEV</span><b aria-hidden="true">↖</b>
          </Link>
          <Link href={`/?industry=${current}#three-doors`} transitionTypes={["portal-back"]}>
            <span>Three Doors</span><b aria-hidden="true">←</b>
          </Link>
          {industryHubItems.map((item) => (
            <Link
              key={item.slug}
              href={item.route}
              aria-current={item.slug === current ? "page" : undefined}
              transitionTypes={item.slug === current ? undefined : ["portal-forward"]}
            >
              <span>{item.shortName}</span><b aria-hidden="true">{item.number}</b>
            </Link>
          ))}
        </nav>
        <div className="showroom-control__future" aria-label="Showroom product controls">
          {systemLensEnabled ? (
            <button type="button" data-lens-toggle aria-pressed={lensOpen} onClick={() => toggleLens(current)}>
              {lensOpen ? "Close System Lens" : "System Lens"}
            </button>
          ) : <span aria-disabled="true">System Lens</span>}
          {getThisSystemHref ? <Link href={getThisSystemHref}>Get this system</Link> : <span aria-disabled="true">Get this system</span>}
        </div>
      </div>
    </details>
  );
}
