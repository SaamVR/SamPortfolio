import {LIMITS,type BriefDraftV1,type DraftAction} from './types';
import {normalizeBrief} from './persistence';
export function reduceDraft(draft:BriefDraftV1,action:DraftAction,nowIso=new Date().toISOString()):BriefDraftV1{
 const patched={...draft};if(action.type==='feel')patched.feel=action.value;else if(action.type==='references')patched.referenceURLs=action.value;else patched[action.field]=action.value as never;
 const normalized=normalizeBrief(patched);if(!normalized)throw new Error('This value exceeds the brief limits or is invalid.');
 const next=normalized.draft;next.updatedAt=draft.updatedAt;
 if(JSON.stringify(next)===JSON.stringify(normalizeBrief(draft)?.draft))return draft;
 if(draft.revision>=LIMITS.revision)throw new Error('This brief reached its revision limit. Export it before starting a new brief.');
 next.revision=draft.revision+1;next.updatedAt=nowIso;return next;
}
