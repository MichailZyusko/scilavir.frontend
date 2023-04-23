'use client';

import { RouterGuard } from '@/HOC/routerGuard';
import { FileInput, SelectInput, TextInput } from '@/ui-kit/inputs';
import { Spinner } from '@/ui-kit/spinners';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import axios from 'src/api/axios';

type TState = {
  categories: [{ id: string, name: string }] | [];
  groups: [{ id: string, name: string }] | [];
  isLoading: boolean;
};
export default function NewGood() {
  const hookFormMethods = useForm();
  const [state, setState] = useState<TState>({
    categories: [],
    groups: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const [{ data: categories }, { data: groups }] = await Promise.all([
        axios.get<[{ id: string, name: string }]>('/categories'),
        axios.get<[{ id: string, name: string }]>('/groups'),
      ]);

      setState({
        categories,
        groups,
        isLoading: false,
      });
    })();
  }, []);

  if (state.isLoading) {
    return <Spinner />;
  }

  const onSubmit = (data: FieldValues) => {
    const { images, ...fields } = data;
    const formData = new FormData();

    [...images].forEach((img) => {
      formData.append('images', img);
    });

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.post('/products', formData);
  };

  return (
    <RouterGuard isAdminOnly fallback={<h1>This page for admins only</h1>}>
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
    </RouterGuard>
  );
}
