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
import { and, eq } from 'drizzle-orm';
import { auth, signIn, signOut } from '../../auth';
import { headers } from 'next/headers';
import { randomBytes } from 'crypto';
import { passwordResetTokens } from '@/db/schema/passwordResetTokensSchema';
import { passwordResetSchema } from '@/validation/schemas';
import { mailer } from '@/lib/email';
import { authenticator } from 'otplib';
import speakeasy from 'speakeasy';
import { Account, Profile, User } from 'next-auth';
import { accounts } from '@/db/schema/accountSchema';

type ResponseStatus = {
  success?: false;
  message: string;
  tokenInvalid?: false;
};

export interface OAuthSignInArgs {
  account: Account;
  user: User;
  profile?: Profile;
}

const renderError = (error: unknown): ResponseStatus => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
    success: false,
  };
};

export async function googleAuthenticate({ user, account }: OAuthSignInArgs) {
  try {
    // Проверяем, существует ли пользователь с таким email
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email as string))
      .limit(1)
      .execute();

    if (existingUser) {
      // Если пользователь уже существует, обновляем его данные
      await db
        .update(users)
        .set({
          provider: 'google',
          image: user.image,
        })
        .where(eq(users.id, existingUser.id))
        .execute();

      // Проверяем, есть ли уже аккаунт Google в таблице accounts
      const [existingAccount] = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.provider, 'google'),
            eq(accounts.providerAccountId, account.providerAccountId)
          )
        )
        .limit(1)
        .execute();

      if (!existingAccount) {
        // Привязываем аккаунт Google к существующему пользователю только если его нет
        await db.insert(accounts).values({
          userId: existingUser.id.toString(),
          provider: 'google',
          providerAccountId: account.providerAccountId,
          type: 'oauth',
        });
      }
    } else {
      // Если пользователя нет, создаем нового
      const [newUser] = await db
        .insert(users)
        .values({
          id: randomBytes(16).toString('hex'),
          email: user.email,
          provider: 'google',
          role: 'user',
          image: user.image,
        })
        .returning();

      if (newUser?.id) {
        // Привязываем аккаунт Google к новому пользователю
        await db.insert(accounts).values({
          userId: newUser.id.toString(),
          provider: 'google',
          providerAccountId: account.providerAccountId,
          type: 'oauth',
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Google authentication error:', error);
    throw new Error('Google authentication failed');
  }
}

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
      id: randomBytes(16).toString('hex'),
      email: validatedData.email,
      password: hashedPassword,
      provider: 'credentials',
      role: 'user',
      device: userDevice,
      name: 'user',
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
      provider: 'credentials',
      redirect: false,
    });
    return { message: 'User ligin successfully!', success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const preLoginCheck = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      success: false,
      message: 'Incorrect credentials',
    };
  }

  if (!user.password) {
    return {
      success: false,
      message:
        'This account was registered with Google. Please log in using Google authentication.',
    };
  }

  const passwordCorrect = await compare(password, user.password!);
  if (!passwordCorrect) {
    return {
      success: false,
      message: 'Incorrect credentials',
    };
  }

  return {
    twoFactorActivated: user.twoFactorActivated,
    success: true,
  };
};

// export const preLoginCheck = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   const [user] = await db.select().from(users).where(eq(users.email, email));

//   if (!user) {
//     return {
//       success: false,
//       message: 'Incorrect credentials',
//     };
//   } else {
//     const passwordCorrect = await compare(password, user.password!);
//     if (!passwordCorrect) {
//       return {
//         success: false,
//         message: 'Incorrect credentials',
//       };
//     }
//   }

//   return {
//     twoFactorActivated: user.twoFactorActivated,
//     success: true,
//   };
// };

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
      .where(eq(users.id, session.user.id));

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
      .where(eq(users.id, session.user.id));

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
        id: randomBytes(16).toString('hex'),
        userId: user.id.toString(),
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
      from: process.env.NEXT_PUBLIC_UKR_NET_EMAIL_USER,
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
        .where(eq(users.id, passwordResetToken.userId!.toString()));

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
      success: false,
      message: 'Unauthorized',
    };
  }

  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

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
      .where(eq(users.id, session.user.id));
  }

  return {
    twoFactorSecret: authenticator.keyuri(
      session.user.email ?? '',
      'Next-Auth-V-5',
      twoFactorSecret
    ),
    success: true,
  };
};

export const activate2fa = async (token: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  if (user.twoFactorSecret) {
    const tokenValid = authenticator.check(token, user.twoFactorSecret);

    if (!tokenValid) {
      return {
        success: false,
        message: 'Invalid OTP',
      };
    }

    await db
      .update(users)
      .set({
        twoFactorActivated: true,
      })
      .where(eq(users.id, session.user.id));
  }
  return {
    success: true,
    message: 'successful two factor activated',
  };
};

export const disable2fa = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  await db
    .update(users)
    .set({
      twoFactorActivated: false,
    })
    .where(eq(users.id, session.user.id));
};
