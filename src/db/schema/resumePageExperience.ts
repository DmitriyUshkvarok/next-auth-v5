import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumeExperiences = pgTable('resume_experience', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  experiences: jsonb('experiences')
    .$type<
      {
        start: string;
        end: string;
        position: string;
        company: string;
      }[]
    >()
    .default([]),
});
