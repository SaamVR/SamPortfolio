import {freshDraft,type BriefDraftV1} from './types';import type {Feel} from '../hero/pose';
import {restoreBrief,readStoredBrief,saveStoredBrief} from './persistence';import {reduceDraft} from './reducer';
export {isFeel} from './types';
export type DirectionDraft=BriefDraftV1;
export const restoreDraft=(raw:string|null)=>restoreBrief(raw).draft;
export const chooseFeel=(draft:BriefDraftV1,feel:Feel)=>reduceDraft(draft,{type:'feel',value:feel});
export function readDraftState(){try{return readStoredBrief(localStorage);}catch{return {draft:freshDraft(),notices:[],recovered:false,storageStatus:'temporary' as const};}}
export const readDraft=()=>readDraftState().draft;
export function persistDraft(draft:BriefDraftV1){try{return saveStoredBrief(localStorage,draft);}catch{return false;}}
