import React from 'react';
import { usePageMeta, ServiceTiles, FaqList, StartCard } from '../components/Bits';
import { seo } from '../content';

export default function Services() {
  usePageMeta(seo['/services'].title, seo['/services'].description);

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <h1>Therapies</h1>
          <p>
            Every plan starts with an assessment. What follows is built for your
            child, and changes as they do.
          </p>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container">
          <ServiceTiles />
        </div>
      </section>

      <section className="section section--curve section--sky">
        <div className="container split">
          <div>
            <div className="head">
              <h2>Questions parents ask first</h2>
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
