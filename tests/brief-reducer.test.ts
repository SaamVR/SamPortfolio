import test from 'node:test';import assert from 'node:assert/strict';
import {restoreBrief} from '../src/features/brief/persistence';import {reduceDraft} from '../src/features/brief/reducer';
const now='2026-10-08T15:00:00.000Z';
test('semantic edits increment exactly once and duplicate/reordered selections are no-ops',()=>{
 const a=restoreBrief(null).draft;assert.equal(reduceDraft(a,{type:'feel',value:a.feel},now),a);
 const b=reduceDraft(a,{type:'text',field:'goal',value:'Build something useful'},now);assert.equal(b.revision,a.revision+1);assert.equal(b.updatedAt,now);assert.equal(reduceDraft(b,{type:'text',field:'goal',value:b.goal},now),b);
 const c=reduceDraft(b,{type:'ids',field:'serviceIds',value:['interface-motion','creative-development']},now);assert.equal(reduceDraft(c,{type:'ids',field:'serviceIds',value:['creative-development','interface-motion','interface-motion']},now),c);assert.equal(c.goal,b.goal);
});
test('reducer rejects invalid inputs without mutating original data',()=>{
 const a=restoreBrief(null).draft;assert.throws(()=>reduceDraft(a,{type:'text',field:'goal',value:'x'.repeat(2001)},now));assert.throws(()=>reduceDraft(a,{type:'references',value:['javascript:alert(1)']},now));assert.equal(a.revision,0);assert.deepEqual(a.serviceIds,[]);
});
