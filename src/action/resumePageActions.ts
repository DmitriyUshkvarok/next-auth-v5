'use server';
import {
  updateResumeSidebarTextSchema,
  updateResumePageNavigationSchema,
  resumeExperienceSchema,
  resumeEducationsSchema,
} from '@/validation/schemaResumePage';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { getAuthUser, renderError } from '@/lib/authHelpers';
import { getAdminUser } from '@/lib/authHelpers';
import { eq } from 'drizzle-orm';
import { resumePageSidebarTexts } from '@/db/schema/resumePageSidebarText';
import { resumePageNavigations } from '@/db/schema/resumePageNavigatiionSchema';
import { revalidatePath } from 'next/cache';
import { resumeExperiences } from '@/db/schema/resumePageExperience';
import { resumeEducations } from '@/db/schema/resumePageEducation';

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

    revalidatePath('/');

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

export const updateResumePageNavigation = async (
  data: z.infer<typeof updateResumePageNavigationSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const updateResumeNavigationValidate = validateWithZodSchema(
      updateResumePageNavigationSchema,
      data
    );

    const existingNav = await db
      .select()
      .from(resumePageNavigations)
      .where(eq(resumePageNavigations.id, fixedId))
      .execute();

    if (existingNav.length > 0) {
      // Если запись существует, обновляем её
      await db
        .update(resumePageNavigations)
        .set({
          navigations: updateResumeNavigationValidate.navigations,
        })
        .where(eq(resumePageNavigations.id, fixedId))
        .execute();
    } else {
      // Если записи нет, создаём новую
      await db
        .insert(resumePageNavigations)
        .values({
          id: fixedId,
          userId: getUser.id,
          navigations: updateResumeNavigationValidate.navigations,
        })
        .execute();
    }

    revalidatePath('/');

    return {
      success: true,
      message: 'Navigation has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getResumePageNavigation = async () => {
  const result = await db
    .select()
    .from(resumePageNavigations)
    .where(eq(resumePageNavigations.id, fixedId))
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

export const updateResumeExperience = async (
  data: z.infer<typeof resumeExperienceSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const updateResumeExperienceValidate = validateWithZodSchema(
      resumeExperienceSchema,
      data
    );

    const existingResumeExperince = await db
      .select()
      .from(resumeExperiences)
      .where(eq(resumeExperiences.id, fixedId))
      .execute();

    if (existingResumeExperince.length > 0) {
      // Если запись существует, обновляем её
      await db
        .update(resumeExperiences)
        .set({
          title: updateResumeExperienceValidate.title,
          description: updateResumeExperienceValidate.description,
          experiences: updateResumeExperienceValidate.experiences,
        })
        .where(eq(resumeExperiences.id, fixedId))
        .execute();
    } else {
      // Если записи нет, создаём новую
      await db
        .insert(resumeExperiences)
        .values({
          id: fixedId,
          userId: getUser.id,
          title: updateResumeExperienceValidate.title,
          description: updateResumeExperienceValidate.description,
          experiences: updateResumeExperienceValidate.experiences,
        })
        .execute();
    }

    revalidatePath('/');
    return {
      success: true,
      message: 'Experience has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getResumeExperience = async () => {
  const result = await db
    .select()
    .from(resumeExperiences)
    .where(eq(resumeExperiences.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      success: true,
      data: result[0],
    };
  } else {
    return {
      success: true,
      data: null,
    };
  }
};

export const updateResumeEducation = async (
  data: z.infer<typeof resumeEducationsSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const updateResumeEducationValidate = validateWithZodSchema(
      resumeEducationsSchema,
      data
    );

    const existingResumeEducation = await db
      .select()
      .from(resumeEducations)
      .where(eq(resumeEducations.id, fixedId))
      .execute();

    if (existingResumeEducation.length > 0) {
      // Если запись существует, обновляем её
      await db
        .update(resumeEducations)
        .set({
          title: updateResumeEducationValidate.title,
          description: updateResumeEducationValidate.description,
          educations: updateResumeEducationValidate.educations,
        })
        .where(eq(resumeEducations.id, fixedId))
        .execute();
    } else {
      // Если записи нет, создаём новую
      await db
        .insert(resumeEducations)
        .values({
          id: fixedId,
          userId: getUser.id,
          title: updateResumeEducationValidate.title,
          description: updateResumeEducationValidate.description,
          educations: updateResumeEducationValidate.educations,
        })
        .execute();
    }

    revalidatePath('/');
    return {
      success: true,
      message: 'Education has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getResumeEducation = async () => {
  const result = await db
    .select()
    .from(resumeEducations)
    .where(eq(resumeEducations.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      success: true,
      data: result[0],
    };
  } else {
    return {
      success: true,
      data: null,
    };
  }
};
