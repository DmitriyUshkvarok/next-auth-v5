'use server';
import { portfolioSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '../db/drizzle';
import { portfolios } from '@/db/schema/portfolioSchema';
import { renderError } from '@/lib/authHelpers';
import { getAuthUser } from '@/lib/authHelpers';
import { uploadImageToBlob } from '@/utils/uploadImage';
import { randomBytes } from 'crypto';
import { getAdminUser } from '@/lib/authHelpers';
import { and, ilike, sql } from 'drizzle-orm';

export const createPortfolioProject = async (
  data: z.infer<typeof portfolioSchema>,
  formData: FormData
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();
    const image = formData.get('image') as File;
    const validatedPortfolioData = validateWithZodSchema(portfolioSchema, data);
    const { ...rest } = validatedPortfolioData;

    const newPortfolioImgUrl = await uploadImageToBlob(
      image,
      `portfolio/${getUser.id}`
    );

    await db.insert(portfolios).values({
      id: randomBytes(16).toString('hex'),
      userId: getUser.id,
      ...rest,
      image: newPortfolioImgUrl,
      createdAt: new Date(),
    });
    return { message: 'Portfolio project created successfully', success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const getFilteredPortfolioProjects = async (
  search?: string,
  month?: number,
  year?: number,
  technologies?: string[],
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const monthYearFilter =
      month && year
        ? sql`
          EXTRACT(MONTH FROM ${portfolios.realizedAt}) = ${month}
          AND EXTRACT(YEAR FROM ${portfolios.realizedAt}) = ${year}
        `
        : sql`TRUE`;

    const technologiesFilter =
      technologies && technologies.length
        ? sql`
          EXISTS (
            SELECT 1
            FROM jsonb_array_elements(${portfolios.technologies}) AS tech
            WHERE tech->>'name' IN (${sql.join(technologies, ',')})
          )
        `
        : sql`TRUE`;

    const searchFilter = search
      ? and(
          ilike(portfolios.title, `%${search}%`),
          ilike(portfolios.description, `%${search}%`)
        )
      : sql`TRUE`; // Если не задан поиск, фильтрация по строкам не будет

    const whereClause = and(searchFilter, monthYearFilter, technologiesFilter);

    const projects = await db
      .select()
      .from(portfolios)
      .where(whereClause)
      .limit(pageSize)
      .offset((page - 1) * pageSize); // Пагинация

    return projects;
  } catch (error) {
    renderError(error);
  }
};
