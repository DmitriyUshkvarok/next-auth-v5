import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumeEducations = pgTable('resume_educations', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  educations: jsonb('educations')
    .$type<
      {
        start: string;
        end: string;
        course: string;
        typeCourse: string;
      }[]
    >()
    .default([]),
});
