# Scenes 1–3 execution

Authority: AUTHORITY.md final register D01–D14; appendices are historical.

Audit: /workspace was empty on 2026-10-08. No repository URL, AGENTS.md, existing code, project pack, contact address or identity supplied. Created local repository; no prior work overwritten. No remote configured.

Implementation choice: Astro static HTML with TypeScript browser islands rather than an unnecessary application server. Native links + cross-document View Transitions provide case-study continuity without a route interception layer. Imperative lazy Three.js owns the bounded stage. Small shared draft module owns feel/revision. No GSAP needed: one sampled imperative pose controller implements the authored score. System type families, no font download/license dependency.

Architecture → actual files:
- rendered content/routes: src/pages/{index,work/opening-study,start}.astro + src/layouts/Base.astro
- geometry/pivots/projection: src/features/hero/geometry.ts
- sole pose writer: src/features/hero/pose.ts
- renderer lifetime: src/features/hero/renderer.ts
- mode/visit policy, lazy loading + scroll graphic: src/features/hero/client.ts
- navigation enhancement: src/features/motion/navigation.ts + CSS View Transitions
- immediate direction and persistence: src/features/brief/draft.ts
- style/composition: src/styles/global.css

Checklist:
- [x] Render readable hero / native work/contact / case route before scene.
- [x] Author three unequal hole-less leaves + pose controller + exact posters.
- [x] Immediate selection / repeat no replay / interrupt / offscreen reentry.
- [x] Native local chapter correspondence and case-image route continuity.
- [x] Light / reduced / render failure; one renderer; resource cleanup.
- [x] Sample projected envelope and protected proof/text bounds.
- [x] Desktop / phone / narrow browser checks, captures and cost ledger.
- [x] Durable results, limitations, publication blockers and next batch.

Publication blockers: approved identity/offer, authentic flagship media, exact contribution/collaborators/provenance/rights and case-study evidence; real contact destination. This slice offers an editable anonymous direction note/export, not enquiry submission. No invented client, results, receipt, or working contact delivery.

Verification is scoped to the local production build and software-rendered Chromium. See VERIFICATION.md for missed targets and unvalidated publication gates. Checkmarks do not certify publication or physical-device performance.

Repository supplied after first slice: https://github.com/SaamVR/SamPortfolio. Initial upstream main cebab7f contains README only; no AGENTS.md or existing implementation. Integrated the slice into /workspace/SamPortfolio on feat/opening-scenes-1-3, preserving upstream history and README description. NEXT-BATCH.md records ordered tasks and economical model allocation.
