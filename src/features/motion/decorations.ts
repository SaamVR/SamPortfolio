// One owner for decorative SVG stroke reveals; content and layout stay visible.
const cuts=[...document.querySelectorAll<SVGPathElement>('[data-cut-accent]')];
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const returning=(performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming|undefined)?.type==='back_forward';
const active=new Map<SVGPathElement,Animation>();
let disposed=false;
const staticPolicy=()=>reduced.matches||document.documentElement.dataset.mode==='light';
const observer=new IntersectionObserver(entries=>{
  if(disposed)return;
  for(const entry of entries){
    const cut=entry.target as SVGPathElement;
    if(cut.dataset.cutState==='done')continue;
    if(!entry.isIntersecting){if(entry.boundingClientRect.bottom<0||active.has(cut))finish(cut);continue;}
    if(staticPolicy()||document.hidden||active.size>=3){finish(cut);continue;}
    if(active.has(cut))continue;
    // Final underlying style survives cancellation; no persistent fill effect.
    cut.style.strokeDashoffset='0';
    const animation=cut.animate([{strokeDashoffset:'1'},{strokeDashoffset:'0'}],{
      duration:cut.dataset.cutAccent==='gallery'?220:280,easing:'cubic-bezier(.2,.7,.2,1)',
    });
    active.set(cut,animation);cut.dataset.cutState='running';
    void animation.finished.then(()=>{if(active.get(cut)===animation)finish(cut);},()=>{});
  }
},{threshold:0});
function finish(cut:SVGPathElement){
  const animation=active.get(cut);active.delete(cut);animation?.cancel();
  cut.style.strokeDashoffset='0';cut.dataset.cutState='done';observer.unobserve(cut);
}
function finishAll(){cuts.forEach(finish);}
function scanSkipped(){
  if(disposed)return;
  for(const cut of cuts)if(cut.dataset.cutState!=='done'){
    const rect=cut.getBoundingClientRect();
    if(rect.bottom<0||(active.has(cut)&&rect.top>innerHeight))finish(cut);
  }
}
function policyChanged(){if(staticPolicy())finishAll();}
function visibilityChanged(){if(document.hidden)finishAll();}
const policyObserver=new MutationObserver(policyChanged);
function destroy(){
  disposed=true;finishAll();observer.disconnect();policyObserver.disconnect();
  removeEventListener('scroll',scanSkipped);removeEventListener('resize',scanSkipped);
  reduced.removeEventListener('change',policyChanged);document.removeEventListener('visibilitychange',visibilityChanged);
}
for(const cut of cuts){
  cut.style.strokeDasharray='1';
  if(returning||staticPolicy()||document.hidden)finish(cut);
  else{cut.style.strokeDashoffset='1';cut.dataset.cutState='pending';observer.observe(cut);}
}
scanSkipped();
addEventListener('scroll',scanSkipped,{passive:true});addEventListener('resize',scanSkipped);
reduced.addEventListener('change',policyChanged);document.addEventListener('visibilitychange',visibilityChanged);
policyObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-mode','data-reduced']});
// BFCache returns this completed DOM without starting a new lifecycle or replay.
addEventListener('pagehide',destroy,{once:true});
