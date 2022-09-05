const http = require('http');

const port = 8124

http.createServer((req, res) => {
    res.writeHead(404, { 'content-type': 'text/plain'})
    res.end('Hej varldena!')
}).listen(port);

console.log('Listening on ' + port)