import { Link } from 'react-router-dom';
import './CaseStudiesPage.css';

const CASE_STUDIES = [
  {
    id: 1,
    label: 'Healthcare & ADA Compliance',
    title: 'Independent Healthcare Practice ADA Accessibility Audit',
    period: 'April – May 2026',
    summary: 'A WCAG 2.1 AA accessibility audit across more than 20 independent healthcare practice websites. Findings revealed an average AIM score of 4.5 out of 10, with critical failures in screen reader compatibility, form labeling, contrast, and keyboard navigation — all ahead of the HHS Section 504 enforcement deadline.',
    tags: ['WCAG 2.1 AA', 'Section 504', 'Healthcare', 'ADA Compliance', 'Accessibility Audit'],
    pdf: '/doc/blueside-case-study.pdf',
    file: '/doc/blueside-case-study-full.docx',
    fileLabel: 'Download Full Case Study (.docx)',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="cs-shell">
      <header className="blog-header">
        <Link to="/" className="blog-back">&#8592; Back</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main">Blue<span>side</span> Digital</span>
          <span className="blog-wordmark-sub">Case Studies</span>
        </div>
      </header>

      <main className="cs-main">
        {CASE_STUDIES.map(({ id, label, title, period, summary, tags, pdf, file, fileLabel }) => (
          <article key={id} className="cs-card">
            <div className="cs-card-meta">
              <span className="cs-num">{String(id).padStart(2, '0')}</span>
              <span className="cs-label">{label}</span>
              <span className="cs-period">{period}</span>
            </div>

            <h2 className="cs-title">{title}</h2>

            <p className="cs-summary">{summary}</p>

            <div className="cs-tags">
              {tags.map(t => <span key={t} className="cs-tag">{t}</span>)}
            </div>

            <div className="cs-actions">
              {pdf && (
                <a className="cs-download cs-download--pdf" href={pdf} target="_blank" rel="noreferrer">
                  <span className="cs-download-icon">&#128196;</span>
                  View PDF
                </a>
              )}
              <a className="cs-download cs-download--doc" href={file} download>
                <span className="cs-download-icon">&#8659;</span>
                {fileLabel}
              </a>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
