// Runs after `vite build`. For each published article, writes
// dist/blog/[slug]/index.html with article-specific OG + Twitter meta tags
// so LinkedIn and other crawlers see real metadata when they visit the URL.

import { createClient } from '@sanity/client';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://bluesidedigital.com';

const client = createClient({
  projectId: 'dnjgcd6l',
  dataset: 'production',
  apiVersion: '2026-06-02',
  useCdn: false,
});

const articles = await client.fetch(`
  *[_type == "article" && status == "published"] {
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    body,
  }
`);

function bodyToDescription(body, max = 160) {
  if (!body) return '';
  const text = body
    .filter(b => b._type === 'block' && b.children)
    .map(b => b.children.map(c => c.text).join(''))
    .join(' ')
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

const template = readFileSync(join(__dirname, '../dist/index.html'), 'utf8');

for (const article of articles) {
  const pageTitle = `${article.title} | Blueside Digital`;
  const pageUrl   = `${SITE}/blog/${article.slug}`;
  const img       = article.mainImage || '';
  const desc      = bodyToDescription(article.body).replace(/"/g, '&quot;');

  let html = template
    .replace(/(<title>)[^<]*(<\/title>)/, `$1${pageTitle}$2`)
    .replace(/(<meta property="og:title"[^>]*content=")[^"]*(")/,       `$1${pageTitle}$2`)
    .replace(/(<meta property="og:url"[^>]*content=")[^"]*(")/,         `$1${pageUrl}$2`)
    .replace(/(<meta property="og:type"[^>]*content=")[^"]*(")/,        `$1article$2`)
    .replace(/(<meta property="og:description"[^>]*content=")[^"]*(")/,  `$1${desc}$2`)
    .replace(/(<meta name="twitter:title"[^>]*content=")[^"]*(")/,       `$1${pageTitle}$2`)
    .replace(/(<meta name="twitter:description"[^>]*content=")[^"]*(")/,  `$1${desc}$2`)
    .replace(/(<link rel="canonical"[^>]*href=")[^"]*(")/,               `$1${pageUrl}$2`);

  if (img) {
    // Inject og:image + twitter:image after og:type line
    html = html
      .replace(/(<meta name="twitter:card"[^>]*content=")[^"]*(")/,  `$1summary_large_image$2`)
      .replace(/<!-- Twitter Card -->/, `<!-- Twitter Card -->\n  <meta property="og:image" content="${img}" />`);
    if (!html.includes('twitter:image')) {
      html = html.replace(
        /(<meta name="twitter:card"[^>]*\/>)/,
        `$1\n  <meta name="twitter:image" content="${img}" />`
      );
    }
  }

  const dir = join(__dirname, '../dist/blog', article.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  console.log(`  ✓ /blog/${article.slug}`);
}

console.log(`\nGenerated ${articles.length} article page(s).`);
