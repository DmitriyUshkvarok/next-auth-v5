import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const services = pgTable('services', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  services: jsonb('services')
    .$type<{ count: number; title: string; description: string }[]>()
    .default([]),
});
