export const motionEasing = {
  enter: "power3.out",
  exit: "power2.in",
  move: "power2.inOut",
  linear: "none",
} as const;

export const motionBezier = {
  enter: [0.16, 1, 0.3, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
  move: [0.65, 0, 0.35, 1] as const,
} as const;
