'use server';
import {
  changePasswordSchema,
  formSchema,
  loginSchema,
  updatePasswordSchema,
} from '@/validation/schemas';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '../db/drizzle';
import { users } from '../db/schema/userSchema';
import { compare, hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { auth, signIn, signOut } from '../../auth';
import { headers } from 'next/headers';
import { randomBytes } from 'crypto';
import { passwordResetTokens } from '@/db/schema/passwordResetTokensSchema';
import { passwordResetSchema } from '@/validation/schemas';
import { mailer } from '@/lib/email';
import { authenticator } from 'otplib';
import speakeasy from 'speakeasy';

type ResponseStatus = {
  success?: false;
  message: string;
  tokenInvalid?: false;
};

const renderError = (error: unknown): ResponseStatus => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
    success: false,
  };
};

export const registerUser = async (data: z.infer<typeof formSchema>) => {
  const headersFromDevice = await headers();
  const userDevice = headersFromDevice.get('user-agent');
  try {
    const validatedData = validateWithZodSchema(formSchema, data);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email));

    if (existingUser.length > 0) {
      return {
        success: false,
        message: 'This email is already in use. Try another one.',
      };
    }

    const hashedPassword = await hash(validatedData.password, 10);

    await db.insert(users).values({
      email: validatedData.email,
      password: hashedPassword,
      provider: 'credentials',
      role: 'user',
      device: userDevice,
    });

    return {
      success: true,
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

export const changePassword = async (
  data: z.infer<typeof changePasswordSchema>
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'You must be logged in to change your password.',
    };
  }

  try {
    const changePasswordValidation = validateWithZodSchema(
      changePasswordSchema,
      data
    );

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(session.user.id)));

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const passwordMatch = await compare(
      changePasswordValidation.currentPassword,
      user.password!
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: 'Current password is incorrect',
      };
    }

    const isSamePassword = await compare(
      changePasswordValidation.password,
      user.password!
    );
    if (isSamePassword) {
      return {
        success: false,
        message: 'New password cannot be the same as the current password.',
      };
    }

    const hashedPassword = await hash(changePasswordValidation.password, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, parseInt(session.user.id)));

    return { success: true, message: 'Your password has been updated.' };
  } catch (error) {
    return renderError(error);
  }
};

export const passwordReset = async (
  emailAddress: z.infer<typeof passwordResetSchema>
) => {
  const session = await auth();

  if (!!session?.user?.id) {
    return {
      success: false,
      message: 'You are already logged in',
    };
  }
  const resetPasswordValidation = validateWithZodSchema(
    passwordResetSchema,
    emailAddress
  );
  try {
    const [user] = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, resetPasswordValidation.email));

    if (!user) {
      return {
        success: false,
        message: 'If this email exists, we have sent a password reset link.',
      };
    }

    const passwordResetToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 3600000);

    await db
      .insert(passwordResetTokens)
      .values({
        userId: user.id,
        token: passwordResetToken,
        tokenExpiry,
      })
      .onConflictDoUpdate({
        target: passwordResetTokens.userId,
        set: {
          token: passwordResetToken,
          tokenExpiry,
        },
      });

    const resetLink = `${process.env.SITE_BASE_URL}/update-password?token=${passwordResetToken}`;

    await mailer.sendMail({
      from: 'test@resend.dev',
      subject: 'Your password reset request',
      to: resetPasswordValidation.email,
      html: `Hey, ${resetPasswordValidation.email}! You requested to reset your password.
  Here's your password reset link. This link will expire in 1 hour:
  <a href="${resetLink}">${resetLink}</a>`,
    });

    return {
      success: true,
      message: 'If this email exists, we have sent a password reset link.',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const updatePassword = async (
  data: z.infer<typeof updatePasswordSchema>
) => {
  const session = await auth();

  if (session?.user?.id) {
    return {
      success: false,
      message: 'Already logged in. Please log out to reset your password.',
    };
  }

  try {
    const passwordValidation = validateWithZodSchema(
      updatePasswordSchema,
      data
    );

    let tokenIsValid = false;

    if (passwordValidation.token) {
      const [passwordResetToken] = await db
        .select()
        .from(passwordResetTokens)
        .where(eq(passwordResetTokens.token, passwordValidation.token));

      const now = Date.now();

      if (
        !!passwordResetToken?.tokenExpiry &&
        now < passwordResetToken.tokenExpiry.getTime()
      ) {
        tokenIsValid = true;
      }

      if (!tokenIsValid) {
        return {
          success: false,
          message: 'Your token is invalid or has expired',
          tokenInvalid: true,
        };
      }

      const hashedPassword = await hash(passwordValidation.password, 10);
      await db
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, passwordResetToken.userId!));

      await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, passwordResetToken.id));
    }

    return { success: true, message: 'Your password has been updated' };
  } catch (error) {
    return renderError(error);
  }
};

export const get2faSecret = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)));

  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  let twoFactorSecret = user.twoFactorSecret;

  const token1Test = authenticator.generateSecret();
  // if authenticator.generateSecret doesn't work, try this line instead:
  // note you'll need to `npm i speakeasy && npm i -D @types/speakeasy`
  const generatedSecret = speakeasy.generateSecret({ length: 10 });
  const token2Test = generatedSecret.base32;

  console.log({ token1Test });
  console.log({ token2Test });

  if (!twoFactorSecret) {
    twoFactorSecret = authenticator.generateSecret();
    await db
      .update(users)
      .set({
        twoFactorSecret,
      })
      .where(eq(users.id, parseInt(session.user.id)));
  }

  return {
    twoFactorSecret: authenticator.keyuri(
      session.user.email ?? '',
      'Next-Auth-V-5',
      twoFactorSecret
    ),
  };
};
