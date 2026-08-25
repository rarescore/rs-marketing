"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type RealEstateState = {
  saved: string[];
  tour: string[];
  toggleSaved: (slug: string) => void;
  toggleTour: (slug: string) => void;
  moveTour: (slug: string, direction: -1 | 1) => void;
  clearTour: () => void;
};

export const useRealEstateStore = create<RealEstateState>()(
  persist(
    (set) => ({
      saved: [],
      tour: [],
      toggleSaved: (slug) => set((state) => ({ saved: state.saved.includes(slug) ? state.saved.filter((item) => item !== slug) : [...state.saved, slug] })),
      toggleTour: (slug) => set((state) => ({ tour: state.tour.includes(slug) ? state.tour.filter((item) => item !== slug) : [...state.tour, slug] })),
      moveTour: (slug, direction) => set((state) => {
        const current = state.tour.indexOf(slug);
        const next = current + direction;
        if (current < 0 || next < 0 || next >= state.tour.length) return state;
        const tour = [...state.tour];
        [tour[current], tour[next]] = [tour[next]!, tour[current]!];
        return { tour };
      }),
      clearTour: () => set({ tour: [] }),
    }),
    { name: "atelier-north-demo-v1", partialize: (state) => ({ saved: state.saved, tour: state.tour }) },
  ),
);
