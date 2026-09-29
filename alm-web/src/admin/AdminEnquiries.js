import React, { useEffect, useState } from 'react';
import { listEnquiries, setEnquiryStatus, deleteEnquiry } from './adminApi';

const STATUS_LABEL = {
  new: 'New',
  contacted: 'Contacted',
};

function formatWhen(createdAt) {
  // Firestore Timestamps have .toDate(); mock/local data is already a Date.
  const date = createdAt?.toDate ? createdAt.toDate() : createdAt;
  if (!date) return '';
  return new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState(null);
  const [error, setError] = useState('');

  async function refresh() {
    try {
      setEnquiries(await listEnquiries());
    } catch (err) {
      setError(err.message || 'Could not load enquiries.');
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleStatus(enquiry, status) {
    await setEnquiryStatus(enquiry.id, status);
    refresh();
  }

  async function handleDelete(enquiry) {
    if (!window.confirm(`Delete the enquiry from "${enquiry.name}"? This cannot be undone.`)) return;
    await deleteEnquiry(enquiry.id);
    refresh();
  }

  if (error) return <p className="form__status" role="alert">{error}</p>;
  if (enquiries === null) return <p>Loading…</p>;
  if (enquiries.length === 0) {
    return <p>No enquiries yet — they will appear here as soon as someone submits the "Book a consultation" form.</p>;
  }

  const newOnes = enquiries.filter((e) => e.status !== 'contacted');
  const contacted = enquiries.filter((e) => e.status === 'contacted');

  const Row = ({ e }) => (
    <li className="admin-list__row admin-list__row--enquiry" key={e.id}>
      <div>
        <div className="admin-enquiry__head">
          <strong>{e.name}</strong>
          <span className={`admin-status admin-status--${e.status === 'contacted' ? 'live' : 'draft'}`}>
            {STATUS_LABEL[e.status] || e.status}
          </span>
        </div>
        <p className="admin-list__meta">
          <a href={`tel:${e.phone}`}>{e.phone}</a>
          {e.childAge ? ` · Child's age: ${e.childAge}` : ''}
          {e.service ? ` · Interested in: ${e.service}` : ''}
        </p>
        {e.message && <p className="admin-enquiry__message">"{e.message}"</p>}
        <p className="admin-list__meta">{formatWhen(e.createdAt)}</p>
      </div>
      <div className="btn-row" style={{ marginTop: 0 }}>
        {e.status === 'contacted' ? (
          <button className="btn btn--outline btn--small" type="button" onClick={() => handleStatus(e, 'new')}>
            Mark as new
          </button>
        ) : (
          <button className="btn btn--primary btn--small" type="button" onClick={() => handleStatus(e, 'contacted')}>
            Mark contacted
          </button>
        )}
        <button className="btn btn--outline btn--small" type="button" onClick={() => handleDelete(e)}>
          Delete
        </button>
      </div>
    </li>
  );

  return (
    <div>
      {newOnes.length > 0 && (
        <>
          <h2 className="admin__section-title">New ({newOnes.length})</h2>
          <ul className="admin-list">
            {newOnes.map((e) => (
              <Row e={e} key={e.id} />
            ))}
          </ul>
        </>
      )}

      {contacted.length > 0 && (
        <>
          <h2 className="admin__section-title">Contacted ({contacted.length})</h2>
          <ul className="admin-list">
            {contacted.map((e) => (
              <Row e={e} key={e.id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
