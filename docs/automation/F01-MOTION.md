# F01 — visible Full entrance

Chrome investigation found a real startup gap: the renderer started already settled. Actual feel changes worked, but first Full entry had no choreography. User reported Chrome; their device and selected mode remain unknown.

Implemented a one-time 1.1-second fold/hold/open entrance. The first frame matches the existing poster pose [-18,22,8], folds through [-65,50,45], then opens to the latest selected feel. This deliberately extends D07 fixed-pose startup under the user’s request for visible motion. Original geometry, sibling +Y/+Y/+X hinges, root, protected project/text bounds and 540/660/760ms input scores remain unchanged. A discarded wider fold crossed the protected envelope; the final fold passes sampled geometry checks without enlarging bounds.

The entrance clock starts on its first active rendered tick, so GPU setup or a delayed first frame cannot consume it. Retargeting uses actual current angles, repeated selection does not restart, scroll/Back/Light reentry does not replay, and hidden/disposed work cannot revive. Capture tooling remains settled. Reduced motion, terminal quality Light and render failure remain respected; each has an explicit visible explanation. The normal hint promises immediate direction updates, not guaranteed storage.

Validation: 33 unit tests, clean 51-file Astro check, 11-page build; eight motion profiles at desktop1440 and phone390, 13 core scenarios, quality and lifecycle suites all passed after the final rebuild. Delayed first-frame and pre-import selection tests cover actual startup races. Red failures and unedited Chrome WebM recordings are in evidence/motion/. Bounded stronger read-only structural review found no remaining blocker after the storage-copy correction; reviewer also sampled 15,189 protected geometry checks. Phone is emulation and rendering is software; no physical performance certification.

Current build renderer:511.51kB minified /131.09kB gzip; large chunk warning remains. Demand RAF stops when settled. Public verification completed after manual deployment:8 motion profiles,13 core browser scenarios and11 direct HTTP route/404 checks passed.

## Verified public checkpoint

Source 772e2991517b2a5336cd97cc7d88330bb4df67e1; Render dep-db4es3bncjis73cp61d0 live at 2026-10-09T13:37:42.540987Z. Unedited normal-renderer videos and phone/desktop captures: evidence/motion/render/motion/. Public report at13:38:56.040Z. Encoded cold home+bottom-scroll bodies:Full239,783bytes; Light/reduced106,604bytes. Individual LCP512/688/584ms respectively; unthrottled software observations, not a performance pass. Production diagnostic sample is absent (activeP95 null); do not infer GPU calibration. Idle RAF is tested stopped. The phone moving-frame recording was visually sampled.

Next concrete batch: named physical Chrome desktop/phone recording and quality calibration, then contact/contribution/asset-credit completion. These require unavailable device access or owner facts; do not manufacture evidence or enquiry delivery.
