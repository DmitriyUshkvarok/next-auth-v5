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
        .max(100, 'The name must contain a maximum of 100 characters'),
    })
  ),
});

export const resumeExperienceSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must contain a minimum of 2 characters')
    .max(200, 'Title must contain a maximum of 200 characters'),
  description: z
    .string()
    .min(30, 'Description must contain a minimum of 30 characters')
    .max(1000, 'Description must contain a maximum of 1000 characters'),
  experiences: z
    .array(
      z.object({
        start: z
          .string()
          .min(1, 'Start date is required')
          .max(20, 'Start date must contain a maximum of 20 characters'),
        end: z
          .string()
          .min(1, 'End date is required')
          .max(20, 'End date must contain a maximum of 20 characters'),
        position: z
          .string()
          .min(1, 'Position is required')
          .max(100, 'Position must contain a maximum of 100 characters'),
        company: z
          .string()
          .min(1, 'Company name is required')
          .max(100, 'Company name must contain a maximum of 100 characters'),
      })
    )
    .default([]),
});

export const resumeEducationsSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must contain a minimum of 2 characters')
    .max(200, 'Title must contain a maximum of 200 characters'),
  description: z
    .string()
    .min(30, 'Description must contain a minimum of 30 characters')
    .max(1000, 'Description must contain a maximum of 1000 characters'),
  educations: z
    .array(
      z.object({
        start: z
          .string()
          .min(1, 'Start date is required')
          .max(20, 'Start date must contain a maximum of 20 characters'),
        end: z
          .string()
          .min(1, 'End date is required')
          .max(20, 'End date must contain a maximum of 20 characters'),
        course: z
          .string()
          .min(1, 'Course is required')
          .max(100, 'Course must contain a maximum of 100 characters'),
        typeCourse: z
          .string()
          .min(1, 'Type Course name is required')
          .max(100, 'Type Course must contain a maximum of 100 characters'),
      })
    )
    .default([]),
});
