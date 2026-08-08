# Next Level Pass

## Fixed from Aug 8 review
- Website Autopsy now stays contained below the fixed header and fades/reassembles before handing off to the next section.
- Removed logo/brand imagery from the Autopsy and connected-system animation cores.
- Rebuilt the Process scene as a scroll-driven pinned chapter with one moving signal track and four staged states. Removed the stray dots and broken half-loaded line treatment.
- Improved section color rhythm: black, red, warm white, red, black, warm white, red, white, red, black footer.
- Added red/black/white typography accents by section color.
- Rebuilt the website configurator around a live preview that updates as choices change.
- Added more configurator choices: goal, typography, immersive motion, extra colors, more features.
- Removed auto-advance between configurator choices so visitors can see the live result before continuing.
- Added a live starting-price estimate to the configurator preview.
- Moved activity toasts away from the primary story content.

## Pomegranate quality upgrade
- Rebuilt the sequence assets from the existing 3840x2160 source sequence.
- Desktop frames are now 1920x1080; mobile frames are 1080x1920 center crops.
- 120 high-quality scroll frames are used.
- The player now uses a bounded dynamic frame cache instead of permanently decoding the whole sequence, reducing memory pressure while improving source sharpness.
- Rendering only animates while the scroll target is moving instead of keeping a permanent requestAnimationFrame loop alive.

## QA
- App.jsx, PomegranateSequence.jsx, and AccordionGallery.jsx pass the TypeScript JSX parser with no syntax errors.
- CSS brace validation passes.
- A full Vite production build could not be run because the environment package mirror returns 404 for @vitejs/plugin-react.
