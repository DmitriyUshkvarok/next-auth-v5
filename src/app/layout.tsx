import type { Metadata } from 'next';
import './globals.css';
import { Aboreto, Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '700'],
});

const aboreto = Aboreto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-aboreto',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Next Auth v5',
  description: 'create-next-app with NextAuth v5',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${aboreto.variable}`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
