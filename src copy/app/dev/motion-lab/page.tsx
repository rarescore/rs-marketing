import type { Metadata } from "next";
import { MotionLabExperience } from "@/features/dev/motion-lab/motion-lab.client";

export const metadata: Metadata = {
  title: "Spatial camera lab",
  description: "Internal ONLEV camera-path and scroll-system validation route.",
  robots: { index: false, follow: false },
};

export default function MotionLabPage() {
  return <MotionLabExperience />;
}
