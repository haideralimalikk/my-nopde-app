const http = require('http');
const hostname = require('os').hostname();
const port = process.env.PORT || 8081;

let requests = 0;
let startTime = new Date();
//Haider's commit
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
