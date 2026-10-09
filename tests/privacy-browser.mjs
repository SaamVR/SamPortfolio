import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig();
const out=process.env.OPENING_PRIVACY_EVIDENCE||'evidence/privacy';
await mkdir(out,{recursive:true});
const browser=await chromium.launch(launchOptions),results=[];
try{
  for(const width of [1440,390,320]){
    const context=await browser.newContext({viewport:{width,height:1000}});
    const saved='Existing local draft must remain byte-for-byte unchanged';
    await context.addInitScript(value=>localStorage.setItem('opening-brief-v1',value),saved);
    const page=await context.newPage(),errors=[],requests=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',r=>requests.push(r.url()));
    const response=await page.goto(`${baseUrl}/privacy/`);
    assert.equal(response.status(),200);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.evaluate(()=>localStorage.getItem('opening-brief-v1')),saved);
    assert.equal(await page.locator('canvas,form').count(),0);
    assert.equal(requests.some(url=>/renderer\.[^/]+\.js/.test(url)),false);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map(v=>v.id),[]);
    await page.locator('.skip').focus();await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('main')),true);
    assert.equal(await page.evaluate(()=>document.activeElement.matches(':focus-visible')),true);
    await page.screenshot({path:`${out}/privacy-${width}.png`,fullPage:true});
    // Shared footer remains usable on both paper and dark pages.
    for(const path of ['/privacy/','/','/start/','/work/staypilot/']){
      await page.goto(baseUrl+path);await page.locator('footer a[href="/privacy/"]').scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${path} ${width} overflow`);
      await page.locator('footer a[href="/privacy/"]').focus();
      const box=await page.locator('footer a[href="/privacy/"]').boundingBox();
      assert.ok(box&&box.width>0&&box.x>=0&&box.x+box.width<=width,`${path} privacy link bounds`);
    }
    assert.deepEqual(errors,[]);
    results.push({width,checks:['direct privacy HTTP200','existing draft unchanged by privacy visit','no form or renderer request','privacy axe and skip-link keyboard access','four shared-footer routes within viewport'],axeVersion:audit.testEngine.version,incomplete:audit.incomplete.map(r=>({id:r.id,nodes:r.nodes.length})),errors});
    await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(`${baseUrl}/privacy/`);
  assert.match(await page.locator('main').textContent(),/does not send enquiries/);
  await page.locator('main a[href="/start/"]').click();await page.waitForURL('**/start/');
  results.push({name:'no-javascript',checks:['privacy text readable','ordinary brief link works']});await context.close();
  await writeFile(`${out}/results.json`,JSON.stringify({runAt:new Date().toISOString(),baseUrl,browser:browser.version(),results,limitations:'Headless Chrome and viewport emulation; scoped automated accessibility checks, not physical-device/screen-reader or full conformance certification.'},null,2));
  console.log('PASS: privacy route, unchanged draft, keyboard/no-JS and shared footer at1440/390/320.');
}finally{await browser.close();}
