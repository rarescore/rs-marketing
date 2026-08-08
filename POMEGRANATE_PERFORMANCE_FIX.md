# Pomegranate performance fix

The previous hero decoded and resized 4K WebP frames in JavaScript while the page was scrolling. Even with a small cache, repeated createImageBitmap calls and frame eviction caused main-thread and decode pressure.

This build replaces that runtime frame decoder with two hardware-decoded H.264 scrub videos:

- Desktop: 1920x1080, 60fps source timing, all-I-frame H.264, ~2.4 MB
- Mobile: 720x1280, 60fps source timing, all-I-frame H.264, ~0.5 MB
- Scroll remains the controller: the video never auto-plays.
- The hero still starts partway into the animation so seeds are visible immediately.
- Scroll updates are coalesced through requestAnimationFrame and seek pressure is capped.
- A high-quality poster is displayed before the first video frame is ready.
- The old 318-frame runtime image sequence was removed from public assets.

The visual sequence is the same source animation; only the playback architecture changed.
