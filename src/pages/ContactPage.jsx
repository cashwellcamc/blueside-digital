import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css';

const DISCIPLINES = [
  'CMS Development',
  'Front-End',
  'Accessibility / 508',
  'Analytics & MarTech',
  'Federal / Government',
];

const TECH_MAP = {
  'CMS Development':      ['Drupal', 'AEM', 'WordPress', 'Headless CMS'],
  'Front-End':            ['React', 'Next.js', 'TypeScript', 'HTML / CSS'],
  'Accessibility / 508':  ['WAVE Audit', 'Remediation', 'ANDI Testing', 'VPAT Documentation'],
  'Analytics & MarTech':  ['GA4', 'GTM', 'Adobe Analytics', 'Salesforce', 'HubSpot'],
  'Federal / Government': ['Section 508', 'Trusted Tester', 'ANDI Testing', 'Drupal'],
};

const WORK_TYPES = [
  'New Features', 'Maintenance', 'Migration',
  'Audit', 'Analytics Setup', 'API Integration', 'Retainer',
];

// Replace with your Formspree endpoint — https://formspree.io/f/{your-id}
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

export default function ContactPage() {
  const [discipline, setDiscipline]   = useState('');
  const [technologies, setTech]       = useState([]);
  const [workTypes, setWorkTypes]     = useState([]);
  const [name, setName]               = useState('');
  const [company, setCompany]         = useState('');
  const [email, setEmail]             = useState('');
  const [message, setMessage]         = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [error, setError]             = useState(false);

  useEffect(() => {
    document.title = 'Contact | Blueside Digital';
    return () => { document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting'; };
  }, []);

  const handleDiscipline = (d) => {
    setDiscipline(d === discipline ? '' : d);
    setTech([]);
  };

  const toggleChip = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          discipline,
          technologies: technologies.join(', '),
          workTypes: workTypes.join(', '),
          name,
          company,
          email,
          message,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-shell">

      {/* ── LEFT PANEL ── */}
      <div className="contact-left">
        <div className="wordmark">
          <div className="wordmark-main">Blue<span>side</span><br />Digital</div>
          <div className="wordmark-sub">Independent Consulting</div>
        </div>

        <div className="divider" />

        <p className="tagline">
          Senior-level digital expertise for healthcare, pharma, federal, and beyond.
        </p>

        <div className="contact-block">
          <div className="contact-label">Get in touch</div>
          <a className="contact-link" href="mailto:cashwell.digital@gmail.com">
            cashwell.digital@gmail.com
          </a>
        </div>

        <div className="availability">
          <span className="dot" />
          Available for new engagements
        </div>

        <Link to="/" className="contact-back-link">&#8592; Back to home</Link>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="contact-right">

        {submitted ? (
          <div className="cf-success">
            <div className="cf-success-check">✓</div>
            <h2 className="cf-success-title">Message received.</h2>
            <p className="cf-success-body">
              I'll be in touch shortly. Looking forward to working together.
            </p>
            <Link to="/" className="cf-success-home">← Back to home</Link>
          </div>
        ) : (
          <form className="cf" onSubmit={handleSubmit} noValidate>

            <div className="cf-header">
              <div className="cf-eyebrow">New engagement</div>
              <h2 className="cf-title">Tell me about your project.</h2>
            </div>

            {/* 1 — DISCIPLINE */}
            <fieldset className="cf-fieldset">
              <legend className="cf-legend">Discipline</legend>
              <div className="cf-toggle-group">
                {DISCIPLINES.map(d => (
                  <button
                    key={d}
                    type="button"
                    className={`cf-toggle${discipline === d ? ' active' : ''}`}
                    onClick={() => handleDiscipline(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* 2 — TECHNOLOGY (conditional) */}
            {discipline && (
              <fieldset className="cf-fieldset">
                <legend className="cf-legend">Technology</legend>
                <div className="cf-chip-group">
                  {TECH_MAP[discipline].map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`cf-chip${technologies.includes(t) ? ' active' : ''}`}
                      onClick={() => toggleChip(technologies, setTech, t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* 3 — WORK TYPE */}
            <fieldset className="cf-fieldset">
              <legend className="cf-legend">Work Type</legend>
              <div className="cf-chip-group">
                {WORK_TYPES.map(w => (
                  <button
                    key={w}
                    type="button"
                    className={`cf-chip${workTypes.includes(w) ? ' active' : ''}`}
                    onClick={() => toggleChip(workTypes, setWorkTypes, w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* 4 — CONTACT FIELDS */}
            <div className="cf-fields">
              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-name">Name <span aria-hidden="true">*</span></label>
                  <input
                    id="cf-name" type="text" required
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-company">Company / Org</label>
                  <input
                    id="cf-company" type="text"
                    value={company} onChange={e => setCompany(e.target.value)}
                    placeholder="Acme Health"
                  />
                </div>
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Email <span aria-hidden="true">*</span></label>
                <input
                  id="cf-email" type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="jane@acmehealth.com"
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-message">
                  Message <span className="cf-optional">(optional)</span>
                </label>
                <textarea
                  id="cf-message" rows={4}
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Briefly describe the project or engagement…"
                />
              </div>
            </div>

            {error && (
              <p className="cf-error">Something went wrong. Please try again or email directly.</p>
            )}

            <button type="submit" className="cf-submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Message →'}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
