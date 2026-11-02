import BrandLogo from '../components/BrandLogo';
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { client, writeClient, ARTICLE_BY_SLUG_QUERY, RELATED_ARTICLES_QUERY, LATEST_ARTICLES_QUERY, imgUrl } from '../lib/sanity.js';
import { TOPIC_STYLES, TOPIC_STYLE_DEFAULT, getPrimaryTopic } from '../lib/topics.js';
import './BlogPage.css';

const LANG_LABELS = {
  javascript: 'JavaScript', typescript: 'TypeScript', jsx: 'JSX', tsx: 'TSX',
  html: 'HTML', css: 'CSS', scss: 'SCSS', json: 'JSON',
  php: 'PHP', python: 'Python', bash: 'Bash', xml: 'XML', text: 'Plain Text',
};

const SITE = 'https://bluesidedigital.com';

function setMeta(selector, attr, value) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const match = selector.match(/\[(\w[\w:.-]*)=["']([^"']+)["']\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function sanityTwitterImg(url) {
  if (!url) return null;
  const base = url.split('?')[0];
  return `${base}?w=1200&h=630&fit=crop&auto=format&fm=jpg`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const ptComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children, value }) => {
      const text = value.children?.map(c => c.text).join('') || '';
      return <h2 id={slugify(text)}>{children}</h2>;
    },
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="blog-list blog-list--bullet">{children}</ul>,
    number: ({ children }) => <ol className="blog-list blog-list--number">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="blog-list-item">{children}</li>,
    number: ({ children }) => <li className="blog-list-item">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,
    code:   ({ children }) => <code className="blog-inline-code">{children}</code>,
    link:   ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noreferrer noopener">{children}</a>
    ),
  },
  types: {
    image: ({ value }) => (
      <img src={value.asset?.url} alt={value.alt || ''} style={{ maxWidth: '100%', borderRadius: '4px', margin: '1em 0' }} />
    ),
    code: ({ value }) => (
      <div className="blog-code-block">
        <div className="blog-code-header">
          <span className="blog-code-dots"><span /><span /><span /></span>
          <span className="blog-code-lang">
            {value.filename || LANG_LABELS[value.language] || value.language || 'Code'}
          </span>
        </div>
        <SyntaxHighlighter
          language={value.language || 'text'}
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: '0 0 10px 10px', fontSize: '0.84rem', lineHeight: '1.65', padding: '1.2rem 1.4rem' }}
          showLineNumbers={value.code?.split('\n').length > 4}
          lineNumberStyle={{ opacity: 0.35, userSelect: 'none', minWidth: '2.5em' }}
        >
          {value.code || ''}
        </SyntaxHighlighter>
      </div>
    ),
  },
};

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const AvatarIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id={`av-clip-${size}`}>
        <rect width="200" height="200" rx="44" ry="44"/>
      </clipPath>
    </defs>
    <g clipPath={`url(#av-clip-${size})`}>
      <rect width="100" height="200" fill="#ffffff"/>
      <rect x="100" width="100" height="200" fill="#1769dc"/>
      <text x="50" y="100" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="34" fill="#102b50">blue</text>
      <text x="150" y="100" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="34" fill="#ffffff">side</text>
    </g>
  </svg>
);

