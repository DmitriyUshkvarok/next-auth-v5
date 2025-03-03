import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const homePageSocials = pgTable('home_page_social', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  socials: jsonb('socials')
    .$type<{ name: string; url: string }[]>()
    .default([]),
});
