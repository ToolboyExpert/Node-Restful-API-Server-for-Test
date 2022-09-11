const http = require('node:http');
const { json } = require('stream/consumers');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let req_rawHeader = req.rawHeaders;
  let rUrl = req.url;
  console.log(req_rawHeader);
  if(rUrl === '/'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Undefined User!\n');
  } else if(rUrl === '/users'){
    const users = [
      {name : '박원준'},
      {name : '박경환'}
    ];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'Application/json');
    res.end('Hello, '+JSON.stringify(users)+'!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});