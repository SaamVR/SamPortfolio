import test from 'node:test';import assert from 'node:assert/strict';
import {restoreBrief,readStoredBrief,serializeBrief,BRIEF_KEY,LEGACY_KEY} from '../src/features/brief/persistence';
const legacy={schemaVersion:1,draftId:'legacy-id',revision:3,feel:'playful',goal:'A real goal',updatedAt:'2026-10-08T12:00:00Z'};
test('legacy note migration preserves identity/direction/goal and increments revision once',()=>{
 const data=new Map([[LEGACY_KEY,JSON.stringify(legacy)]]);const storage={getItem:(key:string)=>data.get(key)??null,setItem:(key:string,value:string)=>{data.set(key,value);}};
 const r=readStoredBrief(storage);assert.equal(r.draft.draftId,'legacy-id');assert.equal(r.draft.feel,'playful');assert.equal(r.draft.goal,'A real goal');assert.equal(r.draft.revision,4);assert.deepEqual(r.draft.serviceIds,[]);assert.equal(r.draft.audience,'');assert.equal(r.storageStatus,'saved');assert.equal(readStoredBrief(storage).draft.revision,4);assert.ok(data.has(BRIEF_KEY));assert.ok(data.has(LEGACY_KEY));
});
test('corrupt/unknown/full-note-shaped new data recover safely; unavailable storage is temporary',()=>{
 for(const raw of ['{','{"schemaVersion":2}',JSON.stringify(legacy)]){const r=restoreBrief(raw);assert.equal(r.draft.feel,'precise');assert.equal(r.recovered,true);}
 const r=readStoredBrief({getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}});assert.equal(r.storageStatus,'temporary');
});
test('unknown references are removed with notice; contact/unknown fields never persist',()=>{
 const base=restoreBrief(null).draft;const r=restoreBrief(JSON.stringify({...base,serviceIds:['interface-motion','gone'],projectReferenceIds:['opening-study','deleted'],name:'PRIVATE',email:'SECRET',message:'CONTACT',extra:true}));
 assert.deepEqual(r.draft.serviceIds,['interface-motion']);assert.deepEqual(r.draft.projectReferenceIds,['opening-study']);assert.match(r.notices.join(' '),/unavailable/i);const raw=serializeBrief({...r.draft,email:'SECRET'} as typeof base);assert.equal(raw.includes('SECRET'),false);assert.equal(raw.includes('PRIVATE'),false);
});
test('bounded reference URLs use HTTP(S) without credentials; invalid URL input is rejected',()=>{
 const base=restoreBrief(null).draft;const good=restoreBrief(JSON.stringify({...base,referenceURLs:['https://example.com/work']}));assert.deepEqual(good.draft.referenceURLs,['https://example.com/work']);
 for(const url of ['javascript:alert(1)','file:///etc/passwd','https://user:password@example.com','not a URL']){const r=restoreBrief(JSON.stringify({...base,referenceURLs:[url]}));assert.equal(r.recovered,true);}
});
test('corrupt new/legacy data never report an unsaved recovery as saved, including empty strings',()=>{
 for(const [key,raw] of [[BRIEF_KEY,'{'],[BRIEF_KEY,''],[LEGACY_KEY,'{']]){const r=readStoredBrief({getItem:k=>k===key?raw:null,setItem(){throw new Error('no write');}});assert.equal(r.storageStatus,'temporary');assert.equal(r.recovered,true);assert.match(r.notices.join(' '),/could not be read/);}
});
