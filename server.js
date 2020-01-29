const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const next = require('next');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

class NextServer extends http.Server {
  constructor(handler) {
    const server = express();
    super(server);

    this.server = server;
    this.handler = handler;
    this.router = express.Router();
  }

  start() {
    // body-parser
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));

    // send all routes to the NEXT handler
    this.router.all('*', (req, res) => {
      return this.handler(req, res);
    });

    // Add BaseURL for subpath
    this.server.use(process.env.BASE_URL, this.router);
    return this;
  }
}

app.prepare().then(() => {
  const nextServer = new NextServer(handle);
  const { server } = nextServer.start();

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
})