"use client";

import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/motion/gsap.client";
import { useHeroScroll } from "./hero-scroll-store";

const ThreeDoorsScene = dynamic(
  () =>
    import("./three-doors-scene.client").then(
      (module) => module.ThreeDoorsScene,
    ),
  { ssr: false, loading: () => null },
);

interface SceneBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

class SceneBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canRunCinematicLayer() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 48rem)").matches) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeIndustry = useHeroScroll((state) => state.activeIndustry);
  const setProgress = useHeroScroll((state) => state.setProgress);
  const handleSceneFailure = useCallback(() => setSceneFailed(true), []);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wideViewport = window.matchMedia("(min-width: 48rem)");
    const updateCapability = () => {
      setReducedMotion(reducedMotion.matches);
      setSceneEnabled(canRunCinematicLayer());
    };

    updateCapability();
    reducedMotion.addEventListener("change", updateCapability);
    wideViewport.addEventListener("change", updateCapability);

    return () => {
      reducedMotion.removeEventListener("change", updateCapability);
      wideViewport.removeEventListener("change", updateCapability);
    };
  }, []);

  useEffect(() => {
    let hubVisible = false;
    const syncHubState = (state: ReturnType<typeof useHeroScroll.getState>) => {
      const nextHubVisible = state.progress >= 0.2;
      if (hubVisible === nextHubVisible) return;
      hubVisible = nextHubVisible;
      root.current?.toggleAttribute("data-hub", nextHubVisible);
    };
    syncHubState(useHeroScroll.getState());
    return useHeroScroll.subscribe(syncHubState);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) {
        setProgress(1);
        gsap.set(".hero__reveal", { autoAlpha: 1, pointerEvents: "auto" });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
          onRefresh: (self) => setProgress(self.progress),
        },
      });

      timeline
        .fromTo(
          ".hero__reveal",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.16 },
          0.18,
        )
        .set(".hero__reveal", { pointerEvents: "auto" }, 0.22)
        .fromTo(
          ".industry-hub__heading",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.18 },
          0.2,
        )
        .fromTo(
          ".industry-hub__portal-link",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.16, stagger: 0.025 },
          0.29,
        )
        .fromTo(
          ".industry-hub__preview",
          { x: 12, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.18 },
          0.34,
        )
        .to(".hero__chapter i", { scaleX: 1, duration: 0.82 }, 0.08)
        .to(".hero__header p", { opacity: 0.56, duration: 0.2 }, 0.42);

      return () => setProgress(0);
    },
    { dependencies: [reducedMotion, setProgress] },
  );

  return (
    <div
      ref={root}
      className="hero__experience"
      data-scene={
        sceneEnabled && sceneReady && !sceneFailed ? "ready" : "fallback"
      }
      data-active={activeIndustry}
      aria-hidden="true"
    >
      <ArchitecturalFallback />
      {sceneEnabled && !sceneFailed ? (
        <SceneBoundary onError={handleSceneFailure}>
          <ThreeDoorsScene onFailure={handleSceneFailure} onReady={handleSceneReady} />
        </SceneBoundary>
      ) : null}
      <div className="hero__atmosphere" />
      <div className="hero__grain" />
    </div>
  );
}

function ArchitecturalFallback() {
  return (
    <div className="hero__poster">
      <div className="hero__ceiling" />
      <div className="hero__floor" />
      <div className="hero__portal hero__portal--estate">
        <div className="hero__portal-light" />
        <div className="hero__portal-world"><i /><i /><i /></div>
        <div className="hero__door-leaf"><span /></div>
      </div>
      <div className="hero__portal hero__portal--service">
        <div className="hero__portal-light" />
        <div className="hero__portal-world"><i /><i /><i /></div>
        <div className="hero__door-leaf"><span /></div>
      </div>
      <div className="hero__portal hero__portal--law">
        <div className="hero__portal-light" />
        <div className="hero__portal-world"><i /><i /><i /></div>
        <div className="hero__door-leaf"><span /></div>
      </div>
    </div>
  );
}
