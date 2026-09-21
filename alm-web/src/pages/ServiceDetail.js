import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services, posts } from '../content';
import { paths } from '../site';
import { servicePhoto, sizes } from '../images';
import { Breadcrumbs, StartCard, ServiceTiles } from '../components/Bits';
import Photo from '../components/Photo';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const photo = servicePhoto[slug];
  const related = service.related
    .map((rel) => services.find((s) => s.slug === rel))
    .filter(Boolean);
  // Only articles that have actually been written are worth sending people to.
  const reading = posts.filter((p) => p.body && p.related.includes(slug));

  return (
    <>
      <section className={`pagehead pagehead--${service.tone}`}>
        <div className="container pagehead__grid">
          <div>
            <Breadcrumbs />
            <h1>{service.title}</h1>
            <p>{service.tagline}</p>
          </div>
          {photo && (
            <div className="archphoto archphoto--square">
              <Photo
                photo={photo}
                priority
                sizes={sizes.header}
              />
            </div>
          )}
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container split">
          <article className="prose">
            <h2>{service.whatHeading}</h2>
            {service.what.map((para) => (
              <p key={para.slice(0, 30)}>{para}</p>
            ))}

            <div className="callout">
              <p>{service.note}</p>
            </div>

            <h2>How we help</h2>
            <ul>
              {service.help.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Our approach</h2>
            <p>{service.approach}</p>

            {service.story && (
              <>
                <h2>One child’s progress</h2>
                <p>{service.story}</p>
              </>
            )}

            <p>{service.close}</p>

            <p>
              Ready to talk?{' '}
              <Link to={paths.contact}>Book a free first consultation</Link>{' '}
              or read the{' '}
              <Link to={`${paths.services}#faq`}>questions parents ask first</Link>.
            </p>

            {service.draft && (
              <div className="notice">
                <p>
                  Note for the client: the previous site had no detail page for
                  this therapy. This copy is drafted from the service summary
                  and needs review by the clinical team before launch.
                </p>
              </div>
            )}
          </article>

          <aside className="sticky-aside">
            <StartCard />
          </aside>
        </div>
      </section>

      <section className="section section--curve section--mint">
        <div className="container">
          <div className="head">
            <h2>Therapies that often go together with this one</h2>
            <p>
              Because our therapists work in the same building and share one
              plan, children often move between these in the same week.
            </p>
          </div>
          <ServiceTiles items={related} />
          <div className="btn-row">
            <Link className="btn btn--outline" to={paths.services}>
              See all therapies
            </Link>
          </div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="section section--curve section--paper">
          <div className="container">
            <div className="head">
              <h2>Related reading</h2>
            </div>
            <div className="tiles">
              {reading.map((p) => (
                <Link className="tile" to={paths.post(p.slug)} key={p.slug}>
                  <h3 className="tile__title">{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="tile__more">Read the article</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
