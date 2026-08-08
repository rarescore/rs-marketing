# Pomegranate rebuild

- Removed the H.264 scroll-scrub experiment.
- Removed the heavy 4K frame sequence from runtime.
- Rebuilt the hero as a scroll-linked canvas field using a small set of high-resolution transparent aril sprites.
- GSAP ScrollTrigger controls a single normalized playhead (`scrub: 0.28`).
- Seeds are visible at progress 0, additional seeds enter throughout the scroll, and the field stays active until the next section.
- No full-screen image is decoded while scrolling; only 12 sprite assets are loaded once.
- Canvas backing resolution is capped to reduce GPU fill-rate while keeping the sprites sharp.
- Restored the original expanding subscription/pricing accordion and added click, keyboard, and mobile support instead of changing the visual model.
