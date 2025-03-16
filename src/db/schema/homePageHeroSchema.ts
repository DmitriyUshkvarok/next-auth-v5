import { jsonb, pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const homePageHeros = pgTable('home_page_hero', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  position: jsonb('position').$type<{ en: string; ru: string; uk: string }>(),
  title: jsonb('title').$type<{ en: string; ru: string; uk: string }>(),
  developerName: jsonb('developer_name').$type<{
    en: string;
    ru: string;
    uk: string;
  }>(),
  description: jsonb('description').$type<{
    en: string;
    ru: string;
    uk: string;
  }>(),
  image: text('image'),
});
