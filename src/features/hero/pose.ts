export type Feel = 'precise' | 'playful' | 'cinematic';
export const POSES: Record<Feel, [number, number, number]> = { precise: [-18,22,8], playful: [-28,34,14], cinematic: [-38,42,18] };
export const DURATIONS: Record<Feel,number>={precise:540,playful:660,cinematic:760};
const score=[[60,340],[120,430],[190,510]] as const;
const ease=(p:number)=>p*p*p*(p*(p*6-15)+10);
export class PoseController {
 angles:number[]; selected:Feel; active=false;
 private from:number[]; private start=0;
 constructor(feel:Feel){this.selected=feel;this.angles=[...POSES[feel]];this.from=[...this.angles];}
 select(feel:Feel,now:number){if(feel===this.selected)return false;this.tick(now);this.from=[...this.angles];this.selected=feel;this.start=now;this.active=true;return true;}
 tick(now:number){if(!this.active)return;const elapsed=now-this.start;const duration=DURATIONS[this.selected];
 this.angles=score.map(([a,b],i)=>{const p=Math.min(1,Math.max(0,(elapsed-a/700*duration)/((b-a)/700*duration)));return this.from[i]!+(POSES[this.selected][i]!-this.from[i]!)*ease(p);});
 if(elapsed>=duration)this.settle();}
 settle(){this.angles=[...POSES[this.selected]];this.active=false;}
}
