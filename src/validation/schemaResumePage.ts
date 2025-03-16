import { z } from 'zod';

export const updateResumeSidebarTextSchema = z.object({
  title: z.object({
    en: z
      .string()
      .min(2, 'Title must contain a minimum of 2 characters')
      .max(200, 'Title must contain a maximum of 200 characters'),
    ru: z
      .string()
      .min(2, 'Заголовок должен содержать минимум 2 символа')
      .max(200, 'Заголовок должен содержать максимум 200 символов'),
    uk: z
      .string()
      .min(2, 'Заголовок повинен містити мінімум 2 символи')
      .max(200, 'Заголовок повинен містити максимум 200 символів'),
  }),
  description: z.object({
    en: z
      .string()
      .min(30, 'Description must contain a minimum of 30 characters')
      .max(1000, 'Description must contain a maximum of 1000 characters'),
    ru: z
      .string()
      .min(30, 'Описание должно содержать минимум 30 символов')
      .max(1000, 'Описание должно содержать максимум 1000 символов'),
    uk: z
      .string()
      .min(30, 'Опис повинен містити мінімум 30 символів')
      .max(1000, 'Опис повинен містити максимум 1000 символів'),
  }),
});

export const updateResumePageNavigationSchema = z.object({
  navigations: z.array(
    z.object({
      name: z.object({
        en: z
          .string()
          .min(2, 'The name must contain a minimum of 2 characters'),
        ru: z
          .string()
          .min(2, 'The name must contain a minimum of 2 characters'),
        uk: z
          .string()
          .min(2, 'The name must contain a minimum of 2 characters'),
      }),
      url: z
        .string()
        .url('Incorrect URL')
        .max(100, 'The name must contain a maximum of 100 characters'),
    })
  ),
});

export const resumeExperienceSchema = z.object({
  title: z.object({
    en: z
      .string()
      .min(2, 'Title must contain a minimum of 2 characters')
      .max(200, 'Title must contain a maximum of 200 characters'),
    ru: z
      .string()
      .min(2, 'Заголовок должен содержать минимум 2 символа')
      .max(200, 'Заголовок должен содержать максимум 200 символов'),
    uk: z
      .string()
      .min(2, 'Заголовок повинен містити мінімум 2 символи')
      .max(200, 'Заголовок повинен містити максимум 200 символів'),
  }),
  description: z.object({
    en: z
      .string()
      .min(30, 'Description must contain a minimum of 30 characters')
      .max(1000, 'Description must contain a maximum of 1000 characters'),
    ru: z
      .string()
      .min(30, 'Описание должно содержать минимум 30 символов')
      .max(1000, 'Описание должно содержать максимум 1000 символов'),
    uk: z
      .string()
      .min(30, 'Опис повинен містити мінімум 30 символів')
      .max(1000, 'Опис повинен містити максимум 1000 символів'),
  }),
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
        position: z.object({
          en: z
            .string()
            .min(1, 'Position is required')
            .max(100, 'Position must contain a maximum of 100 characters'),
          ru: z
            .string()
            .min(1, 'Position is required')
            .max(100, 'Position must contain a maximum of 100 characters'),
          uk: z
            .string()
            .min(1, 'Позиція обов’язкова')
            .max(100, 'Позиція повинна містити максимум 100 символів'),
        }),
        company: z.object({
          en: z
            .string()
            .min(1, 'Company name is required')
            .max(100, 'Company name must contain a maximum of 100 characters'),
          ru: z
            .string()
            .min(1, 'Назва компании обязательна')
            .max(100, 'Назва компании должна содержать максимум 100 символов'),
          uk: z
            .string()
            .min(1, 'Назва компанії обов’язкова')
            .max(100, 'Назва компанії повинна містити максимум 100 символів'),
        }),
      })
    )
    .default([]),
});

export const resumeEducationsSchema = z.object({
  title: z.object({
    en: z
      .string()
      .min(2, 'Title must contain a minimum of 2 characters')
      .max(200, 'Title must contain a maximum of 200 characters'),
    ru: z
      .string()
      .min(2, 'Заголовок должен содержать минимум 2 символа')
      .max(200, 'Заголовок должен содержать максимум 200 символов'),
    uk: z
      .string()
      .min(2, 'Заголовок повинен містити мінімум 2 символи')
      .max(200, 'Заголовок повинен містити максимум 200 символів'),
  }),
  description: z.object({
    en: z
      .string()
      .min(30, 'Description must contain a minimum of 30 characters')
      .max(1000, 'Description must contain a maximum of 1000 characters'),
    ru: z
      .string()
      .min(30, 'Описание должно содержать минимум 30 символов')
      .max(1000, 'Описание должно содержать максимум 1000 символов'),
    uk: z
      .string()
      .min(30, 'Опис повинен містити мінімум 30 символів')
      .max(1000, 'Опис повинен містити максимум 1000 символів'),
  }),
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
        course: z.object({
          en: z
            .string()
            .min(1, 'Course is required')
            .max(100, 'Course must contain a maximum of 100 characters'),
          ru: z
            .string()
            .min(1, 'Курс обязателен')
            .max(100, 'Курс должен содержать максимум 100 символов'),
          uk: z
            .string()
            .min(1, 'Курс обов’язковий')
            .max(100, 'Курс повинен містити максимум 100 символів'),
        }),
        typeCourse: z.object({
          en: z
            .string()
            .min(1, 'Type of course is required')
            .max(
              100,
              'Type of course must contain a maximum of 100 characters'
            ),
          ru: z
            .string()
            .min(1, 'Тип курса обязателен')
            .max(100, 'Тип курса должен содержать максимум 100 символов'),
          uk: z
            .string()
            .min(1, 'Тип курсу обов’язковий')
            .max(100, 'Тип курсу повинен містити максимум 100 символів'),
        }),
      })
    )
    .default([]),
});

export const resumeSkillsSchema = z.object({
  title: z.object({
    en: z
      .string()
      .min(2, 'Title must contain a minimum of 2 characters')
      .max(200, 'Title must contain a maximum of 200 characters'),
    ru: z
      .string()
      .min(2, 'Заголовок должен содержать минимум 2 символа')
      .max(200, 'Заголовок должен содержать максимум 200 символов'),
    uk: z
      .string()
      .min(2, 'Заголовок повинен містити мінімум 2 символи')
      .max(200, 'Заголовок повинен містити максимум 200 символів'),
  }),
  description: z.object({
    en: z
      .string()
      .min(30, 'Description must contain a minimum of 30 characters')
      .max(1000, 'Description must contain a maximum of 1000 characters'),
    ru: z
      .string()
      .min(30, 'Описание должно содержать минимум 30 символов')
      .max(1000, 'Описание должно содержать максимум 1000 символов'),
    uk: z
      .string()
      .min(30, 'Опис повинен містити мінімум 30 символів')
      .max(1000, 'Опис повинен містити максимум 1000 символів'),
  }),
  skills: z
    .array(
      z.object({
        skillName: z.object({
          en: z
            .string()
            .min(1, 'Skill Name is required')
            .max(100, 'Skill Name must contain a maximum of 100 characters'),
          ru: z
            .string()
            .min(1, 'Название навыка обязательно')
            .max(100, 'Название навыка должно содержать максимум 100 символов'),
          uk: z
            .string()
            .min(1, 'Назва навику обов’язкова')
            .max(100, 'Назва навику повинна містити максимум 100 символів'),
        }),
      })
    )
    .default([]),
});
