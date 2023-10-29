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

type TState = {
  products: TProduct[];
  sort: SortStrategy;
  isLoading: boolean;
};

export default function FavoritePage() {
  const { updateClerkToken } = useClerkToken();

  const [state, setState] = useState<TState>({
    products: [],
    sort: SortStrategy.ALPHABETICAL_ASC,
    isLoading: true,
  });

  const { sort, products, isLoading } = state;

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const { data } = await axios<TProduct[]>({
        method: 'GET',
        url: '/products/favorites',
        params: {
          sort: state.sort,
        },
      });

      setState({
        ...state,
        products: data,
        isLoading: false,
      });
    })();
  }, [sort]);

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
    </main>
  );
}
