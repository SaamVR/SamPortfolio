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

Desktop performance target remains unmet in this environment; earlier run p95 also varied up to ~50 ms. The phone result does not establish a supported real-phone profile. Framebuffer is below proposed area ceilings, with desktop DPR capped 1.5 and narrow DPR capped 1. No measured adaptive quality policy or universal performance guarantee is claimed.

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

No approved authentic project pack or owner identity/contact destination was provided. The original study is prominently marked as AI-assisted development placeholder. Hero capability copy remains pending owner approval. The contact route is a working anonymous note/export with an explicit unavailable-contact message; it cannot send enquiries. No enquiry receipt/backend, four-step complete brief, receipt signature C, about/privacy/error collection, deployed URL or approved résumé exists in this slice.

The scene still retains preserveDrawingBuffer for exact source capture; profile its cost and separate capture configuration before final renderer tuning. No measured automatic quality downgrade is implemented beyond explicit Light/reduced and terminal failures. Velocity continuity on retarget is not claimed (rendered position is continuous, bounded easing restarts with zero velocity). No physical phone, browser zoom, screen-reader, full contrast, cross-browser or deployed validation completed. 320 px reflow is a narrow-layout check, not a browser zoom certification.

Next batch is concrete in HANDOFF.md: approve a genuine flagship/identity/contact pack; calibrate physical-device render costs and first-frame/cross-browser continuity; then implement the full draft and real durable enquiry operations. Publication remains blocked until those gates are met.

## Repository integration follow-up

SaamVR/SamPortfolio cloned at cebab7f and integrated locally on feat/opening-scenes-1-3. Its existing README description and main history were preserved. Re-ran all 8 unit tests, Astro/TypeScript checks and production build successfully. The integrated dist is byte-identical to the previously browser-tested production build; prior captures/measurements are retained, rather than paying for redundant browser runs. The existing deferred-chunk warning remains. No GitHub push, PR or deployment performed.
