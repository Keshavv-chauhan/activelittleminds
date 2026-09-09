import React, { useState } from 'react';
import { clinic, services } from '../content';
import { usePageMeta } from '../components/Bits';

export default function Contact() {
  usePageMeta(
    'Visit us | Active Little Minds, Sector 23 Gurugram',
    `Active Little Minds child development centre, ${clinic.address}. Call ${clinic.phoneDisplay}, message on WhatsApp, or send an enquiry to book a free first consultation.`
  );

  const [sent, setSent] = useState(false);

  // No backend is wired up yet. This hands the enquiry to the clinic's inbox
  // so the form is usable on day one; swap for a real endpoint when available.
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Parent: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Child's age: ${data.get('age')}`,
      `Interested in: ${data.get('service')}`,
      '',
      data.get('message'),
    ].join('\n');
    window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent(
      'Consultation enquiry from the website'
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <section className="pagehead pagehead--sky">
        <div className="container">
          <h1>Visit us</h1>
          <p>
            The quickest way to start is a phone call. If it is easier to write,
            the form below reaches the same team.
          </p>
        </div>
      </section>

      <section className="section section--curve section--paper">
        <div className="container visit">
          <div>
            <h2 style={{ fontSize: 'var(--step-3)' }}>Where to find us</h2>
            <dl className="factlist">
              <div className="fact">
                <dt>Address</dt>
                <dd>{clinic.address}</dd>
              </div>
              <div className="fact">
                <dt>Phone</dt>
                <dd>
                  <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
                </dd>
              </div>
              <div className="fact">
                <dt>WhatsApp</dt>
                <dd>
                  <a href={clinic.whatsappHref}>Message us on WhatsApp</a>
                </dd>
              </div>
              <div className="fact">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                </dd>
              </div>
              {clinic.hours.map((h) => (
                <div className="fact" key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>

            <div className="btn-row">
              <a
                className="btn btn--primary"
                href={clinic.mapHref}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="notice" style={{ marginTop: 'var(--s5)' }}>
              <p>
                Note for the client: opening hours are a placeholder. The
                previous site referred to “normal business hours” without ever
                publishing them.
              </p>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <h2 style={{ fontSize: 'var(--step-3)' }}>Book a consultation</h2>
            <p className="form__note">
              Tell us a little about your child and we will call you back.
            </p>

            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
              />
            </div>

            <div className="field">
              <label htmlFor="age">Your child’s age</label>
              <input id="age" name="age" />
            </div>

            <div className="field">
              <label htmlFor="service">What are you looking for?</label>
              <select id="service" name="service" defaultValue="Not sure yet">
                <option>Not sure yet</option>
                {services.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">What would you like us to know?</label>
              <textarea id="message" name="message" />
            </div>

            <button className="btn btn--primary btn--full" type="submit">
              Send enquiry
            </button>

            {sent && (
              <p className="form__status" role="status">
                Your email app should now be open with the enquiry ready to
                send. If nothing happened, call {clinic.phoneDisplay}.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="section section--curve section--grape">
        <div className="container">
          <div className="head">
            <h2>Working here</h2>
            <p>
              We take applications from therapists, special educators and
              interns throughout the year. Send your CV and a short note about
              the children you want to work with.
            </p>
          </div>
          <div className="btn-row" style={{ marginTop: 0 }}>
            <a
              className="btn btn--outline"
              href={`mailto:${clinic.email}?subject=${encodeURIComponent(
                'Job application'
              )}`}
            >
              Email your CV
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
