"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import { ScrollScene } from "@/components/motion/scroll-scene";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { useReducedMotionPreference } from "@/lib/motion/reduced-motion";
import { MotionLabFallback } from "./motion-lab-fallback";
import { useMotionLabStore } from "./motion-lab-store";
import styles from "./motion-lab.module.css";

const MotionLabScene = dynamic(() => import("./motion-lab-scene.client"), {
  ssr: false,
  loading: () => <MotionLabFallback />,
});

const stages = [
  { index: "01", title: "Establish", note: "Three spatial planes enter the frame." },
  { index: "02", title: "Cross", note: "The near pier occludes the instrument." },
  { index: "03", title: "Align", note: "Truck, dolly, and yaw resolve the axis." },
  { index: "04", title: "Resolve", note: "The camera settles inside the architecture." },
] as const;

function LabHud({ reduced }: { reduced: boolean }) {
  const progress = useMotionLabStore((state) => state.progress);
  const stage = useMotionLabStore((state) => state.stage);
  const fps = useMotionLabStore((state) => state.fps);
  const active = reduced ? stages[3] : stages[stage] ?? stages[0];
  const shownProgress = reduced ? 1 : progress;

  return (
    <div className={styles.hud}>
      <div className={styles.labId}>
        <span>ONLEV / INTERNAL</span>
        <span>Spatial study 01</span>
      </div>

      <h1 className={styles.title}>
        Camera travel,
        <br />
        proven in space.
      </h1>

      <div className={styles.stage} aria-live="polite" aria-atomic="true">
        <p className={styles.stageIndex}>Stage {active.index} / 04</p>
        <p className={styles.stageTitle}>{active.title}</p>
        <p className={styles.stageNote}>{active.note}</p>
      </div>

      <div className={styles.depthLegend} aria-hidden="true">
        <span>Near</span>
        <span>Middle</span>
        <span>Far</span>
      </div>

      {process.env.NODE_ENV !== "production" ? (
        <output className={styles.debug} aria-label="Motion lab development readout">
          <span>Progress {shownProgress.toFixed(3)}</span>
          <span>{fps > 0 && !reduced ? `${fps} FPS` : reduced ? "Static" : "Sampling"}</span>
        </output>
      ) : null}

      <div className={styles.progressTrack} aria-hidden="true">
        <span style={{ transform: `scaleX(${shownProgress})` }} />
      </div>

      <p className={styles.instruction}>
        {reduced ? "Final composition — motion preference respected" : "Scroll to move the camera · Reverse to retrace"}
      </p>
    </div>
  );
}

export function MotionLabExperience() {
  const reducedMotion = useReducedMotionPreference();
  const setProgress = useMotionLabStore.getState().setProgress;
  const updateProgress = useCallback((progress: number) => setProgress(progress), [setProgress]);

  useEffect(() => () => useMotionLabStore.getState().reset(), []);

  return (
    <SmoothScrollProvider enabled={!reducedMotion}>
      <main className={styles.page}>
        <ScrollScene
          className={styles.scrollScene}
          stageClassName={styles.pinnedStage}
          enabled={!reducedMotion}
          end="+=600%"
          onProgress={updateProgress}
        >
          <div className={styles.world} aria-hidden="true">
            {reducedMotion ? <MotionLabFallback /> : <MotionLabScene />}
          </div>
          <LabHud reduced={reducedMotion} />
        </ScrollScene>
      </main>
    </SmoothScrollProvider>
  );
}
