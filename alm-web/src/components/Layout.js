import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { clinic } from '../content';
import { brand } from '../images';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Therapies' },
  { to: '/blog', label: 'Guides' },
  { to: '/contact', label: 'Visit us' },
];

function Masthead() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <Link to="/" className="brand">
          <img className="brand__logo" src={brand.logo} alt="" width="52" height="52" />
          <span className="brand__name">
            Active Little Minds
            <span className="brand__sub">Child Development Centre</span>
          </span>
        </Link>

        <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn--primary masthead__cta">
          Book a consultation
        </Link>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h3>{clinic.full}</h3>
            <p>{clinic.promise}.</p>
            <p>{clinic.address}</p>
          </div>

          <div>
            <h3>Therapies</h3>
            <ul>
              <li>
                <Link to="/services">All therapies</Link>
              </li>
              <li>
                <Link to="/services/speech-and-language-therapy">
                  Speech &amp; Language Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/occupational-therapy-and-sensory-integration">
                  Occupational Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/neurodevelopment-therapy-and-early-intervention">
                  Early Intervention
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Get in touch</h3>
            <ul>
              <li>
                <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
              </li>
              <li>
                <a href={clinic.whatsappHref}>WhatsApp us</a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </li>
              <li>
                <a href={clinic.social.instagram}>Instagram</a>
              </li>
              <li>
                <a href={clinic.social.facebook}>Facebook</a>
              </li>
              <li>
                <a href={clinic.social.youtube}>YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <span>
            &copy; {new Date().getFullYear()} Active Little Minds. All rights
            reserved.
          </span>
          <span>Managed by Purple People International Pvt Ltd</span>
        </div>
      </div>
    </footer>
  );
}

function ActionBar() {
  return (
    <div className="actionbar">
      <a className="btn btn--primary" href={clinic.phoneHref}>
        Call
      </a>
      <a className="btn btn--outline" href={clinic.whatsappHref}>
        WhatsApp
      </a>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main">{children}</main>
      <Footer />
      <ActionBar />
    </>
  );
}
