'use server';
import { formSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};

export const registerUser = async (data: z.infer<typeof formSchema>) => {
  try {
    const validatedData = validateWithZodSchema(formSchema, data);
    console.log('Validated Data:', validatedData);

    return {
      message: 'User registered successfully!',
    };
  } catch (error) {
    return renderError(error);
  }
};
