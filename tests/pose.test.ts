import test from 'node:test';
import assert from 'node:assert/strict';
import { PoseController, POSES } from '../src/features/hero/pose';

test('rapid input retains rendered pose and resolves the latest selection without a queue', () => {
 const c = new PoseController('precise');
 for (const [feel,time] of [['playful',0],['cinematic',130],['precise',270],['playful',410],['cinematic',550]] as const) {
   c.tick(time); const before = [...c.angles]; c.select(feel,time); assert.deepEqual(c.angles,before);
 }
 c.tick(1400); assert.deepEqual(c.angles,POSES.cinematic); assert.equal(c.active,false);
});
test('repeated selection does not restart choreography', () => {
 const c = new PoseController('precise'); c.select('playful',0); c.tick(300);
 assert.equal(c.select('playful',301),false); c.tick(661); assert.deepEqual(c.angles,POSES.playful);
});
test('offscreen reentry settles latest selected target with no time debt', () => {
 const c = new PoseController('precise'); c.select('cinematic',0); c.tick(100); c.settle();
 assert.deepEqual(c.angles,POSES.cinematic); assert.equal(c.active,false);
});
test('all interrupted paths stay within the endpoint angle envelope', () => {
 const c = new PoseController('precise');
 for(let t=0;t<4000;t+=8) { if(t%104===0)c.select((['precise','playful','cinematic'] as const)[(t/104)%3]!,t); c.tick(t);
 c.angles.forEach((a,i)=>assert.ok(a>=Math.min(...Object.values(POSES).map(p=>p[i]!)) && a<=Math.max(...Object.values(POSES).map(p=>p[i]!)))); }
});
