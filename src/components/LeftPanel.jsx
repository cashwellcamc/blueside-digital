import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function LeftPanel() {
  return (
    <div className="left" role="banner">
      <div className="wordmark">
        <BrandLogo />
        <div className="wordmark-sub">Independent consulting</div>
      </div>

      <div className="divider" />

      <p className="tagline">
        Senior-level digital expertise for healthcare, pharma, federal, and beyond.
      </p>

      <div className="contact-block">
        <Link to="/contact" className="cta-ghost">
          Let's Work Together <span aria-hidden="true">→</span>
        </Link>
      </div>

      <nav aria-label="Main navigation">
        <div className="contact-block" style={{ marginTop: '1.2rem' }}>
          <Link className="contact-link" to="/blog">Articles &amp; Insights</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <Link className="contact-link" to="/case-studies">Case Studies</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <Link className="contact-link" to="/portfolio">Selected Projects</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <Link className="contact-link" to="/about">Background &amp; Experience</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <span className="contact-link contact-link--disabled" aria-disabled="true">Login</span>
        </div>
      </nav>

      <div className="availability">
        <span className="dot" aria-hidden="true" />
        Available for new engagements
      </div>

    </div>
  );
}
