import { z, ZodSchema } from 'zod';
import { allowedTechnologies } from '@/utils/technologies';
import { WebsiteType, websiteTypes } from '@/utils/websiteTypes';

export const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  });

export const loginSchema = z.object({
  token: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  });

export const passwordResetSchema = z.object({
  email: z.string().email(),
});

export const updatePasswordSchema = z
  .object({
    token: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  });

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
});

export const imageSchema = () => {
  const maxUploadSize = 1024 * 1024; // 1 MB
  const acceptedFileTypes = ['image/'];

  return z.object({
    image: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= maxUploadSize,
        'File size must be less than 1 MB'
      )
      .refine(
        (file) =>
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type)),
        'File must be an image'
      ),
  });
};

export const portfolioSchema = z
  .object({
    id: z.string().optional(),
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters long')
      .max(100, 'Title must be at most 100 characters long'),
    description: z
      .string()
      .max(500, 'Description must be at most 500 characters long')
      .optional(),
    websiteUrl: z.string().url('Invalid URL format').optional(),
    githubUrl: z.string().url('Invalid URL format').optional(),
    videoReviewUrlDesktop: z
      .string()
      .url('Invalid video URL format')
      .optional(),
    videoReviewUrlMobile: z.string().url('Invalid video URL format').optional(),
    budget: z.coerce
      .number()
      .min(0, 'Budget cannot be negative')
      .max(1_000_000, 'Budget cannot exceed 1,000,000'),
    order: z.number().int('Order must be an integer').optional().default(0),
    technologies: z
      .array(
        z.object({
          name: z
            .string()
            .min(2, 'Technology name must be at least 2 characters')
            .refine((val) => allowedTechnologies.includes(val), {
              message: `Invalid technology name ${allowedTechnologies.join(', ')}`,
            }),
          icon: z.string().url('Invalid icon URL format'),
        })
      )
      .optional()
      .default([]),
    websiteType: z
      .string()
      .refine((val) => websiteTypes.includes(val as WebsiteType), {
        message: `Invalid website type. Allowed types: ${websiteTypes.join(', ')}`,
      }),
    isCommercial: z.boolean(),
    isPublic: z.boolean(),
    complexity: z.enum(['low', 'medium', 'high']),
    realizedAt: z.date().refine((date) => date <= new Date(), {
      message: 'Release date cannot be in the future',
    }),
  })
  .merge(imageSchema());

export function validateWithZodSchema(schema: ZodSchema, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
