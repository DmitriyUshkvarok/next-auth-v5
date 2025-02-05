import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';
import NextAuth, { DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: string;
    role?: string;
    provider?: string;
    device?: string;
    twoFactorActivated?: boolean;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
      provider?: string;
      twoFactorActivated?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends User {
    id: string;
    role?: string;
    provider?: string;
    twoFactorActivated?: boolean;
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
        token.twoFactorActivated = user.twoFactorActivated;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role;
      session.user.provider = token.provider;
      session.user.device = token.device;
      session.user.twoFactorActivated = token.twoFactorActivated as boolean;

      return session;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          provider: user.provider,
          device: user.device ?? undefined,
          twoFactorActivated: user.twoFactorActivated ?? undefined,
        };
      },
    }),
  ],
});
