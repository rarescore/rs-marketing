"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap.client";
import { scrollMotion } from "@/lib/motion/motion-tokens";

interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  end?: string;
  onProgress: (progress: number) => void;
  stageClassName?: string;
}

export function ScrollScene({
  children,
  className,
  enabled = true,
  end = scrollMotion.labDistance,
  onProgress,
  stageClassName,
}: ScrollSceneProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    if (!enabled) {
      onProgress(1);
      return;
    }

    const context = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end,
        pin: stage,
        pinSpacing: true,
        scrub: scrollMotion.cinematicScrub,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => onProgress(self.progress),
        onRefresh: (self) => onProgress(self.progress),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => trigger.kill();
    }, root);

    return () => {
      context.revert();
      onProgress(0);
    };
  }, [enabled, end, onProgress]);

  return (
    <section ref={rootRef} className={className}>
      <div ref={stageRef} className={stageClassName}>
        {children}
      </div>
    </section>
  );
}
