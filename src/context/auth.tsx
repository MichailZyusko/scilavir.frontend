'use client';

import axios from 'src/api/axios';
import { useAuth } from '@clerk/nextjs';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';

type TClerkTokenProvider = {
  updateClerkToken: () => Promise<void>;
};
const AuthContext = createContext<TClerkTokenProvider>({
  updateClerkToken: async () => { },
});

export function ClerkTokenProvider({ children }: PropsWithChildren) {
  const { getToken } = useAuth();

  const updateClerkToken = useCallback(async () => {
    const clerkAuthToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${clerkAuthToken}`;
  }, [getToken]);

  const memoisedValue = useMemo(() => ({ updateClerkToken }), [updateClerkToken]);

  return (
    <AuthContext.Provider value={memoisedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useClerkToken = () => useContext(AuthContext);
