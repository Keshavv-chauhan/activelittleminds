import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/Bits';

export default function NotFound() {
  usePageMeta('Page not found | Active Little Minds');

  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontSize: 'var(--step-4)' }}>
          That page has moved or never existed
        </h1>
        <p style={{ marginTop: 'var(--s3)', fontSize: 'var(--step-1)' }}>
          Try the therapies list, or call us and we will point you to the right
          place.
        </p>
        <div className="btn-row">
          <Link className="btn btn--primary" to="/services">
            See our therapies
          </Link>
          <Link className="btn btn--outline" to="/contact">
            Visit us
          </Link>
        </div>
      </div>
    </section>
  );
}
