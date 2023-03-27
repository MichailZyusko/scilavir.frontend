'use client';

import { TUser } from '@/types';
import { createContext, useContext } from 'react';

type TAuthContext = {
  user: TUser | null;
  signIn: Function;
  signOut: Function;
};

export const AuthContext = createContext<TAuthContext>({
  user: null,
  signIn: () => { },
  signOut: () => { },
});

export const useAuthContext = () => useContext(AuthContext);
