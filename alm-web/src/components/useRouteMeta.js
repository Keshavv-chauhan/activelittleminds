import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaFor, schemaFor } from '../seo';
import { site, absoluteUrl } from '../site';

// useLayoutEffect on the client so the title changes before the browser
// paints; plain useEffect on the server, where layout effects do not run.
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const upsert = (selector, tag, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

const remove = (selector) => {
  const el = document.head.querySelector(selector);
  if (el) el.remove();
};

/**
 * Keeps title, description, canonical, social tags and JSON-LD in step with
 * the current route. The static HTML already carries the right values for the
 * first load (scripts/prerender.cjs uses the same seo.js); this covers moving
 * between pages without a reload.
 */
export default function useRouteMeta() {
  const { pathname } = useLocation();

  useIsoLayoutEffect(() => {
    const m = metaFor(pathname);
    const type = m.kind === 'post' ? 'article' : 'website';

    document.title = m.title;
    upsert('meta[name="description"]', 'meta', { name: 'description', content: m.description });

    upsert('meta[property="og:title"]', 'meta', { property: 'og:title', content: m.title });
    upsert('meta[property="og:description"]', 'meta', { property: 'og:description', content: m.description });
    upsert('meta[property="og:type"]', 'meta', { property: 'og:type', content: type });
    upsert('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: m.title });
    upsert('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: m.description });

    if (m.canonical) {
      upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: m.canonical });
      upsert('meta[property="og:url"]', 'meta', { property: 'og:url', content: m.canonical });
    } else {
      remove('link[rel="canonical"]');
      remove('meta[property="og:url"]');
    }

    const ld = schemaFor(pathname);
    if (ld) {
      const el = upsert('script#ld-json', 'script', { id: 'ld-json', type: 'application/ld+json' });
      el.textContent = JSON.stringify(ld);
    } else {
      remove('script#ld-json');
    }

    // og:image never changes per page, but make sure it exists on a client-only render.
    upsert('meta[property="og:image"]', 'meta', {
      property: 'og:image',
      content: absoluteUrl(site.ogImage.path),
    });
  }, [pathname]);
}
