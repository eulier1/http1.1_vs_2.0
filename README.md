# HTTP/1.1 vs HTTP/2.0

A test in node.js to know how to create an HTTP server in 1.1 & 2.0 version

This code demonstrates several key differences between HTTP/1.1 and HTTP/2:

## Multiplexing:

- HTTP/1.1 makes sequential requests (one at a time)
- HTTP/2 allows multiple requests and responses in parallel over a single connection


## Server Push:

- HTTP/1.1 is purely request/response
- HTTP/2 can proactively push resources it knows the client will need


## Header Handling:

- HTTP/1.1 sends headers as plain text
- HTTP/2 uses the special :path header and compressed header frames


## Connection Handling:

- HTTP/1.1 uses a new connection for each request
- HTTP/2 uses a single connection with multiple streams

To run this code, you'll need to:

Generate SSL certificates (HTTP/2 requires HTTPS) in our case we already got them.

You'll need to install [Node.js](https://nodejs.org/en)

bash
```
npm start
```