'use client';

import { TextInput } from '@/ui-kit/inputs';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/ui-kit/buttons';

export default function SignIn() {
  const hookFormMethods = useForm();

  const onSubmit = async (fieldValues: FieldValues) => {
    console.log('🚀 ~ file: page.tsx:13 ~ fieldValues:', fieldValues);
  };

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="flex w-2/5 flex-col items-center justify-center ">
        <h1 className="text-3xl">Вход</h1>
        <p className="my-5 wrap text-center">Добро пожаловать! Войдите в уже существующий аккаунт или вы можете зарегистрироваться здесь.</p>
        <FormProvider {...hookFormMethods}>
          <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
            <TextInput
              label="Почта"
              placeholder="E-mail"
              name="email"
            />
            <TextInput
              label="Пароль"
              placeholder="Пароль"
              name="password"
              type="password"
            />
            <div>
              <Link href="/auth/reset-password" className="underline text-blue-700">
                Забыли пароль?
              </Link>
            </div>

            <Button type="submit">
              Войти
            </Button>
          </form>
        </FormProvider>
      </div>

    </main>
  );
}
