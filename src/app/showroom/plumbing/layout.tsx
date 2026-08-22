import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PlumbingLayout } from "@/features/demos/plumbing/plumbing-layout";
import "@/features/demos/plumbing/plumbing.css";

export const metadata: Metadata = {
  title: { default: "Lev & On Home Services — Plumbing System Demo", template: "%s | Lev & On Home Services" },
  description: "A fictional, client-ready plumbing and home-services system demonstration for the Pasadena foothills.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <PlumbingLayout>{children}</PlumbingLayout>;
}
