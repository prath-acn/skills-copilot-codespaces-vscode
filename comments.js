//create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { getComments, addComment } = require('./comments')

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    if (pathname === '/comments' && req.method === 'GET') {
        const comments = getComments();
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(comments));
    } else if (pathname === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            addComment(comment);
            res.end(JSON.stringify(comment));
        });
    } else {
        const ext = path.parse(pathname).ext;
        const staticPath = path.join(__dirname, 'public');
        const filePath = path.join(staticPath, pathname);
        if (ext === '') {
            const htmlPath = path.join(filePath, 'index.html');
            fs.readFile(htmlPath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});