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
import { and, ilike, or, sql } from 'drizzle-orm';
import { PortfolioSearchParams } from '@/utils/types';

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

export const getFilteredPortfolioProjects = async ({
  search,
  month,
  year,
  technology,
  currentPage = 1,
  pageSize = 6,
}: PortfolioSearchParams) => {
  const monthYearFilter =
    month && year
      ? sql`
          EXTRACT(MONTH FROM ${portfolios.realizedAt}) = ${month}
          AND EXTRACT(YEAR FROM ${portfolios.realizedAt}) = ${year}
        `
      : sql`TRUE`;

  const searchFilter = search
    ? or(
        ilike(portfolios.title, `%${search}%`),
        ilike(portfolios.description, `%${search}%`)
      )
    : sql`TRUE`;

  const technologyFilter = technology
    ? sql`
    EXISTS (
      SELECT 1
      FROM jsonb_array_elements(${portfolios.technologies}::jsonb) AS tech
      WHERE tech->>'name' = ${technology}
    )
  `
    : sql`TRUE`;

  const whereClause = and(searchFilter, monthYearFilter, technologyFilter);

  // Получаем общее количество проектов
  const totalProjects = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(portfolios)
    .where(whereClause)
    .execute();

  const totalPages = Math.ceil((totalProjects[0]?.count ?? 0) / pageSize);

  const projects = await db
    .select()
    .from(portfolios)
    .where(whereClause)
    .limit(pageSize)
    .offset((currentPage - 1) * pageSize);

  return {
    projects: projects || [],
    totalPages,
  };
};

export const getTechnologies = async (): Promise<
  { name: string; icon: string }[]
> => {
  const technologies = await db.execute(sql`
      SELECT DISTINCT jsonb_array_elements(${portfolios.technologies}::jsonb)->>'name' AS name,
                      jsonb_array_elements(${portfolios.technologies}::jsonb)->>'icon' AS icon
      FROM ${portfolios};
    `);

  return (
    technologies.rows.map((tech: Record<string, unknown>) => ({
      name: tech.name as string,
      icon: tech.icon as string,
    })) || []
  );
};
