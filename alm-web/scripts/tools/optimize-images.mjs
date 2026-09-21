/*
 * One-off image pipeline. Originals live in image-sources/; this writes the
 * optimised, responsive versions the site actually ships into src/images/,
 * plus the favicon / app icons / social image into public/.
 *
 *   npm i --no-save sharp          (kept out of package.json on purpose: CI never
 *                                   runs this, so it should not install sharp)
 *   node scripts/tools/optimize-images.mjs
 *
 * Re-run it whenever a source image changes, then commit the output.
 */
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');
const SRC = join(root, 'image-sources');
const OUT = join(root, 'src', 'images');
const PUB = join(root, 'public');

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH || 'sharp');

await mkdir(OUT, { recursive: true });

const kb = async (file) => `${Math.round((await stat(file)).size / 1024)}KB`;
const report = [];

const write = async (pipeline, file, label) => {
  await pipeline.toFile(file);
  report.push(`${label.padEnd(34)} ${(await kb(file)).padStart(7)}`);
};

/* ---- Photographs: landscape 640w + 1280w -------------------------------- */
const photos = [
  'playground',
  'circle-time',
  'speech-session',
  'tabletop-session',
  'movement-group',
  'jumping',
  ['pexels-8613088.avif', 'numbers-lesson'],
];

for (const entry of photos) {
  const [srcName, outName] = Array.isArray(entry)
    ? entry
    : [`${entry}.webp`, entry];
  const input = join(SRC, srcName);
  for (const width of [640, 1280]) {
    await write(
      sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 74, effort: 6 }),
      join(OUT, `${outName}-${width}.webp`),
      `${outName}-${width}.webp`
    );
  }
}

/* ---- Hero: the page shows a centred 4:5 crop, so ship exactly that ------ */
{
  const input = join(SRC, 'playground.webp');
  const meta = await sharp(input).metadata();
  const cropW = Math.round((meta.height * 4) / 5);
  const left = Math.round((meta.width - cropW) / 2);
  for (const width of [480, 768, 960]) {
    await write(
      sharp(input)
        .extract({ left, top: 0, width: cropW, height: meta.height })
        .resize({ width })
        .webp({ quality: 74, effort: 6 }),
      join(OUT, `playground-hero-${width}.webp`),
      `playground-hero-${width}.webp`
    );
  }
}

/* ---- Video posters: portrait 9:16, self-hosted so no third-party image
        requests are needed until someone presses play -------------------- */
for (const id of ['Qz4QT4EO3Dk', 'sWv1fjtIrtw', 'q8HAZaMOwJY', '2uji59RdVH0', 'Tg0pb3VRbiU']) {
  await write(
    sharp(join(SRC, 'videos', `${id}.jpg`))
      .resize({ width: 360, height: 640, fit: 'cover' })
      .webp({ quality: 70, effort: 6 }),
    join(OUT, `video-${id}.webp`),
    `video-${id}.webp`
  );
}

/* ---- Logo ---------------------------------------------------------------- */
const logoSrc = join(SRC, 'logo.webp');
const circle = (size) =>
  Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );

// Header logo shows at 54px. The source is only 132px, so keep it as-is
// (re-encoded) rather than pretending there is more resolution.
await write(
  sharp(logoSrc).webp({ quality: 88, effort: 6 }),
  join(OUT, 'logo-132.webp'),
  'logo-132.webp'
);

// Round, transparent-cornered icon: looks right on light and dark tab strips.
const roundLogo = async (size, { tight = false } = {}) => {
  const m = await sharp(logoSrc).metadata();
  // "tight" trims the thin outer ring/margin so the tree fills tiny favicons.
  const inset = tight ? 14 : 0;
  const side = Math.min(m.width, m.height) - inset * 2;
  const cropped = sharp(logoSrc).extract({
    left: Math.round((m.width - side) / 2),
    top: Math.round((m.height - side) / 2),
    width: side,
    height: side,
  });
  return cropped
    .resize(size, size, { kernel: 'lanczos3' })
    .ensureAlpha()
    .composite([{ input: circle(size), blend: 'dest-in' }]);
};

// The logo is flat colour art, so 256-colour palette PNGs are visually lossless
// and several times smaller than truecolour ones.
const PNG = { compressionLevel: 9, palette: true, quality: 90, effort: 10 };
const png = async (pipeline) => pipeline.png(PNG).toBuffer();

const favicon16 = await png(await roundLogo(16, { tight: true }));
const favicon32 = await png(await roundLogo(32, { tight: true }));
const favicon48 = await png(await roundLogo(48, { tight: true }));

// A .ico is just a directory of PNGs.
const ico = (images) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
};

await writeFile(
  join(PUB, 'favicon.ico'),
  ico([
    { size: 16, buf: favicon16 },
    { size: 32, buf: favicon32 },
    { size: 48, buf: favicon48 },
  ])
);
report.push(`${'public/favicon.ico'.padEnd(34)} ${(await kb(join(PUB, 'favicon.ico'))).padStart(7)}`);

await writeFile(join(PUB, 'favicon-32.png'), favicon32);
report.push(`${'public/favicon-32.png'.padEnd(34)} ${(await kb(join(PUB, 'favicon-32.png'))).padStart(7)}`);

await write(await roundLogo(192).then((p) => p.png(PNG)), join(PUB, 'icon-192.png'), 'public/icon-192.png');
await write(await roundLogo(512).then((p) => p.png(PNG)), join(PUB, 'icon-512.png'), 'public/icon-512.png');

// iOS ignores transparency and applies its own rounding: give it a solid tile.
await write(
  sharp(logoSrc)
    .resize(180, 180, { kernel: 'lanczos3', fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .png(PNG),
  join(PUB, 'apple-touch-icon.png'),
  'public/apple-touch-icon.png'
);

/* ---- Social share image 1200x630 (jpg: widest platform support) --------- */
{
  const input = join(SRC, 'playground.webp');
  const meta = await sharp(input).metadata();
  const height = Math.round(meta.width / (1200 / 630));
  const top = Math.max(0, Math.round((meta.height - height) * 0.42));
  await write(
    sharp(input)
      .extract({ left: 0, top, width: meta.width, height })
      .resize(1200, 630)
      .jpeg({ quality: 82, mozjpeg: true }),
    join(PUB, 'og-image.jpg'),
    'public/og-image.jpg'
  );
}

/* ---- Record every output's real dimensions, so <img> width/height (which
   stop layout shift) are read from data instead of typed by hand ---------- */
{
  const { readdir } = await import('node:fs/promises');
  const dims = {};
  for (const f of (await readdir(OUT)).sort()) {
    if (!f.endsWith('.webp')) continue;
    const m = await sharp(join(OUT, f)).metadata();
    dims[f.replace(/\.webp$/, '')] = [m.width, m.height];
  }
  await writeFile(join(OUT, 'dimensions.json'), JSON.stringify(dims, null, 2) + '\n');
}

console.log(report.join('\n'));
console.log('\nDone.');
