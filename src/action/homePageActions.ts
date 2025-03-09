'use server';
import {
  updateHomePageHeroSchema,
  updateHomePageNavigationSchema,
  updateHomePageSocialSchema,
  updateHomePageStatisticsSchema,
} from '@/validation/schemasHomePage';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { getAuthUser, renderError } from '@/lib/authHelpers';
import { del } from '@vercel/blob';
import { uploadImageToBlob } from '@/utils/uploadImage';
import { getAdminUser } from '@/lib/authHelpers';
import { homePageNavigations } from '@/db/schema/homePageNavigationSchema';
import { eq } from 'drizzle-orm';
import { homePageHeros } from '@/db/schema/homePageHeroSchema';
import { homePageSocials } from '@/db/schema/homePageSocialsLinksSchema';
import { homePageStatistics } from '@/db/schema/homePageStatisticsSchema';
import { homePageResume } from '@/db/schema/homePageResumeSchema';
import { uploadResumeToBlob } from '@/utils/uploadPdf';
import { revalidatePath } from 'next/cache';

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

    revalidatePath('/');

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

export const updateHomePageHero = async (
  data: z.infer<typeof updateHomePageHeroSchema>,
  formData: FormData
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const image = formData.get('image') as File | null;
    const updateHeroValidateData = validateWithZodSchema(
      updateHomePageHeroSchema,
      data
    );

    const { ...rest } = updateHeroValidateData;

    // Получаем текущие данные блока героя
    const [existingHero] = await db
      .select()
      .from(homePageHeros)
      .where(eq(homePageHeros.id, fixedId))
      .limit(1)
      .execute();

    let newImageUrl = existingHero?.image || null;

    if (image) {
      // Если есть старое изображение, удаляем его перед загрузкой нового
      if (
        existingHero?.image &&
        existingHero.image.includes('vercel-storage.com')
      ) {
        await del(existingHero.image);
      }
      newImageUrl = await uploadImageToBlob(image, `hero/${getUser.id}`);
    }

    if (existingHero) {
      // Обновляем запись, если она существует
      await db
        .update(homePageHeros)
        .set({
          ...rest,
          image: newImageUrl,
        })
        .where(eq(homePageHeros.id, fixedId))
        .execute();
    } else {
      // Создаём новую запись, если её нет
      await db
        .insert(homePageHeros)
        .values({
          id: fixedId,
          userId: getUser.id,
          ...rest,
          image: newImageUrl,
        })
        .execute();
    }
    revalidatePath('/');
    return {
      success: true,
      message: 'Hero section has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getHomePageHero = async () => {
  const result = await db
    .select()
    .from(homePageHeros)
    .where(eq(homePageHeros.id, fixedId))
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

export const updateHomePageSocialsLinks = async (
  data: z.infer<typeof updateHomePageSocialSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const updateSocialsValidate = validateWithZodSchema(
      updateHomePageSocialSchema,
      data
    );

    const existingSocial = await db
      .select()
      .from(homePageSocials)
      .where(eq(homePageSocials.id, fixedId))
      .execute();

    if (existingSocial.length > 0) {
      // Если запись существует, обновляем её
      await db
        .update(homePageSocials)
        .set({
          socials: updateSocialsValidate.socials,
        })
        .where(eq(homePageSocials.id, fixedId))
        .execute();
    } else {
      // Если записи нет, создаём новую
      await db
        .insert(homePageSocials)
        .values({
          id: fixedId,
          userId: getUser.id,
          socials: updateSocialsValidate.socials,
        })
        .execute();
    }

    revalidatePath('/');
    return {
      success: true,
      message: 'Socials Links has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getHomePageSocialLinks = async () => {
  const result = await db
    .select()
    .from(homePageSocials)
    .where(eq(homePageSocials.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      success: true,
      data: result[0].socials,
    };
  } else {
    return {
      success: true,
      data: [],
    };
  }
};

export const updateHomePageStatistics = async (
  data: z.infer<typeof updateHomePageStatisticsSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const updateStatisticsValidate = validateWithZodSchema(
      updateHomePageStatisticsSchema,
      data
    );

    const existingStatistics = await db
      .select()
      .from(homePageStatistics)
      .where(eq(homePageStatistics.id, fixedId))
      .execute();

    if (existingStatistics.length > 0) {
      // Если запись существует, обновляем её
      await db
        .update(homePageStatistics)
        .set({
          statistics: updateStatisticsValidate.statistics,
        })
        .where(eq(homePageStatistics.id, fixedId))
        .execute();
    } else {
      // Если записи нет, создаём новую
      await db
        .insert(homePageStatistics)
        .values({
          id: fixedId,
          userId: getUser.id,
          statistics: updateStatisticsValidate.statistics,
        })
        .execute();
    }

    revalidatePath('/');
    return {
      success: true,
      message: 'Socials Links has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getHomePageStatistics = async () => {
  const result = await db
    .select()
    .from(homePageStatistics)
    .where(eq(homePageStatistics.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      data: result[0].statistics,
    };
  } else {
    return {
      data: [],
    };
  }
};

export const updateHomePageResume = async (formData: FormData) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const resume = formData.get('resume') as File | null;

    if (!resume) {
      return {
        success: false,
        message: 'The resume file has not been uploaded',
      };
    }

    // Получаем текущие данные
    const [existingResume] = await db
      .select()
      .from(homePageResume)
      .where(eq(homePageResume.id, fixedId))
      .limit(1)
      .execute();

    let newResumeUrl = existingResume?.resume || null;

    if (resume) {
      // Удаляем старое резюме перед загрузкой нового
      if (
        existingResume?.resume &&
        existingResume.resume.includes('vercel-storage.com')
      ) {
        await del(existingResume.resume);
      }
      newResumeUrl = await uploadResumeToBlob(resume, `resumes/${getUser.id}`);
    }

    if (existingResume) {
      // Обновляем запись
      await db
        .update(homePageResume)
        .set({ resume: newResumeUrl })
        .where(eq(homePageResume.id, fixedId))
        .execute();
    } else {
      // Создаём новую запись
      await db
        .insert(homePageResume)
        .values({
          id: fixedId,
          userId: getUser.id,
          resume: newResumeUrl,
        })
        .execute();
    }
    revalidatePath('/');

    return {
      success: true,
      message: 'Resume has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getHomePageResume = async () => {
  const [existingResume] = await db
    .select()
    .from(homePageResume)
    .where(eq(homePageResume.id, fixedId))
    .limit(1)
    .execute();

  if (!existingResume || !existingResume.resume) {
    return {
      success: false,
      message: 'Резюме не найдено',
      resumeUrl: null,
    };
  }

  return {
    success: true,
    message: 'Резюме получено успешно',
    resumeUrl: existingResume.resume,
  };
};
