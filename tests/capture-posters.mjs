import {browserConfig} from './browser-config.mjs';
const {baseUrl,launchOptions}=browserConfig();
import { chromium } from 'playwright';import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch(launchOptions);const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await page.goto(baseUrl+'/?openingCapture=1');await page.waitForSelector('#renderer[data-ready=true]');
for(const feel of ['precise','playful','cinematic']){await page.locator(`button[data-feel=${feel}]`).click();await page.waitForTimeout(900);await page.locator('#renderer').evaluate(host=>{host.style.width='1200px';host.style.height='1000px';});await page.waitForTimeout(150);const b64=await page.locator('#renderer').evaluate(h=>h.__openingStage.capturePng().split(',')[1]);await writeFile(`public/art/poster-${feel}.png`,Buffer.from(b64,'base64'));await page.locator('#renderer').evaluate(h=>{h.style.width='';h.style.height='';});await page.waitForTimeout(100);}
await page.screenshot({path:'evidence/desktop-initial.png',fullPage:true});console.log(await page.locator('#renderer').evaluate(h=>({...h.dataset})));await browser.close();
