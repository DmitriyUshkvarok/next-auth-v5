import { pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const homePageHeros = pgTable('home_page_hero', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  position: text('position').notNull(),
  title: text('title').notNull(),
  developerName: text('developer_name').notNull(),
  description: text('description').notNull(),
  image: text('image'),
});
