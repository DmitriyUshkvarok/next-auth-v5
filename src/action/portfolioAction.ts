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
import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { PortfolioSearchParams } from '@/utils/types';
import { del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

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

export const updatePortfolioProject = async (
  { data, id }: { data: z.infer<typeof portfolioSchema>; id: string },
  formData: FormData
) => {
  try {
    await getAdminUser();
    const user = await getAuthUser();
    const image = formData.get('image') as File;
    const validatedPortfolioData = validateWithZodSchema(portfolioSchema, data);
    const { ...rest } = validatedPortfolioData;

    // Получаем старый проект
    const [portfolio] = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, id))
      .limit(1);

    const oldImageUrl = portfolio.image;

    if (oldImageUrl && oldImageUrl.includes('vercel-storage.com')) {
      await del(oldImageUrl);
    }

    const newImageUrl = await uploadImageToBlob(image, `portfolio/${user.id}`);

    await db
      .update(portfolios)
      .set({ ...rest, image: newImageUrl })
      .where(eq(portfolios.id, id));

    return { message: 'Portfolio project updated successfully', success: true };
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
      : month
        ? sql`EXTRACT(MONTH FROM ${portfolios.realizedAt}) = ${month}`
        : year
          ? sql`EXTRACT(YEAR FROM ${portfolios.realizedAt}) = ${year}`
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

export const getPortfolioProjectById = async (id: string) => {
  const [project] = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.id, id))
    .limit(1);

  return project;
};

export const deleteProject = async (id: string) => {
  try {
    await getAdminUser();
    const [project] = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, id))
      .limit(1);

    if (!project) {
      return { message: 'Project not found', success: false };
    }

    if (project.image && project.image.includes('vercel-storage.com')) {
      await del(project.image);
    }

    await db.delete(portfolios).where(eq(portfolios.id, id));

    revalidatePath('/admin/all-projects');
    return { message: 'Project deleted successfully', success: true };
  } catch (error) {
    return renderError(error);
  }
};

// export const getTechnologies = async (): Promise<
//   { name: string; icon: string }[]
// > => {
//   const technologies = await db.execute(sql`
//       SELECT DISTINCT jsonb_array_elements(${portfolios.technologies}::jsonb)->>'name' AS name,
//                       jsonb_array_elements(${portfolios.technologies}::jsonb)->>'icon' AS icon
//       FROM ${portfolios};
//     `);

//   return (
//     technologies.rows.map((tech: Record<string, unknown>) => ({
//       name: tech.name as string,
//       icon: tech.icon as string,
//     })) || []
//   );
// };
export const getTechnologies = async (): Promise<
  { name: string; icon: string; count: number }[]
> => {
  const technologies = await db.execute(sql`
      SELECT jsonb_array_elements(${portfolios.technologies}::jsonb)->>'name' AS name,
             jsonb_array_elements(${portfolios.technologies}::jsonb)->>'icon' AS icon,
             COUNT(*) AS count
      FROM ${portfolios}
      GROUP BY name, icon
      ORDER BY count DESC;
    `);

  return technologies.rows.map((tech: Record<string, unknown>) => ({
    name: tech.name as string,
    icon: tech.icon as string,
    count: Number(tech.count),
  }));
};

export const getAvailableYearsAndMonths = async (): Promise<
  { year: number; months: number[] }[]
> => {
  const result = await db.execute(sql`
    SELECT DISTINCT EXTRACT(YEAR FROM realized_at) AS year,
           ARRAY_AGG(DISTINCT EXTRACT(MONTH FROM realized_at)) AS months
    FROM ${portfolios}
    GROUP BY year
    ORDER BY year DESC;
  `);

  return result.rows.map((row: Record<string, unknown>) => ({
    year: row.year as number,
    months: row.months as number[],
  }));
};
