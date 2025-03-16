import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumePageSidebarTexts = pgTable('resume_page_sidebar_text', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: jsonb('title')
    .notNull()
    .$type<{ en: string; ru: string; uk: string }>(),
  description: jsonb('description')
    .notNull()
    .$type<{ en: string; ru: string; uk: string }>(),
});
