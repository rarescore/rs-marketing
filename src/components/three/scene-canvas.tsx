"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense } from "react";
import { cn } from "@/lib/cn";

interface SceneCanvasProps extends Omit<CanvasProps, "children"> {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}

export function SceneCanvas({
  children,
  className,
  fallback = null,
  ...props
}: SceneCanvasProps) {
  return (
    <div className={cn("relative isolate size-full overflow-hidden", className)}>
      <Canvas
        dpr={[1, 2]}
        frameloop="demand"
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        fallback={fallback}
        {...props}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
