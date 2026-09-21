import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';

const app = (
  <React.StrictMode>
    {/* PUBLIC_URL is "" in production (the site lives at the domain root). */}
    <BrowserRouter basename={process.env.PUBLIC_URL || undefined}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const root = document.getElementById('root');

// Every real page ships with its HTML already rendered (scripts/prerender.cjs),
// so React attaches to it instead of rebuilding it. An empty root means this is
// the 404 shell or a dev-server load, which render from scratch as before.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
