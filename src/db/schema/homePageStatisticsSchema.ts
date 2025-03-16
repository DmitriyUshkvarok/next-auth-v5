import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const homePageStatistics = pgTable('home_page_statistics', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  statistics: jsonb('statistics')
    .$type<{ count: number; title: { en: string; ru: string; uk: string } }[]>()
    .default([]),
});
