import { z } from 'zod';
import { imageSchema } from './schemas';

export const updateHomePageNavigationSchema = z.object({
  navigations: z.array(
    z.object({
      name: z
        .string()
        .min(2, 'The name must contain a minimum of 2 characters'),
      url: z
        .string()
        .url('Incorrect URL')
        .max(12, 'The name must contain a maximum of 20 characters'),
    })
  ),
});

export const updateHomePageHeroSchema = z
  .object({
    position: z
      .string()
      .min(10, 'The position must contain a minimum of 10 characters')
      .max(100, 'The position must contain a maximum of 100 characters'),
    title: z
      .string()
      .min(5, 'The title must contain a minimum of 5 characters')
      .max(200, 'The title must contain a maximum of 200 characters'),
    developerName: z
      .string()
      .min(5, 'The developer name must contain a minimum of 5 characters')
      .max(60, 'The developer name must contain a maximum of 60 characters'),
    description: z
      .string()
      .min(50, 'The description must contain a minimum of 50 characters')
      .max(
        1000,
        'The description name must contain a maximum of 1000 characters'
      ),
  })
  .merge(imageSchema());

export const updateHomePageSocialSchema = z.object({
  socials: z.array(
    z.object({
      name: z
        .string()
        .min(2, 'The name must contain a minimum of 2 characters')
        .max(100, 'The name must contain a maximum of 100 characters'),
      url: z.string().url('Incorrect URL'),
    })
  ),
});

export const updateHomePageStatisticsSchema = z.object({
  statistics: z.array(
    z.object({
      count: z.coerce
        .number()
        .min(2, 'The count must be at least 2')
        .max(1000000, 'The count must be no more than 1000000')
        .int('The count must be an integer')
        .positive('The count must be a positive number'),

      title: z
        .string()
        .min(2, 'Title must contain a minimum of 2 characters')
        .max(200, 'Title name must contain a maximum of 200 characters'),
    })
  ),
});

export const pdfSchema = z.object({
  resume: z
    .instanceof(File, { message: 'The file must be a PDF' })
    .optional()
    .refine((file) => !file || file.size <= 1024 * 1024, {
      message: 'The file size must be less than 1MB',
    })
    .refine((file) => !file || file.type === 'application/pdf', {
      message: 'The file must be in PDF format',
    }),
});
