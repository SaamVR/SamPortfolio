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

Render MCP currently has no selected workspace. It returned: “ask the user which workspace to use — do NOT pick one yourself.” Only My Workspace is visible. Configuration is ready; workspace confirmation is the connector's required final input, not another implementation go-ahead.

Local validation: four-page build passed (including404.html), and actual preview HTTP checks passed200 for all three direct routes and404 for an unknown path with authored recovery content. Existing renderer chunk warning retained. Repository is public and branch is published. Public Render verification has not run because no service has been created before workspace confirmation.
