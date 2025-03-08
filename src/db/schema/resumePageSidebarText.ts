import { pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumePageSidebarTexts = pgTable('resume_page_sidebar_text', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
});
