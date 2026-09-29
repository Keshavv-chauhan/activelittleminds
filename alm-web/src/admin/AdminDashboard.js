import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { watchAuth, signOutAdmin } from './adminApi';
import { firebaseReady, backendAvailable } from '../firebaseConfig';
import AdminPosts from './AdminPosts';
import AdminReviews from './AdminReviews';

const TABS = [
  { id: 'posts', label: 'Blog posts' },
  { id: 'reviews', label: 'Reviews' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [tab, setTab] = useState('posts');

  useEffect(() => {
    document.title = 'Admin — Active Little Minds';
    const unsub = watchAuth((u) => {
      setUser(u);
      if (!u && backendAvailable) navigate('/admin-login', { replace: true });
    });
    return unsub;
  }, [navigate]);

  if (!backendAvailable) {
    return (
      <div className="admin-auth">
        <div className="notice admin-auth__card">
          <p>
            Firebase is not configured yet. Add the project values to
            .env.local (see .env.local.example) and restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  if (user === undefined) return null; // avoid a flash of the login redirect
  if (!user) return null; // redirecting

  return (
    <div className="admin">
      {!firebaseReady && (
        <div className="admin__demo-banner">
          Local preview — no Firebase project connected yet. Everything below is fake, in-memory data that resets on reload.
        </div>
      )}
      <header className="admin__bar">
        <div>
          <strong>Active Little Minds</strong> — admin
        </div>
        <div className="admin__bar-right">
          <span>{user.email}</span>
          <button className="btn btn--outline btn--small" type="button" onClick={() => signOutAdmin()}>
            Sign out
          </button>
        </div>
      </header>

      <nav className="admin__tabs" aria-label="Admin sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin__tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="admin__content">
        {tab === 'posts' && <AdminPosts />}
        {tab === 'reviews' && <AdminReviews />}
      </div>
    </div>
  );
}
