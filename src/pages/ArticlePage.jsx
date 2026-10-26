import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { client, writeClient, ARTICLE_BY_SLUG_QUERY } from '../lib/sanity.js';
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
    // extract the identifying attribute from the selector and set it on the new element
    // e.g. 'meta[property="og:image"]' → sets property="og:image" before appending
    const match = selector.match(/\[(\w[\w:.-]*)=["']([^"']+)["']\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function sanityTwitterImg(url) {
  if (!url) return null;
  return `${url}?w=1200&h=630&fit=crop&auto=format&fm=jpg`;
}

const ptComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3:     ({ children }) => <h3>{children}</h3>,
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
      <a href={value.href} target="_blank" rel="noreferrer noopener">
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
        <div className="blog-code-header">
          <span className="blog-code-dots">
            <span /><span /><span />
          </span>
          <span className="blog-code-lang">
            {value.filename || LANG_LABELS[value.language] || value.language || 'Code'}
          </span>
        </div>
        <SyntaxHighlighter
          language={value.language || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 10px 10px',
            fontSize: '0.84rem',
            lineHeight: '1.65',
            padding: '1.2rem 1.4rem',
          }}
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

function buildShareUrl(platform, title, slug) {
  const url  = encodeURIComponent(`${SITE}/blog/${slug}`);
  const text = encodeURIComponent(title);
  if (platform === 'x')        return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  if (platform === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
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
      .then(data => {
        setArticle(data);
        setLoading(false);
        if (writeClient && data?._id) {
          writeClient.patch(data._id).setIfMissing({ viewCount: 0 }).inc({ viewCount: 1 }).commit().catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

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
    const imgUrl = sanityTwitterImg(article.mainImage);
    if (imgUrl) {
      setMeta('meta[property="og:image"]',          'content', imgUrl);
      setMeta('meta[property="og:image:width"]',    'content', '1200');
      setMeta('meta[property="og:image:height"]',   'content', '630');
      setMeta('meta[name="twitter:image"]',         'content', imgUrl);
      setMeta('meta[name="twitter:card"]',          'content', 'summary_large_image');
    }

    return () => {
      document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting';
      setMeta('meta[name="description"]',          'content', 'Senior-level digital consulting specializing in WCAG 2.1 AA audits, Section 504/508 compliance, and ADA accessibility for healthcare organizations.');
      setMeta('meta[property="og:title"]',         'content', 'Blueside Digital | WCAG & ADA Accessibility Consulting');
      setMeta('meta[property="og:description"]',   'content', 'Senior-level digital consulting specializing in WCAG 2.1 AA audits, Section 504/508 compliance, and ADA accessibility for healthcare organizations.');
      setMeta('meta[property="og:url"]',           'content', `${SITE}/`);
      setMeta('meta[property="og:type"]',          'content', 'website');
      setMeta('meta[name="twitter:card"]',         'content', 'summary');
    };
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

      <main className="blog-main blog-main--article">
        {loading && <div className="blog-loading" aria-live="polite">Loading…</div>}

        {!loading && !article && (
          <div className="blog-empty" role="alert">Article not found. <Link to="/blog">← Back to articles</Link></div>
        )}

        {article && (
          <article className="blog-article" aria-labelledby="article-title">
            <div className="blog-article-meta">
              {article.publishedAt && (
                <time className="blog-article-date" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              )}
            </div>

            <div className="article-chrome">
              <div className="article-chrome-header" aria-hidden="true">
                <span className="blog-code-dots">
                  <span /><span /><span />
                </span>
                <span className="article-chrome-tab">{article.slug}.md</span>
              </div>
              <div className="article-chrome-body">
                <h1 id="article-title" className="blog-article-title">{article.title}</h1>

                {article.mainImage && (
                  <div className="blog-article-image">
                    <img src={article.mainImage} alt={article.title} />
                  </div>
                )}

                <div className="blog-share" role="group" aria-label="Share this article">
                  <span className="blog-share-label" aria-hidden="true">Share</span>
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

                <div className="blog-article-body">
                  {article.body && <PortableText value={article.body} components={ptComponents} />}
                  {article.tags?.length > 0 && (
                    <p className="blog-tags">{article.tags.map(t => `#${t}`).join(' ')}</p>
                  )}
                </div>

                <div className="blog-byline">
                  <div className="blog-byline-content">
                    <div className="blog-byline-name">Cameron Cashwell</div>
                    <p className="blog-byline-bio">
                      Blueside Digital is an independent consulting practice specializing in web accessibility,
                      WCAG 2.1 AA audits, Section 504/508 compliance, and full-stack digital work for healthcare,
                      pharma, and federal organizations. 13+ years of senior-level experience.
                    </p>
                  </div>
                  <Link className="blog-byline-cta" to="/contact">Get in touch <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
