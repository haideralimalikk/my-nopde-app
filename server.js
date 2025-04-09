var http = require('http');
var requests = 0;
var podname = process.env.HOSTNAME;
var startTime;
var host;

var handleRequest = function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("DevOps Coursework 2! | Running on: ");
  response.write(host);
  response.end(" | v=0\n");
  console.log("Running On:", host, "| Total Requests:", ++requests, "| App Uptime:", (new Date() - startTime) / 1000, "seconds", "| Log Time:", new Date());
}

// Set a timeout to stop the server after a specified time (e.g., 60 seconds)
setTimeout(function() {
  console.log('Shutting down server after timeout');
  process.exit(0);  // Exit the application gracefully after 60 seconds
}, 60000); // 60000 ms = 60 seconds

var www = http.createServer(handleRequest);
www.listen(8081, function () {
  startTime = new Date();
  host = process.env.HOSTNAME;
  console.log("Started At:", startTime, "| Running On:", host, "\n");
});

