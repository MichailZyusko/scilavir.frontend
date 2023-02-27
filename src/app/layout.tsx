import { PropsWithChildren } from 'react';
import './globals.css';
import Providers from './providers';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <Providers>
        <body>
          {children}
        </body>
      </Providers>
    </html>
  );
}
