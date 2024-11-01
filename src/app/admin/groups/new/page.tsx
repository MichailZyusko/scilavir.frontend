'use client';

import { useClerkToken } from '@/context/auth';
import { Button } from '@/ui-kit/buttons';
import { FileInput, TextInput } from '@/ui-kit/inputs';
import { Loader } from '@/ui-kit/spinners';
import { User } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'src/api/axios';

type TState = {
  isLoading: boolean;
  isAdmin: boolean;
};
export default function NewProduct() {
  const { updateClerkToken } = useClerkToken();
  const hookFormMethods = useForm();

  const [state, setState] = useState<TState>({
    isLoading: true,
    isAdmin: false,
  });

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const { data: user } = await axios.get<User>('/users/self');

      setState({
        isLoading: false,
        isAdmin: !!user.publicMetadata?.isAdmin,
      });
    })();
  }, [updateClerkToken]);

  if (state.isLoading) {
    return <Loader />;
  }

  if (!state.isAdmin) {
    return <h1>You are not admin</h1>;
  }

  const onSubmit = async (data: FieldValues) => {
    await updateClerkToken();
    const { images, ...fields } = data;
    const formData = new FormData();

    [...images].forEach((img) => {
      formData.append('images', img);
    });

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const { status } = await toast.promise(axios.post('/groups', formData), {
      pending: 'Создаем подборку...',
      success: 'Подборка создан',
      error: 'Ошибка при создании подборки',
    });

    if (status === 201) {
      window.location.reload();
    }
  };

  return (
    <main className="flex flex-auto justify-center container mx-auto px-4 pb-8">
      <FormProvider {...hookFormMethods}>
        <form
          onSubmit={hookFormMethods.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          <TextInput
            label="Название подборки"
            id="name"
            name="name"
            placeholder="Для школы"
          />
          <TextInput
            label="Описание подборки"
            id="description"
            name="description"
            placeholder="Здесь вы можете найти самые популярные товары для школы"
          />
          <FileInput
            name="images"
          />
          <Button type="submit">
            Создать новую подборку
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
