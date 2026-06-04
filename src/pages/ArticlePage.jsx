import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client, ARTICLE_BY_SLUG_QUERY } from '../lib/sanity.js';
import './BlogPage.css';

const SITE = 'https://bluesidedigital.com';

const ptComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3:     ({ children }) => <h3>{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,
    code:   ({ children }) => <code className="blog-inline-code">{children}</code>,
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
    code: ({ value }) => (
      <div className="blog-code-block">
        {value.filename && <div className="blog-code-filename">{value.filename}</div>}
        <pre><code>{value.code || ''}</code></pre>
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

function buildShareUrl(platform, title, slug) {
  const url  = encodeURIComponent(`${SITE}/#/blog/${slug}`);
  const text = encodeURIComponent(title);
  if (platform === 'x')        return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  if (platform === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${text}`;
}

function openShare(href) {
  window.open(href, '_blank', 'width=600,height=420,noopener,noreferrer');
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
      .then(data => { setArticle(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (article?.title) {
      document.title = `${article.title} | Blueside Digital`;
    }
    return () => { document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting'; };
  }, [article]);

  return (
    <div className="blog-shell">
      <header className="blog-header">
        <Link to="/blog" className="blog-back">&#8592; Articles</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main">Blue<span>side</span> Digital</span>
          <span className="blog-wordmark-sub">Articles &amp; Insights</span>
        </div>
      </header>

      <main className="blog-main">
        {loading && <div className="blog-loading">Loading…</div>}

        {!loading && !article && (
          <div className="blog-empty">Article not found. <Link to="/blog">← Back to articles</Link></div>
        )}

        {article && (
          <article className="blog-article">
            <div className="blog-article-meta">
              {article.publishedAt && (
                <span className="blog-article-date">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>

            <h1 className="blog-article-title">{article.title}</h1>

            <div className="blog-share">
              <span className="blog-share-label">Share</span>
              <button
                className="blog-share-btn blog-share-btn--x"
                onClick={() => openShare(buildShareUrl('x', article.title, article.slug))}
                aria-label="Share on X (Twitter)"
              >
                <XIcon /> X
              </button>
              <button
                className="blog-share-btn blog-share-btn--li"
                onClick={() => openShare(buildShareUrl('linkedin', article.title, article.slug))}
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon /> LinkedIn
              </button>
            </div>

            {article.mainImage && (
              <div className="blog-article-image">
                <img src={article.mainImage} alt={article.title} />
              </div>
            )}

            <div className="blog-article-body">
              {article.body && <PortableText value={article.body} components={ptComponents} />}
              {article.tags?.length > 0 && (
                <p className="blog-tags">{article.tags.map(t => `#${t}`).join(' ')}</p>
              )}
            </div>

            <div className="blog-byline">
              <div className="blog-byline-name">Cameron Cashwell</div>
              <p className="blog-byline-bio">
                Blueside Digital is an independent consulting practice specializing in web accessibility,
                WCAG 2.1 AA audits, Section 504/508 compliance, and full-stack digital work for healthcare,
                pharma, and federal organizations. 13+ years of senior-level experience.
              </p>
              <a className="blog-byline-email" href="mailto:cashwell.digital@gmail.com">
                cashwell.digital@gmail.com
              </a>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
