import test from 'node:test';
import assert from 'node:assert/strict';
import { makeAssembly, projectBounds, makeCamera, PROOF, ENVELOPE } from '../src/features/hero/geometry';
import { POSES } from '../src/features/hero/pose';
test('three unequal solid leaves are siblings with +Y/+Y/+X hinges', () => {
 const a=makeAssembly(); assert.equal(a.root.children.length,3);
 assert.deepEqual(a.leaves.map(l=>l.axis),['y','y','x']);
 assert.equal(new Set(a.leaves.map(l=>l.mesh.geometry.attributes.position.count)).size>1,true);
});
test('25 samples of every pose pair protect media and remain in the stage envelope', () => {
 const a=makeAssembly(); const camera=makeCamera(1.2);
 for(const from of Object.values(POSES))for(const to of Object.values(POSES))for(let n=0;n<=25;n++) {
 const angles=from.map((v,i)=>v+(to[i]!-v)*n/25); a.setAngles(angles);
 for(const b of projectBounds(a,camera)) {
 assert.ok(b.x0>=ENVELOPE.x0 && b.x1<=ENVELOPE.x1 && b.y0>=ENVELOPE.y0 && b.y1<=ENVELOPE.y1,JSON.stringify(b));
 assert.ok(b.x1<PROOF.x0 || b.x0>PROOF.x1 || b.y1<PROOF.y0 || b.y0>PROOF.y1,JSON.stringify(b));
 }
 }
});
