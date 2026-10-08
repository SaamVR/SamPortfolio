import {makeAssembly,makeCamera,MANIFEST,projectBounds,PROOF,ENVELOPE} from '../src/features/hero/geometry';
import {POSES,DURATIONS} from '../src/features/hero/pose';import {writeFileSync} from 'node:fs';
const a=makeAssembly(),camera=makeCamera(1.2);const sheets=Object.fromEntries(Object.entries(POSES).map(([feel,angles])=>{a.setAngles(angles);return [feel,{angles,duration:DURATIONS[feel as keyof typeof DURATIONS],bounds:projectBounds(a,camera)}];}));
writeFileSync('public/art/manifest.json',JSON.stringify({status:'Original session-authored graybox; owner review pending',camera:{verticalFov:35,position:[0,0,16.5],aspect:1.2},protectedProof:PROOF,envelope:ENVELOPE,leaves:MANIFEST,poses:sheets},null,2));
writeFileSync('src/features/hero/frames.json',JSON.stringify(sheets));a.dispose();
