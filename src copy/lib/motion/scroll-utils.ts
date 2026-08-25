export function clampProgress(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export function progressToIndex(progress: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(clampProgress(progress) * count));
}
