export type RenderQuality = "low" | "medium" | "high";

export interface QualityProfile {
  dpr: number;
  effects: boolean;
  quality: RenderQuality;
}

export function getQualityProfile(width: number): QualityProfile {
  const cores = typeof navigator === "undefined" ? 8 : navigator.hardwareConcurrency || 4;
  const memory =
    typeof navigator !== "undefined" && "deviceMemory" in navigator
      ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4)
      : 4;
  const constrained = cores <= 4 || memory <= 4;

  if (width < 640 || constrained) return { dpr: 1, effects: false, quality: "low" };
  if (width < 1100) return { dpr: 1.25, effects: false, quality: "medium" };
  return { dpr: 1.6, effects: true, quality: "high" };
}

export function supportsWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
