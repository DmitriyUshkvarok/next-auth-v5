import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const homePageNavigations = pgTable('home_page_navigation', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  navigations: jsonb('navigations')
    .$type<{ name: string; url: string }[]>()
    .default([]),
});
