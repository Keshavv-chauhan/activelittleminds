import React, { useEffect, useState } from 'react';
import { listAllReviews, setReviewApproved, deleteReview } from './adminApi';

export default function AdminReviews() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState('');

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
  if (reviews === null) return <p>Loading…</p>;

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div>
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
