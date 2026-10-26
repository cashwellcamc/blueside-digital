import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const TIMELINE = [
  {
    period: '2026 – Present',
    type: 'work',
    role: 'Senior Full-Stack Developer & Consultant',
    org: 'Blueside Digital',
    location: 'Remote',
    intro: 'Deliver accessibility auditing, cloud architecture, and full-stack web solutions for clients in regulated industries, specializing in WCAG compliance, headless CMS deployments, and digital infrastructure optimization.',
    bullets: [
      'Conducted comprehensive WCAG 2.1 AA digital accessibility audits across 20+ independent healthcare practice websites ahead of HHS Section 504 enforcement deadlines, identifying critical screen reader, form labeling, and contrast failures to drive remediation strategies.',
      'Earned the DHS Trusted Tester for Web certification (July 2026), applying federal accessibility testing methodologies to help healthcare and regulated sector clients meet strict government compliance standards.',
      'Architected and built the agency\'s digital platform using a high-performance stack powered by React and Sanity Headless CMS, optimizing content delivery, accessibility, and modern component architecture.',
      'Active preparation underway for the AWS Certified Developer – Associate (DVA-C02) to expand cloud-native serverless architecture and DevOps offerings for enterprise client engagements.',
    ],
  },
  {
    period: '2025 – 2026',
    type: 'work',
    role: 'Web Platforms Lead',
    org: 'LifeNet Health',
    location: 'Richmond, Virginia · Hybrid',
    intro: 'Managed digital platform modernization and ongoing operations for a national nonprofit healthcare organization specializing in regenerative medicine and organ transplantation, overseeing a portfolio of enterprise web properties for marketing and patient/surgeon-facing logistics portals.',
    bullets: [
      'Modernized and optimized a portfolio of 11 enterprise Drupal web properties — including mission-critical, patient- and surgeon-facing logistics portals — while serving as IT governance lead for marketing stakeholders.',
      'Led a vendor development team while staying hands-on with system architecture, bug resolution, and feature delivery, establishing performance tracking systems to hold teams accountable.',
      'Digitized legacy, phone-based medical supply ordering workflows into secure, authenticated Drupal web forms integrated with USPS, FedEx, Airspace, and Markel APIs to automate time-critical healthcare supply shipping.',
      'Implemented OneTrust cookie consent and privacy management across all 11 web properties to ensure regional data compliance and privacy enforcement.',
      'Launched a new corporate marketing site on Drupal while retiring legacy e-commerce infrastructure, consolidating web property overhead and improving overall ecosystem performance.',
      'Optimized site load speeds, systematically resolved accumulated technical debt, and enhanced CRM integrations and reporting tools supporting clinical, marketing, and operational stakeholders.',
      'Rebuilt corporate Drupal CMS web property successfully with headless Payload CMS.',
    ],
  },
  {
    period: '2021 – 2025',
    type: 'work',
    role: 'Sr. Web Developer',
    org: 'minds + assembly',
    location: 'New York, New York · Remote',
    intro: 'Delivered pharmaceutical digital marketing solutions for Fortune 500 life sciences clients, specializing in MLR-compliant web applications, Veeva CRM/CLM sales enablement tools, and enterprise content management platforms for highly regulated pharmaceutical and biotech industries.',
    bullets: [
      'Shipped 30+ MLR-compliant digital assets annually including HCP websites, Veeva CLM iPad presentations, iRep modules, and interactive sales tools, achieving zero regulatory violations across strict pharmaceutical compliance reviews.',
      'Architected full-stack solutions across enterprise CMS platforms including Adobe Experience Manager (AEM), WordPress, Drupal, and Strapi, serving HCP audiences and supporting multi-million dollar pharmaceutical marketing campaigns.',
      'Developed Veeva CLM presentations and touchscreen kiosk interfaces enabling pharmaceutical sales representatives to deliver compliant, data-driven conversations with prescribers.',
      'Built responsive React/TypeScript applications with GraphQL APIs and Node.js backends, implementing optimized data caching strategies and component architecture patterns for high-performance user experiences.',
      'Collaborated with medical/legal/regulatory (MLR) teams throughout development lifecycle to ensure all digital assets met FDA promotional guidelines, medical accuracy standards, and pharmaceutical industry compliance requirements.',
      'Maintained rapid iteration cycles in a fast-paced agency environment, managing evolving project requirements and tight deadlines while ensuring code quality through Git version control and peer review.',
    ],
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
    companies: [
      {
        role: 'Computer Scientist II',
        org: 'Crown Consulting, Inc.',
        period: 'Oct 2019 – Mar 2021',
        location: 'Arlington, Virginia · Hybrid',
        intro: 'Engineered mission-critical features for a secure, FAA-serviced single-page application supporting federal aviation safety operations, under active Secret security clearance.',
        bullets: [
          'Developed six production features for an aviation safety platform used by FAA stakeholders nationwide, implementing object-oriented JavaScript (ES6+) integrated with Kendo UI, PHP (Slim Framework), Oracle SQL, and ArcGIS JavaScript APIs.',
          'Integrated ESRI geospatial services delivering advanced mapping and location-based functionality for flight operations analysis, airport safety assessments, and airspace management.',
          'Led full feature lifecycle from technical design through deployment within an Agile framework, collaborating with DBAs, QA engineers, system analysts, and government stakeholders.',
          'Ensured Section 508 accessibility compliance and federal security standards for all implementations.',
          'Utilized Git and DevOps pipelines to deliver reliable releases supporting time-sensitive federal aviation operations.',
        ],
      },
      {
        role: 'Web Developer III',
        org: 'Sentara Health',
        period: '2018 – 2019',
        location: 'Richmond, Virginia · On-site',
        intro: 'Led enterprise platform migration for a regional healthcare system serving 12 hospitals and 300+ care sites across Virginia and North Carolina.',
        bullets: [
          'Architected a custom WordPress solution replacing a proprietary Drupal vendor platform, reducing annual operational costs 40% (saving $120K+) while improving site performance 35%.',
          'Developed a HIPAA-compliant ZIP code-based plan finder tool enabling 50,000+ Medicaid patients annually to identify eligible healthcare coverage with sub-2-second response times.',
          'Hardened the security posture of the enterprise WordPress environment on LAMP stack, implementing SSL/TLS encryption, security headers, and automated vulnerability scanning for applications handling PHI.',
          'Maintained "Find a Doctor" platform serving 100,000+ monthly users across a multi-state hospital network.',
          'Automated repetitive healthcare data workflows using Python, Selenium, and Node.js, reducing manual processing time 80% for plan enrollment and form processing tasks.',
        ],
      },
      {
        role: 'Software Engineer',
        org: 'Team Carney, Inc.',
        period: 'Feb 2017 – Dec 2017',
        location: 'Alexandria, Virginia · On-site',
        intro: 'Built, integrated, and maintained Department of Homeland Security (DHS) training courses using JavaScript, XML, SQL, and Adobe solutions.',
        bullets: [
          'Ensured Section 508 compliance for all builds and LMS integrations using screen readers and accessibility testing tools.',
          'Developed SCORM-compliant learning modules with interactive elements and assessments.',
          'Collaborated with instructional designers to translate learning objectives into technical requirements.',
          'Obtained Secret Security Clearance; participated in government client meetings and provided technical consultation on e-learning best practices.',
        ],
      },
    ],
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
    companies: [
      {
        role: 'Front-End Web Developer',
        org: 'GSW, powered by Syneos Health',
        period: '2016',
        location: 'Manhattan, New York · Hybrid',
        bullets: [
          'Provided front-end development services for a pharmaceutical agency client with strict regulatory compliance requirements.',
          'Developed responsive websites and interactive content for pharmaceutical marketing campaigns.',
          'Ensured all deliverables met industry-specific guidelines and regulatory standards.',
        ],
      },
      {
        role: 'Front-End Web Developer',
        org: 'Fly Communications',
        period: '2015 – 2016',
        location: 'Manhattan, New York · On-site',
        bullets: [
          'Developed responsive websites, web applications, and email campaigns using HTML5, CSS3, JavaScript, and PHP.',
          'Managed projects with Git version control and Bitbucket for collaborative development.',
          'Integrated third-party APIs and optimized cross-platform compatibility across desktop, tablet, and mobile devices.',
          'Collaborated with designers on pixel-perfect front-end interfaces; conducted performance optimization and cross-browser testing.',
        ],
      },
      {
        role: 'Full Stack Web Developer',
        org: 'Aquent',
        period: '2013 – 2015',
        location: 'Los Angeles, California · On-site',
        bullets: [
          'Developed a custom, mobile-first CMS for Toyota using PHP, MySQL, JavaScript, and D3.js for data visualization.',
          'Built custom WordPress themes and plugins; implemented responsive design and optimized performance for high-traffic enterprise environments.',
          'Created interactive dashboards and reporting tools using D3.js for data-driven decision making.',
          'Built e-commerce websites using the .NET framework with jQuery/AJAX; implemented A/B testing via Optimizely to improve conversion rates.',
          'Integrated payment gateways and third-party APIs; collaborated with marketing teams to implement analytics tracking.',
        ],
      },
      {
        role: 'Front-End Web Developer',
        org: 'JUICE Pharma Worldwide',
        period: 'Jun 2012 – Dec 2012',
        location: 'Manhattan, New York · On-site',
        bullets: [
          'Developed compliant marketing materials and promotional websites adhering to pharmaceutical industry regulations.',
          'Implemented responsive design patterns and cross-browser compatibility.',
          'Collaborated with copywriters and designers to create engaging, regulation-compliant user experiences.',
        ],
      },
      {
        role: 'Web Producer',
        org: 'Penguin Random House',
        period: '2011 – 2012',
        location: 'Manhattan, New York · On-site',
        bullets: [
          'Developed and maintained high-traffic web properties for Crown Publishing Group and Random House, Inc.',
          'Implemented Google Analytics tracking and generated performance reports for stakeholder review.',
          'Created landing pages, promotional websites, and WordPress sites using JavaScript, HTML, and CSS3.',
          'Managed HTML email campaigns for book launches and author promotions; optimized performance during traffic spikes.',
        ],
      },
    ],
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
  const [expanded, setExpanded] = useState(new Set());

  const toggle = (i) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

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
          {TIMELINE.map(({ period, type, role, org, location, detail, intro, bullets, companies }, i) => {
            const hasDetail = !!(intro || bullets?.length || companies?.length);
            const isOpen    = expanded.has(i);

            return (
              <div key={i} className={`tl-item tl-item--${type}`}>
                <div className="tl-content">

                  {hasDetail ? (
                    <button
                      className={`tl-header${isOpen ? ' open' : ''}`}
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`tl-panel-${i}`}
                    >
                      <span className="tl-period">{period}</span>
                      <span className={`tl-type-badge tl-type-badge--${type}`}>
                        {type === 'education' ? 'Education' : 'Experience'}
                      </span>
                      <span className="tl-role">{role}</span>
                      <span className="tl-org">{org}</span>
                      {location && <span className="tl-location">{location}</span>}
                      {detail   && <span className="tl-detail">{detail}</span>}
                      <span className="tl-chevron" aria-hidden="true" />
                    </button>
                  ) : (
                    <>
                      <span className="tl-period">{period}</span>
                      <span className={`tl-type-badge tl-type-badge--${type}`}>
                        {type === 'education' ? 'Education' : 'Experience'}
                      </span>
                      <span className="tl-role">{role}</span>
                      <span className="tl-org">{org}</span>
                      {location && <span className="tl-location">{location}</span>}
                      {detail   && <span className="tl-detail">{detail}</span>}
                    </>
                  )}

                  {hasDetail && (
                    <div
                      className={`tl-detail-panel${isOpen ? ' open' : ''}`}
                      id={`tl-panel-${i}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="tl-detail-inner">
                        {intro && <p className="tl-intro">{intro}</p>}

                        {bullets?.length > 0 && (
                          <ul className="tl-bullets">
                            {bullets.map((b, j) => <li key={j}>{b}</li>)}
                          </ul>
                        )}

                        {companies?.length > 0 && (
                          <div className="tl-companies">
                            {companies.map((c, j) => (
                              <div key={j} className="tl-company">
                                <div className="tl-company-header">
                                  <p className="tl-company-role">{c.role}</p>
                                  <p className="tl-company-org">{c.org}</p>
                                  <div className="tl-company-meta">
                                    {c.period   && <span className="tl-company-period">{c.period}</span>}
                                    {c.location && <span className="tl-company-location">{c.location}</span>}
                                  </div>
                                </div>
                                {c.intro && <p className="tl-intro">{c.intro}</p>}
                                {c.bullets?.length > 0 && (
                                  <ul className="tl-bullets">
                                    {c.bullets.map((b, k) => <li key={k}>{b}</li>)}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
