<<<<<<< HEAD
var http = require('http');
var requests = 0;
var startTime;
var host = require('os').hostname();  // Use os.hostname() directly to get the system's hostname
//haider ali commit
var handleRequest = function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("DevOps Coursework 2! | Running on: ");
  response.write(host);
  response.end(" | v=0\n");
  console.log("Running On:", host, "| Total Requests:", ++requests, "| App Uptime:", (new Date() - startTime) / 1000, "seconds", "| Log Time:", new Date());
}
=======
const http = require('http');
const hostname = require('os').hostname();
const port = process.env.PORT || 8081; // Use environment variable

let requests = 0;
let startTime = new Date();
>>>>>>> 91e29a7c08832984ff1af0dfd5c1edbc53c27bdb

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200);
  res.end(`DevOps Coursework 2! | Running on: ${hostname} | v=0\n`);
  console.log(`Request ${++requests} | Uptime: ${(new Date() - startTime)/1000}s`);
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
  console.log('Received SIGTERM - shutting down gracefully');
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server started at ${new Date()} on ${hostname}:${port}`);
});
