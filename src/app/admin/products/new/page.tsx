'use client';

import { useClerkToken } from '@/context/auth';
import { User } from '@/types';
import { Button } from '@/ui-kit/buttons';
import { FileInput, SelectInput, TextInput } from '@/ui-kit/inputs';
import { Loader } from '@/ui-kit/spinners';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'src/api/axios';

type TState = {
  categories: [{ id: string, name: string }] | [];
  groups: [{ id: string, name: string }] | [];
  isLoading: boolean;
  isAdmin: boolean;
};
export default function NewProduct() {
  const { updateClerkToken } = useClerkToken();
  const hookFormMethods = useForm();

  const [state, setState] = useState<TState>({
    categories: [],
    groups: [],
    isLoading: true,
    isAdmin: false,
  });

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const [{ data: categories }, { data: groups }, { data: user }] = await Promise.all([
        axios.get<[{ id: string, name: string }]>('/categories'),
        axios.get<[{ id: string, name: string }]>('/groups'),
        axios.get<User>('/users/self'),
      ]);

      setState({
        categories,
        groups,
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
      if (['groupIds', 'categoryIds'].includes(key)) {
        value.forEach((item: string) => {
          formData.append(`${key}[]`, item);
        });

        return;
      }

      formData.append(key, value);
    });

    const { status } = await toast.promise(axios.post('/products', formData), {
      pending: 'Создаем продукт...',
      success: 'Продукт создан',
      error: 'Ошибка при создании продукта',
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
            label="Название товара"
            id="name"
            name="name"
            placeholder="Тетрадь"
          />
          <TextInput
            label="Артикул"
            id="article"
            name="article"
            placeholder="13488675"
          />
          <TextInput
            label="Описание товара"
            id="description"
            name="description"
            placeholder="В клетку 5 мм"
          />
          <TextInput
            label="Цена"
            id="price"
            name="price"
            placeholder="1.45"
          />
          <SelectInput
            label="Категория"
            id="category_ids"
            name="categoryIds"
            options={state.categories}
          />
          <SelectInput
            label="Подборки"
            name="groupIds"
            id="group"
            options={state.groups}
          />
          <FileInput
            name="images"
          />
          <Button type="submit">
            Создать новый товар
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
