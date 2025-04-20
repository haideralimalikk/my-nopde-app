var http = require('http');
var requests = 0;
var startTime;
var host = require('os').hostname();  // Use os.hostname() directly to get the system's hostname

var handleRequest = function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("DevOps Coursework 2! | Running on: ");
  response.write(host);
  response.end(" | v=0\n");
  console.log("Running On:", host, "| Total Requests:", ++requests, "| App Uptime:", (new Date() - startTime) / 1000, "seconds", "| Log Time:", new Date());
}


// Add graceful shutdown
process.on('SIGTERM', () => {
  console.log('Graceful shutdown initiated');
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});

// Bind to all interfaces
www.listen(8081, '0.0.0.0', () => {
  startTime = new Date();
  console.log(`Started at ${startTime} on ${host}:8081`);
});

