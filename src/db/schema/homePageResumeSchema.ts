import { pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const homePageResume = pgTable('home_page_resume', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  resume: text('resume'),
});
