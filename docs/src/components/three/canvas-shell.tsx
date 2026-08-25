"use client";

import { Canvas, useThree, type CanvasProps } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";
import { useReducedMotionPreference } from "@/lib/motion/reduced-motion";
import { getQualityProfile, supportsWebGL } from "@/lib/three/quality";
import { CanvasErrorBoundary } from "./canvas-error-boundary";
import { QualityManager } from "./quality-manager";

function ContextLifecycle({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLoss = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", handleLoss);
    return () => canvas.removeEventListener("webglcontextlost", handleLoss);
  }, [gl, onFailure]);

  return null;
}

interface CanvasShellProps extends Omit<CanvasProps, "children" | "fallback"> {
  children: React.ReactNode;
  className?: string;
  fallback: React.ReactNode;
}

export function CanvasShell({
  children,
  className,
  fallback,
  ...props
}: CanvasShellProps) {
  const reducedMotion = useReducedMotionPreference();
  const [failed, setFailed] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(false);
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    const initialFrame = requestAnimationFrame(() => {
      setHasWebGL(supportsWebGL());
      update();
    });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("resize", update);
    };
  }, []);

  const profile = getQualityProfile(width);
  if (reducedMotion || failed || !hasWebGL) return fallback;

  return (
    <CanvasErrorBoundary fallback={fallback} onError={() => setFailed(true)}>
      <div className={cn("relative isolate size-full overflow-hidden", className)}>
        <Canvas
          dpr={[1, profile.dpr]}
          frameloop="demand"
          camera={{ position: [0, 1.4, 10], fov: 40, near: 0.05, far: 80 }}
          gl={{
            antialias: profile.quality !== "low",
            alpha: false,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          {...props}
        >
          <Suspense fallback={null}>
            <ContextLifecycle onFailure={() => setFailed(true)} />
            <QualityManager maximumDpr={profile.dpr} />
            {children}
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
