// Runs after `vite build`. Rewrites dist/index.html and writes
// dist/blog/index.html + dist/blog/<slug>/index.html with real OG/Twitter
// meta so crawlers (Twitter, LinkedIn, Slack) see article-specific tags.

import { createClient } from '@sanity/client';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE     = 'https://bluesidedigital.com';
const FALLBACK = `${SITE}/og-default.jpg`;

const client = createClient({
  projectId:  'dnjgcd6l',
  dataset:    'production',
  apiVersion: '2026-06-02',
  useCdn:     true,
});

const articles = await client.fetch(`
  *[_type == "article" && status == "published"] {
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body,
  }
`);

// ── helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function bodyExcerpt(body, max = 160) {
  if (!body) return '';
  const text = body
    .filter(b => b._type === 'block' && b.children)
    .map(b => b.children.map(c => c.text).join(''))
    .join(' ')
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

function ogImageUrl(mainImageUrl) {
  if (!mainImageUrl) return FALLBACK;
  const base = mainImageUrl.split('?')[0];
  return `${base}?w=1200&h=630&fit=crop&auto=format&fm=jpg`;
}

// Replace or inject every relevant meta tag into an HTML string.
function injectMeta(template, {
  title, description, url,
  ogType = 'website', image, imageAlt,
  publishedAt = null,
}) {
  let html = template;

  const rep = (re, replacement) => { html = html.replace(re, replacement); };

  rep(/<title>[^<]*<\/title>/,                                         `<title>${esc(title)}</title>`);
  rep(/(<meta\s+name="description"\s+content=")[^"]*(")/,              `$1${esc(description)}$2`);
  rep(/(<link\s+rel="canonical"\s+href=")[^"]*(")/,                    `$1${url}$2`);
  rep(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,             `$1${esc(title)}$2`);
  rep(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,       `$1${esc(description)}$2`);
  rep(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,               `$1${url}$2`);
  rep(/(<meta\s+property="og:type"\s+content=")[^"]*(")/,              `$1${ogType}$2`);
  rep(/(<meta\s+property="og:image"\s+content=")[^"]*(")/,             `$1${image}$2`);
  rep(/(<meta\s+property="og:image:width"\s+content=")[^"]*(")/,       `$11200$2`);
  rep(/(<meta\s+property="og:image:height"\s+content=")[^"]*(")/,      `$1630$2`);
  rep(/(<meta\s+name="twitter:card"\s+content=")[^"]*(")/,             `$1summary_large_image$2`);
  rep(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,            `$1${esc(title)}$2`);
  rep(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,      `$1${esc(description)}$2`);
  rep(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,            `$1${image}$2`);

  // Inject tags absent from the base HTML before </head>
  const extras = [];
  if (!html.includes('og:image:alt'))
    extras.push(`  <meta property="og:image:alt" content="${esc(imageAlt)}" />`);
  if (!html.includes('twitter:site'))
    extras.push(`  <meta name="twitter:site" content="@CamCTech" />`);
  if (publishedAt && !html.includes('article:published_time'))
    extras.push(`  <meta property="article:published_time" content="${publishedAt}" />`);

  if (extras.length) html = html.replace('</head>', `${extras.join('\n')}\n</head>`);

  return html;
}

// ── run ───────────────────────────────────────────────────────────────────────

const template = readFileSync(join(__dirname, '../dist/index.html'), 'utf8');

// Homepage — add twitter:site if missing
{
  let html = template;
  if (!html.includes('twitter:site'))
    html = html.replace('</head>', `  <meta name="twitter:site" content="@CamCTech" />\n</head>`);
  writeFileSync(join(__dirname, '../dist/index.html'), html);
  console.log('  ✓ /');
}

// Blog list page
{
  const dir = join(__dirname, '../dist/blog');
  mkdirSync(dir, { recursive: true });
  const html = injectMeta(template, {
    title:       'Articles & Insights | Blueside Digital',
    description: 'Accessibility, web development, healthcare digital, and MarTech articles from Blueside Digital.',
    url:         `${SITE}/blog`,
    image:       FALLBACK,
    imageAlt:    'Blueside Digital – Articles & Insights',
  });
  writeFileSync(join(dir, 'index.html'), html);
  console.log('  ✓ /blog');
}

// Per-article pages
let count = 0;
for (const article of articles) {
  if (!article.slug) continue;

  const html = injectMeta(template, {
    title:       `${article.title} | Blueside Digital`,
    description: bodyExcerpt(article.body),
    url:         `${SITE}/blog/${article.slug}`,
    ogType:      'article',
    image:       ogImageUrl(article.mainImage),
    imageAlt:    article.title,
    publishedAt: article.publishedAt,
  });

  const dir = join(__dirname, '../dist/blog', article.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  console.log(`  ✓ /blog/${article.slug}`);
  count++;
}

console.log(`\nInjected meta into ${count} article(s) + blog index + homepage.`);
