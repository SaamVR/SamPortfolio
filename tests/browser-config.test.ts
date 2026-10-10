import test from 'node:test';
import assert from 'node:assert/strict';
import { browserConfig } from './browser-config.mjs';
test('all browser tools honor an alternate origin and executable',()=>{
 const c=browserConfig({OPENING_BASE_URL:'http://127.0.0.1:4347/',OPENING_BROWSER_PATH:process.execPath});
 assert.equal(c.baseUrl,'http://127.0.0.1:4347');assert.equal(c.launchOptions.executablePath,process.execPath);
});
test('a malformed or non-http preview URL fails before opening a browser',()=>{
 for(const url of ['not a url','file:///etc/passwd'])assert.throws(()=>browserConfig({OPENING_BASE_URL:url}));
});
