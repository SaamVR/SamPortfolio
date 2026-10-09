# Verification history

The sections below retain historical measurements for earlier sources. The current seven-project collection report is docs/PROJECT-EVIDENCE.md; final live evidence will be in evidence/portfolio/render/. Historical lower byte counts and route counts do not describe the current app.

# Scenes 1–3 verification — 2026-10-08

Scope: local production build, 151.0.7922.173, Linux headless Chromium and SwiftShader software WebGL; localhost, unthrottled, shared workspace. Desktop/phone are viewport and touch/DPR emulation, not named physical devices. No field Web Vitals, Safari/Firefox, deployed-host or accessibility conformance pass is claimed.

## Commands and actual results

- npm test: 8/8 passing. Real pose retargeting, repeat no replay, settle/reentry, bounded interrupted angle ranges, draft corrupt/schema recovery, draft revision idempotence and geometry safety.
- npm run check: Astro + TypeScript, no errors/warnings/hints in the final run.
- npm run build: three static routes generated. Vite warns that the deferred Three.js chunk exceeds 500 KB uncompressed (509.386 KB; gzip 130.314 KB). This is deferred, not ignored or hidden by a warning threshold.
- npm run test:browser: 13 scenarios pass. 1440×1000 desktop, 390×844 and 320×844 phone layouts; immediate selection + stored direction; five changes at ~100 ms gaps; repeat no replay; active phone motion (>20 sampled frames); native scroll/SVG handoff/reverse/reentry; late Light switch; stage and work image routes; direct URL; Back including source scroll within 2 px; destination heading focus; Ctrl-click new tab; newer navigation cancels older decoration; note export; cold Light/reduced omit renderer requests; WebGL unavailable, scene-load rejection and context loss keep selected state/proof/routes; terminal failure survives page navigation; JavaScript-disabled useful route.
- node tests/visual-audit.mjs: keyboard Enter actually starts choreography; focus capture; unavailable storage keeps immediate selection and honest temporary-note status; sequential active traces; actual Full-to-Light poster comparison and original pose contact sheet.
- No unexpected page errors in the successful browser scenarios. Intentionally unavailable WebGL can issue expected renderer-console errors. Initial Vite cache and popup-harness failures were investigated, corrected and rerun; they are not counted as successful validation.

## Measured encoded response costs

Decimal KB, browser Resource Timing encodedBodySize plus navigation body; favicon included. Preview serves compressed JS/CSS/HTML. Transfer headers are separately recorded in the raw JSON. These are new independent cold contexts, with no selections; automatic home + scroll does not fetch extra media because this slice reuses one original SVG. Requested alternative-feel posters are accounted for in the interaction scenarios, not silently omitted from those ledgers.

| Mode | First view | Home + scroll | Deferred scene JS | Lab LCP entry |
|---|---:|---:|---:|---:|
| full | 214.546 KB | 214.546 KB | 130.314 KB | 272 ms |
| light | 84.232 KB | 84.232 KB | 0 KB | 296 ms |
| reduced | 84.232 KB | 84.232 KB | 0 KB | 196 ms |

The proposed ≤1 MB first-view / ≤2 MB automatic journey limits are met for this local slice only. This excludes no automatically fetched asset. The scene budget depends on HTTP compression: its decoded JS body is 509.386 KB. No fonts, textures, models, decoders, video or third-party analytics were requested. All three PNG posters total 180.509 KB before any HTTP encoding; only the selected poster is needed in a cold visit. Case media is the reused development SVG, not an authentic flagship media pack.

## Graybox and active-frame evidence

- Three fixed hole-less unequal chamfered ExtrudeGeometry meshes, three sibling hinges, +Y/+Y/+X; 6 draw calls, 180 triangles, 2 shared materials. Fixed camera 35° vertical FOV at z=16.5, no orbit, root movement, overshoot, pointer modulation or idle rotation.
- 9 pose pairs × 26 sampled positions including endpoints protect the DOM image rectangle x=.32–.77/y=.36–.64 and stage envelope x=.08–.92/y=.10–.88. Retarget unit traces independently keep each angle inside the same validated range. No claim of formal continuous collision proof.
- Desktop text and CTA remain in a separate column; phone text/actions precede the stage. Stage clipping is not used to conceal an invalid silhouette. Its envelope keeps decorative geometry within the bounded stage; proof and focus remain independent HTML.
- Active RAF intervals are a software-rendered main-thread/refresh proxy, not GPU timestamps or physical-device FPS certification. No static Light/reduced FPS claim.

