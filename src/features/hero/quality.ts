export type QualityLevel='full'|'lower'|'light';
export interface QualityState {level:QualityLevel;samples:number[];badWindows:number;targetMs:25|40;lastSampleAt?:number}
export const WINDOW_SAMPLES=40;
export const TRIGGER_TOLERANCE=1.15;
export function initialQuality(targetMs:25|40,level:QualityLevel='full'):QualityState{return {level,samples:[],badWindows:0,targetMs};}
/** Caller supplies only consecutive visible, active RAF intervals; null denotes an excluded gap. */
export function observeActiveFrame(state:QualityState,intervalMs:number|null,nowMs:number):QualityState{
 if(state.level==='light'||intervalMs===null||!Number.isFinite(intervalMs)||intervalMs<=0||!Number.isFinite(nowMs)||(state.lastSampleAt!==undefined&&nowMs<=state.lastSampleAt))return state;
 const samples=[...state.samples,intervalMs];
 if(samples.length<WINDOW_SAMPLES)return {...state,samples,lastSampleAt:nowMs};
 const p95=[...samples].sort((a,b)=>a-b)[Math.ceil(samples.length*.95)-1]!;
 const badWindows=p95/state.targetMs>TRIGGER_TOLERANCE?state.badWindows+1:0;
 return {...state,level:badWindows>=2?(state.level==='full'?'lower':'light'):state.level,samples:[],badWindows:badWindows>=2?0:badWindows,lastSampleAt:nowMs};
}
