'use client';

import { useClerkToken } from '@/context/auth';
import { FileInput, SelectInput, TextInput } from '@/ui-kit/inputs';
import { Loader } from '@/ui-kit/spinners';
import { User } from '@clerk/nextjs/dist/types/server';
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
    <main className="px-44">
      <FormProvider {...hookFormMethods}>
        <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            id="name"
            name="name"
            placeholder="Goods name"
          />
          <TextInput
            label="Description"
            id="description"
            name="description"
            placeholder="Goods description"
          />
          <TextInput
            label="Price"
            id="price"
            name="price"
            placeholder="Goods price"
          />
          <SelectInput
            label="Category"
            name="category_ids"
            options={state.categories}
          />
          <SelectInput
            label="Group"
            name="group_ids"
            id="group"
            options={state.groups}
          />
          <FileInput
            name="images"
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </FormProvider>
    </main>
  );
}
