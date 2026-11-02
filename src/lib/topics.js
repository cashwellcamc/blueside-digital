export const TOPIC_MAP = {
  'Accessibility':              ['accessibility', 'wcag', 'ada', '508', 'section-508', 'trusted tester', 'hhs', 'ux access', 'semantic html', 'audit'],
  'AI':                         ['ai', 'artificial intelligence', 'generative', 'claude', 'chatgpt', 'llm', 'vibe cod'],
  'Content Management Systems': ['drupal', 'cms', 'headless', 'wordpress', 'sanity', 'payload', 'strapi', 'aem', 'adobe experience', 'adobe-experience', 'next.js', 'content-management', 'content management'],
  'Healthcare & Pharma':        ['healthcare', 'pharma', 'veeva', 'patient', 'life-science', 'life science', 'clm', 'regulated'],
  'Security & Compliance':      ['security', 'hipaa', 'hippa', 'owasp', 'secure', 'data privacy', 'data-breach', 'consent', 'compliance', 'hardening', 'governance'],
  'MarTech & Analytics':        ['analytics', 'seo', 'mar-tech', 'martech', 'marketing', 'google tag manager', 'gtm', 'ga4', 'adobe analytics', 'performance', 'web strategy', 'web-strategy', 'content strategy', 'digital marketing', 'web marketing', 'hubspot', 'salesforce', 'crm'],
  'Web Development':            ['javascript', 'typescript', 'react', 'php', 'python', 'graphql', 'html', 'css', 'front-end', 'frontend', 'full stack', 'web development', 'web-development', 'serverless', 'aws', 'lambda', 'dynamo', 'mobile', 'architecture', 'developer', 'software', 'workflow', 'tech-debt', 'clean-code'],
};

export const TOPICS = Object.keys(TOPIC_MAP);

export const TOPIC_STYLES = {
  'Accessibility':              { accent: '#4ade80' },
  'AI':                         { accent: '#a78bfa' },
  'Content Management Systems': { accent: '#60a5fa' },
  'Healthcare & Pharma':        { accent: '#f472b6' },
  'Security & Compliance':      { accent: '#f87171' },
  'MarTech & Analytics':        { accent: '#34d399' },
  'Web Development':            { accent: '#38bdf8' },
};

export const TOPIC_STYLE_DEFAULT = { accent: '#1769dc' };

export function tagMatchesTopic(tags, topicKey) {
  const patterns = TOPIC_MAP[topicKey];
  return (tags || []).some(tag =>
    patterns.some(p => tag.toLowerCase().includes(p.toLowerCase()))
  );
}

export function getPrimaryTopic(tags) {
  return TOPICS.find(t => tagMatchesTopic(tags, t)) ?? null;
}
