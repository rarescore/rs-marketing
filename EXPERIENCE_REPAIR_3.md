# LG Growth Studio — Experience Repair 3

## Fixed in this pass
- Restored the pomegranate hero with a real poster fallback so it cannot disappear while frames initialize.
- Restored the 180-frame 3840×2160 desktop source sequence and made the runtime decode only a small nearby window at display-appropriate resolution.
- Increased the starting seed density so seeds are visible immediately on page load.
- Website Autopsy now has a longer scroll runway, all four explanatory layers remain visible, the active layer is highlighted, and the center “CORE” element was removed completely.
- Rebuilt “Nothing works alone” on true white with clean separated copy and network layout; removed center text and overlapping typography.
- Header Process now opens `/process` and Pricing opens `/pricing` on desktop and mobile.
- Footer routes also point to the dedicated Process and Pricing pages.
- Added dedicated Process and Pricing pages instead of routing visitors back into homepage anchors.
- Pricing interaction was reinforced with a stable tab + detail layout and responsive mobile behavior.
- Website configurator now includes an interactive accent-color fine tuner that updates the live preview.
- Sitemap updated with Process, Reviews, and Build Website routes.

## Performance notes
Desktop pomegranate frames are 4K source files, but the player keeps only a small frame window decoded and resizes image bitmaps to the current display. This preserves source detail without keeping the entire 4K sequence in memory.
