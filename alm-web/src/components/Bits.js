import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clinic, services, faqs } from '../content';
import { paths } from '../site';
import { breadcrumbsFor } from '../seo';
import { serviceIcon } from './Icons';

export function StartCard() {
  return (
    <div className="startcard">
      <h2>Start with a free consultation</h2>
      <p>
        We begin with an assessment, not a package. You will leave knowing what
        your child needs and what it will involve.
      </p>
      <div className="startcard__actions">
        <a className="btn btn--ink btn--full" href={clinic.phoneHref}>
          Call {clinic.phoneDisplay}
        </a>
        <a className="btn btn--outline btn--full" href={clinic.whatsappHref}>
          Message on WhatsApp
        </a>
      </div>
      <p className="startcard__line">
        Prefer to write? <Link to={paths.contact}>Send an enquiry</Link>
      </p>
    </div>
  );
}

/**
 * Therapy cards. `headingLevel` lets the caller keep the page outline valid:
 * pass 2 when the cards sit directly under the page's h1, 3 (the default) when
 * they sit under an h2.
 */
export function ServiceTiles({ items = services, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className="tiles">
      {items.map((s) => {
        const Icon = serviceIcon[s.slug];
        return (
          <Link
            key={s.slug}
            to={paths.service(s.slug)}
            className={`tile tile--${s.tone}`}
          >
            {Icon && <Icon className="tile__icon" />}
            <Heading className="tile__title">{s.title}</Heading>
            <p>{s.short}</p>
            <span className="tile__more">Read about this therapy</span>
          </Link>
        );
      })}
    </div>
  );
}

export function FaqList({ items = faqs }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Visible breadcrumb trail. Its data also feeds the BreadcrumbList schema. */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const trail = breadcrumbsFor(pathname);
  if (trail.length < 2) return null;
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((step, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={step.path}>
              {last ? (
                <span aria-current="page">{step.name}</span>
              ) : (
                <Link to={step.path}>{step.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
