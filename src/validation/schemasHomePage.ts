import { z } from 'zod';

export const updateHomePageNavigationSchema = z.object({
  navigations: z.array(
    z.object({
      name: z
        .string()
        .min(2, 'The name must contain a minimum of 2 characters'),
      url: z.string().url('Incorrect URL'),
    })
  ),
});
