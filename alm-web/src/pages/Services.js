import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../site';
import {
  Breadcrumbs,
  ServiceTiles,
  FaqList,
  StartCard,
} from '../components/Bits';

export default function Services() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <Breadcrumbs />
          <h1>Therapies</h1>
          <p>
            Every plan starts with an assessment. What follows is built for your
            child, and changes as they do.
          </p>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container">
          {/* Cards sit directly under the h1, so their headings are h2s. */}
          <ServiceTiles headingLevel={2} />
        </div>
      </section>

      <section
        id="faq"
        className="section section--curve section--sky"
      >
        <div className="container split">
          <div>
            <div className="head">
              <h2>Questions parents ask first</h2>
              <p>
                Still unsure which therapy fits?{' '}
                <Link to={paths.contact}>Talk to our team</Link> or{' '}
                <Link to={paths.about}>meet the therapists</Link>.
              </p>
            </div>
            <FaqList />
          </div>
          <div className="sticky-aside">
            <StartCard />
          </div>
        </div>
      </section>
    </>
  );
}
