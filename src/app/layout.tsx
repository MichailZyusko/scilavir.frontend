import { PropsWithChildren } from 'react';
import './globals.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
