# A05 — Four-step brief editor

Goal / Direction / Scope / Review now edit one reducer-owned anonymous brief. Normal-flow semantic fieldsets and keyboard-accessible step buttons preserve editable controls. Review derives values from the same draft. Goal is required for review; invalid URL buffers stay in the DOM/error map, never the valid domain draft. Error summaries link to the relevant step/field and receive focus on a blocked review attempt. No scroll/layout tween, contact gate, Send action or fake receipt.

Approval and development-reference labels remain explicit. Storage failures show a temporary brief while keeping editing/export usable. Restored-page synchronization reads a newer saved revision on persisted pageshow; unavailable storage preserves the current temporary state. A regression first reproduced missing synchronization, then passed after the handler. Focused Sol/high state/focus review found no additional defects.

Actual final checks: 25 unit tests passed; type checks clean; three-route build retained renderer chunk warning; four brief browser profiles passed (desktop1440, phone390 reduced-motion, narrow320 storage-unavailable, empty-goal/error focus and explicit restored-page event). Native home/change-direction/Back retains goal and direction. Existing 13 browser scenarios passed after final source changes. Captures/raw results in evidence/brief-* and evidence/browser-results.json. Main agent inspected phone review capture. These checks are not physical-device or accessibility conformance certification.

Next: A06 frozen revision-consistent JSON and standalone printable HTML. User requested continuous execution; continue without another go-ahead.
