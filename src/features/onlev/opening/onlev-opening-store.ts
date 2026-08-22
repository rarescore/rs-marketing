import { create } from "zustand";

interface OpeningMotionState {
  progress: number;
  setProgress: (progress: number) => void;
}

export const useOpeningMotion = create<OpeningMotionState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));
