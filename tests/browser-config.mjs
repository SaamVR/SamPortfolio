import {existsSync} from 'node:fs';
/** @param {Record<string,string|undefined>} [env] */
export function browserConfig(env=process.env){
 const url=new URL(env.OPENING_BASE_URL||'http://127.0.0.1:4322');
 if(!['http:','https:'].includes(url.protocol))throw new Error('Preview URL must use HTTP or HTTPS.');
 if(url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new Error('Preview URL must be an origin without credentials, a path, query or fragment.');
 const executablePath=env.OPENING_BROWSER_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
 if(executablePath&&!existsSync(executablePath))throw new Error(`Browser executable does not exist: ${executablePath}`);
 return {baseUrl:url.origin,launchOptions:{...(executablePath?{executablePath}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']}};
}
