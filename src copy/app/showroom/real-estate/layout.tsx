import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RealEstateLayout } from "@/features/demos/real-estate/real-estate-layout";
import "@/features/demos/real-estate/real-estate.css";
import "@/features/demos/real-estate/real-estate-hero.css";

export const metadata: Metadata = {
  title: { default: "Atelier North — Real Estate System Demo", template: "%s | Atelier North" },
  description: "A fictional, client-ready real-estate advisory system demonstration for Pasadena and the San Gabriel foothills.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RealEstateLayout>{children}</RealEstateLayout>;
}
