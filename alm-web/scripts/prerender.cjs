/*
 * Build step that runs after `react-scripts build`.
 *
 * GitHub Pages serves files, not routes. A stock Create React App build ships
 * one empty index.html, so every URL except "/" answered HTTP 404 and search
 * engines saw an empty shell. This script renders every page's real HTML with
 * React (the same components the browser runs), and writes one index.html per
 * route with that page's own title, description, canonical URL, social tags and
 * structured data already in place. The browser then hydrates that HTML.
 *
 * It also writes: 404.html, static redirect pages for the old URLs, sitemap.xml
 * and robots.txt. And it refuses to finish if a page breaks basic SEO rules.
 */
'use strict';

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const src = path.join(root, 'src');

/* -- 1. Let Node run the app's JSX and asset imports ----------------------- */

const manifestPath = path.join(build, 'asset-manifest.json');
if (!fs.existsSync(manifestPath)) {
  throw new Error('build/asset-manifest.json is missing. Run `react-scripts build` first.');
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).files;

// `import logo from './logo.webp'` gives the hashed URL webpack emitted, so the
// HTML written here points at exactly the files that are in build/.
const assetUrl = (file) => {
  const url = manifest['static/media/' + path.basename(file)];
  if (!url) throw new Error(`No built asset found for ${file}`);
  return url;
};
for (const ext of ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif', '.woff2']) {
  require.extensions[ext] = (mod, filename) => {
    mod.exports = assetUrl(filename);
  };
}
require.extensions['.css'] = () => {};

require('@babel/register')({
  babelrc: false,
  configFile: false,
  cache: false,
  only: [src],
  extensions: ['.js', '.jsx'],
  presets: [
    [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
    [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
  ],
});

const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const App = require(path.join(src, 'App.js')).default;
const seo = require(path.join(src, 'seo.js'));
const { site, legacyRedirects, absoluteUrl } = require(path.join(src, 'site.js'));
const images = require(path.join(src, 'images', 'index.js'));

/* -- 2. Helpers ------------------------------------------------------------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// JSON inside <script> must never contain a literal "</script>" or "<!--".
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
};

const shellPath = path.join(build, 'index.html');
const shell = fs.readFileSync(shellPath, 'utf8');
if (!shell.includes('<div id="root"></div>')) {
  throw new Error(
    'build/index.html already has rendered content. Run a fresh `react-scripts build` before prerendering.'
  );
}

const fontPreloads = [
  'nunito-latin-wght-normal.woff2',
  'baloo-2-latin-wght-normal.woff2',
]
  .map(
    (f) =>
      `<link rel="preload" href="${assetUrl(f)}" as="font" type="font/woff2" crossorigin>`
  )
  .join('');

/** The one image most likely to be the Largest Contentful Paint on a page. */
function lcpImage(meta) {
  if (meta.kind === 'home') return { photo: images.photos.playgroundHero, sizes: images.sizes.hero };
  if (meta.kind === 'about') return { photo: images.photos.movementGroup, sizes: images.sizes.header };
  if (meta.kind === 'service') {
    const photo = images.servicePhoto[meta.service.slug];
    return photo ? { photo, sizes: images.sizes.header } : null;
  }
  return null;
}

function headBlock(meta, route) {
  const parts = [];
  const social = [
    ['property', 'og:site_name', site.name],
    ['property', 'og:locale', site.locale.replace('-', '_')],
    ['property', 'og:type', meta.kind === 'post' ? 'article' : 'website'],
    ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description],
    ['property', 'og:image', absoluteUrl(site.ogImage.path)],
    ['property', 'og:image:width', String(site.ogImage.width)],
    ['property', 'og:image:height', String(site.ogImage.height)],
    ['property', 'og:image:alt', site.ogImage.alt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', meta.description],
    ['name', 'twitter:image', absoluteUrl(site.ogImage.path)],
    ['name', 'twitter:image:alt', site.ogImage.alt],
  ];
  if (meta.canonical) {
    parts.push(`<link rel="canonical" href="${esc(meta.canonical)}">`);
    social.splice(3, 0, ['property', 'og:url', meta.canonical]);
  }
  for (const [attr, key, value] of social) {
    parts.push(`<meta ${attr}="${key}" content="${esc(value)}">`);
  }
  parts.push(fontPreloads);

  const lcp = lcpImage(meta);
  if (lcp) {
    parts.push(
      `<link rel="preload" as="image" href="${lcp.photo.src}"` +
        (lcp.photo.srcSet ? ` imagesrcset="${lcp.photo.srcSet}" imagesizes="${lcp.sizes}"` : '') +
        ` fetchpriority="high">`
    );
  }

  const ld = seo.schemaFor(route);
  if (ld) {
    parts.push(`<script type="application/ld+json" id="ld-json">${jsonForScript(ld)}</script>`);
  }
  return parts.join('');
}

function withMeta(html, meta) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?"\/?>/,
      `<meta name="description" content="${esc(meta.description)}">`
    );
}

