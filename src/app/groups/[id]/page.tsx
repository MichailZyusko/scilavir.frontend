'use client';

import axios from '@/api/axios';
import Image from 'next/image';
import { TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { SortStrategy } from '@/enums';
import { useClerkToken } from '@/context/auth';

type TGroup = {
  id: string;
  name: string;
};

type TState = {
  products: TProduct[];
  group: TGroup | null;
  sort: SortStrategy;
  isLoading: boolean;
};

type TProps = {
  params: {
    id: string;
  }
};

export default function GroupsPage({ params: { id: groupId = '' } }: TProps) {
  const { updateClerkToken } = useClerkToken();
  const [state, setState] = useState<TState>({
    products: [],
    group: null,
    sort: SortStrategy.PRICE_ASC,
    isLoading: true,
  });

  const { sort } = state;

  useEffect(() => {
    (async () => {
      await updateClerkToken();

      const [{ data: group }, { data: products }] = await Promise.all([
        axios.get<TGroup>(`/groups/${groupId}`),
        axios.get<TProduct[]>(`/products/groups/${groupId}`, {
          params: {
            sort,
          },
        }),
      ]);

      setState({
        ...state,
        products,
        group,
        isLoading: false,
      });
    })();
  }, [groupId, sort]);

  if (state.isLoading) {
    return <Spinner />;
  }

  if (!state.group) {
    return <div>Группа не найдена</div>;
  }

  return (
    <main className="px-44">
      <h1 className="w-full text-4xl text-center font-semibold mb-5">{state.group.name}</h1>
      <div className="flex justify-between mb-2.5">
        <Dropdown
          label="Сортировать"
          inline
        >
          <Dropdown.Item
            onClick={() => setState({ ...state, sort: SortStrategy.ALPHABETICAL_ASC })}
          >
            А ➔ Я
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setState({ ...state, sort: SortStrategy.ALPHABETICAL_DESC })}
          >
            Я ➔ А
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setState({ ...state, sort: SortStrategy.PRICE_ASC })}
          >
            Сначала дешевые
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setState({ ...state, sort: SortStrategy.PRICE_DESC })}
          >
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
