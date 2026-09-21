import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { clinic, services } from '../content';
import { paths } from '../site';
import { brand } from '../images';
import useRouteMeta from './useRouteMeta';

const NAV = [
  { to: paths.home, label: 'Home', end: true },
  { to: paths.about, label: 'About' },
  { to: paths.services, label: 'Therapies' },
  { to: paths.blog, label: 'Blogs' },
  { to: paths.contact, label: 'Visit us' },
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
        <Link to={paths.home} className="brand">
          <img
            className="brand__logo"
            src={brand.logo.src}
            width={brand.logo.width}
            height={brand.logo.height}
            alt={brand.logo.alt}
          />
          <span className="brand__name">
            Active Little Minds
            <span className="brand__sub">Child Development Centre</span>
          </span>
        </Link>

        <nav
          id="main-nav"
          className={`nav${open ? ' is-open' : ''}`}
          aria-label="Main"
        >
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

        <Link to={paths.contact} className="btn btn--primary masthead__cta">
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
            <h2 className="footer__title">{clinic.full}</h2>
            <p>{clinic.promise}.</p>
            <p>{clinic.address}</p>
          </div>

          <nav aria-label="Explore">
            <h2 className="footer__title">Explore</h2>
            <ul>
              <li>
                <Link to={paths.home}>Home</Link>
              </li>
              <li>
                <Link to={paths.about}>About us</Link>
              </li>
              <li>
                <Link to={paths.services}>All therapies</Link>
              </li>
              <li>
                <Link to={paths.blog}>Blogs</Link>
              </li>
              <li>
                <Link to={paths.contact}>Contact and directions</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Therapies">
            <h2 className="footer__title">Therapies</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={paths.service(s.slug)}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__title">Get in touch</h2>
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
                <a href={clinic.social.instagram} rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={clinic.social.facebook} rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href={clinic.social.youtube} rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <span suppressHydrationWarning>
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
  useRouteMeta();
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
