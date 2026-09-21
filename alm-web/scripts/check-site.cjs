/*
 * Post-build audit of the finished site in build/. Runs as the last step of
 * `npm run build`, so a broken link or a heading-order slip fails the deploy
 * instead of reaching visitors and search engines.
 *
 * Checks, per page: heading order, unique <h1>, every internal link / image /
 * script / stylesheet resolving to a real file, alt text and width/height on
 * images, canonical matching the URL, unique titles and descriptions.
 * Site-wide: sitemap entries all exist, robots.txt points at the sitemap, the
 * web manifest's icons exist, nothing loads over plain http or from Google Fonts.
 *
 * (External links are network-dependent, so they are checked by hand, not here.)
 */
'use strict';

process.env.NODE_ENV = 'production';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const ORIGIN = 'https://activelittleminds.com';

// Reuse the app's own route list so this can never drift from what is built.
for (const ext of ['.webp', '.png', '.jpg', '.woff2']) require.extensions[ext] = (m) => { m.exports = ''; };
require.extensions['.css'] = () => {};
require('@babel/register')({
  babelrc: false, configFile: false, cache: false, only: [path.join(root, 'src')], extensions: ['.js'],
  presets: [
    [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
    [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
  ],
});
const seo = require(path.join(root, 'src', 'seo.js'));
const { legacyRedirects } = require(path.join(root, 'src', 'site.js'));

const errors = [];
const warn = [];
const bad = (where, msg) => errors.push(`${where}: ${msg}`);

const exists = (p) => fs.existsSync(p);

/** Where a URL path would be served from, mirroring GitHub Pages. */
function resolveInternal(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean.endsWith('/')) {
    return exists(path.join(build, clean, 'index.html')) ? { ok: true } : { ok: false };
  }
  const file = path.join(build, clean);
  if (exists(file) && fs.statSync(file).isFile()) return { ok: true };
  if (exists(file) && fs.statSync(file).isDirectory()) return { ok: true, redirects: true };
  return { ok: false };
}

const titles = new Map();
const descriptions = new Map();
let pages = 0;
let linksChecked = 0;

for (const route of seo.routes) {
  pages += 1;
  const file = route === '/' ? path.join(build, 'index.html') : path.join(build, route, 'index.html');
  if (!exists(file)) { bad(route, 'page file was not built'); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const body = html.slice(html.indexOf('<div id="root">'));
  const meta = seo.metaFor(route);

  /* -- headings: one h1 first, and never skip a level going deeper -------- */
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  if (levels[0] !== 1) bad(route, `first heading is h${levels[0]}, expected h1`);
  if (levels.filter((l) => l === 1).length !== 1) bad(route, 'must have exactly one h1');
  levels.forEach((l, i) => {
    if (i > 0 && l > levels[i - 1] + 1) bad(route, `heading jumps from h${levels[i - 1]} to h${l}`);
  });

  /* -- head ----------------------------------------------------------------- */
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canonical !== ORIGIN + route) bad(route, `canonical is ${canonical}, expected ${ORIGIN + route}`);
  if ((html.match(/<link rel="canonical"/g) || []).length !== 1) bad(route, 'must have exactly one canonical tag');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) bad(route, 'missing <title>');
  if (!desc) bad(route, 'missing meta description');
  if (titles.has(title)) bad(route, `duplicate title (also on ${titles.get(title)})`);
  if (descriptions.has(desc)) bad(route, `duplicate description (also on ${descriptions.get(desc)})`);
  titles.set(title, route);
  descriptions.set(desc, route);
  if (!/<meta property="og:image" content="https:/.test(html)) bad(route, 'missing absolute og:image');
  if (!/<script type="application\/ld\+json" id="ld-json">/.test(html)) bad(route, 'missing JSON-LD');
  if (!/name="google-site-verification"/.test(html)) bad(route, 'Search Console verification tag missing');
  if (/noindex/i.test(html)) bad(route, 'contains noindex');
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) bad(route, 'still loads Google Fonts');
  if (/http:\/\/(?!www\.w3\.org)/.test(html)) bad(route, 'references a plain http:// URL');
  if (/localhost/.test(html)) bad(route, 'references localhost');

  /* -- images ---------------------------------------------------------------- */
  for (const tag of body.match(/<img\b[^>]*>/g) || []) {
    const alt = (tag.match(/\salt="([^"]*)"/) || [])[1];
    if (alt === undefined) bad(route, `image has no alt attribute: ${tag.slice(0, 70)}`);
    else if (alt.trim() === '') bad(route, `image has empty alt text: ${tag.slice(0, 70)}`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) bad(route, `image lacks width/height: ${tag.slice(0, 70)}`);
  }

  /* -- every URL the page references must exist ------------------------------ */
  const urls = [];
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) urls.push({ kind: 'link', url: m[1] });
  for (const m of html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)) urls.push({ kind: 'image', url: m[1] });
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) m[1].split(',').forEach((s) => urls.push({ kind: 'srcset', url: s.trim().split(/\s+/)[0] }));
  for (const m of html.matchAll(/<script\b[^>]*\ssrc="([^"]+)"/g)) urls.push({ kind: 'script', url: m[1] });
  for (const m of html.matchAll(/<link\b[^>]*\shref="([^"]+)"/g)) urls.push({ kind: 'link-tag', url: m[1] });

  for (const { kind, url } of urls) {
    if (/^(mailto:|tel:|https?:|#)/.test(url) || url.startsWith('//')) continue;
    if (!url.startsWith('/')) { bad(route, `${kind} uses a relative URL: ${url}`); continue; }
    linksChecked += 1;
    const r = resolveInternal(url);
    if (!r.ok) bad(route, `broken ${kind}: ${url}`);
    else if (r.redirects && kind === 'link') warn.push(`${route}: ${url} lacks a trailing slash (extra redirect)`);
  }
}

/* -- sitemap ---------------------------------------------------------------- */
const sitemap = fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  if (!loc.startsWith(ORIGIN + '/')) { bad('sitemap.xml', `foreign URL ${loc}`); continue; }
  if (!resolveInternal(loc.slice(ORIGIN.length)).ok) bad('sitemap.xml', `lists a page that does not exist: ${loc}`);
  if (!loc.endsWith('/')) bad('sitemap.xml', `URL lacks trailing slash: ${loc}`);
}
if (new Set(locs).size !== locs.length) bad('sitemap.xml', 'contains duplicate URLs');

