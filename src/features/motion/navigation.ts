// Browser owns URL, cancellation, Back and scroll. No click is intercepted.
let source='stage';try{source=typeof history.state?.openingProjectSource==='string'?history.state.openingProjectSource:(sessionStorage.getItem('opening-image-source')??'stage');}catch{}
function names(){
 const stage=document.querySelector<HTMLElement>('.stage-proof');const work=document.querySelector<HTMLElement>('.project-image');
 if(stage)stage.style.viewTransitionName=source==='stage'?'project-image':'none';
 if(work)work.style.viewTransitionName=source==='work'?'project-image':'none';
 document.querySelectorAll<HTMLAnchorElement>('.work-thumb').forEach(thumb=>{
  const match=new URL(thumb.href).pathname.match(/^\/work\/([a-z0-9-]+)\/$/);
  thumb.style.viewTransitionName=match&&source===`gallery:${match[1]}`?`opening-${match[1]}`:'none';
 });
}names();
function usableImage(node:HTMLElement){const image=node.querySelector('img');const rect=node.getBoundingClientRect();return image?.complete&&image.naturalWidth>0&&rect.bottom>0&&rect.top<innerHeight;}
// Brief entry has no matching project image. Opt out on the source before
// native navigation, and restore the source policy on Back or a later link.
function briefTransitionPolicy(disable:boolean){let style=document.querySelector<HTMLStyleElement>('#opening-brief-transition-policy');if(!disable){style?.remove();return;}if(!style){style=document.createElement('style');style.id='opening-brief-transition-policy';style.textContent='@view-transition{navigation:none}';document.head.append(style);}}
addEventListener('pageshow',()=>briefTransitionPolicy(false));
document.addEventListener('click',e=>{
 if(!(e.target instanceof Element))return;const a=e.target.closest<HTMLAnchorElement>('a');
 if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.origin!==location.origin)return;
 briefTransitionPolicy(a.pathname==='/start/');
 if(!document.querySelector('.stage-proof'))return; // Case-to-case never replaces home source history.
 let candidate:HTMLElement|null=null,next='none';
 if(a.pathname==='/work/staypilot/'){
  const fromWork=a.classList.contains('project-image')||a.closest('.project-details');
  candidate=document.querySelector(fromWork?'.project-image':'.stage-proof');next=fromWork?'work':'stage';
 }else{
  const thumb=a.closest('.work-tile')?.querySelector<HTMLAnchorElement>('.work-thumb');
  const id=thumb&&new URL(thumb.href).pathname.match(/^\/work\/([a-z0-9-]+)\/$/)?.[1];
  if(thumb&&id&&new URL(thumb.href).pathname===a.pathname){candidate=thumb;next=`gallery:${id}`;}
 }
 if(!candidate)return;
 source=usableImage(candidate)?next:'none';
 try{sessionStorage.setItem('opening-image-source',source);}catch{}
 // Preserve the selected source on this exact native history entry, not just the tab.
 try{const state=history.state;if(state===null||(typeof state==='object'&&!Array.isArray(state)))history.replaceState({...state,openingProjectSource:source},'',location.href);}catch{}
 names();
});
type NativeTransitionEvent=Event & {viewTransition?:{ready:Promise<unknown>;skipTransition():void}};
// Native cancellation rejects ready; it must not become an unhandled app error.
function observeReadiness(e:NativeTransitionEvent){void e.viewTransition?.ready.catch(()=>{});}
addEventListener('pageswap',((e:NativeTransitionEvent)=>{observeReadiness(e);if(matchMedia('(prefers-reduced-motion:reduce)').matches||document.documentElement.dataset.mode==='light')e.viewTransition?.skipTransition();}) as EventListener);
function focusHeading(){if(document.activeElement===document.body||document.activeElement===document.documentElement)document.querySelector<HTMLElement>('#route-heading')?.focus({preventScroll:true});}
const reveal=(window as Window & {__openingReveal?:{revealed:boolean}}).__openingReveal;
if(reveal?.revealed)focusHeading();
addEventListener('pagereveal',((e:NativeTransitionEvent)=>{observeReadiness(e);focusHeading();}) as EventListener);
