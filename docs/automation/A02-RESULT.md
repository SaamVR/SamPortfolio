# A02 — Production renderer and capture separation

Production defaults now disable retained WebGL buffers and per-frame projected-bounds/full-frame-array serialization. Minimal angles/activity/choreography/frame-count state stays available for behavior checks. Explicit `openingCapture=1` enables a synchronous render/read PNG adapter; `openingDiagnostics=1` enables heavy traces without capture retention. Disposal removes the capture adapter, and held capture references reject reads after disposal. Original geometry, scoring, lighting, routes and poster assets were preserved.

Actual verification on 2026-10-08:
- RED: new browser assertion observed old `preserveDrawingBuffer=true` and failed before implementation.
- `npm test`: 14/14 passed.
- `npm run check`: no errors, warnings or hints.
- `npm run build`: three routes; deferred renderer 509.88 KB / 130.48 KB gzip, existing >500 KB warning retained.
- `npm run verify:browser`: 13 existing scenarios passed, including rapid retargeting/repeat, touch motion, native navigation/Back/cancellation, render failures and cold alternatives. Phone animation now checks actual draw count rather than requiring a heavy trace.
- `node scripts/preview-browser.mjs tests/renderer-lifecycle.mjs`: production/capture/diagnostic settings, normal rendered-versus-hidden image, simulated document-hidden events, native scroll reentry, resize, idle frame count, active Light switch, delayed import cancellation and disposed-capture rejection passed.
- `node scripts/preview-browser.mjs tests/visual-audit.mjs`: keyboard/storage/visual checks and sequential normal-mode external RAF measurements passed. Trace completion does not mean performance budgets passed.
- Main agent visually inspected desktop hero, phone stage and normal canvas captures: proof/text remain clear of leaves and the three-leaf frame remains visible.

## Measurements and limits

Previous diagnostic-mode baseline remains in Git at `acc46b6:evidence/visual-audit.json`; current results are in `evidence/visual-audit.json`. Measurement instrumentation changed: previous renderer-local active RAF samples included heavy diagnostics and capture retention; current external browser RAF observer samples production mode. No causal speed improvement is claimed.

| Profile | Previous p95 | Current normal-mode p95 | Current samples | Framebuffer |
|---|---:|---:|---:|---|
| desktop | 33.4 ms | 33.4 ms | 143 | 980×817 |
| phone | 16.8 ms | 16.7 ms | 198 | 343×286 |

Desktop still misses the proposed 25 ms target. Phone emulation is below the proposed 40 ms target, without physical-device certification. Chromium 151.0.7922.173, shared Linux/headless SwiftShader; no Safari/Firefox or physical GPU timestamps.

Cold encoded response-body home + scroll totals: Full 214.771 KB; Light/reduced 84.296 KB. Full-to-actual-Light screenshot mean absolute RGB difference: 0.148233/255. Existing authored posters were retained because visual correspondence stayed unchanged. This is not first-valid-frame timing certification.

Focused read-only review: GPT-6.1 Sol/high, as required by the task/AGENTS renderer ownership gate. No confirmed findings or review blockers. Reviewed production/capture defaults, diagnostics, synchronous read, disposal, generation/Light/hidden/Back paths and measurement labeling. A separate probe could not connect after the owned preview shut down and adds no validation; the main agent's suites provide the executed evidence.

Next eligible engineering task: A03 measured monotonic quality policy. Physical-device release review remains A09; A04 brief schema is independently eligible. No authentic approved flagship pack, real enquiry destination or automatic runner exists yet.
