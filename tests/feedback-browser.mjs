import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig(),out=process.env.OPENING_FEEDBACK_EVIDENCE||'evidence/feedback';
await mkdir(out,{recursive:true});
const browser=await chromium.launch(launchOptions),results=[];
const arrowX=locator=>locator.evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m41);
try{
  for(const width of [1440,390,320]){
    const context=await browser.newContext({viewport:{width,height:1000},recordVideo:{dir:out}}),page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));await page.goto(baseUrl);
    const button=page.locator('.hero-actions .button'),arrow=button.locator('.icon-arrow');
    await button.scrollIntoViewIfNeeded();await page.mouse.move(0,0);const before=await button.boundingBox();
    await button.hover();await page.waitForTimeout(240);
    assert.ok(await arrowX(arrow)>=3,'Full hover must visibly move the inner arrow');
    assert.deepEqual(await button.boundingBox(),before,'hover must keep its clickable bounds fixed');
    await page.mouse.move(0,0);await page.waitForTimeout(220);
    await page.keyboard.press('Tab');await button.focus();await page.waitForTimeout(220);
    assert.equal(await button.evaluate(e=>e.matches(':focus-visible')),true);assert.ok(await arrowX(arrow)>=3);
    const feel=page.locator('button[data-feel=playful]');await feel.click();
    assert.equal(await feel.getAttribute('aria-pressed'),'true');
    await page.waitForTimeout(900);
    const renderer=page.locator('#renderer'),count=await renderer.getAttribute('data-choreographies');await feel.click();
    assert.equal(await renderer.getAttribute('data-choreographies'),count,'repeat must not replay leaf motion');
    const card=page.locator('.work-tile').first(),image=card.locator('img'),thumb=card.locator('.work-thumb');
    await thumb.scrollIntoViewIfNeeded();await page.mouse.move(0,0);const imageBefore=await image.boundingBox(),thumbBefore=await thumb.boundingBox();
    await thumb.hover();await page.waitForTimeout(240);
    assert.deepEqual(await image.boundingBox(),imageBefore,'card feedback must not move project proof');assert.deepEqual(await thumb.boundingBox(),thumbBefore);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:`${out}/card-${width}.png`});
    // Exercise rapid retargeting of CSS hover without new domain edits.
    for(let i=0;i<4;i++){await page.mouse.move(0,0);await thumb.hover();}
    await page.mouse.move(0,0);await page.waitForTimeout(260);
    assert.deepEqual(errors,[]);const video=page.video();await context.close();await video.saveAs(`${out}/feedback-${width}.webm`);await video.delete();
    results.push({width,checks:['visible Full arrow hover and keyboard feedback','fixed link and screenshot bounds','selected state immediate; repeat no leaf replay','rapid hover changes; no overflow or pageerrors']});
  }
  for(const mode of ['light','reduced','touch']){
    const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:mode==='touch',isMobile:mode==='touch',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
    if(mode==='light')await context.addInitScript(()=>localStorage.setItem('opening-mode','light'));
    const page=await context.newPage();await page.goto(baseUrl);const button=page.locator('.hero-actions .button'),arrow=button.locator('.icon-arrow');
    if(mode==='touch'){await page.locator('button[data-feel=cinematic]').tap();assert.equal(await page.locator('button[data-feel=cinematic]').getAttribute('aria-pressed'),'true');await button.tap();await page.waitForURL(url=>url.hash==='#work');}
    else{await button.hover();await page.waitForTimeout(240);assert.equal(await arrowX(arrow),0);assert.equal(await arrow.evaluate(e=>getComputedStyle(e).transitionDuration),'0s');}
    results.push({mode,checks:[mode==='touch'?'direct tap actions':'static policy feedback without arrow motion']});await context.close();
  }
  await writeFile(`${out}/results.json`,JSON.stringify({runAt:new Date().toISOString(),baseUrl,browser:browser.version(),results,limitations:'Headless Chrome/software GPU and phone/touch emulation; actual video, no physical-device or accessibility conformance pass.'},null,2));
  console.log('PASS: Full feedback, fixed proof/hitboxes, keyboard, repeat, Light/reduced and touch.');
}finally{await browser.close();}
