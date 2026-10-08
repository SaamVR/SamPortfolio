# Durable handoff — Scenes 1–3

Active repository: `/workspace/SamPortfolio`, origin `https://github.com/SaamVR/SamPortfolio.git`, branch `feat/opening-scenes-1-3`, based on upstream main `cebab7f`. Original local source remains at `/workspace/the-opening`. Production preview: port 4322. No deployment performed. Main-agent integration only; no subagents used.

Implemented: static useful routes; original three rigid chamfered graybox leaves; sibling +Y/+Y/+X pivots; Precise/Playful/Cinematic sampled poses; immediate anonymous draft selection; interruptible overlapping score; repeat no replay; native scrolling with zero pins; projected five-anchor local SVG handoff; native cross-document case-image correspondence; normal URLs/Back/modified clicks/cancellation; matched stills for Light/reduced/failure; terminal tab-session rendering failure and clean GPU disposal; direction/goal note + JSON export.

Geometry manifest and exact stills: `public/art/`. Geometry/proof envelope tests: `tests/geometry.test.ts`. Raw browser results/captures: `evidence/`. Reproduction commands: README. Test environment is software-rendered headless Chromium on Linux, not phone hardware, Safari/Firefox or a deployed host. See VERIFICATION.md for actual costs and missed targets.

Specific behavior decisions:
- No speculative startup invitation: fixed first pose; useful controls discoverable without extra theatre.
- No pointer seasoning or overshoot; current-angle continuity with bounded zero-velocity restart. Velocity continuity is not claimed.
- Scene resources are lazy and demand-rendered. No idle RAF. Hidden/offscreen settles latest direction; reentry has no time debt.
- Native browser View Transitions own the 420 ms correspondence. No overlay or client route interception. No preparation wait; normal routing wins. Unsupported browser routes are complete.
- Rendering loss is immediately terminal for this tab visit (zero restoration attempts, within max one). Mode controls cannot silently restore a failed scene. No physical-device adaptive performance policy validated yet.
- Shared draft is explicitly a small anonymous direction note, not the complete D11 four-step BriefDraftV1. Do not claim brief product completion. Migrate this note deliberately when adding full draft schema.

Next concrete batch:
1. Audit one owner-supplied authentic flagship: approved identity/offer, exact contribution, collaborators, media rights, genuine deliverable links, art/motion/engineering evidence, known limitations. Replace the labeled placeholder and review the same protected media bounds.
2. Calibrate the graybox and materials on named physical desktop/phone profiles; trace active RAF/GPU/payload, remove capture-only framebuffer retention if appropriate, tune measured quality degradation, author device-specific poster/detail limits. Verify first-frame match and route continuity in Safari/Firefox. No frame-budget release pass yet.
3. Add the four-step draft with version/migration/storage/export contracts and configured quick contact. Choose enquiry transaction/provider only with actual deployment context; then implement immutable attempts, durable acceptance/idempotency/outbox/owner retrieval. Receipt signature C belongs here and cannot be faked in this slice.
4. Add actual craft/about/privacy/error routes and complete deployed keyboard/zoom/contrast/a11y/operational checks before publication.

Publication blockers are identity/offer approval, audited authentic project proof/rights, verified contact destination, repository/host configuration, device/performance and cross-browser/deployed verification. No enquiry, outcome or recruiter pass has been fabricated.

## Autonomous queue and remote checkpoint

Feature branch published; draft PR: https://github.com/SaamVR/SamPortfolio/pull/1. No merge/deployment. User delegated best scope choice; feature-branch pushes + draft PR selected. Current task queue: docs/automation/state.json; execution prompt and usage/runner rules: docs/automation/WORKER-PROMPT.md and RUNBOOK.md. Detailed A01–A13 task plan: docs/superpowers/plans/2026-10-08-autonomous-portfolio.md. Reset metadata supplied privately and ignored by Git; project-runner confirmation is pending, so no scheduled coding run is claimed active. A01 is complete; next eligible engineering task is A02, with A04 independently eligible.

A01 checkpoint (2026-10-08): portable browser configuration and an owned preview lifecycle are implemented. Latest verification: 14 tests, clean type checks, three-route build and 13 browser scenarios on SamPortfolio port 4330. Success, failed suite and SIGTERM cleanup passed; unrelated occupied ports are preserved. See `docs/automation/A01-RESULT.md`. No unattended scheduler is installed.
