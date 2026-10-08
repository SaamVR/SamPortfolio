import type { Feel } from '../hero/pose';
export interface DirectionDraft {schemaVersion:1;draftId:string;revision:number;feel:Feel;goal:string;updatedAt:string}
export const isFeel=(v:unknown):v is Feel=>v==='precise'||v==='playful'||v==='cinematic';
const fresh=():DirectionDraft=>({schemaVersion:1,draftId:crypto.randomUUID(),revision:0,feel:'precise',goal:'',updatedAt:new Date().toISOString()});
export function restoreDraft(raw:string|null):DirectionDraft{try{const d=JSON.parse(raw??'null');if(d?.schemaVersion===1&&isFeel(d.feel)&&typeof d.draftId==='string'&&typeof d.goal==='string'&&d.goal.length<=2000&&Number.isSafeInteger(d.revision)&&d.revision>=0&&typeof d.updatedAt==='string')return {schemaVersion:1,draftId:d.draftId,revision:d.revision,feel:d.feel,goal:d.goal,updatedAt:d.updatedAt};}catch{}return fresh();}
export function chooseFeel(d:DirectionDraft,feel:Feel):DirectionDraft{return d.feel===feel?d:{...d,feel,revision:d.revision+1,updatedAt:new Date().toISOString()};}
export function readDraft(){try{return restoreDraft(localStorage.getItem('opening-direction-v1'));}catch{return fresh();}}
export function persistDraft(d:DirectionDraft){try{localStorage.setItem('opening-direction-v1',JSON.stringify(d));return true;}catch{return false;}}
