"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function QualityManager({ maximumDpr = 1.6 }: { maximumDpr?: number }) {
  const setDpr = useThree((state) => state.setDpr);

  return (
    <PerformanceMonitor
      flipflops={2}
      onDecline={() => setDpr(1)}
      onIncline={() => setDpr(Math.min(maximumDpr, 1.5))}
    />
  );
}
