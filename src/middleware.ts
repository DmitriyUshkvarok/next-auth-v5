// export { auth as middleware } from '../auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware(routing);

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
