/**
 * Uncle Tom — zero-dependency static dev server.
 * Run:  node server.js   →   http://localhost:5173
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    // SPA fallback: unknown paths serve index.html
    const target = !err && stat.isFile() ? filePath : path.join(ROOT, 'index.html');
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.jpg' ? 'public, max-age=86400' : 'no-cache',
    });
    fs.createReadStream(target).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const nets = os.networkInterfaces();
  const lan = Object.values(nets).flat().find((n) => n && n.family === 'IPv4' && !n.internal);
  console.log('\n  ✦ UNCLE TOM — Astronomy Experience Platform\n');
  console.log(`  ➜ Localhost:  http://localhost:${PORT}`);
  console.log(`  ➜ Direct IP:  http://127.0.0.1:${PORT}`);
  if (lan) console.log(`  ➜ Network:    http://${lan.address}:${PORT}  (Mobile / Tablet on Wi-Fi)`);
  console.log('\n  Ready for presentation.\n');
});
