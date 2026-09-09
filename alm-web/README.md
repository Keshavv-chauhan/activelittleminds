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
  content.js          all site copy in one place — the client edits this file
  styles.css          design system (tokens + components)
  components/
    Layout.js         masthead, footer, mobile call bar
    Bits.js           usePageMeta, StartCard, ServiceTiles, FaqList
  pages/              Home, About, Services, ServiceDetail, Blog, Contact, NotFound
```

Copy lives in `src/content.js` and nowhere else. Adding a therapy means adding
one object to the `services` array — the tile grid, the detail page, the
"other therapies" list and the contact form dropdown all pick it up.

## Design

Soft and rounded throughout: no hard outlines, large corner radii, and soft
shadows instead of borders. Sections curve into one another (`.section--curve`)
rather than meeting at a straight line. The arch survives as the photo frame.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#3A3357` | soft plum — text. Black read as too sharp. |
| `--sun` | `#FFD24C` | brand yellow — hero, page heads |
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
5. **Team portraits** are still coloured initials — the one remaining gap.
   Five headshots would finish the about page. Everything else now uses the
   photographs supplied in `src/images/`.
6. **`unplaced-pexels.avif`** is in `src/images/` but unused: it is a 6000x4000
   original and needs resizing (and a decision about where it goes) first.
7. **Testimonials** are unattributed. Attribute them where parents consent.
8. **Form delivery** — the enquiry form currently opens the visitor's mail app.
   Point it at a real endpoint (Formspree, Netlify Forms, or your own) before
   launch.
