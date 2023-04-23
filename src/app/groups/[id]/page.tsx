'use client';

import axios from '@/api/axios';
import Image from 'next/image';
import { TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';

type TState = {
  products: TProduct[];
  group: any;
  isLoading: boolean;
};

type TProps = {
  params: {
    id: string;
  }
};

export default function GroupsPage({ params: { id: groupId = '' } }: TProps) {
  const [state, setState] = useState<TState>({
    products: [],
    group: {},
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const [{ data: group }, { data: products }] = await Promise.all([
        axios.get<[]>(`/groups/${groupId}`),
        axios.get<TProduct[]>(`/products/groups/${groupId}`),
      ]);

      setState({
        products,
        group,
        isLoading: false,
      });
    })();
  }, [groupId]);

  if (state.isLoading) {
    return <Spinner />;
  }
  return (
    <main className="px-44">
      <h1 className="w-full text-4xl text-center font-semibold mb-5">{state.group.name}</h1>
      <div className="flex justify-between mb-2.5">
        <Dropdown
          label="Сортировать"
          inline
        >
          <Dropdown.Item>
            А ➔ Я
          </Dropdown.Item>
          <Dropdown.Item>
            Я ➔ А
          </Dropdown.Item>
          <Dropdown.Item>
            Сначала дешевые
          </Dropdown.Item>
          <Dropdown.Item>
            Сначала дорогие
          </Dropdown.Item>
        </Dropdown>
        <span className="flex">
          <Image
            src="/images/filter.svg"
            height={20}
            width={20}
            alt="filter"
          />
          &nbsp;
          Фильтр
        </span>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {state.products.map(({ id, ...product }) => <Product key={id} id={id} {...product} />)}
      </div>
    </main>
  );
}
