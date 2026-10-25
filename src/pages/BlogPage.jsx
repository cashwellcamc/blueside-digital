import { useState, useEffect } from 'react';

const TOPIC_MAP = {
  'Accessibility':          ['accessibility', 'wcag', 'ada', '508', 'section-508', 'trusted tester', 'hhs', 'ux access', 'semantic html', 'audit'],
  'AI':                     ['ai', 'artificial intelligence', 'generative', 'claude', 'chatgpt', 'llm', 'vibe cod'],
  'CMS & Drupal':           ['drupal', 'cms', 'headless', 'wordpress', 'sanity', 'payload', 'strapi', 'aem', 'adobe experience', 'adobe-experience', 'next.js', 'content-management', 'content management'],
  'Healthcare & Pharma':    ['healthcare', 'pharma', 'veeva', 'patient', 'life-science', 'life science', 'clm', 'regulated'],
  'Security & Compliance':  ['security', 'hipaa', 'hippa', 'owasp', 'secure', 'data privacy', 'data-breach', 'consent', 'compliance', 'hardening', 'governance'],
  'Web Development':        ['javascript', 'typescript', 'react', 'php', 'python', 'graphql', 'html', 'css', 'front-end', 'frontend', 'full stack', 'web development', 'web-development', 'serverless', 'aws', 'lambda', 'dynamo', 'performance', 'mobile', 'architecture', 'developer', 'software', 'workflow', 'tech-debt', 'clean-code'],
};

const TOPICS = Object.keys(TOPIC_MAP);

function tagMatchesTopic(tags, topicKey) {
  const patterns = TOPIC_MAP[topicKey];
  return (tags || []).some(tag =>
    patterns.some(p => tag.toLowerCase().includes(p.toLowerCase()))
  );
}
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

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('date');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    document.title = 'Articles & Insights | Blueside Digital';
    return () => { document.title = 'Blueside Digital | WCAG & ADA Accessibility Consulting'; };
  }, []);

  useEffect(() => {
    client.fetch(ARTICLES_QUERY)
      .then(data => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...articles].sort((a, b) => {
    if (sort === 'most') return (b.viewCount || 0) - (a.viewCount || 0);
    if (sort === 'least') return (a.viewCount || 0) - (b.viewCount || 0);
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const filtered = topic
    ? sorted.filter(a => tagMatchesTopic(a.tags, topic))
    : sorted;

  return (
    <div className="blog-shell">
      <header className="blog-header">
        <Link to="/" className="blog-back">&#8592; Back</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main" aria-hidden="true">Blue<span>side</span> Digital</span>
          <h1 className="blog-wordmark-sub">Articles &amp; Insights</h1>
        </div>
      </header>

      <main className="blog-main">
        <div className="blog-filter-bar" role="group" aria-label="Filter and sort articles">
          <span className="blog-filter-label">Sort:</span>
          {[
            { key: 'date', label: 'Latest' },
            { key: 'most', label: 'Most Viewed' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`blog-filter-btn${sort === key ? ' active' : ''}`}
              onClick={() => setSort(key)}
              aria-pressed={sort === key}
            >
              {label}
            </button>
          ))}

          {!loading && articles.length > 0 && (
            <>
              <span className="blog-filter-divider" aria-hidden="true" />
              <span className="blog-filter-label">Topic:</span>
              <select
                className={`blog-topic-select${topic ? ' active' : ''}`}
                value={topic}
                onChange={e => setTopic(e.target.value)}
                aria-label="Filter by topic"
              >
                <option value="">All Topics</option>
                {TOPICS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </>
          )}
        </div>

        {loading && (
          <div className="blog-loading">Loading articles&hellip;</div>
        )}

        {!loading && articles.length === 0 && (
          <div className="blog-empty">No published articles yet.</div>
        )}

        {!loading && articles.length > 0 && filtered.length === 0 && (
          <div className="blog-empty">No articles tagged &ldquo;{topic}&rdquo; yet.</div>
        )}

        {filtered.map((article) => (
          <article key={article._id} className="blog-article" aria-labelledby={`title-${article._id}`}>
            <div className="blog-article-meta">
              {article.publishedAt && (
                <time className="blog-article-date" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              )}
              {article.viewCount > 0 && (
                <span className="blog-article-views">{article.viewCount + 100} views</span>
              )}
            </div>
            <Link to={`/blog/${article.slug}`} className="blog-article-title-link">
              <h2 id={`title-${article._id}`} className="blog-article-title">{article.title}</h2>
            </Link>
            <div className="blog-article-bar" aria-hidden="true" />
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
