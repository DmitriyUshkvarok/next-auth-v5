'use server';
import { updateResumeSidebarTextSchema } from '@/validation/schemaResumePage';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { getAuthUser, renderError } from '@/lib/authHelpers';
import { getAdminUser } from '@/lib/authHelpers';
import { eq } from 'drizzle-orm';
import { resumePageSidebarTexts } from '@/db/schema/resumePageSidebarText';

const fixedId = 'default';

export const updateResumePageSidebarText = async (
  data: z.infer<typeof updateResumeSidebarTextSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();

    const updateSidebarResumeTextValidateData = validateWithZodSchema(
      updateResumeSidebarTextSchema,
      data
    );

    const { ...rest } = updateSidebarResumeTextValidateData;

    const [existingSidebarResumeText] = await db
      .select()
      .from(resumePageSidebarTexts)
      .where(eq(resumePageSidebarTexts.id, fixedId))
      .limit(1)
      .execute();

    if (existingSidebarResumeText) {
      // Обновляем запись, если она существует
      await db
        .update(resumePageSidebarTexts)
        .set({
          ...rest,
        })
        .where(eq(resumePageSidebarTexts.id, fixedId))
        .execute();
    } else {
      // Создаём новую запись, если её нет
      await db
        .insert(resumePageSidebarTexts)
        .values({
          id: fixedId,
          userId: getUser.id,
          ...rest,
        })
        .execute();
    }

    return {
      success: true,
      message: 'Resume sidebar text has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getResumePageSidebarText = async () => {
  const result = await db
    .select()
    .from(resumePageSidebarTexts)
    .where(eq(resumePageSidebarTexts.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      data: result[0],
    };
  } else {
    return {
      data: [],
    };
  }
};
