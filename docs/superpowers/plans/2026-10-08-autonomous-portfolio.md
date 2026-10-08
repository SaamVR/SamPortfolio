# Autonomous Portfolio Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` task by task with one main agent. User requests autonomous, economical execution; do not introduce routine subagents or a new design-approval cycle for already authorized work. Track task status in `docs/automation/state.json`.

**Goal:** Complete THE OPENING through bounded, verified tasks that survive usage windows and preserve its cinematic and truthful product requirements.

**Architecture:** Keep Astro rendered routes and lazy imperative Three.js. Shared draft owns domain state, renderer owns decorative pose/resources, and native navigation owns URLs/Back. Add provider-specific server work only after a real operations contract exists.

**Tech Stack:** Existing Astro 5, TypeScript, Three.js, native View Transitions, Node test/tsx and Playwright. No new app framework or duplicate motion library.

**Spec:** `docs/AUTHORITY.md` final D01–D14; current implementation/evidence in `docs/HANDOFF.md` and `docs/VERIFICATION.md`.

## Global constraints

- Native scrolling, zero pins for Scenes 1–3. Three rigid unequal hole-less leaves; sibling +Y/+Y/+X pivots; proof remains HTML and visible before runtime.
- Immediate selection; same selection does not replay; latest target wins; hidden/offscreen reentry has no stale time debt. Full stays animated.
- Light/reduced cold visits avoid scene runtime requests; failure never removes useful routes. At most one restoration attempt per visit; current zero-attempt terminal policy is valid.
- B image continuity: default 420 ms, upper bound 550 ms; no navigation ceremony delay. C receipt decoration: 450–650 ms only after durable accepted state.
- Contact name/email/message stay in session memory by default, excluded from anonymous draft persistence and exports. Acceptance, unknown transport and confirmed rejection remain distinct.
- First-view ≤1 MB and automatic home+scroll ≤2 MB are proposed encoded-body targets. DPR ≤1.5 desktop/1 mobile; frame targets p95 ≤25/40 ms require named-profile measurements. Current desktop software trace misses its target; never label this a release pass.
- Model/runner usage is opaque unless a genuine meter is available. No fixed task count, guaranteed runtime, paid fallback, or implicit model switching.

## Review focus

1. Old/corrupt/storage-unavailable direction notes: recover safely without losing a valid old feel/goal or persisting contact (A04).
2. Mid-animation hide/resize/Light switch: latest selection survives, no revived renderer or queued motion, native input remains usable (A02–A03).
3. Unknown/deleted project and service IDs: remove unavailable references honestly rather than exporting invented work (A04–A06).
4. Editing immediately after export or uncertain submission: exports retain their selected revision; original retry retains its immutable submitted payload and newer draft edits (A06/A11).
5. Modified click, Back, canceled second navigation, missing media/unsupported WebGL: ordinary useful route and focus/scroll win over decorative continuity (A01/A08).

## Task order and gates

A01 → A02 → A03 is scene reliability. A01 → A04 → A05 → A06 is useful brief work. Run that brief branch if A03 cannot progress without hardware. A07 → A08 is approved content; A09 is real-device validation. A06 → A10 → A11 → A12 is enquiry operations. A13 is publication. Dependency readiness and owner blocks are recorded separately in state; never wait doing nothing when another task is eligible.

The user explicitly requested continuous autonomous execution: checkpoint every bounded task, then continue eligible independent tasks even when meter visibility is unknown. Never invent a quota stop or wait for another go-ahead. Target roughly 15–35 minutes for a bounded patch as a planning heuristic; split at a working interface/test boundary if it is growing. Reviews can be separate invocations. Save partial state before a limit, not only at final completion.

### A01 — Portable, scoped browser verification (completed)

**Files:** modify `package.json`, `tests/browser.mjs`, `tests/visual-audit.mjs`, `tests/capture-posters.mjs`; create `scripts/preview-browser.mjs`; update `README.md`.
**Interfaces:** scripts consume `OPENING_BASE_URL`, optional `OPENING_BROWSER_PATH`; wrapper owns only its child preview process on `OPENING_PREVIEW_PORT` (default 4330). `npm run verify:browser` requires a built dist, starts preview, checks readiness, runs the browser suite and disposes its child on success/failure/signals. Preserve directly runnable browser scripts.

