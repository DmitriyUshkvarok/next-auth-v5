import {
  pgTable,
  text,
  timestamp,
  integer,
  decimal,
  jsonb,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const complexityEnum = pgEnum('complexity', ['low', 'medium', 'high']);
export const developmentTypeEnum = pgEnum('development_type', [
  'frontend',
  'backend',
  'fullstack',
]);

export const portfolios = pgTable('portfolio', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  image: text('image'),
  title: text('title').notNull(),
  description: text('description'),
  websiteUrl: text('website_url'),
  githubUrl: text('github_url'),
  videoReviewUrlDesktop: text('video_review_url_desktop'),
  videoReviewUrlMobile: text('video_review_url_mobile'),
  websiteType: text('website_type').notNull().default('personal'),
  isCommercial: boolean('is_commercial').default(false).notNull(),
  isPublic: boolean('is_public').default(false).notNull(),
  complexity: complexityEnum('complexity').notNull().default('medium'),
  developmentType: developmentTypeEnum('development_type')
    .notNull()
    .default('fullstack'),
  order: integer('order').default(0),
  budget: decimal('budget').default('0'),
  technologies: jsonb('technologies')
    .$type<{ name: string; icon: string }[]>()
    .default([]),
  realizedAt: timestamp('realized_at', { mode: 'date' }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
