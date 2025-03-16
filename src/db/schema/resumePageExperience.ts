import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumeExperiences = pgTable('resume_experience', {
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
  experiences: jsonb('experiences')
    .$type<
      {
        start: string;
        end: string;
        position: {
          en: string;
          ru: string;
          uk: string;
        };
        company: {
          en: string;
          ru: string;
          uk: string;
        };
      }[]
    >()
    .default([]),
});
