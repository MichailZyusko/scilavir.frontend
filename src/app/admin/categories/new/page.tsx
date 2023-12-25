'use client';

import { useClerkToken } from '@/context/auth';
import { Button } from '@/ui-kit/buttons';
import { FileInput, SelectInput, TextInput } from '@/ui-kit/inputs';
import { Loader } from '@/ui-kit/spinners';
import { User } from '@clerk/nextjs/dist/types/server';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'src/api/axios';

type TState = {
  categories: [{ id: string, name: string }] | [];
  isLoading: boolean;
  isAdmin: boolean;
};
export default function NewProduct() {
  const { updateClerkToken } = useClerkToken();
  const hookFormMethods = useForm();

  const [state, setState] = useState<TState>({
    categories: [],
    isLoading: true,
    isAdmin: false,
  });

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const [{ data: categories }, { data: user }] = await Promise.all([
        axios.get<[{ id: string, name: string }]>('/categories/roots'),
        axios.get<User>('/users/self'),
      ]);

      setState({
        categories,
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

    const { status } = await toast.promise(axios.post('/categories', formData), {
      pending: 'Создаем категорию...',
      success: 'Категория создан',
      error: 'Ошибка при создании категории',
    });

    if (status === 201) {
      window.location.reload();
    }
  };

  return (
    <main className="px-44 pb-8">
      <FormProvider {...hookFormMethods}>
        <form
          onSubmit={hookFormMethods.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          <TextInput
            label="Название категории"
            id="name"
            name="name"
            placeholder="Бумага"
          />
          <TextInput
            label="Описание категории"
            id="description"
            name="description"
            placeholder="В этой категории вы можете найти бумажную продукцию"
          />
          <SelectInput
            label="Родительская категория"
            id="parentId"
            name="parentId"
            options={state.categories}
          />
          <FileInput
            name="images"
          />
          <Button type="submit">
            Создать новую категорию
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
