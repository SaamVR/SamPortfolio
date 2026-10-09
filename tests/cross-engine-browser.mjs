import {firefox,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl}=browserConfig();
const out=process.env.OPENING_CROSS_ENGINE_EVIDENCE||'evidence/cross-engine';
await mkdir(out,{recursive:true});
const engineNames=(process.env.OPENING_BROWSER_ENGINES||'firefox,webkit').split(',');
assert.ok(engineNames.length>0&&engineNames.every(name=>['firefox','webkit'].includes(name)),'Select firefox and/or webkit engines');
const report={enginesRequested:engineNames,runAt:new Date().toISOString(),baseUrl,environment:'Linux headless Playwright engines; unthrottled; viewport emulation only',results:[],limits:'WebKit is not Safari or a physical iPhone. No physical GPU, screen reader, actual zoom, performance budget or full accessibility certification.'};
try {
 for(const engine of [firefox,webkit].filter(engine=>engineNames.includes(engine.name()))){
  const browser=await engine.launch(engine===webkit&&process.env.OPENING_WEBKIT_EXECUTABLE?{executablePath:process.env.OPENING_WEBKIT_EXECUTABLE}:{});
  try {
   for(const width of [1440,390]){
    const context=await browser.newContext({viewport:{width,height:900}});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const checks=[];
    const overflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${engine.name()} ${width} ${page.url()} overflow`);
    await page.goto(baseUrl+'/');
    assert.match(await page.locator('.approval-note').textContent(),/Shusmoy/);
    await page.locator('button[data-feel=playful]').click();
    assert.equal(await page.locator('button[data-feel=playful]').getAttribute('aria-pressed'),'true');
    await page.locator('button[data-feel=precise]').click();
    await page.locator('button[data-feel=cinematic]').click();
    await page.locator('button[data-feel=cinematic]').click();
    assert.equal(await page.locator('button[data-feel=cinematic]').getAttribute('aria-pressed'),'true');
    await overflow();
    const support=await page.evaluate(()=>({pagereveal:'onpagereveal' in window,viewTransition:typeof document.startViewTransition==='function',renderer:document.querySelector('#renderer')?.dataset.ready||'not_ready',fallback:document.querySelector('#stage')?.dataset.failure||null}));
    checks.push('approved public name','immediate rapid/repeated selection','responsive home');
    await page.locator('.project-image').click();
    await page.waitForURL('**/work/staypilot/');
    await page.goBack();
    await page.waitForURL(url=>url.pathname==='/');
    assert.equal(await page.locator('button[data-feel=cinematic]').getAttribute('aria-pressed'),'true');
    checks.push('ordinary case navigation and Back preserves direction');
    for(const id of ['staypilot','sm-manager','ecomcms','tingtune','nova','servicedesk','ezcomo']){
     const response=await page.goto(baseUrl+'/work/'+id+'/');assert.ok([200,304].includes(response.status()),`case HTTP ${response.status()}`);
     await page.locator('main img').first().evaluate(img=>img.decode());
     await overflow();
    }
    checks.push('seven direct cases, decoded evidence and responsive bounds');
    await page.goto(baseUrl+'/work/staypilot/');
    await page.locator('a[href="/start/?project=staypilot"]').click();
    await page.waitForURL(url=>url.pathname==='/start/'&&!url.searchParams.has('project'));
    await page.locator('#goal').fill('Cross-engine synthetic portfolio brief');
    await page.locator('[data-step=direction]').click();
    const reference=page.locator('[data-id-field=projectReferenceIds][value=staypilot]');
    await reference.uncheck();await page.reload();await page.locator('[data-step=direction]').click();assert.equal(await reference.isChecked(),false);
    await reference.check();await page.locator('[data-step=review]').click();
    const downloadEvent=page.waitForEvent('download');await page.locator('#export-draft').click();const download=await downloadEvent;
    await download.saveAs(`${out}/${engine.name()}-${width}-brief.json`);
    await overflow();
    checks.push('known reference consumed; removal persists on reload','review and JSON download');
    await page.screenshot({path:`${out}/${engine.name()}-${width}-brief.png`,fullPage:true});
    assert.deepEqual(errors,[]);
    report.results.push({engine:engine.name(),version:browser.version(),width,checks,support,errors});
    await context.close();
   }
   for(const mode of ['light','reduced']){
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference'});
    if(mode==='light')await context.addInitScript(()=>localStorage.setItem('opening-mode','light'));
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(baseUrl+'/');await page.locator('button[data-feel=cinematic]').click();
    assert.equal(await page.locator('button[data-feel=cinematic]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('.stage-proof img').evaluate(img=>img.complete&&img.naturalWidth>0),true);
    await page.waitForTimeout(150);
    assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(e=>/renderer\./.test(e.name))),false);
    assert.deepEqual(errors,[]);
    report.results.push({engine:engine.name(),version:browser.version(),mode,width:390,checks:['selected state and HTML proof','cold authored alternative omits renderer'],errors});
    await context.close();
   }
  } finally {await browser.close();}
 }
 console.log(`PASS: ${report.results.length} cross-engine navigation, brief and alternative profiles.`);
} catch(error){report.failure={message:error.message,stack:error.stack};throw error;}
finally {await writeFile(`${out}/results.json`,JSON.stringify(report,null,2));}
