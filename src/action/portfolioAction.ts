'use server';
import { portfolioSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '../db/drizzle';
import { portfolios } from '@/db/schema/portfolioSchema';
import { renderError } from './authActions';
import { getAuthUser } from './userProfileActions';
import { uploadImageToBlob } from '@/utils/uploadImage';
import { randomBytes } from 'crypto';

export const createPortfolioProject = async (
  data: z.infer<typeof portfolioSchema>,
  formData: FormData
) => {
  try {
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
