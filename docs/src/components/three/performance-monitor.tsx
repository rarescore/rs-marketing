"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function DevelopmentPerformanceMonitor({
  onSample,
}: {
  onSample?: (fps: number) => void;
}) {
  const elapsed = useRef(0);
  const frames = useRef(0);

  useFrame((_, delta) => {
    if (process.env.NODE_ENV === "production") return;
    elapsed.current += delta;
    frames.current += 1;
    if (elapsed.current < 1) return;
    onSample?.(Math.round(frames.current / elapsed.current));
    elapsed.current = 0;
    frames.current = 0;
  });

  return null;
}
