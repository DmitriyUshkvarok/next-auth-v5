'use server';
import { updateUserSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { auth } from '../../auth';
import { renderError } from './authActions';
import { eq } from 'drizzle-orm';

export const getAuthUser = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('You must be logged in to access this route');
  }

  return session.user;
};

export const updateUserAction = async (
  data: z.infer<typeof updateUserSchema>
) => {
  try {
    const user = await getAuthUser();
    const updateUserValidate = validateWithZodSchema(updateUserSchema, data);

    await db
      .update(users)
      .set({ name: updateUserValidate.name })
      .where(eq(users.id, user.id));

    return { success: true, message: 'Profile has been successfully updated' };
  } catch (error) {
    renderError(error);
  }
};
