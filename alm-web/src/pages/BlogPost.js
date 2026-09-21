import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts, services } from '../content';
import { paths } from '../site';
import { Breadcrumbs } from '../components/Bits';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const others = posts.filter((p) => p.slug !== slug);
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
              <h2>Therapies related to this topic</h2>
              <ul className="linklist">
                {therapies.map((t) => (
                  <li key={t.slug}>
                    <Link to={paths.service(t.slug)}>{t.title}</Link>
                  </li>
                ))}
              </ul>
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
