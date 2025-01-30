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
  }
  interface Session extends DefaultSession {
    user?: {
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
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role;
      session.user.provider = token.provider;

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

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          provider: user.provider,
        };
      },
    }),
  ],
});
