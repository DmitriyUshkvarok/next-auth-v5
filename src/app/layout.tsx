import type { Metadata } from 'next';
import './globals.css';
import { Aboreto, Poppins, Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/theme-provider';
import NextAuthProvider from '@/providers/nextAuthProvider';

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

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      <body
        className={`${poppins.variable} ${aboreto.variable} ${montserrat.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <main>{children}</main>
          </NextAuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