- [x] Reproduce current hard-coded-port dependence. Add a test/check that all three browser scripts use the supplied base URL and browser path; occupied port fails clearly without killing an unrelated server.
- [x] Implement the wrapper using Node child_process and bounded readiness retries; preserve real browser assertions. Do not add an AI runner, billing access or hidden success stubs.
- [x] Run `npm test`, `npm run check`, `npm run build`, `npm run verify:browser`; verify the child preview exits after both a normal run and an intentionally failing suite. Record actual browser/version, not inferred passes.
- [x] Commit task + checkpoint. This makes later checks reproducible in the actual SamPortfolio checkout.

### A02 — Production renderer and capture separation (completed)

**Files:** modify `src/features/hero/renderer.ts`, `client.ts`, `tests/capture-posters.mjs`, `tests/visual-audit.mjs`, `tests/browser.mjs`; create `tests/renderer-lifecycle.mjs` if lifecycle assertions cannot fit cleanly in the existing suite.
**Interfaces:** `createStage(host, feel, onFailure, options?: { capture?: boolean; diagnostics?: boolean })`; production defaults false. Add `capturePng(): string` that renders and reads synchronously in capture configuration. Minimal pose/selection diagnostics remain available for lifecycle checks; expensive projected-bounds/full-frame-array serialization is opt-in, outside normal per-frame DOM writes. Capture/trace runs are labeled and measured separately.

- [x] Pin current pose/repeat/hide/switch/context-loss behavior with browser assertions before changing buffer/reporting behavior. Capture a normal-mode frame and ensure it is nonblank, not merely a canvas node.
- [x] Remove default `preserveDrawingBuffer` retention and per-frame full projection serialization. Expose source capture through an explicit diagnostic adapter; do not enable capture overhead in normal production visits.
- [x] Regenerate posters only if visual output changes. Compare actual normal Full frame and actual Light poster; preserve geometry/pivot/proof contracts. Test Light-switch during loading, hidden reentry, rapid retarget, context loss and Back cleanup.
- [x] Run unit/check/build and the relevant browser/visual suite. Record before/after trace settings and costs; no promised frame improvement. Sol/high reviews renderer ownership/disposal and diagnostic parity before done.

### A03 — Measured, monotonic quality policy (engineering verified; device calibration pending)

**Files:** create `src/features/hero/quality.ts`, `tests/quality.test.ts`; modify `renderer.ts`, `client.ts`, `tests/visual-audit.mjs` and `docs/VERIFICATION.md`.
**Interfaces:** pure policy `observeActiveFrame(state, intervalMs, nowMs): QualityState`, with state `{level:'full'|'lower'|'light'; samples:number[]; badWindows:number; targetMs:25|40}`. Supply profile target 25 ms desktop / 40 ms narrow as proposed limits, not device-brand detection. Renderer reads level; visit controller persists terminal degradation for the visit.

- [x] Write tests for inactive/hidden gaps being excluded, fewer than 40 active samples never downgrading, two bad 40-sample windows downgrading one level, and level never silently increasing. Use a documented 15% downgrade-trigger tolerance above the 25/40 ms target to avoid one noisy boundary; report misses against the original target, not the tolerated trigger. Validate this choice against A02 traces before claiming physical calibration.
- [x] Lower framebuffer resolution first within the authored composition; if repeated evidence remains over target, show authored Light with honest status. Test preserved immediate choice and no oscillation/revival across navigation. No scene bytes disappear from accounting after a downgrade.
- [x] Measure normal-mode desktop/phone-emulated traces sequentially; report failed budgets. If software rendering alone makes calibration inconclusive, mark this task review_needed/device-blocked and continue A04 rather than guessing a physical-device pass.
- [x] Sol/high reviews the policy and lifecycle. A09 remains the physical-device release gate.

**Status:** `review_needed` for physical calibration; implementation/tests/focused review delivered. See `docs/automation/A03-RESULT.md`. Proceed to independent A04.

### A04 — Complete anonymous draft and legacy migration (completed)

