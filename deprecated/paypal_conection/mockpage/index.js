const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the HTML file to serve
const filePath = path.join(__dirname, 'index.html');

// Create the server
const server = http.createServer((req, res) => {
    // Read the HTML file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading the page.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start the server on port 3444
server.listen(3444, () => {
    console.log('Server running on http://localhost:3444');
});
