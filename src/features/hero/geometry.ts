import * as THREE from 'three';
export const PROOF={x0:.32,x1:.77,y0:.36,y1:.64};
export const ENVELOPE={x0:.08,x1:.92,y0:.10,y1:.88};
export const MANIFEST=[
 {name:'leaf_lead',axis:'y' as const,pivot:[-4.0,0,0],outline:[[0,-2.9],[1.35,-2.9],[1.65,-2.55],[1.65,2.55],[1.3,3.05],[0,3.05]],seam:[[1.65,-2.55],[1.65,2.55],[1.3,3.05]]},
 {name:'leaf_secondary',axis:'y' as const,pivot:[4.0,1.88,0],outline:[[-5.4,0],[0,0],[0,.55],[-.6,1.08],[-5.4,1.08]],seam:[[-5.4,0],[0,0]]},
 {name:'leaf_corner',axis:'x' as const,pivot:[1.3,-2.18,0],outline:[[-2.8,0],[2.7,0],[2.7,-.62],[2.2,-1.0],[-2.8,-1.0]],seam:[[-2.8,0],[2.7,0]]}
];
export function makeCamera(aspect:number){const c=new THREE.PerspectiveCamera(35,aspect,.1,100);c.position.set(0,0,16.5);c.lookAt(0,0,0);c.updateMatrixWorld();return c;}
export function makeAssembly(){
 const root=new THREE.Group();const body=new THREE.MeshStandardMaterial({color:0x555a5c,roughness:.5,metalness:.14});const pigment=new THREE.LineBasicMaterial({color:0xff5b3d});
 const leaves=MANIFEST.map(m=>{
  const shape=new THREE.Shape(m.outline.map(([x,y])=>new THREE.Vector2(x,y)));
  const geo=new THREE.ExtrudeGeometry(shape,{depth:.13,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.045,bevelThickness:.035,curveSegments:1});geo.clearGroups();
  const mesh=new THREE.Mesh(geo,body);const hinge=new THREE.Group();hinge.name=m.name+'_hinge';hinge.position.fromArray(m.pivot);hinge.add(mesh);
  const seam=new THREE.Line(new THREE.BufferGeometry().setFromPoints(m.seam.map(([x,y])=>new THREE.Vector3(x,y,.171))),pigment);hinge.add(seam);root.add(hinge);return {hinge,mesh,axis:m.axis};
 });
 return {root,leaves,setAngles(angles:number[]){leaves.forEach((l,i)=>{l.hinge.rotation[l.axis]=THREE.MathUtils.degToRad(angles[i]!);});root.updateMatrixWorld(true);},dispose(){leaves.forEach(l=>{l.mesh.geometry.dispose();(l.hinge.children[1] as THREE.Line).geometry.dispose();});body.dispose();pigment.dispose();}};
}
export type Assembly=ReturnType<typeof makeAssembly>;
export function projectBounds(a:Assembly,camera:THREE.Camera){a.root.updateMatrixWorld(true);return a.leaves.map(l=>{
 const pos=l.mesh.geometry.attributes.position;let x0=1,y0=1,x1=0,y1=0;
 for(let i=0;i<pos.count;i++){const v=new THREE.Vector3().fromBufferAttribute(pos,i).applyMatrix4(l.mesh.matrixWorld).project(camera);const x=(v.x+1)/2,y=(1-v.y)/2;x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 return {name:l.hinge.name,x0,x1,y0,y1};});}
