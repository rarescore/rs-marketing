"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  ViewTransition,
  type MouseEvent,
} from "react";
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
  const setTransitionIndustry = useHeroScroll(
    (state) => state.setTransitionIndustry,
  );
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
    }, 560);
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
        <p className="hero__kicker">You have seen the system. Now enter the work.</p>
        <h2 id="industry-hub-title">Choose your industry.</h2>
      </div>

      <nav className="industry-hub__doors" aria-label="Choose an industry website">
        {industryHubItems.map((item) => {
          const selected = item.slug === activeIndustry;
          return (
            <ViewTransition
              key={item.slug}
              name={`portal-${item.slug}`}
              share="portal-morph"
              default="none"
            >
              <Link
                className={`industry-hub__door industry-hub__door--${item.slug}`}
                href={item.route}
                aria-label={`Enter ${item.name}`}
                aria-current={selected ? "true" : undefined}
                transitionTypes={["portal-forward"]}
                onPointerEnter={() => {
                  selectIndustry(item.slug);
                  router.prefetch(item.route);
                }}
                onFocus={() => {
                  selectIndustry(item.slug);
                  router.prefetch(item.route);
                }}
                onClick={(event) => enterIndustry(event, item)}
              >
                <span className="industry-hub__door-number">{item.number}</span>
                <strong>{item.doorLabel}</strong>
                <span className="industry-hub__door-action">Enter <i aria-hidden="true">↗</i></span>
              </Link>
            </ViewTransition>
          );
        })}
      </nav>

      <div
        id="industry-preview"
        className="industry-hub__preview"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            className="industry-hub__preview-content"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.24 }}
          >
            <p className="industry-hub__preview-name">{active.name}</p>
            <dl className="industry-hub__journey">
              <div>
                <dt>Customer need</dt>
                <dd>{active.need}</dd>
              </div>
              <div>
                <dt>Useful interaction</dt>
                <dd>{active.tool}</dd>
              </div>
              <div>
                <dt>Business outcome</dt>
                <dd>{active.outcome}</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="industry-hub__status" aria-live="polite">
        {transitionIndustry
          ? `Entering ${getIndustryHubItem(transitionIndustry).name}`
          : `${active.name} selected`}
      </div>

      <div className="industry-hub__transition" aria-hidden="true">
        <span>{transitionIndustry ? getIndustryHubItem(transitionIndustry).name : active.name}</span>
      </div>
    </section>
  );
}
