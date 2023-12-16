'use client';

import Image from 'next/image';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown } from 'flowbite-react';
import { TProduct } from '@/types';
import axios from '@/api/axios';
import { useState, useEffect } from 'react';
import { Loader } from '@/ui-kit/spinners';
import { SortStrategy } from '@/enums';
import { useClerkToken } from '@/context/auth';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Button } from '@/ui-kit/buttons';

type TState = {
  products: TProduct[];
  sort: SortStrategy;
  offset: number;
  isLoading: boolean;
};

export default function FavoritePage() {
  const { updateClerkToken } = useClerkToken();

  const [state, setState] = useState<TState>({
    products: [],
    offset: 1,
    sort: SortStrategy.ALPHABETICAL_ASC,
    isLoading: true,
  });

  const {
    sort, products, isLoading, offset,
  } = state;

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      await updateClerkToken();
      const { data } = await axios<TProduct[]>({
        method: 'GET',
        url: '/products/favorites',
        params: {
          sort: state.sort,
          limit: DEFAULT_PAGE_SIZE,
          offset,
        },
      });

      setState({
        ...state,
        products: [...state.products, ...data],
        isLoading: false,
      });
    })();
  }, [sort, offset]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="px-44">
      <h1 className="w-full text-4xl text-center font-semibold mb-5">Избранное</h1>
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
        {products.map(({ id, ...product }) => <Product key={id} id={id} {...product} />)}
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
