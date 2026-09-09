import React from 'react';
import { posts } from '../content';
import { usePageMeta } from '../components/Bits';

export default function Blog() {
  usePageMeta(
    'Guides for parents | Active Little Minds',
    'Plain-language guides on autism, early childhood development and what parents can do at home, written by the team at Active Little Minds.'
  );

  return (
    <>
      <section className="pagehead pagehead--mint">
        <div className="container">
          <h1>Guides for parents</h1>
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
              <article className="tile" key={p.slug}>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="tile__more">
                  {p.dateLabel} — {p.category}
                </span>
              </article>
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
