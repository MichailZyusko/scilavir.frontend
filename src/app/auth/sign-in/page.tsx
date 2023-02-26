'use client';

import axios from '@/api/axios';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TextInput } from '@/ui-kit/inputs';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

export default function SignIn() {
  const hookFormMethods = useForm();
  const [aToken, setAToken] = useLocalStorage('a-token');
  const [rToken, setRToken] = useLocalStorage('r-token');

  const onSubmit = async (fieldValues: FieldValues) => {
    // const { data } = await axios.post<{ accessToken: string, refreshToken: string }>('/auth/sign-in', fieldValues);

    // setAToken(data.accessToken);
    // setRToken(data.refreshToken);

    const { data } = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${aToken}`,
      },
    });
    console.log('🚀 ~ file: page.tsx:24 ~ onSubmit ~ data:', data);
  };

  console.log({ aToken, rToken });

  return (
    <main>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            name="email"
          />
          <TextInput
            label="Password"
            name="password"
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
