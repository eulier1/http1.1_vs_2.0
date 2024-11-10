import { readFileSync } from "node:fs";

import { createSecureServer } from "node:http2";

export const http2Server = createSecureServer({
  key: readFileSync("localhost-privkey.pem"),
  cert: readFileSync("localhost-cert.pem"),
});

http2Server.on('stream', (stream, headers) => {
  // Log request details
  console.log('Request headers:', headers);
  
  // Get the path from headers
  const path = headers[':path'];

  // Handle different routes
  switch (path) {
    case '/':
      stream.respond({
        'content-type': 'text/html',
        ':status': 200
    });
    stream.end('<html><body><h1>HTTP/2 Page</h1></body></html>');

    // Server Push: Proactively send resources we know the client will need.
    // Only if the client allows it.

    // const pushStream1 = stream.pushStream({ ':path': '/image.jpg' }, (err, pushStream) => {
    //     if (err) throw err;
    //     pushStream.respond({ ':status': 200, 'content-type': 'image/jpeg' });
    //     pushStream.end('Simulated image data');
    // });

    // const pushStream2 = stream.pushStream({ ':path': '/script.js' }, (err, pushStream) => {
    //     if (err) throw err;
    //     pushStream.respond({ ':status': 200, 'content-type': 'application/javascript' });
    //     pushStream.end('console.log("Script loaded")');
    // });

    break;
      break;

    case '/api':
      stream.respond({
        'content-type': 'application/json',
        ':status': 200
      });
      stream.end(JSON.stringify({
        message: 'This is a JSON response',
        protocol: 'HTTP/2'
      }));
      break;

    default:
      stream.respond({
        ':status': 404
      });
      stream.end('Not Found');
  }
});


http2Server.on('error', (err) => {
  console.error('Server error:', err);
});
