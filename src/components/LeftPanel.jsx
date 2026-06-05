import { Link } from 'react-router-dom';

export default function LeftPanel() {
  return (
    <div className="left">
      <div className="wordmark">
        <div className="wordmark-main">
          Blue<span>side</span>
          <br />
          Digital
        </div>
        <div className="wordmark-sub">Independent Consulting</div>
      </div>

      <div className="divider" />

      <p className="tagline">
        Senior-level digital expertise for healthcare, pharma, federal, and beyond.
      </p>

      <div className="contact-block">
        <div className="contact-label">Get in touch</div>
        <Link to="/contact" className="cta-ghost">Let's Work Together →</Link>
      </div>

      <div className="contact-block" style={{ marginTop: '1.2rem' }}>
        <div className="contact-label">Writing</div>
        <Link className="contact-link" to="/blog">Articles &amp; Insights</Link>
      </div>

      <div className="contact-block" style={{ marginTop: '0.8rem' }}>
        <div className="contact-label">Work</div>
        <Link className="contact-link" to="/case-studies">Case Studies</Link>
      </div>

      <div className="availability">
        <span className="dot" />
        Available for new engagements
      </div>
    </div>
  );
}