/* -- 3. Render every real page --------------------------------------------- */

const problems = [];
const problem = (route, msg) => problems.push(`${route}: ${msg}`);

// Keep a pristine, empty-root shell for 404.html (its app renders client-side).
{
  const meta = seo.metaFor('/this-page-does-not-exist/');
  let html = withMeta(shell, meta).replace('</head>', `${fontPreloads}</head>`);
  write(path.join(build, '404.html'), html);
}

let rendered = 0;
for (const route of seo.routes) {
  const meta = seo.metaFor(route);
  for (const p of seo.auditMeta(route)) problem(route, p);

  const body = renderToString(
    React.createElement(StaticRouter, { location: route }, React.createElement(App))
  );

  const h1s = (body.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problem(route, `has ${h1s} <h1> tags (must be exactly 1)`);
  for (const img of body.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt=/.test(img)) problem(route, `image without alt text: ${img.slice(0, 80)}`);
  }
  if (/noindex/i.test(body)) problem(route, 'contains "noindex"');

  let html = withMeta(shell, meta)
    .replace('</head>', `${headBlock(meta, route)}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const target = route === '/' ? shellPath : path.join(build, route, 'index.html');
  write(target, html);
  rendered += 1;
}

/* -- 4. Redirect pages for URLs that no longer exist ---------------------- */

let redirected = 0;
const skipped = [];
for (const [from, to] of Object.entries(legacyRedirects)) {
  const html =
    `<!doctype html><html lang="${site.locale}"><head><meta charset="utf-8">` +
    `<title>Page moved | ${site.name}</title>` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<link rel="canonical" href="${esc(absoluteUrl(to))}">` +
    `<meta http-equiv="refresh" content="0; url=${esc(to)}">` +
    `<script>location.replace(${JSON.stringify(to)})</script></head>` +
    `<body><p>This page has moved to <a href="${esc(to)}">${esc(absoluteUrl(to))}</a>.</p></body></html>`;
  try {
    write(path.join(build, from, 'index.html'), html);
    redirected += 1;
  } catch (e) {
    // e.g. a "|" in the path cannot be a folder name on Windows. The Linux CI
    // build (which is what gets deployed) can, and 404.html + the router's
    // legacy handling cover it in the meantime.
    skipped.push(from);
  }
}

/* -- 5. sitemap.xml and robots.txt ---------------------------------------- */

const entries = seo.sitemapEntries();
write(
  path.join(build, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url><loc>${esc(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
      )
      .join('\n') +
    `\n</urlset>\n`
);
write(
  path.join(build, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`
);

/* -- 6. Report, and refuse to ship a page that breaks the rules ----------- */

console.log(
  `prerender: ${rendered} pages, ${redirected} redirect pages, 404.html, ` +
    `sitemap.xml (${entries.length} URLs), robots.txt`
);
if (skipped.length) {
  console.log(`prerender: skipped ${skipped.length} redirect page(s) this OS cannot create: ${skipped.join(', ')}`);
}
if (problems.length) {
  console.error('\nprerender: SEO checks failed:\n  - ' + problems.join('\n  - '));
  process.exit(1);
}
console.log('prerender: all SEO checks passed (titles, descriptions, one h1, alt text, no noindex)');
