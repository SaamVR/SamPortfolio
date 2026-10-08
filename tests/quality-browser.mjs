import {browserConfig} from './browser-config.mjs';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const {baseUrl,launchOptions}=browserConfig();const browser=await chromium.launch(launchOptions);
const checks=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1.5});const page=await context.newPage();
 await page.goto(baseUrl+'/?openingDiagnostics=1&openingQualityTest=1');await page.waitForSelector('#renderer[data-ready=true]');
 const initial=await page.locator('canvas').evaluate(c=>({width:c.width,height:c.height}));
 const active=await page.evaluate(()=>{document.querySelector('button[data-feel=playful]').click();const h=document.querySelector('#renderer');let now=performance.now();const adapter=h.__openingQualityTest;for(let i=0;i<80;i++)adapter.sample(50,now+=50);return h.dataset.active;});assert.equal(active,'true');
 assert.equal(await page.locator('#stage').getAttribute('data-quality'),'lower');
 const lower=await page.locator('canvas').evaluate(c=>({width:c.width,height:c.height}));assert.ok(lower.width<initial.width*.76);assert.ok(lower.height<initial.height*.76);
 assert.equal(await page.locator('button[data-feel=playful]').getAttribute('aria-pressed'),'true');
 await page.waitForTimeout(750);await page.screenshot({path:'evidence/quality-lower.png'});
 checks.push('synthetic slow active windows lower framebuffer dimensions about 25% while retaining animated selected feel');
 await page.locator('#mode-toggle').click();await page.locator('#mode-toggle').click();await page.waitForSelector('#renderer[data-ready=true]');
 assert.equal(await page.locator('#stage').getAttribute('data-quality'),'lower');assert.equal(await page.locator('canvas').evaluate(c=>c.width),lower.width);
 // An inactive scene must ignore even explicitly supplied diagnostic samples.
 await page.locator('#renderer').evaluate(h=>{let now=performance.now();for(let i=0;i<160;i++)h.__openingQualityTest.sample(100,now+=100);});assert.equal(await page.locator('#stage').getAttribute('data-quality'),'lower');
 await page.evaluate(()=>{document.querySelector('button[data-feel=cinematic]').click();const h=document.querySelector('#renderer');let now=performance.now();const adapter=h.__openingQualityTest;for(let i=0;i<80;i++)adapter.sample(50,now+=50);});
 assert.equal(await page.locator('canvas').count(),0);assert.equal(await page.locator('#renderer').getAttribute('data-active'),'false','disposed Light scene must not appear active to the trace');assert.equal(await page.locator('#stage').getAttribute('data-quality'),'light');assert.equal(await page.locator('#mode-toggle').isDisabled(),true);
 assert.match(await page.locator('#mode-state').textContent(),/performance fallback/);
 await page.locator('button[data-feel=precise]').click();assert.equal(await page.locator('button[data-feel=precise]').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('#poster-image').evaluate(i=>getComputedStyle(i).visibility),'visible');await page.screenshot({path:'evidence/quality-light.png'});
 await page.locator('.stage-proof').click();await page.waitForURL('**/work/opening-study/');await page.goBack();await page.waitForSelector('#stage[data-quality=light]');assert.equal(await page.locator('canvas').count(),0);
 await page.reload();await page.waitForSelector('#stage[data-quality=light]');assert.equal(await page.locator('canvas').count(),0);
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>new URL(r.name).pathname));assert.equal(resources.some(r=>r.includes('renderer.')),false);
 checks.push('terminal Light retains immediate feel, native case/Back and reload without renderer revival; only subsequent navigation avoids renderer request');
 await context.close();
 const normal=await browser.newContext({viewport:{width:390,height:844}});const np=await normal.newPage();await np.goto(baseUrl);await np.locator('.feel-controls').scrollIntoViewIfNeeded();await np.waitForSelector('#renderer[data-ready=true]');assert.equal(await np.locator('#renderer').evaluate(h=>!!h.__openingQualityTest),false);await normal.close();
 checks.push('ordinary phone visit exposes no synthetic sample adapter');
 const phone=await browser.newContext({viewport:{width:390,height:844}});await phone.addInitScript(()=>sessionStorage.setItem('opening-quality-level','light'));const pp=await phone.newPage();await pp.goto(baseUrl);await pp.waitForLoadState('networkidle');await pp.locator('button[data-feel=cinematic]').click();assert.equal(await pp.locator('canvas').count(),0);assert.equal(await pp.locator('button[data-feel=cinematic]').getAttribute('aria-pressed'),'true');assert.equal(await pp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await pp.screenshot({path:'evidence/quality-light-phone.png',fullPage:true});await phone.close();checks.push('phone terminal visit has responsive authored still and immediate selection');
 await writeFile('evidence/quality-browser.json',JSON.stringify({runAt:new Date().toISOString(),browser:browser.version(),environment:'Headless Chromium / SwiftShader. Forced-window checks use explicit synthetic diagnostic samples, not measured performance or physical calibration.',initial,lower,checks},null,2));console.log('PASS: quality policy integration and terminal visit persistence.');
}finally{await browser.close();}
