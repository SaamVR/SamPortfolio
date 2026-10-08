# A01 — Portable browser verification

Completed 2026-10-08 in the SamPortfolio checkout. All three browser tools share configurable origin/executable settings. `npm run verify:browser` owns an Astro preview on port 4330, checks readiness and disposes only its own processes. Direct execution against an existing preview remains supported.

Actual validation:
- `npm test`: 14/14 passed, including preview success, failure, occupied-port rejection and SIGTERM cleanup.
- `npm run check`: zero errors, warnings or hints.
- `npm run build`: all three routes built; the existing renderer chunk above 500 KB remains a warning.
- `npm run verify:browser`: 13 browser scenarios passed against the built SamPortfolio preview on port 4330, using headless Chromium 151 and software WebGL at desktop and phone sizes. Updated captures/results are in `evidence/`.
- An additional actual Astro preview on port 4331 returned the deliberate suite exit code 17, reaped its preview process and released its port.

This task does not establish physical-device performance, cross-browser parity or publication readiness. The recorded desktop software frame-budget miss remains unresolved. No app behavior or renderer quality policy was changed.

Next eligible task: A02, production/capture renderer separation. A04 is the independent brief-schema branch. Future unattended execution still requires a project-capable runner; no scheduled coding job is installed.
