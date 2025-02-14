import { pgTable, text, timestamp, integer, json } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

// Схема для портфолио
export const portfolio = pgTable('portfolio', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  image: text('image'),
  title: text('title').notNull(),
  description: text('description'),
  websiteUrl: text('website_url'),
  githubUrl: text('github_url'),
  order: integer('order').default(0),
  technologies: json('technologies')
    .$type<{ name: string; icon: string }[]>()
    .default([]),
  createdAt: timestamp('created_at').defaultNow(),
});
