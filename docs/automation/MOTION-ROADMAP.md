# THE OPENING — next motion batches

Planning checkpoint:2026-10-09. Based on application d639cd593697c0d1f38d0ab640d15d8725ff3531 and docs/AUTHORITY.md D01–D14. User requested more animations, motion and transitions. This is a proposed execution order, not implemented features or completed validation. Existing Full entrance deliberately extends D07 under the earlier motion request; no further automatic hero ceremony is proposed.

## Direction

Extend Cut / Fold / Reveal into work inspection and the useful brief. The desired result is visible, authored motion when interacting with real work, with clear continuity and a responsive product. Keep Astro/native navigation, the original three-leaf asset, existing feel scores, native scrolling and zero pins. No new animation library is required for these batches.

Three approaches considered: concentrate further movement in the hero (limited improvement to the rest of the journey); add generic entrance effects everywhere (repetitive and can obstruct proof); extend the existing visual grammar at specific meaningful actions (recommended). Use small CSS feedback, scoped WAAPI/SVG accents and native cross-document image continuity. Global text entrances, scroll hijacking, looping scenes and extra loading ceremonies are outside this roadmap.

## M01 — Links, cards and selected-control feedback (completed)

Implemented and publicly verified. Existing .button, .text-link, .work-tile and .feel-controls in src/styles/global.css; targeted markup only where an inner icon/wrapper needs identification.

- Fine-pointer hover and keyboard focus: inner arrow travels up to4px, underline draws over160–180ms, card’s decorative corner rule responds. Link hitbox, text and project screenshot remain fixed. Existing focus outline is immediate.
- Press:120ms inner-icon response, including touch. No moving outer button, hover-only action or hidden caption.
- Feel pressed state stays immediate; animate only an inner rule over180ms. Repeated selected feel does not trigger choreography. Do not add a second writer to leaf pose or route image.
- Light uses immediate color/underline feedback; reduced motion uses static focus/selected styling. Keyboard users get the same meaningful affordance without pointer dependency.

Acceptance:1440/390/320, keyboard and touch emulation, repeated feel, rapid hover/focus changes, fixed clickable bounds and readable project proof. CSS-only scope needs no routine subagent. No timing/visual pass assumed yet.

## M02 — Chapter and gallery accents (completed)

Depends on M01. Introduce one small reusable DOM decoration controller in src/features/motion/decorations.ts; optional decoration markup in index.astro. Use a single IntersectionObserver, not an animation frame loop.

- First view of the work chapter draws a chamfer/cut rule over280ms. A card’s small corner and project index can settle over220ms; no more than three decorative accents overlap, with40ms maximum spacing. Essential content is always visible.
- Decorate the closing invitation with the same cut rule over280ms, rather than another 3D opening.
- Normal-flow text, screenshots, link targets and card layout do not move or fade from an initially hidden state. Fast scrolling marks skipped/offscreen accents complete, with no queued catch-up. Reverse scroll and Back do not replay completed accents during the visit.
- Light/reduced/no-JS render the complete static decoration. Pagehide, hidden document and policy changes cancel active decoration to its final state. BFCache resumes completed state. No staged delay to lazy media loading.

Acceptance: first visit, fast forward/reverse scroll, viewport resize, repeated reentry, Back/BFCache, policy change mid-animation and no idle scheduler. Save actual video and captures. This controller can serve M04; avoid duplicate observers.

## M03 — All-project image continuity

Depends on M01; separate higher-risk navigation batch. Actual files: src/features/motion/navigation.ts, index.astro, src/pages/work/[slug].astro and global.css. Currently only StayPilot has a matched image path; other six gallery routes navigate ordinarily.

- Extend card-to-case correspondence to SM Manager, EcomCMS, TingTune, NOVA, ServiceDesk AI and EZComo. Snapshot the existing real image container; default420ms, maximum550ms. Preserve contain-fit and captions; no screen stretching or invented alternate assets.
- Give only the actual selected source/destination pair a shared name. Preserve StayPilot’s stage-versus-work source selection. Restore the correct source card and native scroll on Back; avoid duplicate names and simultaneous snapshots of every gallery image.
- Modified clicks, direct URLs, external demos, missing images, unsupported API and preparation taking over150ms use ordinary navigation immediately. The browser owns navigation/cancellation; no prevented link click, delayed route commit or screenshot-as-loading-screen.
- Case-to-case links between different projects do not pretend their images are the same asset; retain ordinary navigation/root transition instead.
- Keep both-source-and-destination /start/ transition opt-out. Its public native cancellation defect was already fixed; this batch must not reintroduce it. Light/reduced skip animated correspondence. Route focus is independent of animation completion.

Acceptance: seven forward/Back pairs, hero versus work StayPilot sources, direct URLs, image failure, modified click, canceled second navigation, case-to-brief and both policy alternatives. Desktop/phone captures and actual public Chrome recordings. Required bounded stronger sequential review for route/lifecycle structure, then local/public verification before deployment.

## M04 — Case-study reading rhythm

Depends on M02. Use its decoration controller on existing .decision sections and .case-facts; do not create a new carousel, tabbed reader or rearrange case evidence.

