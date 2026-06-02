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
        <a className="contact-link" href="mailto:cashwell.digital@gmail.com">
          cashwell.digital@gmail.com
        </a>
      </div>

      <div className="contact-block" style={{ marginTop: '1.2rem' }}>
        <div className="contact-label">Writing</div>
        <a className="contact-link" href="#/blog">
          Articles &amp; Insights
        </a>
      </div>

      <div className="contact-block" style={{ marginTop: '0.8rem' }}>
        <div className="contact-label">Work</div>
        <a className="contact-link" href="#/case-studies">
          Case Studies
        </a>
      </div>

      <div className="availability">
        <span className="dot" />
        Available for new engagements
      </div>
    </div>
  );
}
