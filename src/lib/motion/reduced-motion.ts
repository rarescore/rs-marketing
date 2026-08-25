"use client";

import { useEffect, useState } from "react";

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches;
}

export function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
