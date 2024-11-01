'use client';

import { Footer } from '@/ui-kit/nav/footer';
import { Header } from '@/ui-kit/nav/header';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/clerk-react';
import { ruRU } from '@clerk/localizations';
import { twMerge } from 'tailwind-merge';
import { ClerkTokenProvider } from '@/context/auth';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['600', '500', '400', '300', '200'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider localization={ruRU} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="ru">
        <ClerkTokenProvider>
          <Providers>
            <body
              className={twMerge(
                'flex flex-col justify-between scroll-smooth h-screen',
                inter.className,
              )}
            >
              <Header />
              <ToastContainer
                autoClose={3000}
                position="top-center"
              />
              {children}
              <Footer />
            </body>
          </Providers>
        </ClerkTokenProvider>
      </html>
    </ClerkProvider>
  );
}
