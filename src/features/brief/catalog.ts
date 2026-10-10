export interface CatalogEntry {id:string;label:string;approval:'pending_owner_approval'|'owner_selected';kind:'offer_preview'|'development_placeholder'|'repository_project';note?:string;href?:string}
export const services:readonly CatalogEntry[]=[{id:'interactive-websites',label:'Interactive websites',approval:'pending_owner_approval',kind:'offer_preview'},{id:'interface-motion',label:'Interface motion',approval:'pending_owner_approval',kind:'offer_preview'},{id:'creative-development',label:'Creative development',approval:'pending_owner_approval',kind:'offer_preview'}];
export const projects:readonly CatalogEntry[]=[
{id:'opening-study',label:'The Opening form study',approval:'pending_owner_approval',kind:'development_placeholder'},
{id:'staypilot',label:'StayPilot',approval:'owner_selected',kind:'repository_project',note:'Hotel operations prototype · seeded demo data',href:'/work/staypilot/'},
{id:'sm-manager',label:'SM Manager',approval:'owner_selected',kind:'repository_project',note:'Messenger commerce implementation',href:'/work/sm-manager/'},
{id:'ecomcms',label:'EcomCMS',approval:'owner_selected',kind:'repository_project',note:'Commerce CMS implementation',href:'/work/ecomcms/'},
{id:'tingtune',label:'TingTune',approval:'owner_selected',kind:'repository_project',note:'Music-learning prototype',href:'/work/tingtune/'},
{id:'nova',label:'NOVA',approval:'owner_selected',kind:'repository_project',note:'Interactive 3D concept · asset attribution pending',href:'/work/nova/'},
{id:'servicedesk',label:'ServiceDesk AI',approval:'owner_selected',kind:'repository_project',note:'Cleaning operations implementation',href:'/work/servicedesk/'},
{id:'ezcomo',label:'EZComo',approval:'owner_selected',kind:'repository_project',note:'Commerce homepage prototype',href:'/work/ezcomo/'}];
export const referenceLabel=(p:CatalogEntry)=>p.kind==='repository_project'?`${p.label} — ${p.note}; owner-selected, contribution credits pending`:`${p.label} — development placeholder, pending owner approval`;
export const catalogFor=(field:'serviceIds'|'projectReferenceIds')=>field==='serviceIds'?services:projects;
