'use client';

import axios from '@/api/axios';
import Image from 'next/image';
import { TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { SortStrategy } from '@/enums';
import { useClerkToken } from '@/context/auth';
import { Loader } from '@/ui-kit/spinners';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Button } from '@/ui-kit/buttons';

type TGroup = {
  id: string;
  name: string;
};

type TState = {
  products: TProduct[];
  group: TGroup | null;
  offset: number;
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
    offset: 1,
    sort: SortStrategy.PRICE_ASC,
    isLoading: true,
  });

  const { sort, offset } = state;

  useEffect(() => {
    (async () => {
      await updateClerkToken();

      const [{ data: group }, { data: products }] = await Promise.all([
        axios.get<TGroup>(`/groups/${groupId}`),
        axios.get<TProduct[]>('/products', {
          params: {
            groupIds: [groupId],
            limit: DEFAULT_PAGE_SIZE,
            offset,
            sort,
          },
        }),
      ]);

      setState({
        ...state,
        products: [...state.products, ...products],
        group,
        isLoading: false,
      });
    })();
  }, [groupId, offset, sort]);

  if (state.isLoading) {
    return <Loader />;
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

      <div className="flex justify-center mb-5">
        <Button
          onClick={() => {
            setState({ ...state, offset: offset + DEFAULT_PAGE_SIZE });
          }}
        >
          Показать ёщё
        </Button>
      </div>
    </main>
  );
}
