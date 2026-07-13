# Figma Video Mockup

Editable video-mockup templates (converted from a Figma file) that run in the browser. Pick a
template, drop a video or image into its slots, edit text / logos / backgrounds, save "demos", and
export a finished MP4 with everything composited in.

## How it works

- **Frontend** — a single static page. Each template is a self-registering `templates/T_*.jsx`
  file (an IIFE that pushes into `window.TEMPLATES`). `build.mjs` concatenates the head, every
  template (wrapped in `<script type="text/babel">`), and the tail into `public/index.html`.
  React + Babel transpile the JSX in the browser (no bundler).
- **Logos** — `_logos.js` is a self-contained bundle of brand logos as data-URIs plus their
  dominant colors (`window.__LOGO_BG`). It's regenerated from source images when logos change.
- **Export** — `export-server.mjs` (Node + Playwright + FFmpeg) renders the design as a
  transparent "plate" and composites the uploaded videos into rounded slot holes, then muxes the
  source audio. This runs **locally** (see below); it is not deployed to Vercel.

## Local development

```bash
npm install                 # installs Playwright (for the export server)
npm run build               # builds public/ and dashboard.html
npm run serve               # serves at http://localhost:4321  (open /dashboard.html)
npm run export-server       # in a second terminal — MP4 export API on :5050
```

`npm run dev` builds then serves in one step.

## Deploy to Vercel

Import the repo — `vercel.json` is preconfigured:

- **Build command:** `node build.mjs`
- **Output directory:** `public`

That's all the deployed site needs. **MP4 export requires the export server**, which Vercel's
serverless functions can't run (it needs headless Chromium + FFmpeg). On the deployed site the
Export button points at `http://localhost:5050` by default, so it only works when you're running
`npm run export-server` locally. To use export from the hosted site, host `export-server.mjs`
somewhere that allows long tasks + binaries (Render / Railway / Fly) and set
`window.__EXPORT_BASE = "https://your-export-host"` (e.g. via a small inline script).

## Project layout

```
build.mjs                 # concatenates templates -> public/index.html + dashboard.html
_logos.js                 # brand-logo data-URI bundle + dominant colors
templates/
  _dashboard.head.html    # <head>, CDN scripts, fonts, loads /_logos.js
  _dashboard.tail.html    # the App (gallery, editor, inspector, demos, export)
  T_*.jsx                 # 15 self-registering templates
export-server.mjs         # local MP4 export API (Playwright + FFmpeg)
render.mjs                # headless QA screenshot harness (dev)
archive/                  # earlier standalone HTML prototypes (not deployed)
```

## Routes (hash-based)

- `#/templates` — template gallery
- `#/template/<id>` — editor for a template
- `#/projects` — demos (with nav)
- `#/demos` — demos only, no nav (shareable view)
