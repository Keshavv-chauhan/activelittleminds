import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../content';
import { usePageMeta, StartCard, ServiceTiles } from '../components/Bits';
import { servicePhoto } from '../images';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const photo = servicePhoto[slug];

  usePageMeta(
    service
      ? `${service.title} | Active Little Minds, Gurugram`
      : 'Therapy not found | Active Little Minds',
    service ? service.short : undefined
  );

  if (!service) return <NotFound />;

  return (
    <>
      <section className={`pagehead pagehead--${service.tone}`}>
        <div className="container pagehead__grid">
          <div>
            <h1>{service.title}</h1>
            <p>{service.tagline}</p>
          </div>
          {photo && (
            <div className="archphoto archphoto--square">
              <img src={photo.src} alt={photo.alt} />
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
            <h2>Other therapies we offer</h2>
          </div>
          <ServiceTiles items={others} />
          <div className="btn-row">
            <Link className="btn btn--outline" to="/services">
              See all therapies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
