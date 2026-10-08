import test from 'node:test';import assert from 'node:assert/strict';
import {freshDraft} from '../src/features/brief/types';import {reduceDraft} from '../src/features/brief/reducer';import {snapshotDraft,serializeDraftJson,renderPrintableHtml} from '../src/features/brief/export';
test('snapshot is deeply frozen at rN after source changes; both formats identify that revision',()=>{
 const a=reduceDraft(freshDraft(),{type:'text',field:'goal',value:'A useful goal'});const snapshot=snapshotDraft(a);const b=reduceDraft(a,{type:'text',field:'goal',value:'A later edit'});assert.equal(snapshot.revision,b.revision-1);assert.equal(snapshot.goal,'A useful goal');assert.ok(Object.isFrozen(snapshot));assert.ok(Object.isFrozen(snapshot.serviceIds));assert.equal(JSON.parse(serializeDraftJson(snapshot)).revision,snapshot.revision);assert.match(renderPrintableHtml(snapshot),new RegExp(`Revision ${snapshot.revision}`));
});
test('script-like strings are escaped and private/unknown fields never enter either format',()=>{
 const a={...freshDraft(),goal:'<script>alert("x")</script> & <img src=x>',email:'PRIVATE_EMAIL',name:'PRIVATE_NAME',message:'PRIVATE_MESSAGE',unknown:'UNKNOWN_VALUE'};const snapshot=snapshotDraft(a);const html=renderPrintableHtml(snapshot),json=serializeDraftJson(snapshot);assert.equal(html.includes('<script>'),false);assert.equal(html.includes('<img src=x>'),false);assert.match(html,/&lt;script&gt;/);for(const privateText of ['PRIVATE_EMAIL','PRIVATE_NAME','PRIVATE_MESSAGE','UNKNOWN_VALUE']){assert.equal(html.includes(privateText),false);assert.equal(json.includes(privateText),false);}
});
test('catalog provenance remains honest and unavailable references are excluded',()=>{
 const snapshot=snapshotDraft({...freshDraft(),serviceIds:['interface-motion','unavailable'],projectReferenceIds:['opening-study','deleted']});const html=renderPrintableHtml(snapshot),json=serializeDraftJson(snapshot);assert.match(html,/pending owner approval/i);assert.match(html,/development placeholder/i);assert.match(html,/unavailable/i);assert.equal(json.includes('deleted'),false);assert.equal(json.includes('pending_owner_approval'),true);
});
