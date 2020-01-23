const http = require("http");

const server = http.createServer(function(request, response) {
  console.dir(request.param);

  if (request.method == "POST") {
    console.log("POST");
    var body = "";
    request.on("data", function(data) {
      body += data;
      console.log("Partial body: " + body);
    });
    request.on("end", function() {
      console.log("Body: " + body);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("post received");
    });
  } else {
    console.log("GET");
    var html = `
            <html>
                <body>
                    <h1>Demo</h1>
                </body>
            </html>`;
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  }
});

const port = 10000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
