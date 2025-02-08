// export { auth as middleware } from '../auth';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(request);
  // Ваша логика middleware
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Укажите пути, которые должны обрабатываться middleware
};
