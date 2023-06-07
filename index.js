const http = require("http");

const data = { age: 5 };
const server = http.createServer((req, res) => {
  console.log("server started");
  res.setHeader("dummy", "dummyValue");
  
  res.end(JSON.stringify(data));
});

server.listen(8080);
