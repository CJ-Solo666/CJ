const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const rootResolved = path.resolve(root);
const port = Number(process.env.PORT || 5173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp3": "audio/mpeg"
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.resolve(root, urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, ""));
    if (!filePath.startsWith(rootResolved)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, "0.0.0.0", () => {
    console.log(`Preview: http://localhost:${port}`);
  });
