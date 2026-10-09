import * as THREE from 'three';
import {makeAssembly,makeCamera,projectBounds} from './geometry';
import {PoseController,type Feel} from './pose';
import {initialQuality,observeActiveFrame,type QualityLevel} from './quality';
export interface StageOptions { capture?:boolean; diagnostics?:boolean; entry?:boolean; quality?:QualityLevel; onQualityChange?:(level:QualityLevel)=>void; qualityTest?:boolean }
type DiagnosticHost=HTMLElement & {__openingStage?:{capturePng():string};__openingQualityTest?:{sample(intervalMs:number,nowMs:number):void}};
export function createStage(host:HTMLElement,feel:Feel,onFailure:(reason:string)=>void,options:StageOptions={}){
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:options.capture===true});renderer.setClearColor(0x171a1c,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 host.append(renderer.domElement);const scene=new THREE.Scene(),camera=makeCamera(1.2),assembly=makeAssembly(),pose=new PoseController(feel,options.entry?'first-frame':undefined);scene.add(assembly.root);
 scene.add(new THREE.AmbientLight(0xdde5e1,.55));const key=new THREE.DirectionalLight(0xf8faf7,3.2);key.position.set(-3,6,8);scene.add(key);const fill=new THREE.DirectionalLight(0xdde5e1,.8);fill.position.set(5,0,4);scene.add(fill);const rim=new THREE.DirectionalLight(0xf8faf7,1.75);rim.position.set(0,-3,-4);scene.add(rim);
 let disposed=false,visible=true,raf=0,last=0;const frameTimes:number[]=[];let choreographyCount=0,frameCount=0;
 const diagnostics=options.diagnostics===true||options.capture===true;
 const diagnosticHost=host as DiagnosticHost;
 let quality=initialQuality(matchMedia('(max-width:700px)').matches?40:25,options.capture?'full':options.quality??'full');
 delete host.dataset.frames;delete host.dataset.bounds;
 function report(){
  host.dataset.angles=JSON.stringify(pose.angles);host.dataset.active=String(pose.active);host.dataset.choreographies=String(choreographyCount);host.dataset.frameCount=String(frameCount);host.dataset.quality=quality.level;
  if(diagnostics){host.dataset.drawCalls=String(renderer.info.render.calls);host.dataset.triangles=String(renderer.info.render.triangles);host.dataset.framebuffer=`${renderer.domElement.width}x${renderer.domElement.height}`;host.dataset.bounds=JSON.stringify(projectBounds(assembly,camera));host.dataset.frames=JSON.stringify(frameTimes);}
 }
 function draw(){if(disposed)return;assembly.setAngles(pose.angles);renderer.render(scene,camera);frameCount++;report();}
 function observe(intervalMs:number,nowMs:number){
  if(disposed||options.capture||!visible||document.hidden||!pose.active)return;
  const previous=quality.level;quality=observeActiveFrame(quality,intervalMs,nowMs);
  if(previous!==quality.level){if(quality.level==='lower')resize();report();options.onQualityChange?.(quality.level);}
 }
 function tick(now:number){
  raf=0;if(disposed||!visible||document.hidden)return;
  if(last){if(diagnostics){frameTimes.push(now-last);if(frameTimes.length>240)frameTimes.shift();}observe(now-last,now);}
  if(disposed)return;last=now;pose.tick(now);draw();if(pose.active)raf=requestAnimationFrame(tick);else last=0;
 }
 function resize(){
  if(disposed)return;const r=host.getBoundingClientRect();if(!r.width||!r.height)return;const mobile=matchMedia('(max-width:700px)').matches;const target=mobile?40:25;
  if(quality.targetMs!==target)quality=initialQuality(target,quality.level);
  const ratio=Math.min(devicePixelRatio,mobile?1:1.5);renderer.setPixelRatio(quality.level==='lower'?ratio*.75:ratio);renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();if(visible)draw();
 }
 const ro=new ResizeObserver(resize);ro.observe(host);
 function contextLost(e:Event){e.preventDefault();onFailure('Rendering interrupted — showing the authored still.');}
 renderer.domElement.addEventListener('webglcontextlost',contextLost);
 resize();host.dataset.ready='true';if(pose.active)raf=requestAnimationFrame(tick);
 // Synthetic samples are available only in the explicitly opted-in browser test configuration.
 if(options.qualityTest&&diagnostics)diagnosticHost.__openingQualityTest={sample:observe};
 if(options.capture)diagnosticHost.__openingStage={capturePng(){if(disposed)throw new Error('Stage is disposed.');draw();return renderer.domElement.toDataURL('image/png');}};
 return {capturePng(){if(!options.capture)throw new Error('Capture is disabled in production mode.');if(disposed)throw new Error('Stage is disposed.');draw();return renderer.domElement.toDataURL('image/png');},select(next:Feel){if(disposed)return;if(pose.select(next,performance.now())){choreographyCount++;if(!visible||document.hidden){pose.settle();report();return;}if(!raf)raf=requestAnimationFrame(tick);}},setVisible(next:boolean){if(next===visible)return;visible=next;if(!next){cancelAnimationFrame(raf);raf=0;last=0;pose.settle();report();}else{pose.settle();draw();}},dispose(){if(disposed)return;disposed=true;delete diagnosticHost.__openingStage;delete diagnosticHost.__openingQualityTest;cancelAnimationFrame(raf);ro.disconnect();renderer.domElement.removeEventListener('webglcontextlost',contextLost);assembly.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();host.dataset.ready='false';host.dataset.active='false';}};
}
export type StageRenderer=ReturnType<typeof createStage>;
