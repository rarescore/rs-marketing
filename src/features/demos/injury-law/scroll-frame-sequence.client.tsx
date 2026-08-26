"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

export type ScrollFrameSequenceHandle = { seek: (progress: number) => void };

type Props = {
  sequence: string;
  frameCount: number;
  label?: string;
  eager?: boolean;
  className?: string;
};

function frameSource(sequence: string, index: number) {
  return `/media/scroll/${sequence}/frame-${String(index).padStart(3, "0")}.webp`;
}

export const ScrollFrameSequence = forwardRef<ScrollFrameSequenceHandle, Props>(function ScrollFrameSequence({ sequence, frameCount, label, eager = false, className = "" }, forwardedRef) {
  const surface = useRef<HTMLImageElement>(null);
  const images = useRef<Array<HTMLImageElement | undefined>>([]);
  const desiredFrame = useRef(0);
  const paintFrame = useRef<number | null>(null);
  const started = useRef(false);

  const draw = useCallback(() => {
    paintFrame.current = null;
    const element = surface.current;
    if (!element) return;
    const preferred = desiredFrame.current;
    let image = images.current[preferred];
    if (!image?.complete) {
      image = images.current.reduce<HTMLImageElement | undefined>((nearest, candidate, index) => {
        if (!candidate?.complete) return nearest;
        if (!nearest) return candidate;
        const nearestIndex = images.current.indexOf(nearest);
        return Math.abs(index - preferred) < Math.abs(nearestIndex - preferred) ? candidate : nearest;
      }, undefined);
    }
    if (!image?.naturalWidth) return;
    if (element.src !== image.src) element.src = image.src;
  }, []);

  const scheduleDraw = useCallback(() => {
    if (paintFrame.current === null) paintFrame.current = requestAnimationFrame(draw);
  }, [draw]);

  const beginLoading = useCallback(() => {
    if (started.current) return;
    started.current = true;
    images.current = Array.from({ length: frameCount }, (_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.addEventListener("load", scheduleDraw, { once: true });
      image.src = frameSource(sequence, index);
      if (image.complete) scheduleDraw();
      return image;
    });
  }, [frameCount, scheduleDraw, sequence]);

  useImperativeHandle(forwardedRef, () => ({
    seek(progress) {
      const nextFrame = Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
      desiredFrame.current = nextFrame;
      const element = surface.current;
      const nextSource = frameSource(sequence, nextFrame);
      if (element && !element.src.endsWith(nextSource)) element.src = nextSource;
      scheduleDraw();
    },
  }), [frameCount, scheduleDraw, sequence]);

  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    if (eager) beginLoading();
    const intersection = eager ? null : new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        beginLoading();
        intersection?.disconnect();
      }
    }, { rootMargin: "400px" });
    intersection?.observe(element);
    return () => {
      intersection?.disconnect();
      if (paintFrame.current !== null) cancelAnimationFrame(paintFrame.current);
      images.current.forEach((image) => { if (image) image.src = ""; });
      images.current = [];
      started.current = false;
    };
  }, [beginLoading, eager, scheduleDraw]);

  // The source is intentionally swapped frame-by-frame, which next/image is not designed to do.
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={surface} src={eager ? frameSource(sequence, 0) : undefined} alt={label ?? ""} className={`il-frame-sequence ${className}`} aria-hidden={label ? undefined : true} decoding="async" fetchPriority={eager ? "high" : "auto"} />;
});
