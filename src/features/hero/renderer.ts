import * as THREE from 'three';
import {makeAssembly,makeCamera,projectBounds} from './geometry';
import {PoseController,type Feel} from './pose';
export function createStage(host:HTMLElement,feel:Feel,onFailure:(reason:string)=>void){
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setClearColor(0x171a1c,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 host.append(renderer.domElement);const scene=new THREE.Scene(),camera=makeCamera(1.2),assembly=makeAssembly(),pose=new PoseController(feel);scene.add(assembly.root);
 scene.add(new THREE.AmbientLight(0xdde5e1,.55));const key=new THREE.DirectionalLight(0xf8faf7,3.2);key.position.set(-3,6,8);scene.add(key);const fill=new THREE.DirectionalLight(0xdde5e1,.8);fill.position.set(5,0,4);scene.add(fill);const rim=new THREE.DirectionalLight(0xf8faf7,1.75);rim.position.set(0,-3,-4);scene.add(rim);
 let disposed=false,visible=true,raf=0,last=0;const frameTimes:number[]=[];let choreographyCount=0;
 function report(){host.dataset.angles=JSON.stringify(pose.angles);host.dataset.active=String(pose.active);host.dataset.choreographies=String(choreographyCount);host.dataset.drawCalls=String(renderer.info.render.calls);host.dataset.triangles=String(renderer.info.render.triangles);host.dataset.framebuffer=`${renderer.domElement.width}x${renderer.domElement.height}`;host.dataset.bounds=JSON.stringify(projectBounds(assembly,camera));host.dataset.frames=JSON.stringify(frameTimes);}
 function draw(){if(disposed)return;assembly.setAngles(pose.angles);renderer.render(scene,camera);report();}
 function tick(now:number){raf=0;if(disposed||!visible||document.hidden)return; if(last){frameTimes.push(now-last);if(frameTimes.length>240)frameTimes.shift();}last=now;pose.tick(now);draw();if(pose.active)raf=requestAnimationFrame(tick);else last=0;}
 function resize(){if(disposed)return;const r=host.getBoundingClientRect();if(!r.width||!r.height)return;const mobile=matchMedia('(max-width:700px)').matches;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1:1.5));renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();if(visible)draw();}
 const ro=new ResizeObserver(resize);ro.observe(host);
 function contextLost(e:Event){e.preventDefault();onFailure('Rendering interrupted — showing the authored still.');}
 renderer.domElement.addEventListener('webglcontextlost',contextLost);
 resize();host.dataset.ready='true';
 return {select(next:Feel){if(disposed)return;if(pose.select(next,performance.now())){choreographyCount++;if(!visible||document.hidden){pose.settle();report();return;}if(!raf)raf=requestAnimationFrame(tick);}},setVisible(next:boolean){visible=next;if(!next){cancelAnimationFrame(raf);raf=0;last=0;pose.settle();report();}else{pose.settle();draw();}},dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);ro.disconnect();renderer.domElement.removeEventListener('webglcontextlost',contextLost);assembly.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();host.dataset.ready='false';}};
}
export type StageRenderer=ReturnType<typeof createStage>;
