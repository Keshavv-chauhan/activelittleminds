import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* PUBLIC_URL is "" locally and "/activelittleminds" on GitHub Pages.
        Once the custom domain is attached it goes back to "" and this
        resolves to the site root again. */}
    <BrowserRouter basename={process.env.PUBLIC_URL || undefined}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