/* -- robots, manifest, redirects, 404 --------------------------------------- */
const robots = fs.readFileSync(path.join(build, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) bad('robots.txt', 'does not reference the sitemap');
if (/^\s*disallow:\s*\/\s*$/im.test(robots)) bad('robots.txt', 'blocks the whole site');

const manifest = JSON.parse(fs.readFileSync(path.join(build, 'manifest.json'), 'utf8'));
for (const field of ['name', 'short_name']) {
  if (/\breact\b/i.test(manifest[field] || '')) bad('manifest.json', `${field} still has the React default`);
}
for (const icon of manifest.icons) if (!resolveInternal(icon.src).ok) bad('manifest.json', `missing icon ${icon.src}`);
for (const f of ['favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'og-image.jpg']) {
  if (!exists(path.join(build, f))) bad('build', `missing ${f}`);
}

// Every redirect target must be a real page.
for (const [from, to] of Object.entries(legacyRedirects)) {
  if (!resolveInternal(to).ok) bad('redirects', `${from} points at ${to}, which does not exist`);
}
if (!exists(path.join(build, '404.html'))) bad('build', 'missing 404.html');

/* -- report ------------------------------------------------------------------ */
console.log(
  `check-site: ${pages} pages, ${linksChecked} internal URLs, ${locs.length} sitemap URLs, ` +
    `${Object.keys(legacyRedirects).length} redirect rules`
);
if (warn.length) console.log('check-site warnings:\n  - ' + warn.join('\n  - '));
if (errors.length) {
  console.error('\ncheck-site: FAILED\n  - ' + errors.join('\n  - '));
  process.exit(1);
}
console.log('check-site: OK (heading order, one h1, links, images, canonicals, sitemap, manifest, redirects)');
