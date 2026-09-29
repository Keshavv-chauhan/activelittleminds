import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  clinic,
  concerns,
  whyUs,
  founder,
  videos,
} from '../content';
import { paths } from '../site';
import { photos, sizes } from '../images';
import { StartCard, ServiceTiles, FaqList } from '../components/Bits';
import Photo from '../components/Photo';
import { reasonIcon } from '../components/Icons';
import { AnimalParade, Bunny, Chick } from '../components/Animals';
import { Gallery, VideoCarousel, ReviewCarousel } from '../components/Media';
import ReviewForm from '../components/ReviewForm';
import { backendAvailable } from '../firebaseConfig';

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
  const [reviews, setReviews] = useState(null); // null = loading
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!backendAvailable) {
      setReviews([]);
      return undefined;
    }
    let cancelled = false;
    import('../admin/adminApi')
      .then(({ listApprovedReviews }) => listApprovedReviews())
      .then((r) => {
        if (!cancelled) setReviews(r);
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <Bunny className="hero__pet hero__pet--a" />
        <Chick className="hero__pet hero__pet--b" />
        <div className="container hero__grid">
          <div>
            <h1>Every child has a first word, a first step, a first friend.</h1>
            <p className="hero__lead">
              We are a child development centre in Palam Vihar, Gurugram,
              helping children with autism, ADHD, speech delay and other
              developmental differences reach those moments — and helping
              parents know what to do next.
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
            <Photo
              photo={photos.playgroundHero}
              priority
              sizes={sizes.hero}
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
          <p className="head__more">
            Wondering where to start?{' '}
            <Link to={paths.services}>See every therapy we offer</Link>.
          </p>
          <div className="btn-row">
            <Link className="btn btn--sun" to={paths.contact}>
              Talk to a therapist
            </Link>
          </div>
          <AnimalParade />
        </div>
      </section>

      <section className="section section--curve section--petal">
        <div className="container founder">
          <div className="archphoto archphoto--tall founder__portrait">
            <Photo photo={photos.founder} sizes={sizes.header} />
          </div>
          <div>
            <h2 className="founder__name">{founder.name}</h2>
            <p className="founder__role">{founder.role}</p>
            <ul className="founder__credentials">
              {founder.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {founder.bio.map((para) => (
              <p key={para.slice(0, 30)}>{para}</p>
            ))}
            <blockquote className="founder__quote">“{founder.quote}”</blockquote>
            <p>
              <Link to={paths.about}>Meet the whole team</Link> or{' '}
              <Link to={paths.contact}>book a visit</Link>.
            </p>
          </div>
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
              Real words from the families we work with every day.
            </p>
          </div>

          {reviews === null && <p>Loading reviews…</p>}
          {reviews && reviews.length === 0 && (
            <p>Be the first to share how your visit went.</p>
          )}
          {reviews && reviews.length > 0 && (
            <ReviewCarousel reviews={reviews} label="What parents say" />
          )}

          {backendAvailable && (
            <>
              <div className="btn-row" style={{ marginTop: 'var(--s5)' }}>
                <button
                  type="button"
                  className="btn btn--sun"
                  onClick={() => setShowReviewForm((v) => !v)}
                >
                  {showReviewForm ? 'Close' : 'Share your experience'}
                </button>
              </div>
              {showReviewForm && (
                <div className="review-form__wrap">
                  <ReviewForm />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container">
          <div className="head">
            <h2>See the centre in motion</h2>
            <p>
              Real videos from our centre. Scroll across, and tap any of them
              to play.
            </p>
          </div>
          <VideoCarousel videos={videos} label="Videos from Active Little Minds" />
        </div>
      </section>

      <section className="section section--curve section--cream">
        <div className="container split">
          <div>
            <div className="head">
              <h2>Questions parents ask first</h2>
              <p>
                Something else on your mind?{' '}
                <Link to={paths.contact}>Ask us directly</Link>, or{' '}
                <Link to={paths.services}>compare the therapies</Link> in
                detail.
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
