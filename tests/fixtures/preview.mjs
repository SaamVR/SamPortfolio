import http from 'node:http';
const server=http.createServer((_req,res)=>{res.end('preview fixture');});
server.listen(Number(process.argv[2]),'127.0.0.1',()=>console.log(`fixture-preview-pid=${process.pid}`));