function buildShareUrl(platform, title, slug) {
  const url  = encodeURIComponent(`${SITE}/blog/${slug}`);
  const text = encodeURIComponent(title);
  if (platform === 'x')        return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  if (platform === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
}

function openShare(href) {
  window.open(href, '_blank', 'width=600,height=420,noopener,noreferrer');
}

function RelatedCard({ article }) {
  const cover = article.previewImage || article.mainImage;
  const primaryTopic = getPrimaryTopic(article.tags);
  const topicStyle = TOPIC_STYLES[primaryTopic] ?? TOPIC_STYLE_DEFAULT;
  const label = primaryTopic || 'Article';
  return (
    <article className="related-card" aria-labelledby={`related-${article._id}`}>
      <div className="related-card-cover" aria-hidden="true">
        {cover ? (
          <>
            <img src={imgUrl(cover, { w: 600 })} alt="" loading="lazy" decoding="async" />
            <div className="related-card-overlay" style={{ '--card-accent': topicStyle.accent }}>
              <span className="related-card-label">{label}</span>
            </div>
          </>
        ) : (
          <div className="related-card-typo" style={{ '--card-accent': topicStyle.accent }}>
            <span className="related-card-label">{label}</span>
          </div>
        )}
      </div>
      <div className="related-card-body">
        {article.publishedAt && (
          <time className="blog-article-date" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        )}
        <h3 id={`related-${article._id}`} className="related-card-title">
          <Link to={`/blog/${article.slug}`} className="related-card-link">{article.title}</Link>
        </h3>
      </div>
    </article>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [related, setRelated]   = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState('');

  // Reading progress bar
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch article + increment view count
  useEffect(() => {
    client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
      .then(data => {
        setArticle(data);
        setLoading(false);
        if (writeClient && data?._id) {
          writeClient.patch(data._id).setIfMissing({ viewCount: 0 }).inc({ viewCount: 1 }).commit().catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // Fetch related articles after main article loads
  useEffect(() => {
    if (!article) return;
    const tags = article.tags || [];
    if (tags.length === 0) {
      client.fetch(LATEST_ARTICLES_QUERY, { slug }).then(setRelated).catch(() => {});
      return;
    }
    client.fetch(RELATED_ARTICLES_QUERY, { slug, tags })
      .then(data => {
        if (data.length > 0) { setRelated(data); return; }
        client.fetch(LATEST_ARTICLES_QUERY, { slug }).then(setRelated).catch(() => {});
      })
      .catch(() => {});
  }, [article, slug]);

  // SEO meta
  useEffect(() => {
    if (!article) return;
    const url   = `${SITE}/blog/${article.slug}`;
    const title = `${article.title} | Blueside Digital`;
    const desc  = article.body
      ? article.body.filter(b => b._type === 'block' && b.children)
          .map(b => b.children.map(c => c.text).join('')).join(' ').trim().slice(0, 160)
      : '';

    document.title = title;
    setMeta('meta[name="description"]',          'content', desc);
    setMeta('meta[property="og:title"]',         'content', title);
    setMeta('meta[property="og:description"]',   'content', desc);
    setMeta('meta[property="og:url"]',           'content', url);
    setMeta('meta[property="og:type"]',          'content', 'article');
    setMeta('meta[name="twitter:title"]',        'content', title);
    setMeta('meta[name="twitter:description"]',  'content', desc);
    if (article.publishedAt) {
      setMeta('meta[property="article:published_time"]', 'content', article.publishedAt);
    }
    const ogImg = sanityTwitterImg(article.mainImage);
    if (ogImg) {
      setMeta('meta[property="og:image"]',       'content', ogImg);
      setMeta('meta[property="og:image:width"]', 'content', '1200');
      setMeta('meta[property="og:image:height"]','content', '630');
      setMeta('meta[name="twitter:image"]',      'content', ogImg);
      setMeta('meta[name="twitter:card"]',       'content', 'summary_large_image');
    }
    return () => {
      document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting';
      setMeta('meta[name="description"]',        'content', 'Senior-level digital consulting specializing in WCAG 2.1 AA audits, Section 504/508 compliance, and ADA accessibility for healthcare organizations.');
      setMeta('meta[property="og:title"]',       'content', 'Blueside Digital | WCAG & ADA Accessibility Consulting');
      setMeta('meta[property="og:description"]', 'content', 'Senior-level digital consulting specializing in WCAG 2.1 AA audits, Section 504/508 compliance, and ADA accessibility for healthcare organizations.');
      setMeta('meta[property="og:url"]',         'content', `${SITE}/`);
      setMeta('meta[property="og:type"]',        'content', 'website');
      setMeta('meta[name="twitter:card"]',       'content', 'summary');
    };
  }, [article]);

  // Extract H2 headings for ToC
  const tocHeadings = useMemo(() => {
    if (!article?.body) return [];
    return article.body
      .filter(b => b._type === 'block' && b.style === 'h2')
      .map(b => {
        const text = b.children?.map(c => c.text).join('') || '';
        return { text, id: slugify(text) };
      })
      .filter(h => h.text);
  }, [article]);

  // IntersectionObserver for ToC active state
  useEffect(() => {
    if (tocHeadings.length < 3) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-10% 0% -80% 0%', threshold: 0 }
    );
    tocHeadings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocHeadings]);

  // Reading time
  const readingTime = useMemo(() => {
    if (!article?.body) return null;
    const words = article.body
      .filter(b => b._type === 'block' && b.children)
      .flatMap(b => b.children.map(c => c.text))
      .join(' ')
      .split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [article]);

  const primaryTopic  = useMemo(() => getPrimaryTopic(article?.tags), [article]);
  const topicStyle    = TOPIC_STYLES[primaryTopic] ?? TOPIC_STYLE_DEFAULT;
  const hasToc        = tocHeadings.length >= 3;

  const formattedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="blog-shell">
      {/* Reading progress bar */}
      <div
        className="article-progress"
        role="progressbar"
        aria-hidden="true"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ '--progress': `${progress}%` }}
      />

      <header className="blog-header">
        <Link to="/blog" className="blog-back">&#8592; Articles</Link>
        <div className="blog-header-brand">
          <BrandLogo small />
          <span className="blog-header-divider" aria-hidden="true" />
          <span className="blog-header-title">Articles &amp; Insights</span>
        </div>
      </header>

      <main className="blog-main blog-main--article">
        {loading && <div className="blog-loading" aria-live="polite">Loading…</div>}

        {!loading && !article && (
          <div className="blog-empty" role="alert">Article not found. <Link to="/blog">← Back to articles</Link></div>
        )}

        {article && (
          <article className="blog-article" aria-labelledby="article-title">

            {/* ToC + content grid */}
            <div className={`article-outer-grid${hasToc ? ' article-outer-grid--toc' : ''}`}>

              {/* ToC: ≥1400px, ≥3 H2s */}
              {hasToc && (
                <nav className="article-toc" aria-label="On this page">
                  <p className="article-toc-heading">On this page</p>
                  <ul className="article-toc-list">
                    {tocHeadings.map(h => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className={`article-toc-link${activeId === h.id ? ' active' : ''}`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="article-content">
                <h1 id="article-title" className="blog-article-title">{article.title}</h1>

                {/* Byline row */}
                <div className="article-byline-row">
                  <div className="article-byline-left">
                    <span className="article-byline-meta">
                      {formattedDate && (
                        <time dateTime={article.publishedAt}>{formattedDate}</time>
                      )}
                      {formattedDate && readingTime && <span className="article-byline-dot" aria-hidden="true">·</span>}
                      {readingTime && <span>{readingTime} min read</span>}
                      {(formattedDate || readingTime) && primaryTopic && <span className="article-byline-dot" aria-hidden="true">·</span>}
                      {primaryTopic && (
                        <span className="article-topic-pill" style={{ '--pill-color': topicStyle.accent }}>
                          {primaryTopic}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="article-byline-share" role="group" aria-label="Share this article">
                    <button
                      type="button"
                      className="blog-share-btn blog-share-btn--x"
                      onClick={() => openShare(buildShareUrl('x', article.title, article.slug))}
                      aria-label="Share on X (Twitter)"
                    >
                      <XIcon /> X
                    </button>
                    <button
                      type="button"
                      className="blog-share-btn blog-share-btn--li"
                      onClick={() => openShare(buildShareUrl('linkedin', article.title, article.slug))}
                      aria-label="Share on LinkedIn"
                    >
                      <LinkedInIcon /> LinkedIn
                    </button>
                  </div>
                </div>
                <div className="article-byline-divider" aria-hidden="true" />

                {/* Hero image */}
                {article.mainImage && (
                  <div className="blog-article-image">
                    <img src={imgUrl(article.mainImage, { w: 1400 })} alt="" decoding="async" />
                  </div>
                )}

                <div className="blog-article-body">
                  {article.body && <PortableText value={article.body} components={ptComponents} />}
                  {article.tags?.length > 0 && (
                    <p className="blog-tags">{article.tags.map(t => `#${t}`).join(' ')}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Article footer */}
            <footer className="article-footer">
              <div className="article-footer-inner">

                {/* Author bio */}
                <div className="article-footer-bio">
                  <div className="article-footer-bio-text">
                    <p className="article-footer-bio-name">Cameron Cashwell</p>
                    <p className="article-footer-bio-desc">
                      Independent digital consultant specializing in WCAG 2.1 AA accessibility, Section 504/508 compliance,
                      and full-stack web development for healthcare, pharma, and federal organizations.
                    </p>
                    <Link to="/contact" className="article-footer-bio-link">Get in touch →</Link>
                  </div>
                </div>

                {/* Topic CTA */}
                {primaryTopic && (
                  <div className="article-footer-cta">
                    <p className="article-footer-cta-text">
                      Need help with <strong>{primaryTopic}</strong>?
                    </p>
                    <Link to="/contact" className="article-footer-cta-btn">Let's work together →</Link>
                  </div>
                )}

                {/* Related articles */}
                {related.length > 0 && (
                  <div className="article-footer-related">
                    <h2 className="article-footer-related-title">More articles</h2>
                    <div className="article-footer-related-grid">
                      {related.map(a => <RelatedCard key={a._id} article={a} />)}
                    </div>
                  </div>
                )}

              </div>
            </footer>
          </article>
        )}
      </main>
    </div>
  );
}
