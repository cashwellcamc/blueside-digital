import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const TIMELINE = [
  {
    period: '2026 – Present',
    type: 'work',
    role: 'Founder & Principal Consultant',
    org: 'Blueside Digital',
    detail: 'Independent consulting practice — web accessibility, WCAG 2.1 AA, Section 504/508 compliance, and full-stack digital work for healthcare, pharma, and federal organizations.',
  },
  {
    period: '2025 – 2026',
    type: 'work',
    role: 'Web Platforms Lead',
    org: 'Healthcare',
    detail: null,
  },
  {
    period: '2021 – 2025',
    type: 'work',
    role: 'Senior Web Developer',
    org: 'Pharma Digital Agency',
    detail: null,
  },
  {
    period: '2021',
    type: 'education',
    role: 'Master of Science, Enterprise Application Development',
    org: 'Aspen University',
    detail: 'Information Systems Technology',
  },
  {
    period: '2017 – 2021',
    type: 'work',
    role: 'Healthcare & Government Software Developer',
    org: 'Virginia',
    detail: null,
  },
  {
    period: '2018',
    type: 'education',
    role: "Bachelor's in Web Technologies",
    org: 'Bellevue University',
    detail: null,
  },
  {
    period: '2011 – 2017',
    type: 'work',
    role: 'Front-End Web Developer',
    org: 'Marketing · Advertising · Publishing & Pharma',
    detail: 'New York City',
  },
  {
    period: '2008 – 2011',
    type: 'education',
    role: 'Associate of Applied Sciences, Internet Applications Development',
    org: 'Reynolds College',
    detail: 'Information Systems Technology',
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About | Blueside Digital';
    return () => { document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting'; };
  }, []);

  return (
    <div className="about-shell">
      <header className="blog-header">
        <Link to="/" className="blog-back">&#8592; Back</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main" aria-hidden="true">Blue<span>side</span> Digital</span>
          <h1 className="blog-wordmark-sub">About</h1>
        </div>
      </header>

      <main className="about-main">
        <div className="about-intro">
          <h2 className="about-intro-name">Cameron Cashwell</h2>
          <p className="about-intro-bio">
            15+ years of hands-on digital work building, leading, and auditing web platforms
            across healthcare, pharma, federal government, and advertising. DHS Trusted Tester
            certified. Independent consultant through Blueside Digital since 2026.
          </p>
        </div>

        <div className="about-timeline" aria-label="Career timeline">
          {TIMELINE.map(({ period, type, role, org, detail }, i) => (
            <div
              key={i}
              className={`tl-item tl-item--${type}`}
              aria-label={`${period}: ${role} at ${org}`}
            >
              <div className="tl-content">
                <span className="tl-period">{period}</span>
                <span className={`tl-type-badge tl-type-badge--${type}`}>
                  {type === 'education' ? 'Education' : 'Experience'}
                </span>
                <p className="tl-role">{role}</p>
                <p className="tl-org">{org}</p>
                {detail && <p className="tl-detail">{detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
