Resume THE OPENING in SaamVR/SamPortfolio on feat/opening-scenes-1-3.

Read AGENTS.md, docs/automation/state.json and only the chosen task in docs/superpowers/plans/2026-10-08-autonomous-portfolio.md. Retain the existing Astro/TypeScript/Three.js slice. Use one agent and normal-speed mode.

1. Check checkout, local changes and whether another worker is active. Preserve unfinished work. Reconcile any stale in_progress task before starting another.
2. Respect genuine usage/reset metadata supplied by the runner in .codex-local/usage.json. If missing/stale, checkpoint each bounded task and continue eligible work under the user's explicit continuous-execution instruction. If a shared allowance is exhausted, checkpoint and exit; never try another model/account/API billing to evade it.
3. Choose the first ready task with satisfied dependencies. Reassess blocked tasks only when their recorded missing inputs change. Skip blocked owner-evidence/provider/device tasks; continue eligible engineering work. If none is eligible, report the exact missing input and exit.
4. Mark in_progress and record the next action before implementing. Follow the task's tests and acceptance conditions; no replanning, new framework or fabricated evidence. Save state between meaningful substeps, not just at the end.
5. Run the checks appropriate to the change and all checks required by that task. Inspect results. Do not repeatedly run the same suite without a new change/failure. On two focused failed attempts, save a focused review request and exit.
6. Update state with actual evidence, limitations and next action. Commit verified task changes locally. Mark done only when acceptance and required review are satisfied. A pending review can be `review_needed`; dependencies requiring that review remain blocked.
7. End with task ID, commit, checks, unresolved issues and next eligible task. Push verified feature-branch commits without force and update the one draft PR under recorded scope. Do not merge, deploy or incur paid usage unless later explicit user authority is recorded. Continue eligible tasks after each verified checkpoint; do not idle or poll until a reset or invent a quota stop.

The runner must select the model and schedule. Default routine work: GPT-6 Luna / medium / normal speed. Required focused reviews: GPT-6.1 Sol / high. Do not claim an automatic model switch or scheduler activation merely from this prompt.
