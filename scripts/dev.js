const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  port = process.env.NEXT_PUBLIC_PORT || 5000;
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
