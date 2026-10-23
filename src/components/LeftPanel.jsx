import { Link } from 'react-router-dom';

export default function LeftPanel() {
  return (
    <div className="left" role="banner">
      <div className="wordmark">
        <h1 className="wordmark-main">
          Blue<span>side</span>
          <br />
          Digital
        </h1>
        <div className="wordmark-sub">Independent Consulting</div>
      </div>

      <div className="divider" />

      <p className="tagline">
        Senior-level digital expertise for healthcare, pharma, federal, and beyond.
      </p>

      <div className="contact-block">
        <div className="contact-label">Get in touch</div>
        <Link to="/contact" className="cta-ghost">
          Let's Work Together <span aria-hidden="true">→</span>
        </Link>
      </div>

      <nav aria-label="Main navigation">
        <div className="contact-block" style={{ marginTop: '1.2rem' }}>
          <div className="contact-label">Writing</div>
          <Link className="contact-link" to="/blog">Articles &amp; Insights</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <div className="contact-label">Work</div>
          <Link className="contact-link" to="/case-studies">Case Studies</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <div className="contact-label">Portfolio</div>
          <Link className="contact-link" to="/portfolio">Selected Projects</Link>
        </div>

        <div className="contact-block" style={{ marginTop: '0.8rem' }}>
          <div className="contact-label">Clients</div>
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
