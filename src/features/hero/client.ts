import {readDraft,chooseFeel,persistDraft,isFeel} from '../brief/draft';
import type {StageRenderer} from './renderer';
import frames from './frames.json';
const stage=document.querySelector<HTMLElement>('#stage')!;const host=document.querySelector<HTMLElement>('#renderer')!;const poster=document.querySelector<HTMLImageElement>('#poster-image')!;const toggle=document.querySelector<HTMLButtonElement>('#mode-toggle')!;const modeState=document.querySelector<HTMLElement>('#mode-state')!;const live=document.querySelector<HTMLElement>('#direction-status')!;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let draft=readDraft(),renderer:StageRenderer|undefined,generation=0,visible=false,disposed=false,loading=false;
// Explicit tooling URL opts into costly capture/trace behavior; normal visits use production defaults.
const tooling=new URLSearchParams(location.search);
const stageOptions={capture:tooling.get('openingCapture')==='1',diagnostics:tooling.get('openingDiagnostics')==='1'};
let bridge=false;const graphic=document.querySelector<SVGElement>('#stage-bridge')!;
let light=document.documentElement.dataset.mode==='light';let failure='';try{failure=sessionStorage.getItem('opening-render-failure')??'';}catch{}
function update(){stage.dataset.feel=draft.feel;poster.src=`/art/poster-${draft.feel}.png`;document.querySelectorAll<HTMLButtonElement>('[data-feel]').forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b.dataset.feel===draft.feel));});toggle.setAttribute('aria-pressed',String(light));toggle.textContent=light?'Use Full mode':'Use Light mode';modeState.textContent=failure?'Authored still · render unavailable':reduced.matches?'Reduced motion':light?'Light experience':'Full experience';document.documentElement.dataset.mode=light?'light':'full';document.documentElement.dataset.reduced=String(reduced.matches);sampleScroll();}
function stop(){generation++;loading=false;renderer?.dispose();renderer=undefined;poster.style.visibility='visible';}
function fail(reason:string){failure=reason;try{sessionStorage.setItem('opening-render-failure',reason);}catch{}stop();update();live.textContent=reason;}
async function load(){if(disposed||loading||renderer||!visible||document.hidden||light||reduced.matches||failure)return;loading=true;const own=++generation;try{const {createStage}=await import('./renderer');if(disposed||own!==generation||light||reduced.matches||!visible||document.hidden||failure)return;renderer=createStage(host,draft.feel,fail,stageOptions);poster.style.visibility='hidden';renderer.setVisible(!bridge);}catch{fail('3D is unavailable — your direction, work and links are still here.');}finally{if(own===generation)loading=false;}}
function select(e:Event){const feel=(e.currentTarget as HTMLButtonElement).dataset.feel;if(!isFeel(feel)||feel===draft.feel)return;draft=chooseFeel(draft,feel);const saved=persistDraft(draft);update();live.textContent=`${feel[0]!.toUpperCase()+feel.slice(1)} selected.${saved?' Saved as your starting direction.':' Temporary direction; device storage unavailable.'}`;renderer?.select(feel);sampleScroll();}
const buttons=[...document.querySelectorAll<HTMLButtonElement>('button[data-feel]')];buttons.forEach(b=>b.addEventListener('click',select));
function switchMode(){light=!light;try{localStorage.setItem('opening-mode',light?'light':'full');}catch{}stop();update();void load();}
toggle.addEventListener('click',switchMode);
function policyChange(){stop();update();void load();}reduced.addEventListener('change',policyChange);
const observer=new IntersectionObserver(([entry])=>{visible=entry!.isIntersecting;if(!visible&&loading){generation++;loading=false;}renderer?.setVisible(visible&&!document.hidden&&!bridge);if(visible)void load();},{threshold:.05});observer.observe(stage);
function visibility(){renderer?.setVisible(visible&&!document.hidden&&!bridge);if(document.hidden&&loading){generation++;loading=false;}else void load();}document.addEventListener('visibilitychange',visibility);
const work=document.querySelector<HTMLElement>('#work')!;let scrollRaf=0;
function sampleScroll(){scrollRaf=0;const rect=work.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.8)));work.style.setProperty('--progress',String(reduced.matches?1:p));
 const stageRect=stage.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(-stageRect.top-stageRect.height*.20)/(stageRect.height*.6)));const nextBridge=progress>.12&&!light&&!reduced.matches&&!failure;
 if(nextBridge!==bridge){bridge=nextBridge;renderer?.setVisible(visible&&!document.hidden&&!bridge);}
 host.style.visibility=bridge?'hidden':'visible';poster.style.visibility=bridge||renderer?'hidden':'visible';graphic.style.visibility=bridge?'visible':'hidden';
 const bounds=frames[draft.feel].bounds;const lead=bounds[0]!,upper=bounds[1]!,lower=bounds[2]!;
 // Five projected anchors converge into an open clipped-corner printed frame.
 const source=[[lead.x1,upper.y1],[upper.x1-.03,upper.y1],[upper.x1,upper.y1+.03],[lower.x1,lower.y0],[lead.x1,lower.y0]];
 const target=[[.30,.34],[.76,.34],[.79,.37],[.79,.66],[.30,.66]];
 const t=Math.max(0,Math.min(1,(progress-.12)/.26));const points=source.map((v,i)=>[v[0]!+(target[i]![0]!-v[0]!)*t,v[1]!+(target[i]![1]!-v[1]!)*t]);
 graphic.querySelector('path')!.setAttribute('d',points.map((v,i)=>`${i?'L':'M'}${v[0]!*1200} ${v[1]!*1000}`).join(' '));stage.dataset.bridge=String(bridge);stage.dataset.scrollProgress=String(progress);
}
function scroll(){if(!scrollRaf)scrollRaf=requestAnimationFrame(sampleScroll);}addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);sampleScroll();
function destroy(){disposed=true;stop();observer.disconnect();buttons.forEach(b=>b.removeEventListener('click',select));toggle.removeEventListener('click',switchMode);reduced.removeEventListener('change',policyChange);document.removeEventListener('visibilitychange',visibility);removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(scrollRaf);}
addEventListener('pagehide',destroy,{once:true});
// BFCache restores native scroll and DOM; resume with fresh GPU resources.
addEventListener('pageshow',e=>{if(e.persisted){disposed=false;observer.observe(stage);buttons.forEach(b=>b.addEventListener('click',select));toggle.addEventListener('click',switchMode);reduced.addEventListener('change',policyChange);document.addEventListener('visibilitychange',visibility);addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);addEventListener('pagehide',destroy,{once:true});draft=readDraft();update();sampleScroll();void load();}});
update();
