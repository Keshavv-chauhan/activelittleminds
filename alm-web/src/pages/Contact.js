import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clinic, services } from '../content';
import { paths } from '../site';
import { Breadcrumbs } from '../components/Bits';
import { backendAvailable } from '../firebaseConfig';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  function sendByEmail(data) {
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
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // The native event's currentTarget goes null once the synchronous part of
    // the handler returns, which happens at the first `await` below — capture
    // it now, not after.
    const form = event.currentTarget;
    const data = new FormData(form);

    // No Firebase project configured yet on a live deploy: fall back to the
    // visitor's own mail app rather than losing the enquiry.
    if (!backendAvailable) {
      sendByEmail(data);
      setSent(true);
      return;
    }

    setSending(true);
    setError('');
    try {
      // Loaded on demand so the Firebase SDK never ships in the page's
      // initial bundle — only someone who actually submits pulls it in.
      const { submitEnquiry } = await import('../admin/adminApi');
      await submitEnquiry({
        name: data.get('name'),
        phone: data.get('phone'),
        childAge: data.get('age'),
        service: data.get('service'),
        message: data.get('message'),
      });
      setSent(true);
      form.reset();
    } catch (err) {
      setError(`Something went wrong sending that. Please call ${clinic.phoneDisplay} instead.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="pagehead pagehead--sky">
        <div className="container">
          <Breadcrumbs />
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

            <p style={{ marginTop: 'var(--s4)' }}>
              Not sure which therapy your child needs? Read about{' '}
              <Link to={paths.services}>each of our therapies</Link> and the{' '}
              questions parents ask first, or{' '}
              <Link to={paths.about}>meet the team</Link>.
            </p>

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

            <button className="btn btn--primary btn--full" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send enquiry'}
            </button>

            {sent && (
              <p className="form__status" role="status">
                {backendAvailable
                  ? `Thank you — we've received your enquiry and will call you back shortly.`
                  : `Your email app should now be open with the enquiry ready to send. If nothing happened, call ${clinic.phoneDisplay}.`}
              </p>
            )}
            {error && (
              <p className="form__status" role="alert">
                {error}
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
