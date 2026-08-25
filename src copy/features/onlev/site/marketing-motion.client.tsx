"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap.client";

export function MarketingMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-onlev-reveal]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-onlev-line]").forEach((line) => {
        gsap.fromTo(line, { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.15,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: line, start: "top 84%", once: true },
        });
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  });

  return null;
}
