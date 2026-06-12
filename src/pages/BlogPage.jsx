import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, ARTICLES_QUERY } from '../lib/sanity.js';
import './BlogPage.css';

function getExcerpt(body, maxChars = 220) {
  if (!body) return '';
  const text = body
    .filter(b => b._type === 'block' && b.children)
    .map(b => b.children.map(c => c.text).join(''))
    .join(' ')
    .trim();
  return text.length > maxChars ? text.slice(0, maxChars).trimEnd() + '…' : text;
}

/* ─── SHARE ICONS ────────────────────────────────────────────────────────── */
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

const SITE = 'https://bluesidedigital.com';

function shareUrl(platform, title, slug) {
  const url  = encodeURIComponent(`${SITE}/blog/${slug}`);
  const text = encodeURIComponent(title);
  if (platform === 'x')        return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  if (platform === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
}

function openShare(href) {
  window.open(href, '_blank', 'width=600,height=420,noopener,noreferrer');
}

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
    document.title = 'Articles & Insights | Blueside Digital';
    return () => { document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting'; };
  }, []);

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
            <Link to={`/blog/${article.slug}`} className="blog-article-title-link">
              <h2 className="blog-article-title">{article.title}</h2>
            </Link>
            <div className="blog-article-image blog-article-image--preview">
              {article.mainImage
                ? <img src={article.mainImage} alt={article.title} />
                : <Placeholder />
              }
            </div>
            <div className="blog-share">
              <span className="blog-share-label">Share</span>
              <button
                className="blog-share-btn blog-share-btn--x"
                onClick={() => openShare(shareUrl('x', article.title, article.slug))}
                aria-label="Share on X (Twitter)"
              >
                <XIcon /> X
              </button>
              <button
                className="blog-share-btn blog-share-btn--li"
                onClick={() => openShare(shareUrl('linkedin', article.title, article.slug))}
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon /> LinkedIn
              </button>
            </div>

            <div className="blog-article-body">
              <p className="blog-excerpt">{getExcerpt(article.body)}</p>
              <Link to={`/blog/${article.slug}`} className="blog-read-more">
                Read full article ↓
              </Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
