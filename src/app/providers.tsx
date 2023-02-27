'use client';

import { PropsWithChildren } from 'react';
import ReduxProvider from './redux-provider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
