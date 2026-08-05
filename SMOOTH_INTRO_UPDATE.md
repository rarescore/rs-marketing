# Smooth Intro Update

- Intro now auto-plays once instead of being controlled by a long scroll.
- Duration: 3.6 seconds, followed by a 650 ms fade/slide transition.
- The page is temporarily locked during playback, then moves to the next section automatically.
- Only the visually consistent opening portion of the supplied sequence is used:
  - Desktop: frames 000-084
  - Mobile: frames 000-077
- The artifact-heavy later frames were deleted.
- All frames preload before playback to prevent skipped images.
- Rendering uses requestAnimationFrame, frame blending, easing, Retina canvas sizing, and nearest-frame fallback.
