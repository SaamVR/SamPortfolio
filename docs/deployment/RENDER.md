# Render preview deployment

User explicitly requested Render deployment and continued autonomous work on 2026-10-08. Publish the currently labeled development preview; no approved flagship/enquiry claims, paid services, branch merge or genuine release certification are implied.

Concrete configuration:
- Source: https://github.com/SaamVR/SamPortfolio, branch feat/opening-scenes-1-3.
- Service: static site, name the-opening-preview; publish dist.
- Build: npm ci --include=dev && npm run build.
- Environment: NODE_VERSION=22, SKIP_INSTALL_DEPS=true (explicit npm ci owns install).
- Manual deployments: autoDeploy=no, avoiding rebuilds on documentation checkpoints. Trigger a deploy after a verified app change when appropriate.
- No SPA catch-all rewrite: Astro generates separate /, /work/opening-study/ and /start/ documents; unknown paths must remain404.
- No database, worker, secret or paid compute is needed for this static slice. Static service cannot itself accept durable enquiries.

Before creation, inspect the confirmed Render workspace for an existing matching service. After creation, record actual service/deploy ID, URL, deployed commit and status, then verify HTTPS200/direct URLs/404 and public browser behavior. Preserve Render logs/build failure evidence instead of inventing live status. Hosting unblocks deployed-host checks but not owner evidence, physical hardware or the remaining enquiry datastore/retrieval/destination contract.

## Actual deployment — 2026-10-09

Live labeled development preview: https://the-opening-preview.onrender.com

- Service: srv-db45hirl550s73akul50; deploy: dep-db45hjbl550s73akulp0.
- Source commit: 488c0fbccf9b5fa36a3824a3ac1127f445b5431b. Documentation/test-provenance checkpoints after this commit are not deployed automatically.
- Workspace: My Workspace, the sole accessible workspace. After the connector initially requested workspace confirmation, the user renewed the instruction to make autonomous decisions. The main agent selected the sole workspace under that delegation, inspected existing services and created this new static site without modifying others.
- Render reported live at 2026-10-09T03:01:15.686643Z; deployment took 46.49 seconds. Fresh npm ci and four-page Astro build completed with Node22.23.3. Existing large-renderer chunk warning remains.
- Public direct routes returned HTTP200; unknown route returned authored HTTP404. No catch-all rewrite was needed.
- Public Chromium suites passed13 scene/navigation/fallback scenarios, four brief profiles and export journeys at1440/390px. Desktop1440 and phone390/320 captures are saved in evidence/render; desktop and390 stage captures were visually inspected.
- Actual encoded cold home+scroll bodies: Full154,275 bytes, Light/reduced21,301 bytes. LCP in those individual runs:436/388/372ms respectively. These unthrottled headless observations do not certify field or physical performance and are not comparable to differently compressed localhost responses.

Reproduce public checks from an isolated directory with an evidence subdirectory, using OPENING_BASE_URL=https://the-opening-preview.onrender.com and the browser scripts' absolute paths. This workspace requires NODE_USE_ENV_PROXY=1 for Node fetch; the initial unproxied HTTP attempt failed ECONNREFUSED, then the proxied suite passed. No app repair was needed.

Results and synthetic anonymous fixtures: evidence/render/deployment.json, deployment-http.json, browser-results.json, brief-browser.json and brief-export-browser.json. Phone captures are emulation; real GPU, Safari/Firefox, physical devices, OS print dialogs and accessibility conformance are not certified. Authentic portfolio proof/contact approval and enquiry operations remain blockers. This static preview does not accept enquiries.

## Keyboard contrast update — 2026-10-09

Current deployed source8d71c0ae328effa312bbee037e0670ee64e92a52, deploydep-db46d6nlot8c73fvhk00, live03:59:45.883446Z. Contextual focus colors correct coral-on-paper2.73:1. Local/public16 keyboard-focus/reflow profiles passed; public direct HTTP200/authored404 passed. Sampled contrast5.68–15.50:1. First browser request after deploy saw stale focus CSS; inspected current hashed CSS and repeated the unmodified suite successfully. This is limited keyboard/layout preparation, not physical/cross-browser or full accessibility certification. New evidence: evidence/accessibility/render/ and render-deployment.json.

