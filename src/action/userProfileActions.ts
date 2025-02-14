'use server';
import { updateUserSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { auth } from '../../auth';
import { renderError } from './authActions';
import { eq } from 'drizzle-orm';
import { del } from '@vercel/blob';
import { uploadImageToBlob } from '@/utils/uploadImage';

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
    return renderError(error);
  }
};

export const updateProfileImageAction = async (formData: FormData) => {
  try {
    const getUser = await getAuthUser();
    const image = formData.get('image') as File;

    // Получаем старый аватар
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, getUser.id))
      .limit(1);

    const oldAvatarUrl = user?.image;

    // Удаляем старый аватар, если он был
    if (oldAvatarUrl && oldAvatarUrl.includes('vercel-storage.com')) {
      await del(oldAvatarUrl);
    }

    // Загружаем новое изображение
    const newAvatarUrl = await uploadImageToBlob(
      image,
      `avatars/${getUser.id}`
    );

    // Обновляем ссылку в базе
    await db
      .update(users)
      .set({ image: newAvatarUrl })
      .where(eq(users.id, getUser.id));

    return {
      message: 'Image update success',
      success: true,
      url: newAvatarUrl,
    };
  } catch (error) {
    return renderError(error);
  }
};
