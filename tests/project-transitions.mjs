import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig(),out=process.env.OPENING_TRANSITION_EVIDENCE||'evidence/project-transitions';
await mkdir(out,{recursive:true});const browser=await chromium.launch(launchOptions),results=[];
const ids=['staypilot','sm-manager','ecomcms','tingtune','nova','servicedesk','ezcomo'];
try{
 for(const width of process.env.OPENING_TRANSITION_FOCUSED?[]:[1440,390]){
  const context=await browser.newContext({viewport:{width,height:1000},recordVideo:{dir:out}}),page=await context.newPage(),errors=[];
  await context.addInitScript(()=>{addEventListener('pagereveal',e=>{if(e.viewTransition)void e.viewTransition.ready.then(()=>{const groups=document.getAnimations().filter(a=>a.animationName?.includes('view-transition-group-anim'));sessionStorage.setItem('transition-groups',JSON.stringify(groups.map(a=>({name:a.animationName,frames:a.effect?.getKeyframes(),duration:a.effect?.getTiming().duration}))));},()=>{});});});
  page.on('pageerror',e=>errors.push(e.message));
  for(const id of ids){
   await page.goto(baseUrl);const link=page.locator(id==='staypilot'?'.project-image':`.work-thumb[href="/work/${id}/"]`);
   await link.scrollIntoViewIfNeeded();await link.locator('img').evaluate(img=>img.decode());const y=await page.evaluate(()=>scrollY);
   await link.click();await page.waitForURL(`**/work/${id}/`);await page.waitForTimeout(550);
   const expected=id==='staypilot'?'project-image':`opening-${id}`;
   assert.equal(await page.locator('.case-image').evaluate(e=>getComputedStyle(e).viewTransitionName),expected,'case must correspond to actual project');
   const groups=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('transition-groups')||'[]'));
   assert.ok(groups.some(g=>g.name.endsWith(expected)&&g.duration===420),'real native paired image transform must be recorded');
   await page.evaluate(()=>sessionStorage.removeItem('transition-groups'));await page.goBack();await page.waitForTimeout(550);assert.ok(Math.abs((await page.evaluate(()=>scrollY))-y)<2,'Back restores source scroll');
   const backGroups=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('transition-groups')||'[]'));
   assert.ok(backGroups.some(g=>g.name.endsWith(expected)&&g.duration===420),'Back must record a real paired transform');
   assert.equal(await link.evaluate(e=>getComputedStyle(e).viewTransitionName),expected);
   assert.equal(await page.locator('.work-thumb').evaluateAll(nodes=>nodes.filter(e=>getComputedStyle(e).viewTransitionName!=='none').length),id==='staypilot'?0:1,'only selected gallery image is named');
   results.push({width,id,groups,backGroups,checks:['real420ms forward/Back paired native image animation','ordinary route and Back source/scroll','single selected gallery name']});
  }
  await page.screenshot({path:`${out}/gallery-${width}.png`});assert.deepEqual(errors,[]);
  const video=page.video();await context.close();await video.saveAs(`${out}/work-to-case-${width}.webm`);await video.delete();
 }
 // Native reveal can precede the deferred route module.
 const delayed=await browser.newContext();let navigationCode='';
 await delayed.route('**/work/nova/',async route=>{const response=await route.fetch();const body=(await response.text()).replace(/<script type="module">([\s\S]*?)<\/script>/g,(script,code)=>{if(!code.includes('opening-image-source'))return script;navigationCode=code;return '<script type="module" src="/__delayed_navigation.js"></script>';});assert.ok(navigationCode,'test must delay the actual inlined navigation module');await route.fulfill({response,body});});
 await delayed.route('**/__delayed_navigation.js',async route=>{await new Promise(r=>setTimeout(r,900));await route.fulfill({contentType:'text/javascript',body:navigationCode});});
 const dp=await delayed.newPage();await dp.goto(baseUrl+'/work/nova/');await dp.waitForLoadState('networkidle');
 assert.equal(await dp.evaluate(()=>document.activeElement.id),'route-heading','delayed route module must recover committed heading focus');
 await dp.goto(baseUrl+'/work/nova/',{waitUntil:'commit'});await dp.locator('.back-link').focus();await dp.waitForLoadState('networkidle');assert.equal(await dp.evaluate(()=>document.activeElement.matches('.back-link')),true,'late enhancement must not steal interactive focus');results.push({name:'delayed-route-module',checks:['actual inlined module externally delayed','early reveal marker recovers heading focus','existing interactive focus preserved']});await delayed.close();
 const history=await browser.newContext(),hp=await history.newPage();await hp.goto(baseUrl);
 const open=async id=>{const link=hp.locator(`.work-thumb[href="/work/${id}/"]`);await link.scrollIntoViewIfNeeded();await link.locator('img').evaluate(img=>img.decode());await link.click();await hp.waitForURL(`**/work/${id}/`);await hp.waitForTimeout(500);};
 await open('sm-manager');await hp.locator('.back-link').click();await hp.waitForURL(url=>url.pathname==='/'&&url.hash==='#work');await open('ecomcms');
 await hp.goBack();await hp.waitForTimeout(500);await hp.goBack();await hp.waitForURL('**/work/sm-manager/');await hp.goBack();await hp.waitForTimeout(500);
 assert.equal(await hp.locator('.work-thumb[href="/work/sm-manager/"]').evaluate(e=>getComputedStyle(e).viewTransitionName),'opening-sm-manager','older home entry must recover its own source');results.push({name:'older-home-history',checks:['distinct home history entries retain their own image source']});await history.close();
 const missing=await browser.newContext();
 await missing.addInitScript(()=>{addEventListener('pagereveal',e=>{if(e.viewTransition)void e.viewTransition.ready.then(()=>sessionStorage.setItem('missing-groups',JSON.stringify(document.getAnimations().filter(a=>a.animationName?.endsWith('opening-sm-manager')).map(a=>a.animationName))),()=>{});});});
 await missing.route('**/work/sm-manager/',async route=>{const response=await route.fetch();const original=await response.text();const body=original.replace(/(<div class="case-image"[^>]*>\s*<img[^>]*src=")[^"]+("\s)/,'$1/__test_missing_media.png$2');assert.notEqual(body,original,'test must break destination media, not source');await route.fulfill({response,body});});
 const mp=await missing.newPage();await mp.goto(baseUrl);const source=mp.locator('.work-thumb[href="/work/sm-manager/"]');await source.scrollIntoViewIfNeeded();await source.locator('img').evaluate(img=>img.decode());await mp.evaluate(()=>sessionStorage.removeItem('missing-groups'));await source.click();await mp.waitForURL('**/work/sm-manager/');await mp.waitForTimeout(600);
 assert.equal(await mp.locator('.case-image img').evaluate(img=>img.naturalWidth),0);
 assert.deepEqual(await mp.evaluate(()=>JSON.parse(sessionStorage.getItem('missing-groups')||'[]')),[],'failed destination must use ordinary navigation');
 assert.equal(await mp.locator('#route-heading').count(),1);results.push({name:'failed-destination',checks:['source image valid; destination404','ordinary useful case instead of paired broken media']});await missing.close();
 const ordinary=await browser.newContext(),op=await ordinary.newPage(),ordinaryErrors=[];op.on('pageerror',e=>ordinaryErrors.push(e.message));await op.goto(baseUrl);const thumb=op.locator('.work-thumb[href="/work/sm-manager/"]');await thumb.scrollIntoViewIfNeeded();
 const before=await op.evaluate(()=>history.state);const popupPromise=ordinary.waitForEvent('page');await thumb.click({modifiers:['Control']});const popup=await popupPromise;await popup.waitForLoadState();assert.ok(popup.url().endsWith('/work/sm-manager/'));assert.deepEqual(await op.evaluate(()=>history.state),before);await popup.close();
 await thumb.click();await op.goto(baseUrl+'/start/');await op.waitForTimeout(300);assert.equal(await op.locator('#brief-form').count(),1);assert.deepEqual(ordinaryErrors,[]);results.push({name:'modified-and-canceled',checks:['native new tab leaves source state intact','newer native navigation wins without pageerror']});await ordinary.close();
 const storage=await browser.newContext();await storage.addInitScript(()=>{const write=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(this===sessionStorage)throw new DOMException('Unavailable','QuotaExceededError');return write.call(this,k,v);};});const sp=await storage.newPage();await sp.goto(baseUrl);const sl=sp.locator('.work-thumb[href="/work/sm-manager/"]');await sl.scrollIntoViewIfNeeded();await sl.locator('img').evaluate(img=>img.decode());await sl.click();await sp.waitForURL('**/work/sm-manager/');await sp.goBack();await sp.waitForTimeout(500);assert.equal(await sl.evaluate(e=>getComputedStyle(e).viewTransitionName),'opening-sm-manager');results.push({name:'session-storage-unavailable',checks:['native history source survives tab-storage failure']});await storage.close();
 // Direct URLs, case-to-case and the existing brief policy remain ordinary.
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(baseUrl+'/work/nova/');await page.locator('.case-project-nav a[href="/work/ecomcms/"]').click();await page.waitForURL('**/work/ecomcms/');await page.waitForTimeout(550);
 await page.locator('.case-limitations a[href^="/start/"]').click();await page.waitForURL('**/start/**');await page.waitForTimeout(250);assert.equal(await page.locator('#brief-form').count(),1);assert.deepEqual(errors,[]);results.push({name:'direct-case-and-brief',checks:['direct URL','distinct project navigation','brief opt-out preserved']});await context.close();
 for(const mode of ['light','reduced','no-js']){
  const context=await browser.newContext({javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'});if(mode==='light')await context.addInitScript(()=>localStorage.setItem('opening-mode','light'));const page=await context.newPage();await page.goto(baseUrl);await page.locator('.work-thumb[href="/work/sm-manager/"]').click();await page.waitForURL('**/work/sm-manager/');results.push({mode,checks:['ordinary useful case route']});await context.close();
 }
 await writeFile(`${out}/results.json`,JSON.stringify({runAt:new Date().toISOString(),baseUrl,browser:browser.version(),results,limitations:'Chrome native transitions with software GPU and phone emulation. Actual unedited journey recordings; no physical performance or finished art-direction claim.'},null,2));console.log('PASS: seven project paired transforms, Back and ordinary alternatives.');
}finally{await browser.close();}
