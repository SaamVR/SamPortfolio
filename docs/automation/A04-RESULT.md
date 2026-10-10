# A04 — Full anonymous schema and migration

Implemented BriefDraftV1 with goal/audience/action/constraints, direction, catalog selections, optional scope and HTTP(S) references. Canonical reducer increments one revision per semantic edit and preserves identity for no-ops. Pending offer/development catalog entries are explicitly unapproved. New key is opening-brief-v1; validated legacy opening-direction-v1 migrates ID/feel/goal with revision +1, retaining original key. Full shape validation prevents treating a legacy schemaVersion1 note as a complete brief.

Bounds: goal/constraints 2000 characters, audience/action 1000, budget/timing 300, up to eight URLs of 2048 characters, up to 20 input IDs, bounded ID/revision/date. References use parsed HTTP(S) without credentials. Serialization explicitly selects anonymous fields; contact and unknown fields are omitted. Unknown catalog references produce availability notices. Reducer rejects invalid edits instead of persisting them.

Actual checks: new tests failed before implementation; final 25 unit tests passed, type checks clean, three-route build passed with existing renderer chunk warning. Real browser migration/hero selection/repeat passed after final recovery fix. Existing 13 browser scenarios passed before that recovery-only fix; final editor batch will run them again.

Focused Sol/high data review identified unsaved corrupt recovery mislabeled saved, plus empty/corrupt legacy branches missing notices. Regression failed, then passed after status/notice correction. Corrupt originals are preserved until a user edit; fresh empty drafts persist only when a write succeeds. No other confirmed review findings.

User explicitly requested continuous autonomous work. Repository/runbook wording now checkpoints each task without a mandatory one-task stop. This changes no merge/deployment/billing authority. No live quota or automatic scheduler is claimed. Next: A05 editor, then A06 revision-consistent exports.
