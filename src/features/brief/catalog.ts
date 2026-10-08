export interface CatalogEntry {id:string;label:string;approval:'pending_owner_approval';kind:'offer_preview'|'development_placeholder'}
export const services:readonly CatalogEntry[]=[{id:'interactive-websites',label:'Interactive websites',approval:'pending_owner_approval',kind:'offer_preview'},{id:'interface-motion',label:'Interface motion',approval:'pending_owner_approval',kind:'offer_preview'},{id:'creative-development',label:'Creative development',approval:'pending_owner_approval',kind:'offer_preview'}];
export const projects:readonly CatalogEntry[]=[{id:'opening-study',label:'The Opening form study',approval:'pending_owner_approval',kind:'development_placeholder'}];
export const catalogFor=(field:'serviceIds'|'projectReferenceIds')=>field==='serviceIds'?services:projects;