- Section index/cut line draws over220–280ms as an engineering decision enters view. Add a static final corner around the evidence/limitations panel with the same brief accent.
- Keep headings, factual text, media and credits continuously readable. No sliding paragraphs, moving focus, page-height tween or proof masks. At most one section accent starts at a time; skipped sections settle immediately.
- Same reentry/disposal/Light/reduced/no-JS policies as M02. If reuse needs a second ownership system, stop and simplify the design.

Acceptance: long case scroll, fast reverse, public prototype screenshots and labeled diagrams, narrow widths, missing media, keyboard links and unchanged caption/role visibility. Do not rerun unrelated enquiry/export tests for a decoration-only change.

## M05 — Brief step and export feedback

Independent of provider setup; follows M01. Actual files: start.astro, src/features/brief/start.ts and scoped styles; reuse the existing reducer and step flow.

- Add a small decorative SVG folded-document diagram to the brief aside, with four composed states for Goal/Direction/Scope/Review. Animate only that inner graphic over260ms (inside D08’s220–320ms range). Use the same compact diagram on narrow screens without overlaying controls.
- Commit step, aria-current, validation and focus immediately using existing show(). Rapid changes cancel and retarget the graphic from its displayed state. Same step does not replay. Hide/Back/policy change settles the current state.
- Export may draw a short180ms completion rule only after the actual local file/download action succeeds. Existing revision-specific status remains authoritative. Print remains native and immediate; cancellation/blocked popup keeps the existing truthful fallback. Never label an export as a submitted enquiry.
- Animate no form layout, input, textarea, legend or error summary. Light/reduced shows the current diagram immediately. No cross-document transition into the brief; the diagram is independent local enhancement.

Acceptance: rapid forward/back, invalid review/focus, storage unavailable, project-reference query consumed once, corrupt-draft protection, edit after export and immutable downloaded revision. Local/public desktop and phone journeys. Focused structural review if introducing a new controller/lifecycle boundary; no domain-state duplicate.

## M06 — Optional subtle spatial pointer response

Last, experimental; not needed to start M01–M05. Touch users already receive complete interactive behavior. Actual files: hero/renderer.ts and geometry/pose/browser checks.

- Only on fine-pointer hover, Full mode, visible stage and settled pose: a dedicated neutral parent may provide up to±2° yaw/±1° pitch (below D06 ceilings). Existing leaf hinge angles and original asset remain owned by PoseController. No camera/light-rig movement.
- Pointer exit settles neutral over160ms; new feel input returns pointer parent to neutral before any hinge retarget. Scroll handoff, hide, render failure, terminal Light and disposal clear it immediately. No idle RAF after settling and no competing writer.
- Begin with projected protected-bound sampling at rest, near limits, during reset and input interruption. If the existing proof envelope cannot accommodate this without moving/enlarging it, omit the feature. Keep this an explicit optional study, not a promised release feature.

Acceptance: real frame captures, pointer/input interruption, touch/no-pointer paths, zero at handoff, disposal and envelope checks. Required stronger structural review. Software results do not close named hardware performance gates.

## Existing blocked signature

The accepted enquiry-to-receipt fold remains450–650ms only after real durable acceptance (A11→A12). Receipt text/reference/actions appear immediately. No new fake send/receipt animation is scheduled while enquiry provider/retrieval/retention is unresolved.

## Efficient execution and evidence

Implement one bounded batch at a time and checkpoint source SHA, changed files, actual checks, failures, recordings and next action. M01 then M02 provide the quickest visible improvement. M03 has the largest continuity payoff and a separate review gate. M04 reuses M02; M05 is local product feedback. M06 is optional and can be dropped.

Use CSS for simple feedback, one scoped WAAPI/SVG controller for finite decoration, and existing native transitions for routes. Add no dependency by default. Measure actual cold body costs before/after using the same journey and capture settings; do not promise a frame-rate gain. Final state stops animation scheduling. Light/reduced/failure remain authored alternatives, not an excuse for static-only Full.

Lower-cost runner choice: GPT-6 Luna/medium/normal for bounded markup/CSS and source-mapped tasks; GPT-6.1 Sol/high only for the required focused structural reviews or an escalated failure. The runner/picker selects models; this document does not switch the current model or reset usage. No fresh usage meter is available, and no automatic scheduled execution is configured.

Do not mark these batches done until implemented and checked. Full release still requires authentic contribution/asset credits, named physical desktop/phone calibration, screen-reader/Safari review and genuine enquiry operations.

M01/M02 completion evidence: `docs/automation/M01-M02-MOTION.md`, applicationbc1f7e1 and `evidence/motion-expansion/render/`. Implemented gallery accents animate the small corner paths; project indices remain static. Next implementation:M03. M03–M06 remain planned, not delivered.

## Creative correction — 2026-10-10

Owner reports too little of the intended Lusion-inspired motion. The criticism is valid: M01/M02 are useful feedback, not the cinematic/art-direction finish. M03 now has actual seven-project forward/Back image correspondence (local validated, public pending). Prioritize an authored original-frame material/spatial-response study next, before further small case-reading accents. Preserve original sibling pivots, proof envelope, native scrolling/zero pins and useful touch behavior. M06’s bounded rest-only pointer response may support that study; it is not a substitute for material/mass/light staging. No unmeasured frame-budget pass or finished reference-level quality claim. M04/M05 remain planned. Exact asset/material choices require an original captured study against Full and poster alternatives, not borrowed Lusion assets.
