import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PortfolioPage.css';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Traceable Clinical Summary',
    tags: ['React', 'WCAG 2.1 AA', 'Healthcare', 'AI / LLM', 'Accessibility', 'GitHub Actions'],
    thumb: 'https://raw.githubusercontent.com/cashwellcamc/traceable-clinical-summary/main/docs/screenshot.png',
    thumbAlt: 'Traceable Clinical Summary — interactive citation UI for AI-generated clinical summaries',
    sections: [
      {
        label: 'What It Is',
        body: 'A front-end prototype demonstrating a UI pattern for displaying AI-generated clinical summaries in healthcare settings. The core design problem it addresses is trust: when an AI model synthesizes a patient\'s medical history, clinicians need to be able to verify every claim against its source before acting on it. The app shows a summary paragraph where each factual statement carries an inline citation that, when clicked, expands the exact source document excerpt that supports it — progress notes, discharge summaries, echocardiography reports, medication reconciliations. A clinician can read the AI output and trace every sentence back to the record it came from, then formally mark the summary as reviewed with their name and timestamp logged.',
      },
      {
        label: 'Problem',
        body: 'Most AI summary UIs present generated text as a black box — you get the output but no path back to the evidence. In regulated or high-stakes environments that is a non-starter. This project prototyped an answer: structured citation output from the model, rendered as interactive inline links, with a citation integrity check that fails the build if any citation references a nonexistent source or any source goes uncited. The review workflow adds an explicit human-in-the-loop checkpoint, making the AI\'s role clear to anyone reading the record.',
      },
      {
        label: 'Solution',
        body: 'The final pass brought the project to a level appropriate for professional portfolio use. All references to real healthcare organizations were scrubbed and replaced with fictional stand-ins. The app was brought to WCAG 2.1 AA compliance: contrast ratios were measured and corrected, semantic violations on interactive elements were fixed, a live announcement region was added for screen reader users, and the layout was verified to reflow at 320px with no horizontal scroll and to respect reduced-motion preferences. The Gemini API key was removed from the production build entirely — the deployed demo always serves pre-generated example data with no credentials exposed in the public bundle. An automated test suite was added covering axe accessibility at three page states, full keyboard operability, and citation integrity, all wired into the GitHub Actions deploy pipeline so the site cannot ship if any check fails. The README documents the patterns, the stack, the accessibility verification approach, and the author\'s DHS Trusted Tester certification.',
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
    </div>
  );
}
