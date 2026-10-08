# SamPortfolio

My Creative Portfolio Presentation — **THE OPENING**.

A production-bound Scenes 1–3 portfolio slice, built from the attached final decision register. The slice was initially authored locally, then integrated into SaamVR/SamPortfolio on branch feat/opening-scenes-1-3. No approved project pack was supplied. **Development preview, not publication-ready.**

## Run

Node 22+; dependencies pinned in package-lock.json.

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview -- --port 4322
npm run test:browser
```

Browser tests expect the production preview on port 4322 and `/usr/bin/chromium`. They use Playwright against system Chromium, with software WebGL, rather than downloading a browser. `tests/capture-posters.mjs` regenerates the three exact renderer posters; `npx tsx tests/manifest.ts` regenerates the pivot/projection manifest. Rebuild after regenerating assets.

## Routes

- `/`: readable hero, DOM proof, three immediate direction controls, bounded 3D choreography, local native-scroll handoff, work and contact navigation.
- `/work/opening-study/`: explicitly labeled original development study; native image continuity in browsers supporting cross-document View Transitions.
- `/start/`: anonymous direction/goal note and JSON export. Contact configuration honestly unavailable; no send/receipt fiction.

Static HTML and native links carry all useful content. Only the scene imports Three.js. Light and reduced motion avoid that import. No pins, idle animation, fonts, external imagery, project-video downloads or client-side router. No scene request blocks a route. Unsupported continuity uses normal navigation. Renderer failure is terminal for the tab visit; zero restoration attempts is within the maximum-one policy. Back may restore BFCache and native scroll, with fresh GPU resources.

## Evidence & handoff

Read [execution and architecture](docs/EXECUTION.md), [verification report](docs/VERIFICATION.md), [handoff](docs/HANDOFF.md), and the [authority](docs/AUTHORITY.md). Captures and raw browser measurements are under `evidence/`; the authored geometry manifest is `public/art/manifest.json`.

No approved owner identity, authentic flagship rights/content pack, verified contact destination or hosting repository was supplied. All study imagery is original procedural/vector development material authored with AI assistance in this session. No client, outcome, enquiry or certification is claimed. The site cannot substitute this study for approved portfolio proof.
