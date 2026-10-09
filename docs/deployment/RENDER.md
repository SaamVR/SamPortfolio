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
