import { create } from "zustand";

type OpeningState = {
  progress: number;
  setProgress: (progress: number) => void;
};

export const useOnlevOpening = create<OpeningState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));
