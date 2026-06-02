import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client, ARTICLES_QUERY } from '../lib/sanity.js';
import './BlogPage.css';

/* ─── PORTABLE TEXT COMPONENTS ──────────────────────────────────────────── */
const ptComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3:     ({ children }) => <h3>{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,
    link:   ({ value, children }) => (
      <a href={value.href} target={value.blank ? '_blank' : '_self'} rel="noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <img src={value.asset?.url} alt={value.alt || ''} style={{ maxWidth: '100%', borderRadius: '4px', margin: '1em 0' }} />
    ),
  },
};

/* ─── FALLBACK PLACEHOLDER ───────────────────────────────────────────────── */
const Placeholder = () => (
  <div className="blog-article-image-placeholder" aria-hidden="true">
    <div className="blog-placeholder-grid">
      {Array.from({ length: 24 }, (_, i) => (
        <span key={i} className="blog-placeholder-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </span>
      ))}
    </div>
  </div>
);

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(ARTICLES_QUERY)
      .then(data => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="blog-shell">
      <header className="blog-header">
        <Link to="/" className="blog-back">&#8592; Back</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main">Blue<span>side</span> Digital</span>
          <span className="blog-wordmark-sub">Articles &amp; Insights</span>
        </div>
      </header>

      <main className="blog-main">
        {loading && (
          <div className="blog-loading">Loading articles&hellip;</div>
        )}

        {!loading && articles.length === 0 && (
          <div className="blog-empty">No published articles yet.</div>
        )}

        {articles.map((article, idx) => (
          <article key={article._id} className="blog-article">
            <div className="blog-article-meta">
              <span className="blog-article-num">{String(idx + 1).padStart(2, '0')}</span>
              {article.publishedAt && (
                <span className="blog-article-date">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
            <h2 className="blog-article-title">{article.title}</h2>
            <div className="blog-article-image">
              {article.mainImage
                ? <img src={article.mainImage} alt={article.title} />
                : <Placeholder />
              }
            </div>
            <div className="blog-article-body">
              {article.body && <PortableText value={article.body} components={ptComponents} />}
              {article.tags?.length > 0 && (
                <p className="blog-tags">{article.tags.map(t => `#${t}`).join(' ')}</p>
              )}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
