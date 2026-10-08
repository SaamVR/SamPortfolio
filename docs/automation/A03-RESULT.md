# A03 — Measured monotonic quality policy

Engineering implemented and verified; **physical calibration remains review_needed/device-blocked**. A04 is independently eligible. A09 remains the named-device release gate. No automatic scheduler or production deployment was created.

## Behavior and decisions

Only consecutive visible, active choreography RAF intervals enter the policy. Idle, hidden/offscreen and reentry gaps are excluded by resetting the renderer's previous timestamp; invalid samples and nonmonotonic timestamps are ignored by the pure policy. Forty active samples complete one p95 window. Two consecutive bad windows lower one level; a good window breaks the streak. Full → lower resolution → authored Light, with no automatic upgrade.

The trigger tolerance is 15% above proposed 25 ms desktop / 40 ms narrow targets (28.75/46 ms). Targets in performance reports remain 25/40 ms. A02's desktop p95 33.4 ms exceeds its trigger; its phone emulation 16.7 ms is below its trigger. These software observations justify testing the mechanism, not physical calibration. The boundary test exposed floating-point multiplication at 28.75; comparing p95/target against 1.15 fixed it.

Lower quality multiplies the already capped DPR by 0.75, retaining composition, lighting, geometry and animation. Synthetic browser evidence reduced desktop framebuffer 980×817 → 735×612. Continued bad windows dispose the scene and show the authored selected-feel still with explicit performance-fallback status. Feel controls, proof and native routes remain usable. Full toggle is disabled for terminal degradation this visit. Reduced-motion preference and rendering failure still take priority.

Quality level is retained in sessionStorage, across native routes/reload/Back. When storage is unavailable, only current-document/BFCache state can retain it; route-wide persistence is not guaranteed. Samples/streaks restart with fresh renderer resources, without increasing the retained quality level. Capture mode disables adaptation to keep authored source stills stable.

Ruling: the existing observeActiveFrame interface uses `null` for an excluded interval and optional lastSampleAt for monotonic input validation. This preserves the pure active-frame interface while keeping hidden/idle filtering at the renderer owner. Cost if wrong: integration could count inactive gaps; unit and lifecycle checks cover the current boundary.

## Executed validation

- RED: new quality tests failed before the module existed. Boundary test subsequently failed at the floating-point threshold; corrected implementation passed.
- Final `npm test`: 18/18 passed; `npm run check`: zero errors/warnings/hints; `npm run build`: three routes, renderer 510.90 KB / 130.87 KB gzip. Existing >500 KB warning remains.
- Final `npm run verify:browser`: 13 scenarios passed (rapid retarget/repeat, responsive native input/scroll, navigation/direct routes/Back/cancellation, alternatives/failure and cold costs).
- `node scripts/preview-browser.mjs tests/quality-browser.mjs`: synthetic active windows exercised lower/terminal transitions, retained selection, ignored idle samples, lower state across manual Light/Full, disposed activity flag, Back/reload without revival, cold terminal runtime avoidance and phone fallback reflow. These are labeled synthetic mechanism checks, not measured speed or calibration.
- `node scripts/preview-browser.mjs tests/renderer-lifecycle.mjs`: production/capture separation and existing lifecycle suite passed.
- `node scripts/preview-browser.mjs tests/visual-audit.mjs`: normal-mode keyboard/storage/visual checks and sequential external RAF observer traces passed; performance targets did not all pass.
- Main agent inspected lower-resolution desktop and phone terminal-Light captures; selected proof/text remain accessible. The lower and terminal compositions are saved in evidence/quality-*.png.

Focused Sol/high source review found one P2 measurement defect: disposal left data-active=true, so the external observer could count static-Light idle RAFs. Regression reproduced it, then passed after disposal cleared active; observer also now requires ready=true and a live canvas. Two preliminary test failures reflected async timing/report lag before the target assertion; selection plus synthetic samples now execute in the same browser task. No other confirmed policy/lifecycle findings. The final suites passed after the fix; no claim of a second reviewer pass.

## Actual measured costs and limits

Headless Chromium 151.0.7922.173 / SwiftShader, shared Linux workspace, unthrottled. External observer samples production mode; synthetic adapter is absent. Per-phase intervals are an external RAF proxy, not GPU timing.

| Profile/phase | Samples | p95 | Assessment |
|---|---:|---:|---|
| desktop / full | 75 | 83.3 ms | Misses 25 ms; lower-phase evidence is insufficient |
| desktop / lower | 5 | 83.4 ms | Misses 25 ms; lower-phase evidence is insufficient |
| phone / full | 193 | 16.8 ms | Below 40 ms in emulation only |

Desktop aggregate p95 was 83.3 ms, triggered Full → lower, with only five lower-level samples before this fixed choreography sequence ended. This is not enough to calibrate the lower phase or observe a naturally triggered terminal fallback. A02 desktop p95 was 33.4 ms; shared software runs vary substantially. No improvement or regression is causally attributed to this patch. Physical profile, threshold and lower-resolution validation remain blocked; no extra software reruns can replace them.

Cold encoded-body home+scroll totals: Full 215.434 KB, Light/reduced 84.564 KB. Already downloaded renderer bytes remain in a degraded visit's resource ledger; only a subsequent cold terminal visit avoids the renderer request. Fresh normal Full versus actual Light mean absolute RGB difference: 0.148233/255. Posters unchanged. No first-valid-frame timing assertion.

Next concrete task: A04 full anonymous brief schema and validated legacy-note migration. Authentic project/identity input, physical devices and real enquiry operations remain publication blockers.
