import {runPreviewBrowser} from '../../scripts/preview-browser.mjs';
const port=Number(process.argv[2]);
const result=await runPreviewBrowser({port,previewCommand:[process.execPath,'tests/fixtures/preview.mjs',String(port)],suiteCommand:[process.execPath,'-e',"console.log('fixture-suite-started');setInterval(()=>{},1000)"]});
process.exitCode=result.exitCode;
