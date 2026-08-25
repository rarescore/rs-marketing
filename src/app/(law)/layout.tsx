import type { Metadata } from "next";
import type { ReactNode } from "react";
import { InjuryLayout } from "@/features/demos/injury-law/injury-layout";
import "@/features/demos/injury-law/injury.css";

export const metadata: Metadata = {
  title: { default: "Lev & On Law Firm — Personal Injury Counsel", template: "%s | Lev & On Law Firm" },
  description: "Early action. Serious preparation. Direct answers after an accident.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <InjuryLayout>{children}</InjuryLayout>;
}
