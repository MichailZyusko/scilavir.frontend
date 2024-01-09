'use client';

import { Product } from '@/ui-kit/components/products/product';
import { Dropdown } from 'flowbite-react';
import { PaginatedResponse, TProduct } from '@/types';
import axios from '@/api/axios';
import { useState, useEffect } from 'react';
import { Loader } from '@/ui-kit/spinners';
import { SortStrategy } from '@/enums';
import { useClerkToken } from '@/context/auth';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Paginator } from '@/ui-kit/components/paginator';

type TState = {
  products: TProduct[];
  sort: SortStrategy;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
};

export default function FavoritePage() {
  const { updateClerkToken } = useClerkToken();

  const [state, setState] = useState<TState>({
    products: [],
    sort: SortStrategy.ALPHABETICAL_ASC,
    isLoading: true,
    currentPage: 0,
    totalPages: 1,
  });

  const {
    sort, isLoading, currentPage, totalPages,
  } = state;

  useEffect(() => {
    (async () => {
      setState({ ...state, isLoading: true });
      await updateClerkToken();

      const { data: productsResponse } = await axios<PaginatedResponse<TProduct>>({
        method: 'GET',
        url: '/products/favorites',
        params: {
          sort: state.sort,
          limit: DEFAULT_PAGE_SIZE,
          offset: currentPage * DEFAULT_PAGE_SIZE,
        },
      });

      setState({
        ...state,
        products: productsResponse.data,
        totalPages: Math.ceil(productsResponse.count / DEFAULT_PAGE_SIZE),
        isLoading: false,
      });
    })();
  }, [sort, currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  const onPageChange = (page: number) => setState({ ...state, currentPage: page - 1 });

  return (
    <main className="container mx-auto px-4 flex flex-col flex-auto">
    <main className="container mx-auto px-4 flex flex-col flex-auto">
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
      </div>

      {state.products.length
        ? (
          <div className="grid grid-cols-4 gap-8">
            {state.products.map(({ id, ...product }) => (
              <Product
                key={id}
                id={id}
                {...product}
                isFavorite
              />
            ))}
          </div>
        )
        : (
          <div className="flex justify-center mt-10">
            <h1 className="text-4xl font-bold">Избранные товары отсутствуют</h1>
          </div>
        )}

      {state.products.length
        ? (
          <div className="grid grid-cols-4 gap-8">
            {state.products.map(({ id, ...product }) => (
              <Product
                key={id}
                id={id}
                {...product}
                isFavorite
              />
            ))}
          </div>
        )
        : (
          <div className="flex justify-center mt-10">
            <h1 className="text-4xl font-bold">Избранные товары отсутствуют</h1>
          </div>
        )}

      {/* <div className="flex justify-center mb-5">
        <Button
          onClick={() => {
            setState({ ...state, offset: offset + DEFAULT_PAGE_SIZE });
          }}
        >
          Показать ёщё
        </Button>
      </div> */}

      <div className="flex justify-center mb-5">
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </main>
  );
}
