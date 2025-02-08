import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center relative bg-[url('/banner-next-auth.png')] bg-no-repeat bg-center bg-cover min-h-screen">
      <Card className="relative w-full max-w-[700px] bg-transparent">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[7px] rounded-lg"></div>
        <CardHeader className="relative z-10">
          <h2 className="no-copy font-heading text-pink-700 text-3xl font-bold text-center">
            User Authentication and Security
          </h2>
        </CardHeader>
        <CardDescription className="h-60 overflow-auto p-4 text-neutral-300 text-[18px] leading-relaxed relative z-10 no-scrollbar">
          <p>
            This platform implements a robust authentication system using{' '}
            <strong>Auth.js 5</strong> with support for both{' '}
            <strong>Credentials</strong> and{' '}
            <strong>Google Authentication</strong>. After successfully
            registering or logging in, users are able to manage their profile
            and settings.
          </p>
          <p className="mt-3">
            Users can securely reset their passwords through an email link with
            a unique token. Additionally, registered users can enable or disable{' '}
            <strong>Two-Factor Authentication (2FA)</strong> using{' '}
            <strong>Speakeasy</strong> and <strong>OTPLib</strong> in
            conjunction with the <strong>Google Authenticator</strong> app,
            which generates a six-digit code for authentication.
          </p>
          <p className="mt-3">
            If a user registers using Google, they will not have access to
            change their password or enable/disable two-factor authentication,
            making the user experience more streamlined.
          </p>
          <p className="mt-3">
            All user data is validated using the <strong>Zod</strong> library to
            ensure proper input, while the <strong>ShadCN</strong> library is
            used for building responsive and clean user interface components.
          </p>
          <p className="mt-3">
            The platform uses <strong>Neon</strong> as a serverless PostgreSQL
            database, which is optimized for edge environments. It integrates
            seamlessly with <strong>Drizzle ORM</strong> for efficient database
            interaction in the server-side environment using edge functions,
            ensuring fast and scalable performance for the authentication
            system.
          </p>
        </CardDescription>
        <CardContent className="mt-4 relative z-10">
          <div className="flex justify-center items-center gap-4">
            <Button
              size="lg"
              className="login-btn trasform transition duration-400 ease-in-out hover:scale-[1.02]"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="lg"
              className="registr-btn trasform transition duration-400 ease-in-out hover:scale-[1.02]"
              asChild
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-xs text-gray-600 py-2 relative z-10">
          © {currentYear} Auth.js V5. All Rights Reserved.
        </CardFooter>
      </Card>
    </div>
  );
}
