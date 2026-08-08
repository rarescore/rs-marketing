# Stability + Interaction Fix

- Review page header spacing rebuilt to respect the fixed navigation.
- Replaced continuously animated review cylinder with native horizontal scroll-snap carousel.
- Touch swipe, trackpad, drag/scroll, and arrow navigation now share the same interaction.
- Removed blur-heavy review animation and continuous review requestAnimationFrame loop.
- ClickSpark now renders only while sparks are visible instead of running continuously.
- Restored the normal system cursor; click sparks remain.
- Pricing panels now open on explicit click/tap/keyboard activation.
- Mobile pricing is a vertical accordion instead of narrow horizontal slivers.
- Monthly-plan CTAs now open the LG contact page with the selected plan prefilled.
- Mobile menu locks body scroll while open.
- Wider responsive header breakpoint reduces logo/navigation collisions.
- PomegranateSequence.jsx was not edited.