**Files:** create `src/features/brief/types.ts`, `reducer.ts`, `persistence.ts`, `catalog.ts`; modify compatibility facade `draft.ts`, `tests/draft.test.ts`; create `tests/brief-migration.test.ts`, `tests/brief-reducer.test.ts`.
**Interfaces:** `BriefDraftV1` has schemaVersion:1, draftId, revision, feel, serviceIds, projectReferenceIds, goal, audience, desiredAction, constraints, optional budget/timing/referenceURLs, updatedAt. `reduceDraft(draft, action, nowIso)` returns the same object for a semantic no-op; each edit increments revision exactly once. `readDraft()`/`chooseFeel()`/`persistDraft()` remain compatible with hero consumers. New key `opening-brief-v1`; migrate validated old `opening-direction-v1` note, keeping ID/feel/goal, adding defaults and a documented revision increment. Never cast the old schemaVersion:1 note as a complete new draft.

- [x] Failing tests: valid old note preserves ID/feel/goal; corrupt/unknown-schema input returns a safe fresh draft; unavailable storage gives temporary status; contact/unknown object fields never survive serialization; unknown catalog IDs removed with an honest unavailable-reference notice.
- [x] Implement typed catalog of existing development/offer IDs with explicit approval status. Do not invent approved services or projects. Use URL parsing for reference URLs; accept only http/https, with a bounded list/length recorded in the contract.
- [x] Adapt existing hero persistence assertions to the new key; validate legacy migration in a real browser, selection revision and repeat no replay.
- [x] Run full unit suite/check/build and relevant migration/hero browser checks. Sol/high reviews compatibility/data ownership before done.

### A05 — Four-step brief editor (ready after reviewed A04)

**Files:** modify `src/pages/start.astro`, `src/features/brief/start.ts`, `src/styles/global.css`; create `tests/brief-browser.mjs`.
**Interfaces:** Goal / Direction / Scope / Review edit the same reducer-owned draft. Normal-flow sections with semantic labeled controls; `renderBrief(draft, storageStatus)` paints derived values, not a second domain store. Review exposes chosen feel, goal/audience/action/constraints, optional scope fields and reference availability.

- [ ] Browser assertions: step keyboard access; edit/back retains data; feel matches home; storage failure remains usable; error summary/focus points to invalid fields; no horizontal overflow at 320/390 px. No automatic scroll/layout tween.
- [ ] Implement all four steps and editable review. Offer data/reference selections stay labeled according to approval status. Preserve an honest unavailable-contact message; no fake Send action or receipt.
- [ ] Run full unit/check/build plus the brief browser journey at desktop/phone and reduced motion. Capture only changed screens. Sol reviews state/focus only, not a redundant rebuild.

### A06 — Snapshot print/JSON exports (ready after A05)

**Files:** create `src/features/brief/export.ts`, `tests/brief-export.test.ts`; modify `start.ts`, `start.astro`, `tests/brief-browser.mjs`.
**Interfaces:** `snapshotDraft(draft): Readonly<BriefDraftV1>`, `serializeDraftJson(snapshot): string`, `renderPrintableHtml(snapshot): string`. Both outputs use an explicit anonymous-field allowlist and the same selected revision. Standalone accessible HTML includes title, headings, selected values and print styles; no PDF dependency, sign-up or contact gate.

- [ ] Failing tests: angle brackets/quotes/script-like goal are escaped in HTML; snapshot stays at rN after source changes to rN+1; JSON/HTML identify the same revision; injected contact fields never export; unavailable reference status remains honest.
- [ ] Implement printable HTML download/print path with a useful fallback when a new window is blocked. Freeze a snapshot at the requested export action, not at a later asynchronous print callback.
- [ ] Browser test downloads and inspects JSON/HTML, edits afterward and confirms earlier exports unchanged. Unit/check/build; stronger focused review of serialization and privacy before done.

### A07 — Owner evidence pack (blocked on owner input)

**Files:** `docs/automation/OWNER-INPUTS.md`; create `src/content/projects.ts` only when evidence exists.
**Produces:** approved name/offer/contact; one project's slug/title/type/status/exact role/collaborators/media/rights/deliverable links/art-motion-engineering artifacts/limitations; supported outcome evidence if any.
- [ ] Audit supplied facts against source material. Record provenance/approval explicitly. Missing evidence remains blocked; do not create a fictitious flagship from repository metadata.
- [ ] Owner approval clears A07; this is factual approval, not repeated implementation permission.

### A08 — Genuine flagship and continuity (blocked on A07)