| Sequential profile | CSS viewport | Framebuffer | Active interval samples | p95 | Assessment |
|---|---|---|---:|---:|---|
| desktop | 1440×1000 | 980x817 | 144 | 33.4 ms | Misses proposed 25 ms target |
| phone | 390×844 | 343x286 | 200 | 16.8 ms | Below proposed 40 ms target in this emulation only |

Desktop performance target remains unmet in this environment; earlier run p95 also varied up to ~50 ms. The phone result does not establish a supported real-phone profile. Framebuffer is below proposed area ceilings, with desktop DPR capped 1.5 and narrow DPR capped 1. A03 adds measured active-window quality degradation; physical calibration and universal performance guarantees remain unclaimed.

Poster comparison: Precise endpoint Full versus actual Light still at desktop DPR1.5: mean absolute RGB difference 0.148 on a 0–255 scale. The slight difference is edge/downscale rasterization. This checks pose/color correspondence, **not** a cold-load ≤120 ms first-valid-frame timing assertion. Poster appears in HTML before runtime; there is no startup pose/camera animation.

## Captures and raw evidence

- evidence/desktop-hero.png; evidence/desktop-full.png
- evidence/phone-390-hero.png; evidence/phone-390-stage.png; evidence/phone-390.png; evidence/phone-320.png
- evidence/pose-sheet.png; public/art/manifest.json
- evidence/scroll-handoff.png; evidence/transition-mid.png; evidence/case-desktop.png
- evidence/light.png; evidence/reduced.png; evidence/no-webgl.png; evidence/scene-load-failure.png; evidence/context-loss.png
- evidence/desktop-keyboard.png; evidence/phone-keyboard.png
- evidence/render-match.png; evidence/poster-match.png; evidence/poster-comparison.json
- evidence/browser-results.json; evidence/visual-audit.json; evidence/direction-export.json (synthetic development note, not an enquiry)

Screenshots show observed compositions, not backend persistence, GPU performance, business outcomes or accessibility certification.

## Limits and publication blockers

No approved authentic project pack or owner identity/contact destination was provided. The original study is prominently marked as AI-assisted development placeholder. Hero capability copy remains pending owner approval. The contact route now has a full four-step anonymous brief and JSON/print HTML exports with explicit unavailable-contact messaging; it cannot send enquiries. No enquiry receipt/backend, receipt signature C, deployed URL or approved résumé exists.

A02 removed production preserveDrawingBuffer retention; explicit capture tooling retains it for synchronous source capture. A03 adds automatic resolution-first degradation and terminal authored Light; physical calibration remains pending. Velocity continuity on retarget is not claimed (rendered position is continuous, bounded easing restarts with zero velocity). No physical phone, browser zoom, screen-reader, full contrast, cross-browser or deployed validation completed. 320 px reflow is a narrow-layout check, not a browser zoom certification.

Next batch is concrete in HANDOFF.md: approve a genuine flagship/identity/contact pack; calibrate physical-device render costs and first-frame/cross-browser continuity; then implement the full draft and real durable enquiry operations. Publication remains blocked until those gates are met.

## Repository integration follow-up

SaamVR/SamPortfolio cloned at cebab7f and integrated locally on feat/opening-scenes-1-3. Its existing README description and main history were preserved. Re-ran all 8 unit tests, Astro/TypeScript checks and production build successfully. The integrated dist is byte-identical to the previously browser-tested production build; prior captures/measurements are retained, rather than paying for redundant browser runs. The existing deferred-chunk warning remains. No GitHub push, PR or deployment performed.

## A01 reproducibility checkpoint — 2026-10-08

Browser tooling now accepts configurable origins and executable paths. The owned Astro preview on port 4330 passed the existing 13 scenarios against this checkout. Fourteen unit/lifecycle tests passed, and type checks returned zero errors, warnings or hints. A real Astro failure run on port 4331 preserved exit 17 and released its process/port. Build retained the existing >500 KB renderer warning. See `automation/A01-RESULT.md` for scope; previous performance limitations remain applicable.

