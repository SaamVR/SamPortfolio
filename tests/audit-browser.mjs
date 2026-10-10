import {chromium,firefox,webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig();
const engineName=process.env.OPENING_AUDIT_ENGINE||'chromium';
const engine={chromium,firefox,webkit}[engineName];assert.ok(engine,'Use chromium, firefox or webkit');
const out=process.env.OPENING_AUDIT_EVIDENCE||`evidence/audit/${engineName}`;await mkdir(out,{recursive:true});
const executablePath=process.env[`OPENING_${engineName.toUpperCase()}_EXECUTABLE`];
const browser=await engine.launch(engineName==='chromium'?launchOptions:executablePath?{executablePath}:{});
const tags=['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'];
const paths=engineName==='chromium'?['/','/work/opening-study/',...['staypilot','sm-manager','ecomcms','tingtune','nova','servicedesk','ezcomo'].map(id=>`/work/${id}/`),'/start/','/unknown-audit-route/']:['/','/work/staypilot/','/start/','/unknown-audit-route/'];
const report={runAt:new Date().toISOString(),baseUrl,engine:engineName,version:browser.version(),tags,profiles:[],limits:'Automated axe audit and sampled keyboard input on Linux headless engines. Narrow viewport is reflow, not actual browser zoom. No screen reader, physical device, Safari, full WCAG conformance or GPU/performance pass.'};
const failures=[];
const audit=async(page,path,width,step='page')=>{
 const result=await new AxeBuilder({page}).withTags(tags).analyze();
 const profile={path,width,step,axeVersion:result.testEngine.version,passes:result.passes.length,incomplete:result.incomplete.map(r=>({id:r.id,nodes:r.nodes.length,manualReview:r.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary}))})),violations:result.violations.map(r=>({id:r.id,impact:r.impact,description:r.description,helpUrl:r.helpUrl,nodes:r.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary}))}))};
 report.profiles.push(profile);if(profile.violations.length){failures.push(`${path} ${width} ${step}: ${profile.violations.map(v=>v.id).join(',')}`);await page.screenshot({path:`${out}/failure-${width}-${report.profiles.length}.png`,fullPage:true});}
};
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of paths){
   await page.goto(baseUrl+path);await page.waitForLoadState('networkidle');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${path} ${width} overflow`);
   await audit(page,path,width);
   // Destination enhancement may focus its heading; explicitly start at the skip link.
   await page.locator('.skip').focus();await page.keyboard.press('Enter');await page.waitForURL(url=>url.hash==='#main');
   await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('main')),true,`${path} skip sequential focus`);
   const focus=await page.evaluate(()=>{const e=document.activeElement,s=getComputedStyle(e);return {visible:e.matches(':focus-visible'),width:parseFloat(s.outlineWidth),style:s.outlineStyle,tag:e.tagName,text:e.textContent?.trim().slice(0,100)};});
   assert.ok(focus.visible&&focus.width>=2&&focus.style!=='none',`${path} visible keyboard focus`);
   report.profiles.at(-1).keyboard={skipIntoMain:true,focus};
   if(path==='/unknown-audit-route/'&&width===320)await page.screenshot({path:`${out}/404-phone.png`,fullPage:true});
   if(path==='/start/'){
    await page.locator('#goal').fill('Anonymous accessibility audit fixture');
    for(const step of ['direction','scope','review']){await page.locator(`[data-step=${step}]`).focus();await page.keyboard.press('Enter');await audit(page,path,width,step);}
    if(width===390)await page.screenshot({path:`${out}/review-phone.png`,fullPage:true});
   }
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 assert.deepEqual(failures,[],'Automated accessibility findings');
 console.log(`PASS: ${report.profiles.length} ${engineName} audit profiles; sampled keyboard skip/focus.`);
}catch(error){report.failure={message:error.message,stack:error.stack};throw error;}
finally{await writeFile(`${out}/results.json`,JSON.stringify(report,null,2));await browser.close();}
