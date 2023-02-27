'use client';

import axios from '@/api/axios';
import { TextInput } from '@/ui-kit/inputs';
import { useRouter } from 'next/navigation';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

export default function SignUp() {
  const hookFormMethods = useForm();
  const router = useRouter();

  const onSubmit = async (fieldValues: FieldValues) => {
    const { data } = await axios.post('/auth/sign-up', fieldValues);
    console.log('🚀 ~ file: page.tsx:12 ~ onSubmit ~ data:', data);

    router.push('/auth/registration');
  };

  return (
    <main>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
          <TextInput
            label="First name"
            name="firstName"
          />
          <TextInput
            label="Last name"
            name="lastName"
          />
          <TextInput
            label="Phone"
            name="phone"
          />
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
