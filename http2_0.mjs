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
      stream.end('<h1>Hello HTTP/2!</h1>');
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
