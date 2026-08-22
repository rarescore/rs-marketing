import type { Metadata } from "next";
import type { ReactNode } from "react";
import { InjuryLayout } from "@/features/demos/injury-law/injury-layout";
import "@/features/demos/injury-law/injury.css";

export const metadata: Metadata = {
  title: { default: "Lev & On Injury Counsel — Injury Law System Demo", template: "%s | Lev & On Injury Counsel" },
  description: "A fictional, trauma-aware personal injury client-acquisition system demonstration.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <InjuryLayout>{children}</InjuryLayout>;
}
