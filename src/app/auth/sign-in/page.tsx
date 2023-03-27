'use client';

import { TextInput } from '@/ui-kit/inputs';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useAuthContext } from '@/context/auth';

export default function SignIn() {
  const hookFormMethods = useForm();
  const { signIn } = useAuthContext();

  const onSubmit = async (fieldValues: FieldValues) => {
    await signIn(fieldValues);
  };

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
