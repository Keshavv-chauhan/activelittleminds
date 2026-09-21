import React from 'react';
import { Link } from 'react-router-dom';
import { values, team, stories } from '../content';
import { paths } from '../site';
import { Breadcrumbs } from '../components/Bits';
import Photo from '../components/Photo';
import { photos, sizes } from '../images';

export default function About() {
  return (
    <>
      <section className="pagehead pagehead--mint">
        <div className="container pagehead__grid">
          <div>
            <Breadcrumbs />
            <h1>More a home of growth than a clinic</h1>
            <p>
              Active Little Minds is a child development centre for children and
              the families around them.
            </p>
          </div>
          <div className="archphoto archphoto--square">
            <Photo
              photo={photos.movementGroup}
              priority
              sizes={sizes.header}
            />
          </div>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container split">
          <div className="prose">
            <h2>Our story</h2>
            <p>
              Active Little Minds was founded on one belief: every child,
              whatever their challenges, carries an infinite spark of potential.
            </p>
            <p>
              We saw how hard parents worked to find one place where therapy,
              education and care came together, and how often they ended up
              carrying their child between three of them. That is why we built a
              centre that does not simply treat children, but takes in the whole
              family.
            </p>
            <p>
              We began with a few therapists and a few children. We are now a
              community of professionals, families and — most importantly —
              children, who remind us daily what resilience and growth actually
              look like.
            </p>
            <p>
              See <Link to={paths.services}>what we offer</Link>, read our{' '}
              <Link to={paths.blog}>blogs for parents</Link>, or{' '}
              <Link to={paths.contact}>come and visit</Link>.
            </p>

            <h2>What we believe</h2>
            <div className="reasons">
              {values.map((v) => (
                <div className="reason" key={v.title}>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="sticky-aside">
            <div className="archphoto archphoto--square" style={{ marginBottom: 'var(--s4)' }}>
              <Photo
                photo={photos.jumping}
                sizes="(max-width: 900px) 100vw, 400px"
              />
            </div>
            <div className="startcard">
              <h2>Come and see the centre</h2>
              <p>
                The easiest way to know whether we are right for your child is
                to visit. Book a free first consultation and meet the team.
              </p>
              <div className="startcard__actions">
                <Link className="btn btn--ink btn--full" to={paths.contact}>
                  Book a visit
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--curve section--mint">
        <div className="container">
          <div className="head">
            <h2>The people your child will work with</h2>
          </div>
          <div className="team">
            {team.map((m) => (
              <div className="member" key={m.name}>
                {/* TODO(client): replace initials with real team photography. */}
                <div
                  className={`member__portrait member__portrait--${m.tone}`}
                  aria-hidden="true"
                >
                  {m.name.replace('Dr. ', '').charAt(0)}
                </div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <Link className="btn btn--sun" to={paths.services}>
              See our therapies
            </Link>
            <Link className="btn btn--outline" to={paths.contact}>
              Book a visit
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="head">
            <h2>Stories that keep us going</h2>
          </div>
          <div className="tiles">
            {stories.map((s, i) => (
              <figure className={`story story--${['sun','mint','petal'][i % 3]}`} key={s.quote.slice(0, 24)}>
                <blockquote>{s.quote}</blockquote>
                <figcaption>{s.source}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
