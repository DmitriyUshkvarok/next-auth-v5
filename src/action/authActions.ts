'use server';
import { formSchema, loginSchema } from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '../db/drizzle';
import { users } from '../db/schema/userSchema';
import { compare, hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { signIn, signOut } from '../../auth';

type ResponseStatus = { success?: false; message: string };

const renderError = (error: unknown): ResponseStatus => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
    success: false,
  };
};

export const registerUser = async (data: z.infer<typeof formSchema>) => {
  try {
    const validatedData = validateWithZodSchema(formSchema, data);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email));

    if (existingUser.length > 0) {
      return { message: 'This email is already in use. Try another one.' };
    }

    const hashedPassword = await hash(validatedData.password, 10);

    await db.insert(users).values({
      email: validatedData.email,
      password: hashedPassword,
      provider: 'credentials',
      role: 'user',
    });

    return {
      message: 'User registered successfully!',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const loginWithCredentials = async (
  data: z.infer<typeof loginSchema>
) => {
  try {
    const loginValidation = validateWithZodSchema(loginSchema, data);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, loginValidation.email))
      .limit(1)
      .execute();

    if (user.length === 0) {
      return { message: 'Incorrect email or password', success: false };
    }

    const isPasswordValid = await compare(
      loginValidation.password,
      user[0].password!
    );

    if (!isPasswordValid) {
      return { message: 'Incorrect email or password', success: false };
    }

    await signIn('credentials', {
      email: loginValidation.email,
      password: loginValidation.password,
      token: loginValidation.token,
      redirect: false,
    });
    return { message: 'User ligin successfully!', success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const logout = async () => {
  await signOut();
};
