"use client";

import type { CanvasProps } from "@react-three/fiber";
import { CanvasShell } from "./canvas-shell";

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
    <CanvasShell className={className} fallback={fallback} {...props}>
      {children}
    </CanvasShell>
  );
}
