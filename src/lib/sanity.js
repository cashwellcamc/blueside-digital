import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'dnjgcd6l',
  dataset: 'production',
  apiVersion: '2026-06-02',
  useCdn: true,
});

export const ARTICLES_QUERY = `
  *[_type == "article" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body,
    tags,
  }
`;
