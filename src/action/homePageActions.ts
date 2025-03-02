'use server';
import { updateHomePageNavigationSchema } from '@/validation/schemasHomePage';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { getAuthUser, renderError } from '@/lib/authHelpers';
// import { del } from '@vercel/blob';
// import { uploadImageToBlob } from '@/utils/uploadImage';
import { getAdminUser } from '@/lib/authHelpers';
import { homePageNavigations } from '@/db/schema/homePageNavigationSchema';
import { eq } from 'drizzle-orm';

const fixedId = 'default';

export const updateHomePageNavigation = async (
  data: z.infer<typeof updateHomePageNavigationSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const updateNavigationValidate = validateWithZodSchema(
      updateHomePageNavigationSchema,
      data
    );

    const existingNav = await db
      .select()
      .from(homePageNavigations)
      .where(eq(homePageNavigations.id, fixedId))
      .execute();

    if (existingNav.length > 0) {
      // Если запись существует, обновляем её
      await db
        .update(homePageNavigations)
        .set({
          navigations: updateNavigationValidate.navigations,
        })
        .where(eq(homePageNavigations.id, fixedId))
        .execute();
    } else {
      // Если записи нет, создаём новую
      await db
        .insert(homePageNavigations)
        .values({
          id: fixedId,
          userId: getUser.id,
          navigations: updateNavigationValidate.navigations,
        })
        .execute();
    }
    return {
      success: true,
      message: 'Navigation has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getHomePageNavigation = async () => {
  const result = await db
    .select()
    .from(homePageNavigations)
    .where(eq(homePageNavigations.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      success: true,
      data: result[0].navigations,
    };
  } else {
    return {
      success: true,
      data: [],
    };
  }
};
