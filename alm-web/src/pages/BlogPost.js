import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts, postSeo } from '../content';
import { usePageMeta } from '../components/Bits';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const others = posts.filter((p) => p.slug !== slug);

  usePageMeta(
    post ? postSeo(post).title : 'Article not found | Active Little Minds',
    post ? postSeo(post).description : undefined
  );

  if (!post) return <NotFound />;

  return (
    <>
      <section className="pagehead pagehead--mint">
        <div className="container">
          <h1>{post.title}</h1>
          <p>
            {post.dateLabel} — {post.category}
          </p>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container split">
          <article className="prose">
            <p style={{ fontSize: 'var(--step-1)' }}>{post.excerpt}</p>

            {post.body ? (
              post.body.map((para) => (
                <p key={para.slice(0, 30)}>{para}</p>
              ))
            ) : (
              <div className="notice">
                <p>
                  The full article isn't ready yet — this text was missing
                  from the old site (the link served the homepage instead of
                  the post). Call or WhatsApp us and we're happy to talk
                  through it directly, or check back soon.
                </p>
              </div>
            )}

            <div className="btn-row">
              <Link className="btn btn--outline" to="/blog">
                Back to all blogs
              </Link>
            </div>
          </article>

          <aside className="sticky-aside">
            {others.length > 0 && (
              <div className="startcard" style={{ background: 'var(--paper)', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontSize: 'var(--step-2)' }}>More from the blog</h2>
                <ul className="factlist">
                  {others.map((o) => (
                    <li className="fact" key={o.slug}>
                      <Link to={`/blog/${o.slug}`}>
                        <dt>{o.dateLabel}</dt>
                        <dd>{o.title}</dd>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
