import db from '@/db/drizzle';
import { users } from '@/db/schema/userSchema';
import { eq } from 'drizzle-orm';
import NextAuth, { DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import 'next-auth/jwt';
import { authenticator } from 'otplib';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { googleAuthenticate } from '@/action/authActions';
import { accounts } from '@/db/schema/accountSchema';
import { sessions } from '@/db/schema/sessionSchema';

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
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    usersTable: users,
    sessionsTable: sessions,
  }),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        await googleAuthenticate({ user, account, profile });
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.provider = user.provider;
        token.device = user.device;
        token.image = user.image;
        token.name = user.name;
      }

      return token;
    },
    session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.provider = token.provider;
        session.user.device = token.device;
        session.user.image = token.image;
        session.user.name = token.name;
      }

      return session;
    },
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
          image: user.image,
          name: user.name,
        };
      },
    }),
  ],
});
