import type {Feel} from '../hero/pose';
export interface BriefDraftV1 {schemaVersion:1;draftId:string;revision:number;feel:Feel;serviceIds:string[];projectReferenceIds:string[];goal:string;audience:string;desiredAction:string;constraints:string;budget?:string;timing?:string;referenceURLs?:string[];updatedAt:string}
export type TextField='goal'|'audience'|'desiredAction'|'constraints'|'budget'|'timing';
export type DraftAction={type:'feel';value:Feel}|{type:'text';field:TextField;value:string}|{type:'ids';field:'serviceIds'|'projectReferenceIds';value:string[]}|{type:'references';value:string[]};
export const isFeel=(v:unknown):v is Feel=>v==='precise'||v==='playful'||v==='cinematic';
export const LIMITS={goal:2000,audience:1000,desiredAction:1000,constraints:2000,budget:300,timing:300,referenceURLs:8,urlLength:2048,ids:20,revision:1_000_000_000};
export function freshDraft(now=new Date().toISOString()):BriefDraftV1{return {schemaVersion:1,draftId:crypto.randomUUID(),revision:0,feel:'precise',serviceIds:[],projectReferenceIds:[],goal:'',audience:'',desiredAction:'',constraints:'',referenceURLs:[],updatedAt:now};}
