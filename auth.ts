import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';
import NextAuth, { DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import 'next-auth/jwt';
import { authenticator } from 'otplib';

declare module 'next-auth' {
  interface User {
    id?: string;
    role?: string;
    provider?: string;
    device?: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
      provider?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends User {
    id: string;
    role?: string;
    provider?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.provider = user.provider;
        token.device = user.device;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role;
      session.user.provider = token.provider;
      session.user.device = token.device;

      return session;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        token: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (user.twoFactorActivated) {
          const tokenValid = authenticator.check(
            credentials.token as string,
            user.twoFactorSecret ?? ''
          );

          if (!tokenValid) {
            throw new Error('Incorrect OTP');
          }
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          provider: user.provider,
          device: user.device ?? undefined,
        };
      },
    }),
  ],
});
