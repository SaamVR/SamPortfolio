import test from 'node:test';import assert from 'node:assert/strict';import net from 'node:net';
import { runPreviewBrowser } from '../scripts/preview-browser.mjs';
async function port(){const server=net.createServer();await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));const p=(server.address() as net.AddressInfo).port;await new Promise<void>(resolve=>server.close(()=>resolve()));return p;}
for(const code of [0,17])test(`suite exit ${code} is preserved and owned preview process is reaped`,async()=>{
 const p=await port();const result=await runPreviewBrowser({port:p,previewCommand:[process.execPath,'tests/fixtures/preview.mjs',String(p)],suiteCommand:[process.execPath,'-e',`if(process.env.OPENING_BASE_URL!=='http://127.0.0.1:${p}')process.exit(99);process.exit(${code})`]});
 assert.equal(result.exitCode,code);assert.throws(()=>process.kill(result.previewPid!,0),{code:'ESRCH'});
 const s=net.createServer();await new Promise<void>((resolve,reject)=>{s.once('error',reject);s.listen(p,'127.0.0.1',resolve);});await new Promise<void>(resolve=>s.close(()=>resolve()));
});
test('an occupied port is rejected and the unrelated server stays running',async()=>{
 const s=net.createServer();await new Promise<void>(resolve=>s.listen(0,'127.0.0.1',resolve));const p=(s.address() as net.AddressInfo).port;
 try{await assert.rejects(runPreviewBrowser({port:p}),/already in use/);assert.equal(s.listening,true);}finally{await new Promise<void>(resolve=>s.close(()=>resolve()));}
});
test('SIGTERM cancels the suite and reaps the owned preview',async()=>{
 const {spawn}=await import('node:child_process');const p=await port();
 const runner=spawn(process.execPath,['tests/fixtures/interrupted-runner.mjs',String(p)],{stdio:['ignore','pipe','pipe']});
 const ended=new Promise<number|null>(resolve=>runner.once('exit',resolve));let output='';let previewPid=0;
 try{
  await new Promise<void>((resolve,reject)=>{
   const timer=setTimeout(()=>reject(new Error('Fixture runner did not start')),5000);
   runner.stdout.on('data',chunk=>{output+=chunk.toString();const match=output.match(/fixture-preview-pid=(\d+)/);if(match)previewPid=Number(match[1]);if(previewPid&&output.includes('fixture-suite-started')){clearTimeout(timer);resolve();}});
   runner.once('error',reject);
  });
  runner.kill('SIGTERM');assert.equal(await ended,143);assert.throws(()=>process.kill(previewPid,0),{code:'ESRCH'});
 }finally{if(runner.exitCode===null&&runner.signalCode===null)runner.kill('SIGTERM');await ended;}
});
