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

// Set a timeout to stop the server after 5 minutes (300000 milliseconds)
setTimeout(function() {
  console.log('Shutting down server after timeout');
  process.exit(0);  // Exit the application gracefully after 5 minutes
}, 300000); // 300000 ms = 5 minutes

var www = http.createServer(handleRequest);
www.listen(8081, function () {
  startTime = new Date();
  console.log("Started At:", startTime, "| Running On:", host, "\n");
});

