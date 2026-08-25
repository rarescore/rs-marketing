"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function SmoothScrollProvider({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) {
  useSmoothScroll(enabled);
  return children;
}
