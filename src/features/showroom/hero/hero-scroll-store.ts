import { create } from "zustand";

export type IndustrySlug = "real-estate" | "plumbing" | "injury-law";

interface HeroScrollState {
  progress: number;
  activeIndustry: IndustrySlug;
  transitionIndustry: IndustrySlug | null;
  setProgress: (progress: number) => void;
  setActiveIndustry: (industry: IndustrySlug) => void;
  setTransitionIndustry: (industry: IndustrySlug | null) => void;
}

export const useHeroScroll = create<HeroScrollState>((set) => ({
  progress: 0,
  activeIndustry: "real-estate",
  transitionIndustry: null,
  setProgress: (progress) => set({ progress }),
  setActiveIndustry: (activeIndustry) => set({ activeIndustry }),
  setTransitionIndustry: (transitionIndustry) => set({ transitionIndustry }),
}));
