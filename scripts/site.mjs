import { createServer } from 'node:http';
import { copyFile, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
async function collectImages(directory) {
  const images = [];
  for (const entry of await readdir(new URL(directory, root), { withFileTypes: true })) {
    const path = `${directory}${entry.name}`;
    if (entry.isDirectory()) images.push(...await collectImages(`${path}/`));
    else if (entry.isFile() && /\.(png|jpe?g|webp|svg)$/.test(entry.name)) images.push(path);
  }
  return images;
}
const logos = await collectImages('assets/images/');
const files = ['index.html', 'styles.css', 'app.js', ...logos];
const types = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml' };

if (process.argv[2] === 'build') {
  const destination = new URL('dist/', root);
  // Rebuild from scratch so renamed or removed assets never linger in the deploy payload.
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  for (const file of files) {
    await mkdir(new URL('.', new URL(file, destination)), { recursive: true });
    await copyFile(new URL(file, root), new URL(file, destination));
  }
  console.log(`Built ${files.length} static files in ${fileURLToPath(destination)}`);
} else if (process.argv[2] === 'serve') {
  const server = createServer(async (request, response) => {
    const path = new URL(request.url, 'http://localhost').pathname;
    const file = path === '/' ? 'index.html' : path.slice(1);
    if (!files.includes(file)) {
      response.writeHead(404).end('Not found');
      return;
    }
    try {
      const content = await readFile(new URL(file, root));
      response.writeHead(200, { 'Content-Type': types[file.split('.').pop()] });
      response.end(content);
    } catch {
      response.writeHead(500).end('Unable to read file');
    }
  });
  server.listen(4173, '127.0.0.1', () => console.log('MaaYuan: http://127.0.0.1:4173'));
} else {
  throw new Error('Usage: node scripts/site.mjs <serve|build>');
}
