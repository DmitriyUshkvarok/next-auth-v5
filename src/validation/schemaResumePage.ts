import { z } from 'zod';

export const updateResumeSidebarTextSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must contain a minimum of 2 characters')
    .max(200, 'Title name must contain a maximum of 200 characters'),
  description: z
    .string()
    .min(30, 'The description must contain a minimum of 30 characters')
    .max(
      1000,
      'The description name must contain a maximum of 1000 characters'
    ),
});

export const updateResumePageNavigationSchema = z.object({
  navigations: z.array(
    z.object({
      name: z
        .string()
        .min(2, 'The name must contain a minimum of 2 characters'),
      url: z
        .string()
        .url('Incorrect URL')
        .max(50, 'The name must contain a maximum of 50 characters'),
    })
  ),
});
