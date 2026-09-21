/*
 * Single source of truth for everything a search engine reads about a page:
 * title, description, canonical URL, breadcrumbs and JSON-LD structured data.
 *
 * It is used twice, from the same code:
 *   - scripts/prerender.cjs bakes the result into each page's static HTML;
 *   - components/Layout.js (useRouteMeta) keeps <head> in sync when someone
 *     navigates inside the app.
 * Because both call these functions, the two can never disagree.
 */
import { clinic, services, posts, faqs, founder } from './content';
import { site, paths, withSlash, absoluteUrl } from './site';

const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

const staticPages = {
  '/': {
    kind: 'home',
    title: 'Speech Therapy for Kids, Palam Vihar | Active Little Minds',
    description:
      'Child development centre in Palam Vihar, Gurugram: speech, occupational and physio therapy plus special education under one roof. Free first consultation.',
  },
  '/about/': {
    kind: 'about',
    name: 'About',
    title: 'About Active Little Minds | Child Development, Gurugram',
    description:
      'Meet the therapists and special educators at Active Little Minds, a child development centre in Sector 23, Gurugram, and the beliefs behind our work.',
  },
  '/services/': {
    kind: 'services',
    name: 'Therapies',
    title: 'Therapies for Children in Gurugram | Active Little Minds',
    description:
      'Speech, occupational and physiotherapy, early intervention, special education and group therapy for children in Gurugram, with a free first consultation.',
  },
  '/blog/': {
    kind: 'blog',
    name: 'Blogs',
    title: 'Blogs for Parents | Active Little Minds',
    description:
      'Plain-language articles on autism, early childhood development and what parents can do at home, from the therapists at Active Little Minds in Gurugram.',
  },
  '/contact/': {
    kind: 'contact',
    name: 'Contact',
    title: 'Contact & Book a Consultation | Active Little Minds',
    description: `Visit Active Little Minds at H.No. 692, Sector 23, near Ansal Plaza, Gurugram, or call ${clinic.phoneDisplay} to book a free first consultation for your child.`,
  },
};

const NOT_FOUND = {
  kind: 'notfound',
  title: 'Page not found | Active Little Minds',
  description:
    'That page has moved or never existed. Browse our therapies or call Active Little Minds in Gurugram and we will point you to the right place.',
};

/** Work out which page a pathname is, and how it should describe itself. */
export function resolveRoute(pathname) {
  const path = withSlash(pathname);

  if (staticPages[path]) {
    return { path, canonical: absoluteUrl(path), ...staticPages[path] };
  }

  const svc = /^\/services\/([^/]+)\/$/.exec(path);
  if (svc) {
    const service = services.find((s) => s.slug === svc[1]);
    if (service) {
      return {
        kind: 'service',
        path,
        canonical: absoluteUrl(path),
        service,
        name: service.title,
        title: service.seoTitle,
        description: service.seoDescription,
      };
    }
  }

  const blog = /^\/blog\/([^/]+)\/$/.exec(path);
  if (blog) {
    const post = posts.find((p) => p.slug === blog[1]);
    if (post) {
      return {
        kind: 'post',
        path,
        canonical: absoluteUrl(path),
        post,
        name: post.title,
        title: post.seoTitle,
        description: post.excerpt,
      };
    }
  }

  // Unknown URL: no canonical, so a 404 never points search engines anywhere.
  return { path, canonical: null, ...NOT_FOUND };
}

export const metaFor = (pathname) => resolveRoute(pathname);

/** Every real page, in canonical (trailing-slash) form. */
export const routes = [
  ...Object.keys(staticPages),
  ...services.map((s) => paths.service(s.slug)),
  ...posts.map((p) => paths.post(p.slug)),
];

/**
 * Pages worth listing in the sitemap. A blog post with no article text yet is
 * still reachable, but is left out of the sitemap so search engines are not
 * steered toward a near-empty page.
 */
export const sitemapEntries = () =>
  routes
    .filter((path) => {
      const r = resolveRoute(path);
      return r.kind !== 'post' || Boolean(r.post.body);
    })
    .map((path) => {
      const r = resolveRoute(path);
      return { loc: absoluteUrl(path), lastmod: r.kind === 'post' ? r.post.date : undefined };
    });

/** Visible breadcrumb trail; also drives the BreadcrumbList schema. */
export function breadcrumbsFor(pathname) {
  const r = resolveRoute(pathname);
  if (r.kind === 'home' || r.kind === 'notfound') return [];
  const trail = [{ name: 'Home', path: paths.home }];
  if (r.kind === 'service') trail.push({ name: 'Therapies', path: paths.services });
  if (r.kind === 'post') trail.push({ name: 'Blogs', path: paths.blog });
  trail.push({ name: r.name, path: r.path });
  return trail;
}

