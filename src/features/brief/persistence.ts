import {freshDraft,isFeel,LIMITS,type BriefDraftV1} from './types';
import {catalogFor} from './catalog';
export const BRIEF_KEY='opening-brief-v1',LEGACY_KEY='opening-direction-v1';
export interface StoragePort {getItem(key:string):string|null;setItem(key:string,value:string):void}
const record=(v:unknown):v is Record<string,unknown>=>typeof v==='object'&&v!==null&&!Array.isArray(v);
const text=(v:unknown,max:number):v is string=>typeof v==='string'&&v.length<=max;
const date=(v:unknown):v is string=>typeof v==='string'&&v.length<=40&&Number.isFinite(Date.parse(v));
const revision=(v:unknown):v is number=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0&&v<=LIMITS.revision;
export function normalizeURLs(value:unknown):string[]|undefined{
 if(!Array.isArray(value)||value.length>LIMITS.referenceURLs)return;
 const result:string[]=[];for(const raw of value){if(!text(raw,LIMITS.urlLength))return;try{const u=new URL(raw.trim());if(!['http:','https:'].includes(u.protocol)||u.username||u.password||u.href.length>LIMITS.urlLength)return;if(!result.includes(u.href))result.push(u.href);}catch{return;}}return result;
}
export function normalizeBrief(value:unknown):{draft:BriefDraftV1;notices:string[]}|undefined{
 if(!record(value)||value.schemaVersion!==1||!text(value.draftId,100)||!value.draftId||!revision(value.revision)||!isFeel(value.feel)||!date(value.updatedAt))return;
 for(const field of ['goal','audience','desiredAction','constraints'] as const)if(!text(value[field],LIMITS[field]))return;
 for(const field of ['budget','timing'] as const)if(value[field]!==undefined&&!text(value[field],LIMITS[field]))return;
 const notices:string[]=[];const ids:Record<string,string[]>={};
 for(const field of ['serviceIds','projectReferenceIds'] as const){const raw=value[field];if(!Array.isArray(raw)||raw.length>LIMITS.ids||!raw.every(id=>text(id,100)))return;const known=catalogFor(field).map(x=>x.id);ids[field]=known.filter(id=>raw.includes(id));if(raw.some(id=>!known.includes(id)))notices.push(field==='serviceIds'?'An unavailable service reference was removed.':'An unavailable project reference was removed.');}
 const urls=normalizeURLs(value.referenceURLs??[]);if(!urls)return;
 const draft:BriefDraftV1={schemaVersion:1,draftId:value.draftId,revision:value.revision,feel:value.feel,serviceIds:ids.serviceIds!,projectReferenceIds:ids.projectReferenceIds!,goal:value.goal as string,audience:value.audience as string,desiredAction:value.desiredAction as string,constraints:value.constraints as string,referenceURLs:urls,updatedAt:value.updatedAt};
 if(value.budget)draft.budget=value.budget as string;if(value.timing)draft.timing=value.timing as string;
 return {draft,notices};
}
export function restoreBrief(raw:string|null){try{const normalized=normalizeBrief(JSON.parse(raw??'null'));if(normalized)return {...normalized,recovered:false};}catch{}return {draft:freshDraft(),notices:raw!==null?['The saved brief could not be read; a fresh temporary starting point is available.']:[],recovered:raw!==null};}
export function serializeBrief(draft:BriefDraftV1){const normalized=normalizeBrief(draft);if(!normalized)throw new Error('Invalid anonymous brief.');return JSON.stringify(normalized.draft);}
function migrate(raw:string|null):BriefDraftV1|undefined{try{const d=JSON.parse(raw??'null');if(!record(d)||d.schemaVersion!==1||!text(d.draftId,100)||!d.draftId||!revision(d.revision)||d.revision>=LIMITS.revision||!isFeel(d.feel)||!text(d.goal,LIMITS.goal)||!date(d.updatedAt))return;return {...freshDraft(),draftId:d.draftId,revision:d.revision+1,feel:d.feel,goal:d.goal,updatedAt:new Date().toISOString()};}catch{return;}}
export function readStoredBrief(storage:StoragePort){
 try{const raw=storage.getItem(BRIEF_KEY);if(raw!==null){const result=restoreBrief(raw);return {...result,storageStatus:result.recovered?'temporary' as const:'saved' as const};}
 const legacy=storage.getItem(LEGACY_KEY);const draft=migrate(legacy);if(draft){let storageStatus:'saved'|'temporary'='saved';try{storage.setItem(BRIEF_KEY,serializeBrief(draft));}catch{storageStatus='temporary';}return {draft,notices:['Your direction note was migrated to the full anonymous brief.'],recovered:false,storageStatus};}
 if(legacy!==null)return {...restoreBrief(null),recovered:true,notices:['The previous direction note could not be read; a fresh temporary starting point is available.'],storageStatus:'temporary' as const};
 const fresh=restoreBrief(null);return {...fresh,storageStatus:saveStoredBrief(storage,fresh.draft)?'saved' as const:'temporary' as const};
 }catch{return {...restoreBrief(null),storageStatus:'temporary' as const};}
}
export function saveStoredBrief(storage:StoragePort,draft:BriefDraftV1){try{storage.setItem(BRIEF_KEY,serializeBrief(draft));return true;}catch{return false;}}
