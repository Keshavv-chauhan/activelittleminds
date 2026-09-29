import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../content';
import { paths } from '../site';
import { Breadcrumbs } from '../components/Bits';
import { Article } from '../components/Icons';

const byNewest = (a, b) => new Date(b.date) - new Date(a.date);

export default function Blog() {
  const sorted = [...posts].sort(byNewest);
  // The newest post with real text leads the page; a stub excerpt alone
  // would make a poor first impression in the featured slot.
  const featured = sorted.find((p) => p.body) || sorted[0];
  const rest = sorted.filter((p) => p !== featured);

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
          <Link className="post-feature" to={paths.post(featured.slug)}>
            <span className="post-feature__icon">
              <Article />
            </span>
            <div>
              <span className="post-card__category">{featured.category}</span>
              {/* The page's only h1 is above, so this can safely be an h2. */}
              <h2 className="post-feature__title">{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="post-card__foot">
                <time dateTime={featured.date}>{featured.dateLabel}</time>
                <span className="post-card__read">Read the full article →</span>
              </div>
            </div>
          </Link>

          <div className="tiles" style={{ marginTop: 'var(--s5)' }}>
            {rest.map((p) => (
              <Link className="post-card" to={paths.post(p.slug)} key={p.slug}>
                <span className="post-card__icon">
                  <Article />
                </span>
                <span className="post-card__category">{p.category}</span>
                <h2 className="post-card__title">{p.title}</h2>
                <p>{p.excerpt}</p>
                <div className="post-card__foot">
                  <time dateTime={p.date}>{p.dateLabel}</time>
                  <span className="post-card__read">Read article →</span>
                </div>
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
              Note for the client: "Autism Spectrum Disorder (ASD)" and "Top 8
              Tips for Early Childhood Development" still need their original
              text — those URLs served the homepage on the old site. The other
              four articles are drafted samples added to show what a full post
              looks like; replace them with clinically-approved copy (or your
              own writing) before launch.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
