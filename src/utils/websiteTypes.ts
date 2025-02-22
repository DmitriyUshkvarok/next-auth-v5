export type WebsiteType =
  | ''
  | 'directory'
  | 'ecommerce'
  | 'landing'
  | 'corporate'
  | 'portfolio'
  | 'blog'
  | 'news'
  | 'educational'
  | 'social'
  | 'forum'
  | 'government'
  | 'wiki'
  | 'marketplace'
  | 'saas'
  | 'personal';

export const websiteTypes = [
  '',
  'ecommerce',
  'landing',
  'corporate',
  'portfolio',
  'blog',
  'news',
  'educational',
  'social',
  'forum',
  'government',
  'wiki',
  'directory',
  'marketplace',
  'saas',
  'personal',
] as const;
