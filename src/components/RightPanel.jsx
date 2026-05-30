/* ── Inline SVG icons for items devicons can't cover ── */

const AdobeIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'block' }}>
    <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm14.232 0h-8.884L22 22.624z" />
  </svg>
);

// Angle-bracket code icon < > — symmetric, universally read as "code / API / headless"
const HeadlessIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'block' }}>
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </svg>
);

const TECH_STACK = [
  {
    category: 'CMS',
    items: [
      { name: 'WordPress',   cls: 'devicon-wordpress-plain' },
      { name: 'Drupal',      cls: 'devicon-drupal-plain' },
      { name: 'Headless',    icon: <HeadlessIcon /> },
      { name: 'Adobe AEM',   icon: <AdobeIcon /> },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React',       cls: 'devicon-react-original' },
      { name: 'TypeScript',  cls: 'devicon-typescript-plain' },
      { name: 'JavaScript',  cls: 'devicon-javascript-plain' },
      { name: 'HTML5',       cls: 'devicon-html5-plain' },
      { name: 'Sass',        cls: 'devicon-sass-original' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'PHP',         cls: 'devicon-php-plain' },
      { name: 'Node.js',     cls: 'devicon-nodejs-plain' },
      { name: 'Python',      cls: 'devicon-python-plain' },
      { name: 'MySQL',       cls: 'devicon-mysql-plain' },
      { name: 'AWS',         cls: 'devicon-amazonwebservices-plain' },
    ],
  },
];

// All icons use unicode text symbols (not emoji) so CSS color: white applies uniformly
const SERVICES = [
  {
    icon: '⊕',
    title: 'Section 508 & WCAG',
    desc: 'Full audits, remediation & WAVE-verified delivery for ADA-mandated standards.',
  },
  {
    icon: '✚',
    title: 'Healthcare & Pharma',
    desc: 'Veeva CRM, patient portals & regulated HCP digital platforms.',
  },
  {
    icon: '★',
    title: 'Federal & Government',
    desc: 'Trusted Tester-aligned delivery for DHS, federal agencies & civic tech.',
  },
  {
    icon: '⚙',
    title: 'Maintenance Plans',
    desc: 'Monthly retainers: CMS updates, security patches, uptime monitoring & content support.',
    highlight: true,
  },
  {
    icon: '◈',
    title: 'Analytics & MarTech',
    desc: 'GA4, GTM, Adobe Analytics, Salesforce & HubSpot integrations and implementations.',
  },
  {
    icon: 'λ',
    title: 'Serverless & APIs',
    desc: 'Lambda, API Gateway & scalable Node/PHP back-end infrastructure.',
  },
];

export default function RightPanel() {
  return (
    <div className="right">
      <svg
        className="wave-bg"
        width="520"
        height="420"
        viewBox="0 0 520 420"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-40 200 Q 60 100 160 200 Q 260 300 360 200 Q 460 100 560 200" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-40 240 Q 60 140 160 240 Q 260 340 360 240 Q 460 140 560 240" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-40 280 Q 60 180 160 280 Q 260 380 360 280 Q 460 180 560 280" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-40 320 Q 60 220 160 320 Q 260 420 360 320 Q 460 220 560 320" stroke="white" strokeWidth="2" fill="none" />
      </svg>

      <div className="right-inner">
        <div className="eyebrow">Full-Stack Digital Consulting · 13+ Years</div>
        <h2 className="right-heading">Precision work where it matters most.</h2>

        <section className="tech-section" aria-label="Technology stack">
          {TECH_STACK.map(({ category, items }) => (
            <div key={category} className="tech-row">
              <span className="tech-cat">{category}</span>
              <div className="tech-icons">
                {items.map(({ name, cls, icon }) => (
                  <div key={name} className="tech-item">
                    {icon ?? <i className={cls} aria-hidden="true" />}
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="services-grid" role="list">
          {SERVICES.map(({ icon, title, desc, highlight }) => (
            <div
              key={title}
              className={`service-card${highlight ? ' highlight' : ''}`}
              role="listitem"
            >
              <span className="service-icon" aria-hidden="true">{icon}</span>
              <div className="service-title">{title}</div>
              <div className="service-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