## Seven-project collection — final verified deployment

Source b3e4b0a48bec6f51b47733f24c4247da5c248562, deploy dep-db47fru0tbcc73ddmneg, live2026-10-09T05:13:45.189883Z. Seven case routes at1440/390/320,13 core scenarios, two-width export journeys and11 HTTP checks passed publicly. Case-to-brief entry uses ordinary navigation without decorative transitions on either document; hero-to-case image continuity remains enabled. Early reveal tracking separately handles delayed modules. Earlier failed collection deploys and disproved URL-cleanup hypothesis are recorded in docs/PROJECT-EVIDENCE.md.

Evidence: evidence/portfolio/render/. Actual cold home+bottom-scroll encoded bodies Full239,365 bytes, Light/reduced106,391; individual lab LCP416/428/432ms. Middle gallery images are not all fetched by this journey. Four screenshots plus three diagrams total346,071bytes. Chromium151/SwiftShader, phone emulation, unthrottled: no physical/cross-browser/field certification. Static hosting still does not accept enquiries. Documentation-only later commits do not change the deployed app source.

## Shusmoy attribution and cross-engine preparation

Current app source01e3c441bbe0b5708f2fd50f19a97406372dabb4, deploydep-db48m4lg1s2s738kvdd0, live2026-10-09T06:35:22.969401Z. Home attribution, metadata and shared footer publish the owner's supplied name. All eight live Linux Firefox157/WebKit27.2 profiles and11 HTTP checks passed. Evidence: evidence/cross-engine/render/. Initial Firefox trust failure occurred before app load and is retained separately; the test profile trusts the existing workspace proxy CA with HTTPS validation enabled. WebKit uses temporary local Linux libraries, not Safari. Physical release and enquiries remain blocked. Earlier source-specific costs are historical observations, not remeasured for this attribution-only update. Later documentation/test-only commits are not automatically deployed.

## Paper-note contrast and automated accessibility audit

Current app source8cc9eed1758558af64f8fc18613445f550ca02da, deploydep-db4e9du0tbcc73e3dh30, live2026-10-09T12:57:53.273172Z.404 note contrast corrected1.85→5.3255:1. Fresh29 units, clean check,11-page build.84 local and84 live axe/keyboard profiles pass, plus11 live HTTP checks. Widths1440/390/320; Chromium allcases and eachbriefstep; Firefox/WebKit representative shared-template routes and eachbriefstep. Development-only audit dependency does not ship to public assets. Captures/results and incomplete manual targets: evidence/audit/render/. Stage/geometry/state/navigation runtime unchanged; no new physical/Safari/screen-reader/field-performance or full WCAG pass. Documentation-only later commits are not automatically deployed.

## F01 visible motion checkpoint

Current application 772e2991517b2a5336cd97cc7d88330bb4df67e1; deploy dep-db4es3bncjis73cp61d0; live 2026-10-09T13:37:42.540987Z. Public8 motion profiles at1440/390,13 core scenarios and11 HTTP checks passed. One-time matched-poster fold/open entrance deliberately extends D07 startup; original geometry/protected proof bounds and repeat/retarget/reentry policy remain. Actual unedited recordings, captures, reports and cost observations: evidence/motion/render/. No physical performance or full publication claim; contact/credits/device/enquiry gates remain open.

## P01 privacy preparation — 2026-10-09

Source d639cd593697c0d1f38d0ab640d15d8725ff3531; Render dep-db4gjl3tqb8s73f6soig; live 2026-10-09T15:36:14.333632Z. Clean53-file check;12-page build. Local/public privacy route checks at1440/390/320, existing draft unchanged, no renderer request/form, keyboard skip/focus, scoped axe with no violations/incomplete targets, four-route footer bounds and no-JS navigation pass.12 public direct HTTP routes/authored404 pass. Source-checked actual data practices; no enquiry service or retention claim added. Captures/reports: evidence/privacy/render/. Physical-device/screen-reader/full conformance and A13 publication gates remain open. No geometry/motion runtime change; prior motion/cost evidence retains its recorded source SHA.
