/*
 * GitHub Pages has no server-side routing: it serves a file or a 404. Without
 * this, every route except "/" answered with HTTP 404 — the page still drew,
 * because 404.html is the app shell, but crawlers saw "not found" on every
 * page. That is the exact failure this rebuild set out to fix.
 *
 * So write a real index.html for each route, with that route's title,
 * description and canonical URL baked into the markup.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const buildDir = resolve(here, '..', 'build');
const ORIGIN = 'https://activelittleminds.com';

// pathToFileURL, not a bare path: on Windows an absolute path like C:\... is
// rejected by the ESM loader as an unknown URL scheme.
const { seo, serviceSeo, services, routes } = await import(
  pathToFileURL(resolve(here, '..', 'src', 'content.mjs')).href
);

const metaFor = (route) => {
  if (seo[route]) return seo[route];
  const slug = route.replace('/services/', '');
  const service = services.find((s) => s.slug === slug);
  return service ? serviceSeo(service) : null;
};

const escape = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const shell = await readFile(join(buildDir, 'index.html'), 'utf8');

let written = 0;
for (const route of routes) {
  const meta = metaFor(route);
  if (!meta) {
    console.warn(`prerender: no metadata for ${route}, skipping`);
    continue;
  }

  const canonical = `${ORIGIN}${route === '/' ? '/' : route}`;
  const html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${escape(meta.description)}"/>`
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?"\s*\/?>/,
      `<meta property="og:title" content="${escape(meta.title)}"/>`
    )
    .replace(
      /<meta property="og:description" content="[\s\S]*?"\s*\/?>/,
      `<meta property="og:description" content="${escape(
        meta.description
      )}"/>`
    )
    .replace('</head>', `<link rel="canonical" href="${canonical}"/></head>`);

  const target =
    route === '/'
      ? join(buildDir, 'index.html')
      : join(buildDir, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  written += 1;
}

// Legacy URLs from the GoDaddy site. Pages cannot issue a 301, so send a
// canonical pointing at the new home plus an immediate client-side redirect.
// The second old post URL contained a "|", which cannot be a directory name on
// Windows, so it gets no file. It still works: 404.html serves the app shell
// and the router's /f/* route sends it to /blog — it just answers 404 rather
// than 200 on the way.
const redirects = {
  '/about-us': '/about',
  '/f/autism-spectrum-disorder-asd': '/blog',
};

for (const [from, to] of Object.entries(redirects)) {
  const html = `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8"/>
    <title>Moved | Active Little Minds</title>
    <link rel="canonical" href="${ORIGIN}${to}"/>
    <meta name="robots" content="noindex"/>
    <meta http-equiv="refresh" content="0; url=${to}"/>
  </head>
  <body>
    <p>This page has moved to <a href="${to}">${ORIGIN}${to}</a>.</p>
  </body>
</html>
`;
  const target = join(buildDir, from, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
}

// sitemap.xml + robots.txt, so the new URLs get found.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${ORIGIN}${r === '/' ? '/' : r}</loc></url>`)
  .join('\n')}
</urlset>
`;
await writeFile(join(buildDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(
  join(buildDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
  'utf8'
);

console.log(
  `prerender: ${written} routes, ${
    Object.keys(redirects).length
  } legacy redirects, sitemap.xml, robots.txt`
);
