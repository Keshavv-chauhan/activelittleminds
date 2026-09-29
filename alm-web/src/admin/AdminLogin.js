import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, watchAuth } from './adminApi';
import { firebaseReady, backendAvailable } from '../firebaseConfig';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = 'Admin sign in';
    const unsub = watchAuth((user) => {
      if (user) navigate('/admin', { replace: true });
    });
    return unsub;
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError('Could not sign in. Check the email and password and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-auth">
      <form className="form admin-auth__card" onSubmit={handleSubmit}>
        <h1 style={{ fontSize: 'var(--step-3)' }}>Admin sign in</h1>
        <p className="form__note">Active Little Minds — content admin.</p>

        {!firebaseReady && backendAvailable && (
          <div className="notice">
            <p>
              Local preview only — no Firebase project connected yet. Enter
              any email and password to explore the panel with fake data.
            </p>
          </div>
        )}
        {!backendAvailable && (
          <div className="notice">
            <p>
              Firebase is not configured yet. Add the project values to
              .env.local (see .env.local.example) and restart the dev server.
            </p>
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn--primary btn--full" type="submit" disabled={busy || !backendAvailable}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        {error && (
          <p className="form__status" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
