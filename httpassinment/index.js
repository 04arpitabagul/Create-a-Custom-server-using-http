const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  if (req.url === "/home" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome to the Home Page!" }));

  } else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is the About Page." }));

  } else if (req.url === "/getproductdata" && req.method === "GET") {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to read product data.");
      } else {
        const jsonData = JSON.parse(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(jsonData.products));
      }
    });

  } else if (req.url === "/user" && req.method === "GET") {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to read user data.");
      } else {
        const jsonData = JSON.parse(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(jsonData.user));
      }
    });

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
  console.log("BaseURL => http://localhost:8080");
});
