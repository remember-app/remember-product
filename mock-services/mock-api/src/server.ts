import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mockResponse } from './mock';

const PORT = 8080;
const MEDIA = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'media');
const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
};

const server = createServer(async (request, response) => {
  const host = request.headers.host ?? `localhost:${PORT}`;
  const base = `http://${host}`;
  const url = new URL(request.url ?? '/', base);
  if (request.method === 'GET' && url.pathname.startsWith('/media/')) {
    const name = normalize(url.pathname.slice('/media/'.length));
    if (name.startsWith('..')) {
      response.writeHead(404).end();
      return;
    }
    try {
      const data = await readFile(join(MEDIA, name));
      response.writeHead(200, {
        'Content-Type': TYPES[extname(name)] ?? 'application/octet-stream',
        'Content-Length': data.length,
      });
      response.end(data);
    } catch {
      response.writeHead(404).end();
    }
    return;
  }
  let body: unknown;
  if (request.method !== 'GET' && request.method !== 'DELETE') {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const text = Buffer.concat(chunks).toString('utf8');
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'bad_json' }));
      return;
    }
  }
  const answer = mockResponse(request.method ?? 'GET', url.pathname, body);
  if (answer === undefined) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'not_found' }));
    return;
  }
  const json = JSON.stringify(answer).replaceAll('__MEDIA__', `${base}/media`);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(json);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`mock-api listening on :${PORT}`);
});
