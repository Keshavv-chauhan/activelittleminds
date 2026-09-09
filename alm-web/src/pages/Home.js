import React from 'react';
import { Link } from 'react-router-dom';
import { clinic, concerns, whyUs, testimonials, stories, seo } from '../content';
import { photos } from '../images';
import { usePageMeta, StartCard, ServiceTiles, FaqList } from '../components/Bits';
import { reasonIcon } from '../components/Icons';
import { AnimalParade, Bunny, Chick } from '../components/Animals';
import { Carousel, Gallery } from '../components/Media';

const DOT_TONES = ['sun', 'mint', 'petal', 'sky', 'grape'];

const GALLERY = [
  { ...photos.circleTime, wide: true },
  photos.speechSession,
  photos.jumping,
  photos.movementGroup,
  { ...photos.tabletopSession, wide: true },
  photos.playground,
];

export default function Home() {
  usePageMeta(seo['/'].title, seo['/'].description);

  return (
    <>
      <section className="hero">
        <Bunny className="hero__pet hero__pet--a" />
        <Chick className="hero__pet hero__pet--b" />
        <div className="container hero__grid">
          <div>
            <h1>Every child has a first word, a first step, a first friend.</h1>
            <p className="hero__lead">
              We are a child development centre in Gurugram helping children
              with autism, ADHD, speech delay and other developmental
              differences reach those moments — and helping parents know what
              to do next.
            </p>
            <div className="btn-row">
              <a className="btn btn--primary" href={clinic.phoneHref}>
                Call {clinic.phoneDisplay}
              </a>
              <a className="btn btn--outline" href={clinic.whatsappHref}>
                Message on WhatsApp
              </a>
            </div>
            <p className="hero__where">
              The first consultation is free. Find us in {clinic.area}.
            </p>
          </div>

          <div className="archphoto archphoto--tall">
            <img
              src={photos.playground.src}
              alt={photos.playground.alt}
              width="1280"
              height="1600"
            />
          </div>
        </div>
      </section>

      <section className="section section--tight section--curve section--paper">
        <div className="container">
          <div className="head">
            <h2>Not sure whether we are the right place?</h2>
            <p>
              Most families come to us after a diagnosis, or because something
              about their child’s development does not feel right. We work with
              children facing:
            </p>
          </div>
          <ul className="chips">
            {concerns.map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <Link className="btn btn--sun" to="/contact">
              Talk to a therapist
            </Link>
          </div>
          <AnimalParade />
        </div>
      </section>

      <section className="section section--curve section--sky">
        <div className="container">
          <div className="head">
            <h2>Seven therapies, one team, one building</h2>
            <p>
              Your child’s therapists work in the same place and share the same
              plan, so nobody has to carry notes between clinics.
            </p>
          </div>
          <ServiceTiles />
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container">
          <div className="head">
            <h2>A look inside the centre</h2>
            <p>
              Sessions are built around play, because that is when children try
              things they would not otherwise try. Tap any photo to see it
              bigger.
            </p>
          </div>
          <Gallery items={GALLERY} />
        </div>
      </section>

      <section className="section section--curve section--plum">
        <div className="container">
          <div className="head">
            <h2>What working with us is like</h2>
          </div>
          <div className="reasons">
            {whyUs.map((r, i) => {
              const Icon = reasonIcon[r.title];
              return (
                <div className="reason" key={r.title}>
                  <span
                    className="reason__dot"
                    style={{
                      background: `var(--${DOT_TONES[i % DOT_TONES.length]})`,
                      color: 'var(--ink)',
                    }}
                  >
                    {Icon && <Icon />}
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--curve section--mint">
        <div className="container">
          <div className="head">
            <h2>What parents say</h2>
            <p>
              Swipe through, or read the longer accounts on the{' '}
              <Link to="/about">about page</Link>.
            </p>
          </div>
          <Carousel label="Parent stories">
            {[...testimonials, ...stories].map((t, i) => (
              <figure
                className={`story story--${DOT_TONES[i % DOT_TONES.length]}`}
                key={t.quote.slice(0, 24)}
              >
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>{t.source}</figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="section section--curve section--paper">
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
