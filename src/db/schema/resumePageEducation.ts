import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumeEducations = pgTable('resume_educations', {
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
  educations: jsonb('educations')
    .$type<
      {
        start: string;
        end: string;
        course: { en: string; ru: string; uk: string };
        typeCourse: { en: string; ru: string; uk: string };
      }[]
    >()
    .default([]),
});
