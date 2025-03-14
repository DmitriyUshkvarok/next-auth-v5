import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumeSkills = pgTable('resume_skills', {
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
  skills: jsonb('skills')
    .$type<
      {
        skillName: { en: string; ru: string; uk: string };
      }[]
    >()
    .default([]),
});
