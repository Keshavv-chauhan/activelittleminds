# Active Little Minds — website

React (Create React App) site for https://activelittleminds.com, hosted on GitHub
Pages. It replaced a GoDaddy Website Builder site whose content was trapped in
HTML embeds clipped to 150px tall, invisible to visitors and search engines.

## Run

```bash
npm install
npm start       # dev server, http://localhost:3000
npm run build   # production build (compile, render every page, then verify)
```

`npm run build` is three steps, and any failing step fails the deploy:

1. `react-scripts build` compiles the app. `CI=true` turns lint warnings into errors.
2. `scripts/prerender.cjs` renders every page to real HTML (see below).
3. `scripts/check-site.cjs` audits the finished site (see below).

## How pages reach search engines

GitHub Pages serves files, not routes. A stock React build ships one empty
`index.html`, so every URL except `/` answered HTTP 404 and crawlers saw an empty
shell. Now `scripts/prerender.cjs` renders each route with the same components the
browser runs and writes `build/<route>/index.html` containing the page's real
content, its own `<title>`, description, canonical URL, Open Graph / Twitter tags,
JSON-LD structured data, and preload hints for its fonts and hero image. In the
browser React then *hydrates* that HTML instead of rebuilding it.

It also writes `404.html`, static redirect pages for old URLs, `sitemap.xml` and
`robots.txt`.

### One source of truth for SEO: `src/seo.js`

Titles, descriptions, canonical URLs, breadcrumbs and all JSON-LD come from
`src/seo.js`. The build uses it to write the static HTML, and
`components/useRouteMeta.js` uses the *same functions* to keep `<head>` correct
while someone navigates inside the app. They cannot disagree.

To change a page's title or description, edit it in `src/seo.js` (static pages) or
`seoTitle` / `seoDescription` on the service or post in `src/content.js`.

### What the build refuses to ship

`prerender.cjs` fails if any page has a title over 60 characters, a description
outside 70-160, not exactly one `<h1>`, an image without `alt`, or `noindex`.
`check-site.cjs` fails on: a skipped heading level (h2 -> h4), any internal link,
image, script or stylesheet that does not exist, images without `width`/`height`,
a canonical that does not match the page's URL, duplicate titles or descriptions,
sitemap entries that do not exist, a manifest icon that is missing, or a
redirect that points at a page that does not exist.

External links are network-dependent, so they are checked by hand, not in the build.

## Structure

```
src/
  content.js         all site copy: services, posts, FAQs, team, testimonials
  site.js            origin, URL helpers, and the old-URL -> new-URL redirect map
  seo.js             titles, descriptions, canonicals, breadcrumbs, JSON-LD
  styles.css         design system (tokens + components)
  fonts/             self-hosted Nunito + Baloo 2 (Latin subset, OFL licences)
  images/            OPTIMISED images only, generated (see "Images")
  components/        Layout, Bits (tiles, FAQ, breadcrumbs), Media (gallery,
                     video row), Photo (responsive <img>), Animals, Icons
  pages/             Home, About, Services, ServiceDetail, Blog, BlogPost,
                     Contact, NotFound
scripts/
  prerender.cjs      build step: render pages, 404, redirects, sitemap, robots
  check-site.cjs     build step: audit the finished site
  tools/optimize-images.mjs   run by hand when a source image changes
image-sources/       original images (input to the pipeline, not shipped)
```

Adding a therapy = one object in `services` in `src/content.js`. The tile grid, its
page, its breadcrumbs, its JSON-LD, the footer link, the sitemap entry and the
contact-form dropdown all pick it up.

## URLs

Every internal URL ends in a slash (`/services/speech-therapy/`). GitHub Pages
serves each page as a folder, so the slash-less form costs a 301 redirect; linking
to and declaring the slash form everywhere avoids it.

Slugs are short and keyword-led. Old URLs are not lost: `src/site.js` lists them in
`legacyRedirects`, the build writes a static redirect page for each (canonical to
the new URL, no `noindex`), and `NotFound` handles any that a static file cannot
represent. Covered: the original GoDaddy URLs (`/about-us`, `/f/<post>`) and the
first React launch's long slugs.

## Images

Put originals in `image-sources/`, then:

```bash
npm i --no-save sharp
node scripts/tools/optimize-images.mjs
```

That writes responsive WebP (640 / 1280 wide), the exact 4:5 hero crop, portrait
video posters, the favicon, app icons and the 1200x630 social image, and records
every output's real dimensions in `src/images/dimensions.json` so `<img>`
`width`/`height` (which stop layout shift) come from data. Commit the output.
`sharp` is deliberately not in `package.json`: CI never runs this.

