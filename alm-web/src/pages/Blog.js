import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../content';
import { paths } from '../site';
import { Breadcrumbs } from '../components/Bits';

export default function Blog() {
  return (
    <>
      <section className="pagehead pagehead--mint">
        <div className="container">
          <Breadcrumbs />
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
              <Link className="tile" to={paths.post(p.slug)} key={p.slug}>
                {/* Cards sit directly under the h1, so their headings are h2s. */}
                <h2 className="tile__title">{p.title}</h2>
                <p>{p.excerpt}</p>
                <span className="tile__more">
                  {p.dateLabel} — {p.category}
                </span>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: 'var(--s5)' }}>
            Looking for something specific? See our{' '}
            <Link to={paths.services}>therapies</Link> or{' '}
            <Link to={paths.contact}>ask the team</Link>.
          </p>

          <div className="notice" style={{ marginTop: 'var(--s4)' }}>
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
