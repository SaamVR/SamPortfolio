import {spawn} from 'node:child_process';
import net from 'node:net';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const grouped=process.platform!=='win32';
async function requireFreePort(port){
 const server=net.createServer();
 try{await new Promise((ok,fail)=>{server.once('error',fail);server.listen(port,'127.0.0.1',ok);});}
 catch(error){if(error.code==='EADDRINUSE')throw new Error(`Preview port ${port} is already in use; select OPENING_PREVIEW_PORT. No unrelated server was stopped.`);throw error;}
 finally{if(server.listening)await new Promise(r=>server.close(r));}
}
function start(command,cwd,env){
 const child=spawn(command[0],command.slice(1),{cwd,env,stdio:'inherit',detached:grouped});
 // Install listeners at spawn time so an early failure cannot be missed.
 child.completion=new Promise((ok,fail)=>{child.once('error',fail);child.once('exit',(code,signal)=>ok({code,signal}));});
 child.completion.catch(()=>{});
 return child;
}
async function stop(child){
 if(!child||child.exitCode!==null||child.signalCode!==null||!child.pid)return;
 const kill=signal=>{try{if(grouped)process.kill(-child.pid,signal);else child.kill(signal);}catch(e){if(e.code!=='ESRCH')throw e;}};
 kill('SIGTERM');
 const closed=await Promise.race([child.completion.then(()=>true,()=>true),delay(2000).then(()=>false)]);
 if(!closed){kill('SIGKILL');await child.completion.catch(()=>{});}
}
/**
 * @param {{port?:number, previewCommand?:string[], suiteCommand?:string[], readyTimeoutMs?:number, cwd?:string, env?:NodeJS.ProcessEnv}} [options]
 */
export async function runPreviewBrowser(options={}){
 const port=options.port??Number(process.env.OPENING_PREVIEW_PORT||4330);
 if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Preview port must be an integer from 1 to 65535.');
 await requireFreePort(port);
 const cwd=options.cwd??process.cwd();const base=`http://127.0.0.1:${port}`;
 const env={...process.env,...options.env,OPENING_BASE_URL:base};
 const previewCommand=options.previewCommand??[process.execPath,resolve(cwd,'node_modules/astro/astro.js'),'preview','--host','127.0.0.1','--port',String(port)];
 const suiteCommand=options.suiteCommand??[process.execPath,'tests/browser.mjs'];
 let preview,suite,interrupted=0;
 const abort=new AbortController();
 const interrupt=signal=>{interrupted=signal==='SIGINT'?130:143;abort.abort();};
 const onInt=()=>interrupt('SIGINT'),onTerm=()=>interrupt('SIGTERM');
 process.on('SIGINT',onInt);process.on('SIGTERM',onTerm);
 try{
  preview=start(previewCommand,cwd,env);
  const deadline=Date.now()+(options.readyTimeoutMs??10000);
  let ready=false;
  while(Date.now()<deadline&&!abort.signal.aborted){
   if(preview.exitCode!==null||preview.signalCode!==null)throw new Error('Owned preview exited before becoming ready.');
   try{const response=await fetch(base,{signal:AbortSignal.any([abort.signal,AbortSignal.timeout(500)])});await response.arrayBuffer();if(response.ok){ready=true;break;}}catch(error){if(abort.signal.aborted)break;}
   await delay(100);
  }
  if(abort.signal.aborted)return {exitCode:interrupted,previewPid:preview.pid};
  if(!ready)throw new Error(`Owned preview was not ready within ${options.readyTimeoutMs??10000}ms.`);
  suite=start(suiteCommand,cwd,env);
  const result=await Promise.race([suite.completion,new Promise(r=>abort.signal.addEventListener('abort',()=>r({code:interrupted,signal:null}),{once:true}))]);
  return {exitCode:interrupted||(result.code??1),previewPid:preview.pid};
 }finally{
  await stop(suite);await stop(preview);
  process.removeListener('SIGINT',onInt);process.removeListener('SIGTERM',onTerm);
 }
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const extra=process.argv.slice(2).filter(a=>a!=='--');const result=await runPreviewBrowser(extra.length?{suiteCommand:[process.execPath,...extra]}:{});process.exitCode=result.exitCode;}
 catch(error){console.error(error.message);process.exitCode=1;}
}
