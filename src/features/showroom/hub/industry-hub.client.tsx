"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useHeroScroll } from "@/features/showroom/hero/hero-scroll-store";
import { getIndustryHubItem, industryHubItems } from "./industry-hub.data";

export function IndustryHub() {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeIndustry = useHeroScroll((state) => state.activeIndustry);
  const transitionIndustry = useHeroScroll((state) => state.transitionIndustry);
  const setActiveIndustry = useHeroScroll((state) => state.setActiveIndustry);
  const setTransitionIndustry = useHeroScroll((state) => state.setTransitionIndustry);
  const active = getIndustryHubItem(activeIndustry);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("industry");
    if (industryHubItems.some((item) => item.slug === requested)) {
      setActiveIndustry(requested as typeof activeIndustry);
    }
  }, [setActiveIndustry]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      setTransitionIndustry(null);
    },
    [setTransitionIndustry],
  );

  const selectIndustry = (slug: typeof activeIndustry) => {
    if (!transitionIndustry) setActiveIndustry(slug);
  };

  const enterIndustry = (
    event: MouseEvent<HTMLAnchorElement>,
    item: typeof active,
  ) => {
    if (
      reducedMotion ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    if (transitionIndustry) return;
    setActiveIndustry(item.slug);
    setTransitionIndustry(item.slug);
    timer.current = setTimeout(() => {
      startTransition(() => {
        router.push(item.route, { transitionTypes: ["portal-forward"] });
      });
    }, 620);
  };

  return (
    <section
      className="industry-hub"
      aria-labelledby="industry-hub-title"
      aria-busy={Boolean(transitionIndustry)}
      data-active={activeIndustry}
      data-transitioning={transitionIndustry ?? undefined}
    >
      <div className="industry-hub__heading">
        <p className="hero__kicker">The final chamber</p>
        <h2 id="industry-hub-title">Choose the door your clients walk through.</h2>
        <p>Hover or focus a portal to inspect the system. Select the same portal to enter its complete live demo.</p>
      </div>

      <nav className="industry-hub__portals" aria-label="Choose an industry demo">
        {industryHubItems.map((item) => {
          const selected = item.slug === activeIndustry;
          return (
            <Link
              key={item.slug}
              className="industry-hub__portal-link"
              data-industry={item.slug}
              data-selected={selected ? "true" : undefined}
              href={item.route}
              aria-label={`Enter ${item.name} demo. ${item.tool}.`}
              transitionTypes={["portal-forward"]}
              onPointerEnter={() => {
                selectIndustry(item.slug);
                router.prefetch(item.route);
              }}
              onPointerDown={() => selectIndustry(item.slug)}
              onFocus={() => {
                selectIndustry(item.slug);
                router.prefetch(item.route);
              }}
              onClick={(event) => enterIndustry(event, item)}
            >
              <span className="industry-hub__portal-hit" aria-hidden="true" />
              <span className="industry-hub__portal-plaque">
                <small>{item.number}</small>
                <strong>{item.name}</strong>
                <span>{item.tool}</span>
                <i aria-hidden="true">↗</i>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="industry-hub__preview" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            className="industry-hub__preview-content"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.22 }}
          >
            <p className="industry-hub__preview-name">{active.name}</p>
            <dl className="industry-hub__journey">
              <div><dt>Customer need</dt><dd>{active.need}</dd></div>
              <div><dt>Business outcome</dt><dd>{active.outcome}</dd></div>
            </dl>
            <p className="industry-hub__enter-hint">Select the illuminated door to enter.</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="industry-hub__status" aria-live="polite">
        {transitionIndustry ? `Entering ${getIndustryHubItem(transitionIndustry).name}` : `${active.name} selected`}
      </div>

      <div className="industry-hub__transition" aria-hidden="true">
        <span>{transitionIndustry ? getIndustryHubItem(transitionIndustry).name : active.name}</span>
      </div>
    </section>
  );
}
