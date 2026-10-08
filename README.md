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
npm run verify:browser
```

`npm run verify:browser` launches its own loopback production preview on port 4330 and cleans it up after success, failure or interruption. Set `OPENING_PREVIEW_PORT` to choose another free port. For an existing preview, run `OPENING_BASE_URL=http://127.0.0.1:4322 npm run test:browser`. All browser/capture/visual tools share that URL configuration and accept `OPENING_BROWSER_PATH` for a browser executable. They prefer system Chromium when available, otherwise Playwright’s installed Chromium; install it once with `npx playwright install chromium` if needed. These checks use software WebGL. `tests/capture-posters.mjs` regenerates the three exact renderer posters; `npx tsx tests/manifest.ts` regenerates the pivot/projection manifest. Rebuild after regenerating assets.

## Routes

- `/`: readable hero, DOM proof, three immediate direction controls, bounded 3D choreography, local native-scroll handoff, work and contact navigation.
- `/work/opening-study/`: explicitly labeled original development study; native image continuity in browsers supporting cross-document View Transitions.
- `/start/`: anonymous direction/goal note and JSON export. Contact configuration honestly unavailable; no send/receipt fiction.

Static HTML and native links carry all useful content. Only the scene imports Three.js. Light and reduced motion avoid that import. No pins, idle animation, fonts, external imagery, project-video downloads or client-side router. No scene request blocks a route. Unsupported continuity uses normal navigation. Renderer failure is terminal for the tab visit; zero restoration attempts is within the maximum-one policy. Back may restore BFCache and native scroll, with fresh GPU resources.

## Evidence & handoff

Read [execution and architecture](docs/EXECUTION.md), [verification report](docs/VERIFICATION.md), [handoff](docs/HANDOFF.md), and the [authority](docs/AUTHORITY.md). Captures and raw browser measurements are under `evidence/`; the authored geometry manifest is `public/art/manifest.json`.

No approved owner identity, authentic flagship rights/content pack, verified contact destination or hosting repository was supplied. All study imagery is original procedural/vector development material authored with AI assistance in this session. No client, outcome, enquiry or certification is claimed. The site cannot substitute this study for approved portfolio proof.

## Autonomous continuation

The slice and next-task queue are on `feat/opening-scenes-1-3`: [draft PR #1](https://github.com/SaamVR/SamPortfolio/pull/1). Read [the runbook](docs/automation/RUNBOOK.md), [task queue](docs/automation/state.json) and [implementation plan](docs/superpowers/plans/2026-10-08-autonomous-portfolio.md). One main agent, bounded tasks, checked checkpoints and feature-branch pushes. No scheduler, merge, paid service or production deployment is implied by these files. Runner configuration remains a separate verified setup.

Renderer tooling: ordinary visits use a non-retained framebuffer and minimal lifecycle diagnostics. `/?openingCapture=1` enables the synchronous PNG adapter used by `tests/capture-posters.mjs`; `/?openingDiagnostics=1` enables heavier bounds/frame traces without capture retention. These are explicit tooling configurations, not performance representative defaults.

To check renderer separation and run normal-mode visual traces against owned previews after building:
```sh
node scripts/preview-browser.mjs tests/renderer-lifecycle.mjs
node scripts/preview-browser.mjs tests/visual-audit.mjs
```
