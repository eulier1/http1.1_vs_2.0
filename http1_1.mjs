import { createServer } from "node:http";

export const http1Server = createServer((req, res) => {
  console.log("HTTP/1.1 Request received for ", req.url);

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
        <html>
          <body>
              <h1>HTTP/1.1 Page</h1>
              <img src="/image.jpg">
              <script src="/script.js">
              </script>
          </body>
      </html>`);
    case "/image.jpg":
      // Simulate image loading
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        return res.end("Simulated image data");
      }, 100);
      break;
    case "/script.js":
      // Simulate script loading
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        return res.end('console.log("Script loaded")');
      }, 100);
      break;
    default:
      res.writeHead(404);
      return res.end("Not found");
      break;
  }
});
