# A09 preparation — keyboard focus contrast

2026-10-09. This is independent accessibility preparation, not completion of A09 physical/cross-browser release validation.

The public work-title link's coral focus ring measured 2.7314:1 against paper and failed the new sampled3:1 focus contrast regression. The root cause was one global coral outline applied to light and dark surfaces alike. Introduced a contextual focus color token: coral on dark, ink on paper-page/work-section. The token also reaches text fields, checkboxes, step legends and error summaries; geometry/choreography unchanged.

After correction,16 route/width profiles passed at1440/720/390/320px across home, case, brief and authored404. Checks exercise native skip behavior/sequential main focus, focus-visible rings on sampled links/buttons/fields, keyboard brief step/review and no horizontal overflow. Fresh build generated four pages; type checks0errors/warnings/hints. Existing510.90KB renderer warning remains.

A first local suite attempt incorrectly expected skip to be first Tab after every route: case/brief intentionally focus their destination heading on pagereveal. Corrected the test to exercise native skip behavior after keyboard-established focus on those routes; app navigation was preserved. No false application defect claimed.

Evidence: evidence/accessibility/results.json and brief-focus-phone.png. Viewport widths model layout space, not an actual zoom or screen-reader test. No physical device, Safari/Firefox, full text/nontext contrast audit or accessibility conformance pass. Deployment/public verification pending at this source checkpoint.
