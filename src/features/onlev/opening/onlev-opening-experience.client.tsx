"use client";

import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap.client";
import { useOpeningMotion } from "./onlev-opening-store";

const OnlevMechanismScene = dynamic(
  () => import("./onlev-mechanism-scene.client").then((module) => module.OnlevMechanismScene),
  { ssr: false, loading: () => null },
);

class OpeningSceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function canRunOpeningScene() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 48rem)").matches) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function OnlevOpeningExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const setProgress = useOpeningMotion((state) => state.setProgress);
  const onFailure = useCallback(() => setSceneFailed(true), []);
  const onReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(min-width: 48rem)");
    const sync = () => {
      setReducedMotion(reduced.matches);
      setSceneEnabled(canRunOpeningScene());
    };
    sync();
    reduced.addEventListener("change", sync);
    width.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      width.removeEventListener("change", sync);
    };
  }, []);

  useGSAP(() => {
    if (reducedMotion) {
      setProgress(1);
      gsap.set(".onlev-opening__copy", { opacity: 1, y: 0 });
      return;
    }
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".onlev-opening",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.75,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
        onRefresh: (self) => setProgress(self.progress),
      },
    });
    timeline
      .fromTo(".onlev-opening__copy", { y: 0, opacity: 1 }, { y: -18, opacity: 0.93, duration: 0.2 }, 0.06)
      .to(".onlev-opening__copy", { y: -44, opacity: 0, duration: 0.18 }, 0.72)
      .to(".onlev-opening__index i:first-of-type", { scaleX: 1, duration: 0.42 }, 0.12)
      .to(".onlev-opening__index i:last-of-type", { scaleX: 1, duration: 0.38 }, 0.5);
    return () => setProgress(0);
  }, { dependencies: [reducedMotion, setProgress] });

  return (
    <div
      ref={root}
      className="onlev-opening__experience"
      data-scene={sceneEnabled && sceneReady && !sceneFailed ? "ready" : "fallback"}
      aria-hidden="true"
    >
      <OpeningPoster />
      {sceneEnabled && !sceneFailed ? (
        <OpeningSceneBoundary onError={onFailure}>
          <OnlevMechanismScene onFailure={onFailure} onReady={onReady} />
        </OpeningSceneBoundary>
      ) : null}
      <div className="onlev-opening__wash" />
      <div className="onlev-opening__grain" />
    </div>
  );
}

function OpeningPoster() {
  return (
    <div className="onlev-opening__poster">
      <div className="onlev-opening__poster-frame onlev-opening__poster-frame--a" />
      <div className="onlev-opening__poster-frame onlev-opening__poster-frame--b" />
      <div className="onlev-opening__poster-frame onlev-opening__poster-frame--c" />
      <div className="onlev-opening__poster-signal"><i /><i /><i /><span /></div>
      <div className="onlev-opening__poster-mark"><i /><i /><b /></div>
    </div>
  );
}
