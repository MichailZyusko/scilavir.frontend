'use client';

import axios from '@/api/axios';
import { useAppDispatch } from '@/redux/hooks';
import { TextInput } from '@/ui-kit/inputs';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { signIn } from '../auth.slice';

export default function SignIn() {
  const hookFormMethods = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (fieldValues: FieldValues) => {
    const { data } = await axios.post<{ accessToken: string, refreshToken: string }>('/auth/sign-in', fieldValues);

    dispatch(signIn(data));
  };

  console.log(process.env.NEXT_PUBLIC_BASE_API_URL);

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
