'use client';

import { Footer } from '@/ui-kit/nav/footer';
import { Header } from '@/ui-kit/nav/header';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { AuthContext } from '@/context/auth';
import { useAuth } from '@/hooks/useAuth';
import Providers from './providers';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['600', '400', '200'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  const auth = useAuth();

  return (
    <html lang="ru">
      <Providers>
        <AuthContext.Provider value={auth}>
          <body
            className={clsx(
              'flex flex-col justify-between scroll-smooth h-screen',
              inter.className,
            )}
          >
            <Header />
            {children}
            <Footer />
          </body>
        </AuthContext.Provider>
      </Providers>
    </html>
  );
}
