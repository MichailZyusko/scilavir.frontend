import { Footer } from '@/ui-kit/nav/footer';
import { Header } from '@/ui-kit/nav/header';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import Providers from './providers';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['600', '400'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <Providers>
        <body className={clsx(
          'flex flex-col justify-between',
          inter.className,
        )}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