/** Descriptive checks the build enforces so a bad title can never ship. */
export function auditMeta(pathname) {
  const r = resolveRoute(pathname);
  const problems = [];
  if (r.title.length > TITLE_MAX) problems.push(`title is ${r.title.length} chars (max ${TITLE_MAX})`);
  if (r.description.length < DESC_MIN || r.description.length > DESC_MAX) {
    problems.push(`description is ${r.description.length} chars (want ${DESC_MIN}-${DESC_MAX})`);
  }
  return problems;
}

/* ------------------------------------------------------------------------ */
/* JSON-LD                                                                   */
/* ------------------------------------------------------------------------ */

const id = (suffix) => `${site.origin}/#${suffix}`;
const pageId = (url, suffix) => `${url}#${suffix}`;

const image = (path, w, h) => ({
  '@type': 'ImageObject',
  url: absoluteUrl(path),
  width: w,
  height: h,
});

/**
 * The clinic itself. Note what is deliberately NOT here: opening hours (the
 * ones on the site are unconfirmed placeholders) and any rating or review data
 * (the site has no verified reviews, and self-published review markup breaks
 * Google's guidelines).
 */
function clinicNode() {
  return {
    '@type': 'MedicalClinic',
    '@id': id('clinic'),
    name: site.legalName,
    alternateName: site.name,
    url: `${site.origin}/`,
    description:
      'Child development centre in Palam Vihar, Gurugram offering speech therapy, occupational therapy, sensory integration, pediatric physiotherapy, early intervention and special education.',
    logo: image(site.logoPath, 512, 512),
    image: absoluteUrl(site.ogImage.path),
    // Derived from the same value the page shows, so schema and page cannot disagree.
    telephone: clinic.phoneHref.replace('tel:', ''),
    email: clinic.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H.No. 692, Sector 23, near Ansal Plaza',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122017',
      addressCountry: 'IN',
    },
    hasMap: clinic.mapHref,
    areaServed: [
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'Place', name: 'Palam Vihar' },
    ],
    founder: { '@type': 'Person', name: founder.name, jobTitle: founder.role },
    sameAs: Object.values(clinic.social),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Therapies and programmes',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          url: absoluteUrl(paths.service(s.slug)),
        },
      })),
    },
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': id('website'),
    url: `${site.origin}/`,
    name: site.name,
    inLanguage: site.locale,
    publisher: { '@id': id('clinic') },
  };
}

function breadcrumbNode(url, trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': pageId(url, 'breadcrumb'),
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

const itemList = (items) => ({
  '@type': 'ItemList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    url: it.url,
  })),
});

/** Complete JSON-LD document for a page, or null for an unknown URL. */
export function schemaFor(pathname) {
  const r = resolveRoute(pathname);
  if (r.kind === 'notfound') return null;

  const url = r.canonical;
  const trail = breadcrumbsFor(pathname);
  const graph = [clinicNode(), websiteNode()];

  const pageTypeByKind = {
    home: 'WebPage',
    about: 'AboutPage',
    services: 'CollectionPage',
    blog: 'CollectionPage',
    contact: 'ContactPage',
    service: 'WebPage',
    post: 'WebPage',
  };

  const page = {
    '@type': pageTypeByKind[r.kind],
    '@id': pageId(url, 'webpage'),
    url,
    name: r.title,
    description: r.description,
    inLanguage: site.locale,
    isPartOf: { '@id': id('website') },
    about: { '@id': id('clinic') },
    primaryImageOfPage: image(site.ogImage.path, site.ogImage.width, site.ogImage.height),
  };
  if (trail.length) page.breadcrumb = { '@id': pageId(url, 'breadcrumb') };

  if (r.kind === 'services') {
    page.mainEntity = itemList(
      services.map((s) => ({ name: s.title, url: absoluteUrl(paths.service(s.slug)) }))
    );
  }
  if (r.kind === 'blog') {
    page.mainEntity = itemList(
      posts.map((p) => ({ name: p.title, url: absoluteUrl(paths.post(p.slug)) }))
    );
  }
  graph.push(page);
  if (trail.length) graph.push(breadcrumbNode(url, trail));

  if (r.kind === 'services') {
    graph.push({
      '@type': 'FAQPage',
      '@id': pageId(url, 'faq'),
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  if (r.kind === 'service') {
    graph.push({
      '@type': 'Service',
      '@id': pageId(url, 'service'),
      name: r.service.title,
      serviceType: r.service.title,
      description: r.description,
      url,
      provider: { '@id': id('clinic') },
      areaServed: { '@type': 'City', name: 'Gurugram' },
      mainEntityOfPage: { '@id': pageId(url, 'webpage') },
    });
  }

  if (r.kind === 'post') {
    graph.push({
      '@type': 'BlogPosting',
      '@id': pageId(url, 'article'),
      headline: r.post.title,
      description: r.description,
      url,
      datePublished: r.post.date,
      dateModified: r.post.date,
      articleSection: r.post.category,
      inLanguage: site.locale,
      image: absoluteUrl(site.ogImage.path),
      author: { '@id': id('clinic') },
      publisher: { '@id': id('clinic') },
      mainEntityOfPage: { '@id': pageId(url, 'webpage') },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
