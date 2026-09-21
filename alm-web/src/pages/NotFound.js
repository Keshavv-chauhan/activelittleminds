import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { paths, legacyTarget } from '../site';

/**
 * Rendered for any URL that is not a real page. If the URL is one of the old
 * addresses (GoDaddy site, or the first long-slug launch) the visitor is sent
 * to where that content lives now instead of seeing an error.
 */
export default function NotFound() {
  const { pathname } = useLocation();
  const target = legacyTarget(pathname);
  if (target) return <Navigate to={target} replace />;

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
          <Link className="btn btn--primary" to={paths.services}>
            See our therapies
          </Link>
          <Link className="btn btn--outline" to={paths.blog}>
            Read our blogs
          </Link>
          <Link className="btn btn--outline" to={paths.contact}>
            Visit us
          </Link>
        </div>
      </div>
    </section>
  );
}
