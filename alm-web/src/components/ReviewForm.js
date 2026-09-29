import React, { useState } from 'react';
import { firebaseReady, backendAvailable } from '../firebaseConfig';
import { Star } from './Icons';

/**
 * Public review submission — anyone visiting the site can leave one. It is
 * never shown immediately: every submission lands unapproved in Firestore
 * and only appears on the site once an admin approves it (see AdminReviews).
 *
 * Hidden entirely on a production build with no Firebase project configured
 * (nothing to submit to); in local dev it still renders against mockApi.js's
 * fake, browser-local data, so the flow can be tried before Firebase exists.
 */
export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!backendAvailable) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    // The native event's currentTarget goes null once the synchronous part of
    // the handler returns, which happens at the first `await` below — capture
    // it now, not after.
    const form = event.currentTarget;
    setBusy(true);
    setError('');
    const data = new FormData(form);
    try {
      // Loaded on demand so the Firebase SDK never ships in the page's
      // initial bundle — only someone who actually submits pulls it in.
      const { submitReview } = await import('../admin/adminApi');
      await submitReview({
        quote: data.get('quote'),
        source: data.get('source'),
        rating,
      });
      setSent(true);
      form.reset();
      setRating(5);
    } catch (err) {
      setError('Something went wrong sending your review. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="notice review-form">
        <p>
          Thank you — your review has been sent for approval and will appear
          on the site shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="form review-form" onSubmit={handleSubmit}>
      <h3 style={{ fontSize: 'var(--step-2)', margin: 0 }}>Share your experience</h3>
      <p className="form__note">Real families' words help other parents find us.</p>
      {!firebaseReady && (
        <div className="notice">
          <p>Local preview only — no Firebase project connected yet, so this saves to fake data in your browser, not a real database.</p>
        </div>
      )}

      <div className="field">
        <label htmlFor="rf-rating">Your rating</label>
        <div className="review-form__stars" role="radiogroup" aria-labelledby="rf-rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className="review-form__star-btn"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              aria-pressed={rating === n}
              onClick={() => setRating(n)}
            >
              <Star fill={n <= rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" />
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="rf-quote">Your review</label>
        <textarea id="rf-quote" name="quote" required maxLength={600} />
      </div>

      <div className="field">
        <label htmlFor="rf-source">Your name</label>
        <input id="rf-source" name="source" required autoComplete="name" />
      </div>

      <button className="btn btn--primary" type="submit" disabled={busy}>
        {busy ? 'Sending…' : 'Send review'}
      </button>

      {error && (
        <p className="form__status" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
