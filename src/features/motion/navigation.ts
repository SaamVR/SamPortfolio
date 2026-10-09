// Browser owns URL, cancellation, Back and scroll. No click is intercepted.
let source='stage';try{source=sessionStorage.getItem('opening-image-source')??'stage';}catch{}
function names(){const stage=document.querySelector<HTMLElement>('.stage-proof');const work=document.querySelector<HTMLElement>('.project-image');if(stage)stage.style.viewTransitionName=source==='stage'?'project-image':'none';if(work)work.style.viewTransitionName=source==='work'?'project-image':'none';}names();
// Brief entry has no matching project image. Opt out on the source before
// native navigation, and restore the source policy on Back or a later link.
function briefTransitionPolicy(disable:boolean){let style=document.querySelector<HTMLStyleElement>('#opening-brief-transition-policy');if(!disable){style?.remove();return;}if(!style){style=document.createElement('style');style.id='opening-brief-transition-policy';style.textContent='@view-transition{navigation:none}';document.head.append(style);}}
addEventListener('pageshow',()=>briefTransitionPolicy(false));
document.addEventListener('click',e=>{if(!(e.target instanceof Element))return;const a=e.target.closest<HTMLAnchorElement>('a');if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target)return;if(a.origin===location.origin)briefTransitionPolicy(a.pathname==='/start/');if(a.pathname==='/work/staypilot/'){source=a.classList.contains('project-image')||a.closest('.project-details')?'work':'stage';try{sessionStorage.setItem('opening-image-source',source);}catch{}names();}});
type NativeTransitionEvent=Event & {viewTransition?:{ready:Promise<unknown>;skipTransition():void}};
// Native cancellation rejects ready; it must not become an unhandled app error.
function observeReadiness(e:NativeTransitionEvent){void e.viewTransition?.ready.catch(()=>{});}
addEventListener('pageswap',((e:NativeTransitionEvent)=>{observeReadiness(e);if(matchMedia('(prefers-reduced-motion:reduce)').matches||document.documentElement.dataset.mode==='light')e.viewTransition?.skipTransition();}) as EventListener);
addEventListener('pagereveal',((e:NativeTransitionEvent)=>{observeReadiness(e);document.querySelector<HTMLElement>('#route-heading')?.focus({preventScroll:true});}) as EventListener);
