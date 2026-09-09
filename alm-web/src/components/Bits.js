import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clinic, services, faqs } from '../content';
import { serviceIcon } from './Icons';

/** Sets the document title and meta description per route. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}

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
        Prefer to write? <Link to="/contact">Send an enquiry</Link>
      </p>
    </div>
  );
}

export function ServiceTiles({ items = services }) {
  return (
    <div className="tiles">
      {items.map((s) => {
        const Icon = serviceIcon[s.slug];
        return (
        <Link
          key={s.slug}
          to={`/services/${s.slug}`}
          className={`tile tile--${s.tone}`}
        >
          {Icon && <Icon className="tile__icon" />}
          <h3>{s.title}</h3>
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
