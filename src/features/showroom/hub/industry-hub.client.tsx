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
        <p className="hero__kicker">One standard. Three purpose-built worlds.</p>
        <h2 id="industry-hub-title">Choose the door your clients walk through.</h2>
      </div>

      <div className="industry-hub__selectors" role="tablist" aria-label="Industry systems">
        {industryHubItems.map((item) => {
          const selected = item.slug === activeIndustry;
          return (
            <ViewTransition
              key={item.slug}
              name={`portal-${item.slug}`}
              share="portal-morph"
              default="none"
            >
              <button
                type="button"
                role="tab"
                id={`industry-tab-${item.slug}`}
                aria-selected={selected}
                aria-controls="industry-preview"
                tabIndex={selected ? 0 : -1}
                onClick={() => selectIndustry(item.slug)}
                onFocus={() => selectIndustry(item.slug)}
                onMouseEnter={() => selectIndustry(item.slug)}
                onKeyDown={(event) => {
                  const currentIndex = industryHubItems.findIndex(
                    (candidate) => candidate.slug === item.slug,
                  );
                  const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
                  if (!delta) return;
                  event.preventDefault();
                  const nextIndex =
                    (currentIndex + delta + industryHubItems.length) %
                    industryHubItems.length;
                  const next = industryHubItems[nextIndex]!;
                  setActiveIndustry(next.slug);
                  document.getElementById(`industry-tab-${next.slug}`)?.focus();
                }}
              >
                <span>{item.number}</span>
                <strong>{item.shortName}</strong>
                <small>{item.tool}</small>
              </button>
            </ViewTransition>
          );
        })}
      </div>

      <div
        id="industry-preview"
        className="industry-hub__preview"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`industry-tab-${active.slug}`}
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
            <Link
              className="industry-hub__enter"
              href={active.route}
              transitionTypes={["portal-forward"]}
              onMouseEnter={() => router.prefetch(active.route)}
              onFocus={() => router.prefetch(active.route)}
              onClick={(event) => enterIndustry(event, active)}
            >
              <span>Enter the {active.shortName} demo</span>
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="M4 10h11M11 6l4 4-4 4" />
              </svg>
            </Link>
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
