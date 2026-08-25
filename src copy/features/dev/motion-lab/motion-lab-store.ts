import { create } from "zustand";
import { clampProgress, progressToIndex } from "@/lib/motion/scroll-utils";

interface MotionLabState {
  fps: number;
  progress: number;
  stage: number;
  setFps: (fps: number) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
}

export const useMotionLabStore = create<MotionLabState>((set) => ({
  fps: 0,
  progress: 0,
  stage: 0,
  setFps: (fps) => set({ fps }),
  setProgress: (progress) => {
    const normalized = clampProgress(progress);
    set({ progress: normalized, stage: progressToIndex(normalized, 4) });
  },
  reset: () => set({ fps: 0, progress: 0, stage: 0 }),
}));
