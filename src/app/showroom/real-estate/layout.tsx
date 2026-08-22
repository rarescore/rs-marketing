import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RealEstateLayout } from "@/features/demos/real-estate/real-estate-layout";
import "@/features/demos/real-estate/real-estate.css";

export const metadata: Metadata = {
  title: { default: "Lev & On Residential — Real Estate System Demo", template: "%s | Lev & On Residential" },
  description: "A fictional, client-ready real-estate advisory system demonstration for Pasadena and the San Gabriel foothills.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RealEstateLayout>{children}</RealEstateLayout>;
}