**Files:** `src/content/projects.ts`, `src/pages/index.astro`, new `src/pages/work/[slug].astro` or one static approved-slug page, `src/features/motion/navigation.ts`, `tests/browser.mjs`; preserve development-study route as a labeled artifact.
- [ ] Add media/title/type/role/status/provenance outside decoration before the scene; no extra filler projects. Use the approved slug consistently in route/image continuity.
- [ ] Test direct URL, missing media fallback, modified click, Back source scroll, focus, second navigation cancellation, protected crop and Light/no-JS journey. Actual media costs join the ledger.
- [ ] Unit/check/build + relevant desktop/phone navigation; commit approved evidence and content change together.

### A09 — Real-device and cross-browser validation (blocked on device access)

**Files:** `docs/VERIFICATION.md`, per-profile evidence files; only tune geometry/material/quality modules if measured findings justify it.
- [ ] Record actual hardware, OS/browser, viewport/DPR/network, normal capture settings and active trace method. Test first-valid-frame/poster correspondence, 25 ms desktop / 40 ms supported-phone p95 targets, fast/reverse scroll and native continuity (supported enhancement or complete normal route).
- [ ] Run actual keyboard/zoom/screen-reader and contrast checks with recorded scope. Phone emulation and Playwright WebKit cannot be labeled physical iPhone/Safari verification.
- [ ] Record failures and fixes; do not approve publication while profile targets or protected proof fail.

### A10 — Operations contract (blocked on owner/provider/deployment input)

**Files:** create `docs/ENQUIRY-CONTRACT.md`; approved private configuration is outside Git.
**Produces:** actual host/server adapter, datastore, authenticated owner retrieval, notification provider, origin/rate/retention policy and budget. Stable public POST `/api/enquiries`; no public personal-data receipt lookup.
- [ ] Determine a provider from the real deployment context and existing account authority; no automatic paid signup. Define exact request/response schema and integration test environment before A11.

### A11 — Durable enquiry operations (blocked on A10)

**Planned boundaries:** `src/server/enquiries/{accept,repository,outbox,notify}.ts`, host-specific `/api/enquiries` adapter, `src/features/brief/attempt.ts`, provider-backed integration tests. Exact adapter files are locked by A10, not guessed now.
**Interfaces:** immutable attempt key/payload/digest/submittedRevision distinct from editable draft; atomic enquiry + outbox acceptance and unique key+digest; accepted receipt ID/time only after commit; unknown versus confirmed rejection; secure owner retrieval even when notification fails.
- [ ] Test concurrent same-key retries, changed-payload conflict, commit-but-lost-response → newer draft edit → original retry, abort-after-commit, late acceptance, notification failure and owner access isolation against a real disposable datastore. Mocks do not prove persistence.
- [ ] Implement backend + client reconciliation from the A10 contract. No contact persistence by default. Newer edits remain unsent; retry original snapshot/key and do not erase edits.
- [ ] Sol/high implementation/review; full server/domain/real integration and browser journey checks. Do not mark done using a decorative receipt or synthetic successful HTTP stub.

### A12 — Accepted receipt signature (blocked on accepted A11)

**Files:** accepted receipt view/controller and scoped CSS/SVG, plus enquiry browser tests as fixed in A11.
- [ ] Actual accepted text/reference/actions available immediately; decorative rule/fold 450–650 ms; duplicate receipt no replay, reduced static, newer navigation cancels decoration. Unknown/rejected remain review and preserve edits.
- [ ] Test keyboard/route cancellation/duplicate acceptance and capture genuine local test acceptance labeled test data; no delivery claim.

### A13 — Production completion and publication (blocked on A08/A09/A12 and publication authority)

**Files:** truthful approach/about/privacy and 404/error routes, real project proof, README/handoff/report, provider-specific hosting config.
- [ ] Finish missing readable routes using approved facts and actual data practices; inspect auth/retention/owner retrieval and notification recovery. No invented résumé/results.
- [ ] Run complete relevant suites and deployed end-to-end checks, bounded network ledger, desktop/phone captures, ordinary navigation and failure modes. Publish only within explicit scope; a preview is not a production release.
- [ ] Record final URL/commit/provider/profile limitations and next maintenance actions. Never claim a universal performance/accessibility/recruiter pass.
