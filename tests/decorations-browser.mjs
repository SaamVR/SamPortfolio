import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig(),out=process.env.OPENING_DECORATION_EVIDENCE||'evidence/decorations';
await mkdir(out,{recursive:true});const browser=await chromium.launch(launchOptions),results=[];
try{
  for(const width of [1440,390,320]){
    const context=await browser.newContext({viewport:{width,height:1000},recordVideo:{dir:out}});await context.addInitScript(()=>{window.__backPersisted=false;addEventListener('pageshow',e=>window.__backPersisted=e.persisted);});const page=await context.newPage(),errors=[],trace=[];
    page.on('pageerror',e=>errors.push(e.message));await page.goto(baseUrl);
    const accents=page.locator('[data-cut-accent]');assert.equal(await accents.count(),8,'chapter, six gallery and closing accents must exist');
    const work=page.locator('#work'),chapter=page.locator('[data-cut-accent=chapter]');
    await page.evaluate(()=>{window.__cutTrace=[];const observer=new MutationObserver(records=>{for(const r of records)if(r.attributeName==='data-cut-state')window.__cutTrace.push({id:r.target.dataset.cutAccent,state:r.target.dataset.cutState});});observer.observe(document.body,{subtree:true,attributes:true});});
    await chapter.scrollIntoViewIfNeeded();await page.waitForTimeout(450);
    assert.equal(await chapter.getAttribute('data-cut-state'),'done');
    assert.ok(await page.evaluate(()=>window.__cutTrace.some(x=>x.id==='chapter'&&x.state==='running')),'chapter must draw once in Full');
    await page.screenshot({path:`${out}/chapter-${width}.png`});
    await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(450);
    assert.equal(await page.locator('[data-cut-accent=closing]').getAttribute('data-cut-state'),'done');
    await page.evaluate(()=>scrollTo(0,0));await chapter.scrollIntoViewIfNeeded();await page.waitForTimeout(400);
    trace.push(...await page.evaluate(()=>window.__cutTrace));assert.equal(trace.filter(x=>x.id==='chapter'&&x.state==='running').length,1,'scroll reentry must not replay');
    assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.target?.matches?.('[data-cut-accent]')).length),0,'settled accents leave no active animation');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.locator('.project-image').click();await page.waitForURL('**/work/staypilot/');await page.goBack();await page.waitForSelector('[data-cut-accent=chapter][data-cut-state=done]');
    const backPersisted=await page.evaluate(()=>window.__backPersisted);assert.equal(await page.locator('[data-cut-state=pending],[data-cut-state=running]').count(),0,'Back renders all accents complete');assert.deepEqual(errors,[]);const video=page.video();await context.close();await video.saveAs(`${out}/cuts-${width}.webm`);await video.delete();results.push({width,trace,errors,backPersisted,checks:['visible first cut; settled scheduler','fast scroll/reverse/reentry no replay','Back preserves complete decoration','no overflow/pageerrors']});
  }
  for(const mode of ['light','reduced','no-js']){
    const context=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'});if(mode==='light')await context.addInitScript(()=>localStorage.setItem('opening-mode','light'));
    const page=await context.newPage();await page.goto(baseUrl);await page.locator('[data-cut-accent=chapter]').scrollIntoViewIfNeeded();
    const offset=await page.locator('[data-cut-accent=chapter]').evaluate(e=>getComputedStyle(e).strokeDashoffset);assert.equal(parseFloat(offset),0);
    assert.equal(await page.locator('[data-cut-state=running]').count(),0);results.push({mode,checks:['complete static cut, useful proof']});await context.close();
  }
  for(const event of ['reduced','light','hidden','pagehide','resize-offscreen']){
    const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();await page.goto(baseUrl);
    const chapter=page.locator('[data-cut-accent=chapter]');await chapter.scrollIntoViewIfNeeded();
    await page.waitForSelector('[data-cut-accent=chapter][data-cut-state=running]');
    await page.waitForTimeout(20);const inFlight=await chapter.evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset));assert.ok(inFlight>0&&inFlight<1,'actual in-progress drawn stroke');
    if(event==='reduced')await page.emulateMedia({reducedMotion:'reduce'});
    if(event==='light')await page.evaluate(()=>document.documentElement.dataset.mode='light');
    if(event==='hidden')await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));});
    if(event==='pagehide')await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
    if(event==='resize-offscreen')await page.setViewportSize({width:390,height:180});
    await page.waitForTimeout(400);assert.equal(await chapter.getAttribute('data-cut-state'),'done');
    if(event!=='resize-offscreen')assert.equal(await page.locator('[data-cut-state=pending],[data-cut-state=running]').count(),0);
    else{assert.ok(await page.locator('[data-cut-state=pending]').count()>0,'below-screen pending cuts are not needlessly consumed');await page.setViewportSize({width:390,height:844});await chapter.scrollIntoViewIfNeeded();}
    assert.equal(await page.locator('[data-cut-state=running]').count(),0);results.push({event,inFlight,checks:['interruption began during real stroke draw','final stroke does not revive'],simulation:['hidden','pagehide'].includes(event)?'Synthetic lifecycle event; not proof of physical tab/BFCache behavior':null});await context.close();
  }
  await writeFile(`${out}/results.json`,JSON.stringify({runAt:new Date().toISOString(),baseUrl,browser:browser.version(),results,limitations:'Actual Chrome/software rendering video, phone emulation; no named physical-device/performance certification.'},null,2));console.log('PASS: cut accents, fast scroll/reentry/Back, policy and static alternatives.');
}finally{await browser.close();}
