# A09 cross-engine preparation — 2026-10-09

Partial release preparation, not completion of A09. Owner supplied public name Shusmoy during this run; integrated into home attribution, default title, shared description and footer. Contact/roles/asset credits remain unavailable. No geometry, state ownership or navigation behavior changed.

Local Firefox157 and Playwright WebKit27.2 each passed four profiles: desktop1440 and phone390 normal navigation/selection, plus390 Light and reduced. Cases decode actual media and stay within layout bounds; native Back preserves selection; known brief query is consumed, manual removal persists across reload and review downloads JSON. Zero unexpected page errors. Full renderer readiness/performance is not an acceptance check in this bounded suite. Clean Astro/TypeScript and11-page build passed.

The initial Firefox run stopped on a harness assertion that rejected a valid cached304 response. It now accepts200 or304 while still checking decoded case content. Initial WebKit startup was blocked by missing Linux libraries; root system install was unavailable. Public Debian trixie libraries were extracted to /tmp, and a temporary wrapper starts the actual bundled WPE engine with both library paths. Stock wrapper overwrites LD_LIBRARY_PATH; Playwright host validation checks system ldconfig, so its check was skipped after independent real engine startup. No system package or browser-bundle edits. Setup manifest/hashes: evidence/cross-engine/environment.json. These environment repairs are not application fixes.

Reproduce on a host with browser dependencies:

```sh
npx playwright install --with-deps firefox webkit
npm run build
node --input-type=module -e 'import {runPreviewBrowser} from "./scripts/preview-browser.mjs";const r=await runPreviewBrowser({suiteCommand:["node","tests/cross-engine-browser.mjs"]});process.exitCode=r.exitCode;'
```

OPENING_BROWSER_ENGINES may select firefox or webkit alone. OPENING_CROSS_ENGINE_EVIDENCE chooses output. OPENING_WEBKIT_EXECUTABLE supports a separately verified runtime wrapper where needed. The suite uses no Chromium executable/flags for other engines. Native pagereveal support is recorded, not assumed.

Ruling: execute the automated cross-engine portion while physical dependencies stay blocked; this reduces compatibility uncertainty without substituting emulation for physical release evidence. Cost if wrong: compatibility defects may still appear on actual Safari/devices, which remain mandatory gates.

Live replacement check pending at this source checkpoint. Existing Chromium cinematic-motion evidence remains valid for unchanged runtime code, not transplanted as a Firefox/WebKit GPU pass.
