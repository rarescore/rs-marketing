# Animation fix

- Replaced the artifact-heavy image sequence with a high-DPI canvas animation.
- Uses only five clean isolated seed images, so there are no white square fragments.
- 320 seeds create a dense, screen-filling middle phase.
- 152vh desktop / 148vh mobile: approximately one strong scroll.
- requestAnimationFrame follows 60Hz, 120Hz, or other supported display refresh rates.
- Scroll interpolation removes frame stepping.
- Pixel ratio is capped at 2 for sharp output and stable performance.
- Mobile receives a dedicated portrait composition.
