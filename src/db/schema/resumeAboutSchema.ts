import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const resumeAbouts = pgTable('resume_about', {
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
  subDescription: jsonb('subDescription')
    .notNull()
    .$type<{ en: string; ru: string; uk: string }>(),
  name: jsonb('name').notNull().$type<{ en: string; ru: string; uk: string }>(),
  email: text('email').notNull(),
  experience: jsonb('experience')
    .notNull()
    .$type<{ en: string; ru: string; uk: string }>(),
  nationality: jsonb('nationality')
    .notNull()
    .$type<{ en: string; ru: string; uk: string }>(),
  dateOfBirth: text('dateOfBirth').notNull(),

  location: jsonb('location')
    .notNull()
    .$type<{ en: string; ru: string; uk: string }>(),
});
