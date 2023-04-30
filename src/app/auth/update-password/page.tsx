'use client';

import axios from 'axios';
import { TextInput } from '@/ui-kit/inputs';
import { useRouter } from 'next/navigation';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function SignUp() {
  const hookFormMethods = useForm();
  const router = useRouter();

  useEffect(() => {
    const hashArray = window.location.hash
      .substring(1)
      .split('&')
      .map((item) => item.split('='))
      .reduce((acc, [key, value]) => {
        // eslint-disable-next-line no-param-reassign
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
    } = hashArray;

    if (accessToken && refreshToken) {
      localStorage.setItem('a-token', accessToken);
      localStorage.setItem('r-token', refreshToken);
    }
  }, []);

  const onSubmit = async (fieldValues: FieldValues) => {
    await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/update-password`,
      data: {
        ...fieldValues,
        accessToken: localStorage.getItem('a-token'),
        refreshToken: localStorage.getItem('r-token'),
      },
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('r-token')}`,
      },
    });

    router.push('/');
  };

  return (
    <main>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
          <TextInput
            label="Password"
            name="password"
            type="password"
          />
          <TextInput
            label="Confirm password"
            name="confirm-password"
            type="password"
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </FormProvider>
    </main>
  );
}
