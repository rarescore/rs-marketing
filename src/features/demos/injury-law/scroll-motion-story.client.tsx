"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { ScrollFrameSequence, type ScrollFrameSequenceHandle } from "./scroll-frame-sequence.client";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  sequence: string;
  frameCount: number;
  eyebrow: string;
  heading: string;
  copy: string;
  label: string;
  tone?: "violet" | "ink";
};

export function ScrollMotionStory({ sequence, frameCount, eyebrow, heading, copy, label, tone = "violet" }: Props) {
  const root = useRef<HTMLElement>(null);
  const frames = useRef<ScrollFrameSequenceHandle>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!root.current) return;
    if (reduced) {
      frames.current?.seek(0.55);
      return;
    }
    const playhead = { progress: 0 };
    const tween = gsap.to(playhead, {
      progress: 1,
      ease: "none",
      onUpdate: () => frames.current?.seek(playhead.progress),
      scrollTrigger: {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.35,
      },
    });
    return () => tween.scrollTrigger?.kill();
  }, { scope: root, dependencies: [reduced] });

  return <section ref={root} className={`il-scroll-story il-scroll-story--${tone}`} aria-label={label}>
    <div className="il-scroll-story__sticky">
      <ScrollFrameSequence ref={frames} sequence={sequence} frameCount={frameCount} label={label} />
      <div className="il-scroll-story__shade" aria-hidden="true" />
      <div className="il-shell il-scroll-story__copy">
        <p className="il-eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{copy}</p>
      </div>
    </div>
  </section>;
}
