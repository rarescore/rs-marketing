# Local 3D production assets

Runtime assets added by the 2026-08-22 ONLEV visual-production pass:

- `onlev-mechanism.glb` — opening mechanism, 21,004 bytes.
- `portal-real-estate-frame.glb` — limestone / oxidized-bronze gateway shell, 4,948 bytes.
- `portal-plumbing-frame.glb` — technical-enamel / brushed-steel / copper gateway shell, 16,052 bytes.
- `portal-injury-law-frame.glb` — blackened-metal / oxblood / archival gateway shell, 5,676 bytes.

Runtime total: **47,680 bytes** before transport compression.

Full-assembly reference exports are also retained:

- `portal-real-estate.glb`
- `portal-plumbing.glb`
- `portal-injury-law.glb`

They are not loaded by the Three Doors runtime. The R3F scene uses the smaller frame exports and owns the door leaves, hinge physics, room responses, lights, and camera choreography.

The assets are generated locally by `scripts/generate-onlev-production-assets.py`. They contain embedded geometry and PBR material factors and have no external media URI. This pass does not yet include commissioned normal/AO texture bakes or KTX2 texture sets; that limitation is recorded in `docs/CURRENT-STATE.md` rather than hidden.