## A02 renderer checkpoint — 2026-10-08

See `automation/A02-RESULT.md` for current settings, executed checks, focused review and before/after measurement limits. Production has no heavy bounds/frame-array diagnostics. Fourteen tests, clean type checks, three-route build, 13 browser scenarios, renderer lifecycle/separation suite and normal-mode visual audit passed. Desktop p95 remains 33.4 ms (misses 25 ms); phone emulation is 16.7 ms (not physical certification). Cold Full body cost 214.771 KB; Light/reduced 84.296 KB. Matching Full/Light RGB difference remains approximately 0.148/255. No performance improvement, automatic quality policy or publication pass is claimed.

## A03 quality-policy checkpoint — 2026-10-08

Engineering verified; physical calibration remains review_needed/device-blocked. See `automation/A03-RESULT.md`. Eighteen tests, clean type checks, build, 13 final browser scenarios, synthetic quality integration, renderer lifecycle and normal visual audit passed. A focused review measurement defect was fixed and regression-verified. Desktop normal aggregate p95 83.3 ms missed its target and triggered lower resolution; only five lower-phase samples cannot establish its effectiveness. Phone emulation p95 16.8 ms is not physical certification. Cold Full body cost 215.434 KB; Light/reduced 84.564 KB. Full/Light RGB difference remains approximately 0.148/255. No speed improvement or physical release pass. Next A04.

## A04–A06 brief/export checkpoint — 2026-10-08

Full anonymous schema/legacy migration, four-step editor and immutable JSON/print HTML exports are delivered. Final 28 unit tests passed; type checks 0 errors/warnings/hints; three-route build; 13 existing browser scenarios; four brief desktop/phone/reduced/storage/error journeys; two 1440/390 export journeys including instrumented successful print popup, blocked-window fallback, unchanged earlier exports and offline print-media reflow. Focused data/focus/privacy reviews and regression fixes are recorded in automation/A04-RESULT.md through A06-RESULT.md. Captures are synthetic development fixtures, not enquiries. Actual OS dialogs and physical/a11y conformance remain unvalidated.

Latest cold response-body home+scroll Full 217.151 KB / Light or reduced 86.281 KB. Renderer 510.90 KB/130.87 KB gzip warning remains. No new frame-performance pass; A03 physical calibration remains review_needed. All independent engineering tasks are delivered; owner evidence/device/provider inputs block remaining work.

## Render public-host checkpoint — 2026-10-09

Live https://the-opening-preview.onrender.com at source488c0fb; fresh npm ci/four-page build succeeded. Public direct-route200/authored404,13 browser scenarios, four brief profiles and two export widths passed. Evidence/captures under evidence/render/; details and initial proxy failure in deployment/RENDER.md. Cold encoded home+scroll bodies:154.275KB Full /21.301KB Light or reduced (CDN compression, unthrottled headless). No physical/field/cross-browser/enquiry performance pass.

## Keyboard focus preparation — 2026-10-09

Confirmed and corrected paper/work focus-ring contrast2.73:1 using a contextual token. Build and clean type checks; local and deployed16 route/width sampled focus/native skip/brief keyboard/reflow profiles passed at1440/720/390/320px. Public direct-route200/authored404 passed. Source8d71c0a deployed. Evidence and initial stale-response failure: automation/A09-PRE-RESULT.md, evidence/accessibility/. No real zoom, physical device, screen-reader, Safari/Firefox or full WCAG pass claimed.

## P01 privacy preparation — 2026-10-09

Source d639cd593697c0d1f38d0ab640d15d8725ff3531; Render dep-db4gjl3tqb8s73f6soig; live 2026-10-09T15:36:14.333632Z. Clean53-file check;12-page build. Local/public privacy route checks at1440/390/320, existing draft unchanged, no renderer request/form, keyboard skip/focus, scoped axe with no violations/incomplete targets, four-route footer bounds and no-JS navigation pass.12 public direct HTTP routes/authored404 pass. Source-checked actual data practices; no enquiry service or retention claim added. Captures/reports: evidence/privacy/render/. Physical-device/screen-reader/full conformance and A13 publication gates remain open. No geometry/motion runtime change; prior motion/cost evidence retains its recorded source SHA.
