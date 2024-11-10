import { http1Server } from "./http1_1.mjs";
import { http2Server } from "./http2_0.mjs";

// Start servers
const PORT_HTTP1 = 3001;
const PORT_HTTP2 = 3000;

http1Server.listen(PORT_HTTP1, () => {
  console.log(`HTTP/1.1 server running on port ${PORT_HTTP1}`);
});

http2Server.listen(PORT_HTTP2, () => {
  console.log(`HTTP/2 server running on port ${PORT_HTTP2}`);
});
