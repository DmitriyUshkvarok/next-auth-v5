import type { Metadata } from 'next';
import './globals.css';
import { Aboreto, Poppins, Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/theme-provider';
import NextAuthProvider from '@/providers/nextAuthProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/routing';

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale || 'en'} suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${aboreto.variable} ${montserrat.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