The hero photo went from 178 KB to 22 KB on phones.

## Performance

Measured with Lighthouse, mobile profile, simulated slow 4G:

| | Before | After |
| --- | --- | --- |
| Performance | 89 | 97 |
| Accessibility | 96 | 100 |
| First Contentful Paint | 3.0 s | 1.4 s |
| Cumulative Layout Shift | 0.047 | 0 |

What did it: self-hosted fonts (the Google Fonts stylesheet blocked rendering for
~860 ms) with metric-matched fallbacks so the swap does not reflow the page; both
fonts and the hero image preloaded; the hero entrance no longer fades in from
`opacity: 0` (that hid the largest element); responsive images with real
dimensions; and gzip-ready static HTML. Removing the font preloads was tested and
brings the layout shift back, so keep them.

## Analytics

Google Analytics 4, measurement ID `G-39K18ZX0KT`, is set up in
`public/index.html`:

- It only runs on `activelittleminds.com` (never localhost, previews or the
  github.io mirror), so development does not pollute the data.
- `gtag.js` is fetched once the page has loaded and the browser is idle, so
  measurement never competes with rendering.
- Consent Mode v2 defaults: visitors in the EEA, UK and Switzerland start with
  analytics *denied*; ad storage is denied everywhere (no ads are used). Everyone
  else is measured normally. **No consent banner is installed**, so EEA/UK
  visitors are simply not measured. If DPDP-style or GDPR consent is needed for the
  rest of the audience, add a banner that calls
  `gtag('consent', 'update', { analytics_storage: 'granted' })`.
- Page views on in-app navigation are counted by GA4's built-in "page changes
  based on browser history events" (Enhanced measurement, on by default). Do not
  also add manual `page_view` calls or they will be double counted.

## Search Console

The `google-site-verification` tag from the old GoDaddy site is carried over in
`public/index.html`, so the existing property stays verified. Submit
`https://activelittleminds.com/sitemap.xml` under Indexing > Sitemaps.

## Design

Soft and rounded: no hard outlines, large corner radii, soft shadows. Sections curve
into each other; the arch survives as the photo frame. Headings are **Baloo 2**
(rounded, and it carries Devanagari should Hindi be added), body is **Nunito**.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#3A3357` | soft plum text |
| `--ink-60` | `#5F5887` | secondary text (5.4:1 on the tinted cards) |
| `--sage` | `#17694F` | actions and link text (6.6:1 on white, 5.5:1 on tints) |
| `--sun` | `#FFD669` | brand yellow, small accents only |
| `--sky` / `--mint` / `--petal` / `--grape` / `--tangerine` | see `styles.css` | tiles, chips, cards |

Every text/background pair used was checked against WCAG AA (4.5:1).

## Open items for the client

Search the source for `TODO(client)`:

1. **Two phone numbers** were in use on the old site (`93547 51149` and
   `8126268441`). The build uses the office line everywhere; confirm which is right.
2. **Opening hours** are a placeholder. They are deliberately left out of the
   structured data so Google is not told hours nobody has confirmed.
3. **Group & Social Therapy** copy is drafted, not clinically approved.
4. **Blog articles**: both bodies were missing from the old site. Until text is
   supplied, the two post pages are left out of the sitemap and are not linked from
   body copy, so search engines and visitors are not steered to near-empty pages.
   Adding a `body` array to a post in `content.js` publishes it: it joins the
   sitemap and the "Related reading" links automatically.
5. **Photos**: team portraits are coloured initials, and the founder portrait is an
   illustration. Six real photos would finish the site.
6. **Logo resolution**: the logo file is only 132x134 px, so the 192 px and 512 px
   app icons are upscaled and soft. A larger original would fix it; re-run the image
   script afterwards.
7. **Testimonials** are unattributed, and four are labelled samples that must be
   replaced or removed before launch.
8. **Founder bio and credentials** are drafted placeholders.
9. **Video row**: these are real clips from the clinic's YouTube channel (activity
   Shorts), not parent testimonials. Swap the `videos` list when real ones exist.
10. **Form delivery**: the enquiry form opens the visitor's mail app. Point it at a
    real endpoint (Formspree, Netlify Forms, or your own) before launch.
11. **Old-site keywords**: the previous homepage targeted phrases such as adult
    speech therapy, stuttering, fluency and voice therapy, and speech therapy at
    home. None of those services appear in the clinic's own service copy, so they
    were not added. If they are offered, say so and they can be added properly.
