import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PortfolioPage.css';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Traceable Clinical Summary',
    tags: ['React', 'TypeScript', 'Vercel', 'Google Gemini', 'WCAG 2.1 AA', 'Playwright', 'Vitest', 'GitHub Actions', 'Healthcare'],
    thumb: 'https://raw.githubusercontent.com/cashwellcamc/traceable-clinical-summary/main/docs/screenshot.png?v=2',
    thumbAlt: 'Traceable Clinical Summary — interactive citation UI for AI-generated clinical summaries',
    sections: [
      {
        label: 'What It Is',
        body: 'A full-stack prototype demonstrating a UI pattern for presenting AI-generated clinical summaries in a way that is traceable, verifiable, and accessible. The core problem it solves is trust: when an AI model synthesizes a patient\'s medical history, every claim needs a path back to the source document that supports it. The app renders an AI-generated summary where each factual statement carries an inline citation that, when clicked, expands the exact source excerpt — progress notes, discharge summaries, echocardiograms, medication reconciliations. A clinician can read the output, verify every sentence against its source record, and formally mark the summary as reviewed with name and timestamp logged.',
      },
      {
        label: 'What Was Built',
        body: 'The frontend is React with TypeScript, deployed to GitHub Pages. The AI layer is a Vercel serverless function that calls Google Gemini and returns structured JSON with citation IDs — the API key lives server-side and never touches the browser bundle. The model is prompted to return every factual claim as a cited segment with a sourceId that resolves to one of the provided source documents. A build-time Vitest test enforces citation integrity — the deploy fails if any citation references a nonexistent source or any source goes uncited.',
      },
      {
        label: 'How It Was Hardened',
        body: 'All references to real healthcare organizations were replaced with fictional stand-ins. The app was brought to WCAG 2.1 AA compliance: contrast ratios were corrected, a semantic violation on interactive buttons was fixed, a live announcement region was added for screen reader users, and the layout was verified to reflow at 320px and respect reduced-motion preferences. Seven Playwright tests cover axe accessibility across three page states and full keyboard operability of every interactive element. Both test suites are wired into the GitHub Actions deploy pipeline — nothing ships if a test fails. The README documents the patterns, the stack, the accessibility verification approach, and the author\'s DHS Trusted Tester certification.',
      },
    ],
    links: [
      { label: 'Live Demo', href: 'https://cashwellcamc.github.io/traceable-clinical-summary', external: true },
      { label: 'View Repo', href: 'https://github.com/cashwellcamc/traceable-clinical-summary', external: true, ghost: true },
    ],
  },
];

export default function PortfolioPage() {
  useEffect(() => {
    document.title = 'Portfolio | Blueside Digital';
    return () => { document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting'; };
  }, []);

  return (
    <div className="pf-shell">
      <header className="blog-header">
        <Link to="/" className="blog-back">&#8592; Back</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main" aria-hidden="true">Blue<span>side</span> Digital</span>
          <h1 className="blog-wordmark-sub">Portfolio</h1>
        </div>
      </header>

      <main className="pf-main">
        <div className="pf-grid">
          {PORTFOLIO_ITEMS.map(({ id, title, tags, thumb, thumbAlt, sections, links }) => (
            <article key={id} className="pf-card">
              <h2 className="pf-card-title">{title}</h2>

              <div className="pf-thumb" role="img" aria-label={thumbAlt}>
                {thumb
                  ? <img src={thumb} alt={thumbAlt} />
                  : <span className="pf-thumb-placeholder" aria-hidden="true" />
                }
              </div>

              <div className="pf-tags">
                {tags.map(t => <span key={t} className="pf-tag">{t}</span>)}
              </div>

              {sections.map(({ label, body }) => (
                <div key={label} className="pf-section">
                  <h3 className="pf-section-label">{label}</h3>
                  <p className="pf-section-body">{body}</p>
                </div>
              ))}

              {links && (
                <div className="pf-actions">
                  {links.map(({ label, href, external, ghost }) => (
                    <a
                      key={label}
                      className={`pf-link${ghost ? ' pf-link--ghost' : ''}`}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={`${label}${external ? ' (opens in new tab)' : ''}`}
                    >
                      {label} {external && <span aria-hidden="true">↗</span>}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
      <footer className="page-footer">© {new Date().getFullYear()} Blueside Digital. All rights reserved.</footer>
    </div>
  );
}
