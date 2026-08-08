# LG Growth Studio — Award Experience Pass

This pass is built on `LG-Growth-Studio-Content-UX-Fix.zip`.

## Intentionally unchanged
- `src/components/PomegranateSequence.jsx`
- All pomegranate sequence assets and scroll behavior

The sequence file is byte-for-byte unchanged from the input ZIP.

## Added / rebuilt
- Contact is now the first primary navigation item.
- Added a dedicated `/contact` route with an interactive project-signal form.
- Added a full-screen mobile menu; Contact is item 01.
- Rebuilt the Before/Rebuilt section into a scroll-driven exploded 3D website reconstruction.
- Added a red diagnostic scan sweep through the rebuild.
- Rebuilt featured reviews into a spatial drag carousel with inertia, snapping, focus depth, and accessible previous/next controls.
- Rebuilt the Built Differently section into an interactive connected-system constellation.
- Upgraded the audit loading state into a holographic browser scanner while preserving the real audit request and minimum scan timing.
- Added cross-page View Transition styling where browser support exists.
- Added a moving process signal without reintroducing the broken 3D timeline behavior.
- Added stronger depth to the existing pricing accordion without replacing its interaction.
- Kept the original click-spark cursor interaction.
- Preserved activity popups.

## Performance approach
The pass uses the existing React + CSS + requestAnimationFrame stack rather than adding another animation framework. Continuous scenes update DOM transforms directly and avoid React state updates on every frame. Reduced-motion fallbacks are included.

## Validation
- `App.jsx` parsed successfully through the TypeScript JSX transpiler.
- `PomegranateSequence.jsx` parsed successfully.
- CSS brace structure is balanced.
- Production `npm install/build` could not be executed in the OpenAI environment because its internal npm proxy returns 404 for the existing dependency `@vitejs/plugin-react@^4.7.0`.
