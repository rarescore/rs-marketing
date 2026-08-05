# RS Marketing — Pomegranate Edition

## Merge the ZIP parts
Extract all parts into the same folder. Allow folders to merge; do not replace the entire folder when prompted.

## Run
```bash
npm install
npm run dev
```

## Main editing files
- `src/App.jsx`: page sections and copy
- `src/data/site.js`: packages and services
- `src/styles.css`: red / white / black design system
- `src/components/PomegranateSequence.jsx`: scroll sequence timing
- `public/sequence/desktop` and `mobile`: rendered frames

## Final production upgrade
The included sequence is a complete working visual prototype created from the approved storyboard. For final cinema-grade output, replace the 180 desktop and 180 mobile WebP frames with Blender-rendered frames using the same names. No React code changes are required.


## Fast opening timing
The opening sequence is intentionally compressed to 185vh on desktop and 170vh on mobile, so the full animation completes in roughly one strong scroll gesture or two short scrolls.
