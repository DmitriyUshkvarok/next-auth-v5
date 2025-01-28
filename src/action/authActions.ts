'use server';
import { formSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '../db/drizzle';
import { users } from '../db/schema/userSchema';
import { hash } from 'bcryptjs';

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};

export const registerUser = async (data: z.infer<typeof formSchema>) => {
  try {
    const validatedData = validateWithZodSchema(formSchema, data);

    const hashedPassword = await hash(validatedData.password, 10);

    await db.insert(users).values({
      email: validatedData.email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully!',
    };
  } catch (error) {
    return renderError(error);
  }
};
