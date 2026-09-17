import React from 'react';
import { Link } from 'react-router-dom';
import { posts, seo } from '../content';
import { usePageMeta } from '../components/Bits';

export default function Blog() {
  usePageMeta(seo['/blog'].title, seo['/blog'].description);

  return (
    <>
      <section className="pagehead pagehead--mint">
        <div className="container">
          <h1>Blogs</h1>
          <p>
            Plain-language writing on development, diagnosis and what helps at
            home.
          </p>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container">
          <div className="tiles">
            {posts.map((p) => (
              <Link className="tile" to={`/blog/${p.slug}`} key={p.slug}>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="tile__more">
                  {p.dateLabel} — {p.category}
                </span>
              </Link>
            ))}
          </div>

          <div className="notice" style={{ marginTop: 'var(--s5)' }}>
            <p>
              Note for the client: both article bodies were missing from the old
              site — the post URLs served the homepage instead. Send us the
              original text and these become full articles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
