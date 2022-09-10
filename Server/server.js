const http = require('http');
const { stringify } = require('querystring');

const port = 8124

http.createServer((req, res) => {
    res.writeHead(404, { 'content-type': 'text/plain'})
    res.end('Hej varldena!')
}).listen(port);

console.log('Listening on ' + port)


function checkMimeType(mimeType)
{
    if (typeof mimeType !== 'string')
        return false;
}