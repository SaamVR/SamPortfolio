import test from 'node:test';
import assert from 'node:assert/strict';
import {initialQuality,observeActiveFrame} from '../src/features/hero/quality';
function feed(state:ReturnType<typeof initialQuality>,interval:number,count:number,clock={now:0}){for(let i=0;i<count;i++){clock.now+=interval;state=observeActiveFrame(state,interval,clock.now);}return state;}
test('fewer than 40 active samples never complete a window; inactive gaps are excluded',()=>{
 let s=feed(initialQuality(25),50,39);assert.equal(s.level,'full');assert.equal(s.samples.length,39);
 s=observeActiveFrame(s,null,50000);assert.equal(s.samples.length,39);assert.equal(s.badWindows,0);
 for(const interval of [0,-1,NaN,Infinity])s=observeActiveFrame(s,interval,50001);
 assert.equal(s.samples.length,39);
});
test('two consecutive bad 40-sample p95 windows lower one level, then two more choose light',()=>{
 const clock={now:0};let s=feed(initialQuality(25),35,40,clock);assert.equal(s.level,'full');assert.equal(s.badWindows,1);
 s=feed(s,35,40,clock);assert.equal(s.level,'lower');assert.equal(s.samples.length,0);assert.equal(s.badWindows,0);
 s=feed(s,35,80,clock);assert.equal(s.level,'light');
 const terminal=s;s=feed(s,16,100,clock);assert.equal(s,terminal);
});
test('15 percent trigger tolerance does not redefine the target; a good window breaks bad streak',()=>{
 const clock={now:0};let s=feed(initialQuality(25),28.75,80,clock);assert.equal(s.level,'full');assert.equal(s.targetMs,25);
 s=feed(s,35,40,clock);assert.equal(s.badWindows,1);s=feed(s,16,40,clock);assert.equal(s.badWindows,0);
 s=feed(s,35,40,clock);assert.equal(s.level,'full');
 let phone=feed(initialQuality(40),45,80);assert.equal(phone.level,'full');phone=feed(phone,47,80,{now:4000});assert.equal(phone.level,'lower');
});
test('p95 tolerates two outliers in 40 and restored lower quality never silently increases',()=>{
 let s=initialQuality(25,'lower');const clock={now:0};s=feed(s,16,38,clock);s=feed(s,100,2,clock);assert.equal(s.badWindows,0);assert.equal(s.level,'lower');
 s=feed(s,16,80,clock);assert.equal(s.level,'lower');assert.equal(observeActiveFrame(s,35,clock.now-1),s);
});
