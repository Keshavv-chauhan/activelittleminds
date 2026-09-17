# Active Little Minds — website redesign

React (Create React App) rebuild of activelittleminds.com, replacing the
GoDaddy Website Builder site whose content was trapped in clipped HTML embeds.

## Run

```bash
npm install
npm start      # http://localhost:3000
npm run build  # production bundle in ./build
```

## Structure

```
src/
  content.mjs         all site copy in one place — the client edits this file
  styles.css          design system (tokens + components)
  components/
    Layout.js         masthead, footer, mobile call bar
    Bits.js           usePageMeta, StartCard, ServiceTiles, FaqList
    Media.js          Carousel, Gallery (lightbox), VideoCarousel
    Animals.js         SVG character cast + FounderPortrait illustration
    Icons.js           service and reason glyphs
  pages/              Home, About, Services, ServiceDetail, Blog, BlogPost,
                      Contact, NotFound
scripts/
  prerender.mjs       writes a real index.html per route after the build
                      (see "Prerendering" below)
```

Copy lives in `src/content.mjs` and nowhere else — it is `.mjs`, not `.js`,
so `scripts/prerender.mjs` can import it directly with Node at build time.
Adding a therapy means adding one object to the `services` array — the tile
grid, the detail page, the "other therapies" list and the contact form
dropdown all pick it up. Adding a blog post works the same way through
`posts`, and the shared `routes` table in content.mjs updates automatically,
so prerendering and the sitemap never drift out of sync.

## Design

Soft and rounded throughout: no hard outlines, large corner radii, and soft
shadows instead of borders. Sections curve into one another (`.section--curve`)
rather than meeting at a straight line. The arch survives as the photo frame.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#3A3357` | soft plum — text. Black read as too sharp. |
| `--sun` | `#FFD669` | brand yellow — small accents now, not full fields |
| `--sky` / `--mint` | `#5FC5E8` / `#6FD9AE` | tiles, chips, cards |
| `--petal` / `--grape` | `#FF9CBB` / `#A98BE8` | grape is drawn from the logo tree |
| `--tangerine` | `#FF9A52` | tiles, chips |
| `--sage` | `#1D7A62` | primary action (5.2:1 on white) |
| `--cream` | `#FFF9EF` | page background |

Tiles and chips use the `-soft` tints of each colour with `--ink` text, so they
stay vivid but keep contrast well past 4.5:1.

Type is **Baloo 2** for headings (rounded, and it carries Devanagari should the
site ever need Hindi) and **Nunito** for body.

### Components

- `components/Animals.js` — six SVG characters (bunny, bear, fox, elephant,
  turtle, chick) plus `AnimalParade`. SVG rather than PNG so they stay sharp,
  recolour with the palette, and add no image weight. They bob gently; motion is
  disabled under `prefers-reduced-motion`.
- `components/Media.js` — `Carousel` (scroll-snap, swipeable, with arrow
  buttons) and `Gallery` (photo grid with a lightbox, closes on Escape).
- `components/Icons.js` — service and reason glyphs, hand-built rather than
  emoji, which is what the old site used.

## Homepage sections added after launch

- **Testimonial casserole** — the existing parent quotes and family stories,
  laid out in a deliberately uneven grid (`.casserole`) instead of matched
  cards, so it reads as a wall of real voices rather than a templated set.
- **Video carousel** — real clips from the clinic's own YouTube channel
  (@ActiveLittleMinds), horizontally scrollable. Each card shows a static
  thumbnail and only loads the actual YouTube iframe once someone clicks
  play, so the page never has to load six embeds up front.
- **Founder section** — Dr. Srishti's bio, drawn from the real "Our Story"
  copy on the about page. The credentials list and the portrait are
  placeholders (see Open items below).

## New: Blogs

`/blog` now links through to a real page per post at `/blog/:slug`
(`pages/BlogPost.js`), prerendered like every other route. Where a post's
body is missing (both of the two recovered posts, since the old site never
had usable article text), the page says so plainly instead of pretending —
no invented article text.

## Prerendering

GitHub Pages serves a file or a 404, with no server-side routing. A plain
Create React App build only outputs one `index.html`, so every route except
`/` answered HTTP 404 in production — the page still drew because
`404.html` is the app shell, but crawlers saw "not found" everywhere.
`npm run build` now runs `scripts/prerender.mjs` afterward, which writes a
real `index.html` per route in content.mjs's `routes` table, each with its
own title, description and canonical URL, plus `sitemap.xml` and
`robots.txt`. Add a route to that table (automatic for new services and
posts) and it gets a real page for free.
## What changed from the old site

- Service content moved off `/blog`, where it was living, onto `/services/<slug>`.
- Group & Social Therapy gained the detail page it never had (copy drafted — see below).
- FAQ, previously clipped to 150px and invisible, is now an accordion.
- Contact leads with an enquiry form; careers is demoted to a footnote.
- `LocalBusiness`/`MedicalClinic` schema, per-page titles and meta descriptions.
- Old URLs 301 to their new homes (`_redirects`, `vercel.json`).

## Open items for the client

Search the source for `TODO(client)`:

1. **Two phone numbers** were in use (`93547 51149` and `8126268441`). The build
   uses the office line everywhere — confirm which is correct.
2. **Opening hours** are a placeholder. The old site referred to "normal
   business hours" without publishing any.
3. **Group & Social Therapy** copy is drafted, not clinical-approved. The page
   shows a visible reviewer note until it is signed off.
4. **Blog articles** — both bodies were missing from the old site. Send the text
   and the cards become full articles.
5. **Team portraits** are still coloured initials, and the **founder
   portrait** is an illustration, not a photo — the one remaining visual
   gap. Six real photos (five team members + Dr. Srishti) would finish it.
   Everything else now uses the photographs supplied in `src/images/`.
6. **`unplaced-pexels.avif`** is in `src/images/` but unused: it is a 6000x4000
   original and needs resizing (and a decision about where it goes) first.
7. **Testimonials** are unattributed. Attribute them where parents consent.
8. **Form delivery** — the enquiry form currently opens the visitor's mail app.
   Point it at a real endpoint (Formspree, Netlify Forms, or your own) before
   launch.
9. **Founder bio and credentials** (`founder` in content.mjs) are drafted
   placeholder copy — confirm Dr. Srishti's real qualifications before launch.
10. **Video testimonials** — the video carousel currently plays real clips
    from the clinic's YouTube channel (activities, not testimonials). Swap
    the `videos` array in content.mjs for actual parent testimonial
    recordings when available.
