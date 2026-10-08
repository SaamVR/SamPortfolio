# Autonomous runs and Codex usage windows

## What is ready

One persisted feature branch, a dependency-aware task queue, an execution prompt, explicit evidence gates and restart instructions. Task code is not implemented merely by writing this queue. Scheduler activation is a separate operation and must be confirmed by the actual runner.

User delegated scope choice: use feature-branch pushes + one draft PR as the best option for recoverable work. Keep merging, production deployment, paid provider signup and credits/resets pending explicit authority. Do not request implementation permission again for tasks already inside the approved brief.

## Usage facts versus project policy

Verified against official OpenAI documentation on 2026-10-08:
- Where both five-hour and weekly allowances apply, both must have usage left. A window is not a fixed number of tasks or five continuous compute hours.
- For applicable plans, the next five-hour window starts with the first Work/Codex message after the previous window ends; displayed account reset times are the source of truth. Limits differ by plan; do not assume every account has a five-hour cap.
- Models/settings/context/tools/task complexity affect usage. Switching models does not restore a shared pool. Fast mode uses more included allowance; use normal speed for this project.
- An active turn may continue after reaching a limit subject to fair-use; do not rely on that as unlimited execution. Save progress early.
- API usage is separate billing. Do not silently substitute API-funded jobs, credits or purchased resets for exhausted included usage.

Sources: [usage/model guidance](https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex), [Codex plan usage and /status](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan), [project scheduling](https://developers.openai.com/codex/app/automations).

The user's actual meter/timezone report is stored privately in `.codex-local/usage.json`; it is ignored by Git. Weekly reset date without a clock time is not an exact timestamp. User reports are snapshots, not a live meter.

## Conservative policy (our heuristic, not an OpenAI guarantee)

Evaluate the more restrictive of the applicable five-hour/weekly pools using genuine, recent data:

| Remaining | Action |
|---|---|
| ≥30% | One bounded implementation task, check, checkpoint, then reassess before another |
| 10–30% | At most one small routine task; prefer queue/verification/remote checkpoint; avoid starting renderer/backend changes |
| <10% or known exhausted | Finish a small safe checkpoint/check already in progress; start no new implementation or stronger review |
| Unknown/stale | One bounded task per externally launched invocation; do not invent a percent or an automatic stopping mechanism |

Reserve roughly 10–15% for correction/checkpointing as a target, not an enforceable quota. If usage is not exposed to the runner, these percentage decisions cannot be automatic; the run must disclose that and use the one-task limit. Never call a model just to poll an exhausted quota.

Planning target: 15–35 minutes per bounded patch; a 25-minute soft checkpoint reminder is useful. This is not a hard kill time or guaranteed model/usage duration. Do not forcibly terminate a write/test mid-step to meet a made-up budget. Stop at a safe boundary and preserve any partial diff.

## Scheduling

Use the exact displayed reset plus a 5-minute buffer for the **first** scheduled continuation. Recheck actual availability before substantial work. Do not blindly repeat every five clock hours from that time: the next window may start with a later first request, while weekly exhaustion can still block it.

Select a project-capable runner:
- Desktop project task: repository must be on that machine; computer on, app running. Select the intended feature checkout and normal-speed Luna/medium in runner settings. One worker only. If using isolated worktrees, explicitly import the latest task-state commit and integrate each completed worktree before the next; otherwise tasks repeat against stale state.
- Always-on CLI: installed/authenticated Codex, checkout and an OS scheduler that can launch `codex exec` with WORKER-PROMPT.md on stdin. CLI help was inspected here; it supports `-C`, `-m`, `-c model_reasoning_effort`, sandbox mode and last-message output. Do not activate an unreviewed blanket retry daemon or bypass approvals/sandbox globally.
- Web scheduled task: official docs say it cannot directly operate on a folder on the user's computer or preserve a local worktree. A reminder/connected-GitHub inspection is useful but is **not** a confirmed project coding runner. Do not claim such a task will resume `/workspace/SamPortfolio` unless project execution is actually supported and verified in the target surface.

This session can prepare/push repository state; it does not guarantee this execution container or a daemon survives after the chat ends. Resetting account usage does not itself relaunch a coding task. A timer in this response is not an installed scheduler.

No scheduler has been activated at preparation time. Runner choice is the remaining input. Once confirmed, perform one genuine trial/checkpoint, configure one reset-time continuation, inspect the scheduler result and record its ID/time/model/scope in private metadata. If the available scheduling tool lacks project/model configuration, state that limitation; do not pretend a prompt changed its model.

## Per-run checklist

1. Acquire the runner's single-worker lock; never launch concurrent coding or auto-retry over a live worker.
2. Inspect HEAD/status and queue. Recover a partial task first; do not reset legitimate edits.
3. Check real budget metadata if available. Skip unchanged owner/device/provider blocks; pick first eligible task with done/reviewed dependencies.
4. Save task ID, changed files and next substep before significant work; implement that bounded deliverable.
5. Run relevant checks. Complete the task's required checks, not every browser screenshot repeatedly. Stronger review applies only to listed ownership/serialization/enquiry changes.
6. Save evidence + exact failures; mark done only when accepted/reviewed. Commit and push feature branch without force. Preserve a dirty partial patch on interruption, then recover it in the same checkout.
7. Update the existing draft PR with consolidated milestones, not noisy comments/duplicate PRs. PR title/body must describe the current delivered behavior and actual checks; no speculative future completion claims.
8. Exit at the invocation boundary. At known exhaustion, schedule/relaunch only after the reported relevant reset; no busy retry, sleep loop, second account or paid fallback.

## Checkpoint/recovery contract

`state.json` stores repository/branch/baseline, current task/status/attempts, dependency state, changed files, last commands/results, review need, next action and blockers. Commit descriptions/evidence are primary; stale JSON never overrides a real diff. A `currentTask` claim from a dead worker is recovered, not blindly repeated. When refreshing a checkpoint, its stored HEAD is the last known source checkpoint; it cannot name the hash of its own not-yet-created commit.

Project blocks: owner evidence/identity/contact pack, named physical devices/browser access, operations/provider contract. Account blocks: actual allowance/reset. Runner blocks: no authenticated scheduled project execution. Report these separately so the user can resolve the right one.

## Model allocation

- Routine A01/content/brief UI/export implementation: GPT-6 Luna, medium, normal speed.
- A02/A03/A04/A06 and enquiry state/privacy review: GPT-6.1 Sol, high, one focused diff review. Until that review occurs, record review_needed; a prompt is not an automatic model switch.
- Enquiry core A11: Sol with appropriate effort, then focused review. Astra only for a demonstrated difficult issue after escalation.

Select real available model IDs in the user's runner; no promised exact dollar savings or message counts. Prefer a fresh small context per independent task, using the task-specific section and handoff. Do not reload every historical appendix for routine work.
