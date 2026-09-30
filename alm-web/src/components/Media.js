import React, { useCallback, useEffect, useRef, useState } from 'react';
import Photo from './Photo';
import { videoPoster } from '../images';
import { Quote, Star } from './Icons';

const THUMB_SIZES = '(max-width: 980px) 50vw, 280px';
const THUMB_SIZES_WIDE = '(max-width: 980px) 100vw, 560px';

/** Photo grid that opens a picture full size when one is chosen. */
export function Gallery({ items }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="gallery">
        {items.map((item, i) => (
          <button
            type="button"
            key={item.src}
            className={`gallery__item${item.wide ? ' gallery__item--wide' : ''}`}
            onClick={() => setOpen(i)}
            aria-label={`View larger: ${item.alt}`}
          >
            <Photo
              photo={item}
              sizes={item.wide ? THUMB_SIZES_WIDE : THUMB_SIZES}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={() => setOpen(null)}
            aria-label="Close photo"
          >
            &#215;
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={items[open].full}
              width={items[open].width}
              height={items[open].height}
              alt={items[open].alt}
            />
            <p className="lightbox__caption">{items[open].alt}</p>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Horizontally scrolling row of portrait video cards (the clinic's videos are
 * YouTube Shorts). Each card is a self-hosted poster; the YouTube player is
 * only created once someone presses play, so the page loads no third-party
 * video code, cookies or images up front.
 */
export function VideoCarousel({ videos, label = 'Videos' }) {
  const [playingId, setPlayingId] = useState(null);
  const viewport = useRef(null);

  const scrollByCards = useCallback((direction) => {
    const el = viewport.current;
    if (!el) return;
    const card = el.querySelector('.carousel__slide');
    const step = card ? card.offsetWidth + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, []);

  return (
    <div className="carousel">
      <div
        className="carousel__viewport"
        ref={viewport}
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {videos.map((v) => {
          const poster = videoPoster[v.id];
          return (
            <div className="carousel__slide carousel__slide--video" key={v.id}>
              <div className="video-card">
                {playingId === v.id ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="video-card__play"
                    onClick={() => setPlayingId(v.id)}
                    aria-label={`Play video: ${v.title}`}
                  >
                    <img
                      src={poster.src}
                      width={poster.width}
                      height={poster.height}
                      alt={`Video thumbnail: ${v.title}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="video-card__icon" aria-hidden="true">
                      &#9654;
                    </span>
                  </button>
                )}
              </div>
              <p className="video-card__title">{v.title}</p>
            </div>
          );
        })}
      </div>
      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__btn"
          onClick={() => scrollByCards(-1)}
          aria-label={`Scroll ${label} back`}
        >
          &#8592;
        </button>
        <button
          type="button"
          className="carousel__btn"
          onClick={() => scrollByCards(1)}
          aria-label={`Scroll ${label} forward`}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

/**
 * Continuously scrolling row of review cards — a true marquee (CSS
 * `animation` on a doubled track), not a stop-start "jump to next card
 * every few seconds." Pauses on any interaction (pointer down, wheel) for a
 * few seconds so someone can actually read, and never animates at all under
 * prefers-reduced-motion. Doubling the list and hiding the second copy from
 * assistive tech is the standard way to get a seamless loop out of a CSS
 * animation without measuring pixel widths in JS.
 */
export function ReviewCarousel({ reviews, label = 'Reviews' }) {
  const resumeTimer = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const pauseThenResume = useCallback(() => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 6000);
  }, []);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const canLoop = reviews.length > 1 && !reducedMotion;
  const track = canLoop ? [...reviews, ...reviews] : reviews;
  // A fixed speed regardless of count (rather than a fixed duration) so
  // adding more reviews doesn't make existing ones fly past faster.
  const duration = Math.max(reviews.length * 6, 18);

  return (
    <div
      className={`carousel carousel--reviews${paused || !canLoop ? ' is-paused' : ''}`}
      onPointerDown={pauseThenResume}
      onWheel={pauseThenResume}
    >
      <div className="carousel__viewport" role="group" aria-label={label}>
        <div className="carousel__track" style={{ '--marquee-duration': `${duration}s` }}>
          {track.map((r, i) => (
            <figure
              className="carousel__slide review-card"
              key={`${r.id}-${i}`}
              aria-hidden={i >= reviews.length ? true : undefined}
            >
              <Quote className="review-card__mark" />
              {r.rating && (
                <div className="review-card__stars" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      fill={j < r.rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  ))}
                </div>
              )}
              <blockquote>{r.quote}</blockquote>
              <figcaption>{r.source}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
