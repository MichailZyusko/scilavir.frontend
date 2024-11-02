'use client';

import axios from '@/api/axios';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserService } from '@/api/services/users.service';

/*
  * DEPRECATED
  * TODO: Remove this hook later
*/
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const u = await UserService.self();

      setUser(u);
    })();
  }, []);

  const signIn = async (fieldValues: FieldValues) => {
    const { data } = await axios.post<{ accessToken: string, refreshToken: string }>('/auth/sign-in', fieldValues);

    localStorage.setItem('a-token', data.accessToken);
    localStorage.setItem('r-token', data.refreshToken);

    router.back();
  };

  const signOut = async () => {
    const { status } = await axios.delete('/auth/sign-out');

    localStorage.removeItem('a-token');
    localStorage.removeItem('r-token');

    return status;
  };

  return { user, signIn, signOut };
};
