import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './userSchema';

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .unique(),
  token: text('token'),
  tokenExpiry: timestamp('token_expiry'),
});
