import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts, services } from '../content';
import { paths } from '../site';
import { Breadcrumbs } from '../components/Bits';
import { backendAvailable } from '../firebaseConfig';
import NotFound from './NotFound';

function normalizeFirestorePost(p) {
  const created = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
  return {
    ...p,
    date: created.toISOString(),
    dateLabel: created.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    body: p.body ? p.body.split(/\n\s*\n/).filter(Boolean) : null,
    related: p.related || [],
  };
}

export default function BlogPost() {
  const { slug } = useParams();
  const staticPost = posts.find((p) => p.slug === slug);
  // undefined = still checking Firestore, null = checked and not found there
  const [firestorePost, setFirestorePost] = useState(undefined);

  useEffect(() => {
    if (staticPost || !backendAvailable) {
      setFirestorePost(null);
      return undefined;
    }
    let cancelled = false;
    import('../admin/adminApi')
      .then(({ getPublishedPostBySlug }) => getPublishedPostBySlug(slug))
      .then((p) => {
        if (!cancelled) setFirestorePost(p ? normalizeFirestorePost(p) : null);
      })
      .catch(() => {
        if (!cancelled) setFirestorePost(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, staticPost]);

  // The static list is prerendered and already carries the right <title> via
  // seo.js; a Firestore-only post is not in that list, so useRouteMeta (which
  // does not know about it) sets a "page not found" title on mount — correct
  // it once the real post has loaded.
  useEffect(() => {
    if (!staticPost && firestorePost) {
      document.title = `${firestorePost.title} | Active Little Minds`;
    }
  }, [staticPost, firestorePost]);

  const post = staticPost || firestorePost;

  if (!post) {
    // Still waiting on the Firestore lookup for a non-static slug: render
    // nothing yet rather than flashing "not found" before it resolves.
    if (!staticPost && firestorePost === undefined && backendAvailable) return null;
    return <NotFound />;
  }

  const others = posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  const therapies = post.related
    .map((rel) => services.find((s) => s.slug === rel))
    .filter(Boolean);

  return (
    <>
      <section className="pagehead pagehead--mint">
        <div className="container">
          <Breadcrumbs />
          <h1>{post.title}</h1>
          <p>
            <time dateTime={post.date}>{post.dateLabel}</time> — {post.category}
          </p>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container split">
          <article className="prose">
            <p style={{ fontSize: 'var(--step-1)' }}>{post.excerpt}</p>

            {post.body ? (
              post.body.map((para) => <p key={para.slice(0, 30)}>{para}</p>)
            ) : (
              <div className="notice">
                <p>
                  The full article isn’t ready yet — this text was missing from
                  the old site (the link served the homepage instead of the
                  post). In the meantime, read about{' '}
                  <Link to={paths.services}>the therapies we offer</Link> or{' '}
                  <Link to={paths.contact}>talk to the team directly</Link>.
                </p>
              </div>
            )}

            <div className="btn-row">
              <Link className="btn btn--outline" to={paths.blog}>
                Back to all blogs
              </Link>
            </div>
          </article>

          <aside className="sticky-aside">
            <div className="startcard startcard--plain">
              {therapies.length > 0 && (
                <>
                  <h2>Therapies related to this topic</h2>
                  <ul className="linklist">
                    {therapies.map((t) => (
                      <li key={t.slug}>
                        <Link to={paths.service(t.slug)}>{t.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {others.length > 0 && (
                <>
                  <h2 className="linklist__gap">More from the blog</h2>
                  <ul className="linklist">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link to={paths.post(o.slug)}>{o.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
