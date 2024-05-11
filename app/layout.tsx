import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter: NextFontWithVariable = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading: NextFontWithVariable = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'NextKit',
  description: 'Next.js + TypeScript SaaS Starter',
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SaaS', 'Starter', 'Kit'],
  authors: [
    {
      name: 'Peng-Yu Chen',
      url: 'https://pengyuc.com',
    },
    {
      name: 'shadcn',
      url: 'https://shadcn.com',
    },
  ],
  creator: 'Peng-Yu Chen',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
