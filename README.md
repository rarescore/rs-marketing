# RS Marketing — Pomegranate Website

## Run locally

Open a terminal in this folder and run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

You can also use the VS Code Live Server extension.

## Deploy

Upload the entire folder to Netlify, Vercel, GitHub Pages, or any static hosting service.

## Contact form

The included form shows a local success state. Connect its submit handler in `app.js` to Formspree, HubSpot, GoHighLevel, or your own API endpoint to receive submissions.

## Animation settings

At the top of `app.js`:
- Desktop seed count: 128
- Mobile seed count: 78
- Physics duration: 8.5 seconds distributed across scroll

In `styles.css`:
- `.seed-scroll { height: 520vh; }` controls the desktop scroll distance.
