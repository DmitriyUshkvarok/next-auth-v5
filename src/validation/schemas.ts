import { z, ZodSchema } from 'zod';

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

export function validateWithZodSchema(schema: ZodSchema, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
