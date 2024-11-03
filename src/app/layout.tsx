import { Footer } from '@/ui-kit/nav/footer';
import { Header } from '@/ui-kit/nav/header';
import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
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
    <ClerkProvider dynamic localization={ruRU}>
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
                limit={3}
                stacked
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

export const metadata: Metadata = {
  title: 'Мир бумаги',
};
