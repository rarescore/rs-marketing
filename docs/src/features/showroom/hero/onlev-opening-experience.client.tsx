"use client";

import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap.client";
import { useOnlevOpening } from "./onlev-opening-store";

const OnlevMonumentScene = dynamic(
  () => import("./onlev-monument-scene.client").then((module) => module.OnlevMonumentScene),
  { ssr: false, loading: () => null },
);

class MonumentBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function canRenderMonument() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const forceCinematic = new URLSearchParams(window.location.search).get("qa") === "cinematic";
  if (!forceCinematic && !window.matchMedia("(min-width: 48rem)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function OnlevOpeningExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const setProgress = useOnlevOpening((state) => state.setProgress);
  const markReady = useCallback(() => setReady(true), []);
  const markFailed = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.matchMedia("(min-width: 48rem)");
    const sync = () => {
      setReduced(motion.matches);
      setEnabled(canRenderMonument());
    };
    sync();
    motion.addEventListener("change", sync);
    viewport.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      viewport.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const resolveRootAnchor = () => {
      const id = window.location.hash.slice(1);
      if (!id || (id !== "three-doors" && id !== "showroom-coda-title" && id !== "onlev")) return;
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" }), 120);
    };
    resolveRootAnchor();
    window.addEventListener("hashchange", resolveRootAnchor);
    return () => window.removeEventListener("hashchange", resolveRootAnchor);
  }, []);

  useGSAP(() => {
    if (reduced) {
      setProgress(1);
      gsap.set("[data-opening-beat]", { autoAlpha: 0 });
      gsap.set('[data-opening-beat="final"]', { autoAlpha: 1 });
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".onlev-opening",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
        onRefresh: (self) => setProgress(self.progress),
      },
    });

    timeline
      .to('[data-opening-beat="opening"]', { autoAlpha: 0, y: -18, duration: 0.16 }, 0.18)
      .fromTo('[data-opening-beat="system"]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.32)
      .to('[data-opening-beat="system"]', { autoAlpha: 0, y: -14, duration: 0.12 }, 0.56)
      .fromTo('[data-opening-beat="final"]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.67)
      .to(".onlev-opening__progress i", { scaleX: 1, duration: 1 }, 0);

    return () => setProgress(0);
  }, { dependencies: [reduced, setProgress] });

  return (
    <div
      ref={root}
      className="onlev-opening__experience"
      data-scene={enabled && ready && !failed ? "ready" : "fallback"}
      aria-hidden="true"
    >
      <div className="onlev-opening__fallback">
        <div className="onlev-opening__fallback-frame" />
        <div className="onlev-opening__fallback-mark"><i /><i /><i /><i /><i /><i /></div>
        <div className="onlev-opening__fallback-beam" />
      </div>
      {enabled && !failed ? (
        <MonumentBoundary onError={markFailed}>
          <OnlevMonumentScene onReady={markReady} onFailure={markFailed} />
        </MonumentBoundary>
      ) : null}
      <div className="onlev-opening__vignette" />
      <div className="onlev-opening__grain" />
    </div>
  );
}
