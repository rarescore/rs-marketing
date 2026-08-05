# Pomegranate sequence update

This revision restores the clean, complete full-screen frames from the original slower version.

## Changes

- Uses 90 complete desktop frames and 90 complete mobile frames.
- Does not use independent seed sprites or browser-generated seed physics.
- Crossfades fractional positions between adjacent frames for smooth 60–120 Hz display.
- Uses a high-DPI canvas capped at 2x device pixel ratio.
- Scroll length reduced from 500vh to 245vh desktop and 225vh mobile.
- Includes a subtle timing hold around the densest seed-filled section.
- Scroll down advances and scroll up reverses the exact same sequence.

## Main timing controls

`src/styles.css`

```css
.sequence { height: 245vh; }
```

`src/components/PomegranateSequence.jsx`

```js
displayFrameRef.current = current + distance * 0.24;
```
