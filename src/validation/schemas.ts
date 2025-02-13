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

export function validateWithZodSchema(schema: ZodSchema, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
