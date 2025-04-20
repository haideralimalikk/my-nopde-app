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


var www = http.createServer(handleRequest);
www.listen(8081, function () {
  startTime = new Date();
  console.log("Started At:", startTime, "| Running On:", host, "\n");
});

