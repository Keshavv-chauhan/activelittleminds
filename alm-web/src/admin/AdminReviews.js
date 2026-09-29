import React, { useEffect, useState } from 'react';
import { listAllReviews, setReviewApproved, deleteReview, createReviewAsAdmin } from './adminApi';

function NewReviewForm({ onCancel, onSaved }) {
  const [quote, setQuote] = useState('');
  const [source, setSource] = useState('');
  const [rating, setRating] = useState('5');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await createReviewAsAdmin({ quote, source, rating: rating ? Number(rating) : null });
      onSaved();
    } catch (err) {
      setError(err.message || 'Could not save the review.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form admin-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="r-quote">Review text</label>
        <textarea id="r-quote" required maxLength={600} value={quote} onChange={(e) => setQuote(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="r-source">Attributed to (e.g. "Parent", or a name)</label>
        <input id="r-source" required maxLength={100} value={source} onChange={(e) => setSource(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="r-rating">Rating</label>
        <select id="r-rating" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
          <option value="">No rating</option>
        </select>
      </div>

      <p className="form__note">This goes live immediately — it does not need approval, since you added it yourself.</p>

      <div className="btn-row">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Add review'}
        </button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && (
        <p className="form__status" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  async function refresh() {
    try {
      setReviews(await listAllReviews());
    } catch (err) {
      setError(err.message || 'Could not load reviews.');
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleApprove(review, approved) {
    await setReviewApproved(review.id, approved);
    refresh();
  }

  async function handleDelete(review) {
    if (!window.confirm('Delete this review? This cannot be undone.')) return;
    await deleteReview(review.id);
    refresh();
  }

  if (error) return <p className="form__status" role="alert">{error}</p>;

  if (adding) {
    return (
      <NewReviewForm
        onCancel={() => setAdding(false)}
        onSaved={() => {
          setAdding(false);
          refresh();
        }}
      />
    );
  }

  if (reviews === null) return <p>Loading…</p>;

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div>
      <div className="admin__toolbar">
        <button className="btn btn--primary" type="button" onClick={() => setAdding(true)}>
          New review
        </button>
      </div>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {pending.length > 0 && (
        <>
          <h2 className="admin__section-title">Waiting for approval ({pending.length})</h2>
          <ul className="admin-list">
            {pending.map((r) => (
              <li key={r.id} className="admin-list__row">
                <div>
                  <p>&ldquo;{r.quote}&rdquo;</p>
                  <p className="admin-list__meta">
                    {r.source || 'Anonymous'}
                    {r.rating ? ` — ${r.rating}/5` : ''}
                  </p>
                </div>
                <div className="btn-row" style={{ marginTop: 0 }}>
                  <button className="btn btn--primary btn--small" type="button" onClick={() => handleApprove(r, true)}>
                    Approve
                  </button>
                  <button className="btn btn--outline btn--small" type="button" onClick={() => handleDelete(r)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {approved.length > 0 && (
        <>
          <h2 className="admin__section-title">Live on the site ({approved.length})</h2>
          <ul className="admin-list">
            {approved.map((r) => (
              <li key={r.id} className="admin-list__row">
                <div>
                  <p>&ldquo;{r.quote}&rdquo;</p>
                  <p className="admin-list__meta">
                    {r.source || 'Anonymous'}
                    {r.rating ? ` — ${r.rating}/5` : ''}
                  </p>
                </div>
                <div className="btn-row" style={{ marginTop: 0 }}>
                  <button className="btn btn--outline btn--small" type="button" onClick={() => handleApprove(r, false)}>
                    Unpublish
                  </button>
                  <button className="btn btn--outline btn--small" type="button" onClick={() => handleDelete(r)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
