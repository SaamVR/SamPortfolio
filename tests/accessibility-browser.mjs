import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig();
const out=process.env.OPENING_A11Y_EVIDENCE||'evidence/accessibility';await mkdir(out,{recursive:true});
function luminance(rgb){return rgb.slice(0,3).map(x=>x/255).reduce((s,c,i)=>s+[.2126,.7152,.0722][i]*(c<=.04045?c/12.92:((c+.055)/1.055)**2.4),0);}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const browser=await chromium.launch(launchOptions);const results=[];
try{
 for(const width of [1440,720,390,320]){
 const ctx=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});const page=await ctx.newPage();
 for(const path of ['/','/work/opening-study/','/start/','/this-page-does-not-exist/']){
 await page.goto(baseUrl+path);await page.waitForLoadState('networkidle');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${path} overflow at ${width}`);
 // Actual keyboard input establishes focus-visible, then samples computed rings on light/dark surfaces.
 // Destination routes intentionally focus their heading on pagereveal. Focus the skip link after keyboard input to test its native behavior there.
 await page.keyboard.press('Tab');if(path==='/')assert.equal(await page.locator('.skip').evaluate(e=>e===document.activeElement),true,'skip first in keyboard order');else await page.locator('.skip').focus();await page.keyboard.press('Enter');await page.waitForURL(url=>url.hash==='#main');assert.equal(new URL(page.url()).hash,'#main');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('main')),true,'skip moves sequential focus into main');
 const selectors=path==='/'?['.hero-actions .primary','.feel-controls button','.project-details h3 a']:path==='/start/'?['#goal','[data-step=direction]']:path==='/work/opening-study/'?['.back-link']:['.button'];
 const rings=[];for(const selector of selectors){const el=page.locator(selector).first();await el.focus();const ring=await el.evaluate(e=>{const s=getComputedStyle(e);let host=e.parentElement;while(host&&getComputedStyle(host).backgroundColor==='rgba(0, 0, 0, 0)')host=host.parentElement;return {visible:e.matches(':focus-visible'),style:s.outlineStyle,width:parseFloat(s.outlineWidth),color:s.outlineColor,background:host?getComputedStyle(host).backgroundColor:getComputedStyle(document.documentElement).backgroundColor};});const ratio=contrast(ring.color.match(/[\d.]+/g).map(Number),ring.background.match(/[\d.]+/g).map(Number));rings.push({selector,...ring,ratio});assert.equal(ring.visible,true);assert.ok(ring.width>=2&&ring.style!=='none',`${selector} visible ring`);assert.ok(ratio>=3,`${path} ${selector} focus contrast ${ratio.toFixed(2)} <3`);}
 if(path==='/start/'){await page.locator('#goal').fill('Keyboard accessibility development fixture');await page.locator('[data-step=scope]').focus();await page.keyboard.press('Enter');await page.locator('#budget').focus();const input=await page.locator('#budget').evaluate(e=>({color:getComputedStyle(e).outlineColor,width:parseFloat(getComputedStyle(e).outlineWidth)}));assert.ok(input.width>=2);await page.locator('[data-step=review]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#step-review').isVisible(),true);}
 results.push({path,width,checks:['native skip and sequential main focus','no horizontal overflow','keyboard-visible focus >=3:1 on sampled surrounding surfaces'],rings});
 if(width===390&&path==='/start/')await page.screenshot({path:`${out}/brief-focus-phone.png`,fullPage:true});
 }
 await ctx.close();
 }
 await writeFile(`${out}/results.json`,JSON.stringify({runAt:new Date().toISOString(),baseUrl,browser:browser.version(),results,limits:'Sampled focus/reflow regression only. 720/320 viewport widths model reduced layout space, not actual browser zoom. No screen-reader, physical-device, Safari/Firefox or WCAG conformance certification.'},null,2));console.log(`PASS: ${results.length} route/width keyboard-focus/reflow profiles.`);
}finally{await browser.close();}
