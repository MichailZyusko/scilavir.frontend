'use client';

import { FileInput, TextInput } from '@/ui-kit/inputs';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import axios from 'src/api/axios';

export default function NewGood() {
  const hookFormMethods = useForm();

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
    <main>
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
