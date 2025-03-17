import { z } from 'zod';

export const updateServicesPageSchema = z.object({
  services: z.array(
    z.object({
      count: z.coerce
        .number()
        .min(1, 'The count must be at least 1')
        .max(100, 'The count must be no more than 100')
        .int('The count must be an integer')
        .positive('The count must be a positive number'),

      title: z.object({
        en: z
          .string()
          .min(2, 'Title must contain a minimum of 2 characters')
          .max(200, 'Title name must contain a maximum of 200 characters'),
        ru: z
          .string()
          .min(2, 'Title must contain a minimum of 2 characters')
          .max(200, 'Title name must contain a maximum of 200 characters'),
        uk: z
          .string()
          .min(2, 'Title must contain a minimum of 2 characters')
          .max(200, 'Title name must contain a maximum of 200 characters'),
      }),
      description: z.object({
        en: z
          .string()
          .min(50, 'The description must contain a minimum of 50 characters')
          .max(
            4000,
            'The description name must contain a maximum of 4000 characters'
          ),
        ru: z
          .string()
          .min(50, 'The description must contain a minimum of 50 characters')
          .max(
            4000,
            'The description name must contain a maximum of 4000 characters'
          ),
        uk: z
          .string()
          .min(50, 'The description must contain a minimum of 50 characters')
          .max(
            4000,
            'The description name must contain a maximum of 4000 characters'
          ),
      }),
    })
  ),
});
