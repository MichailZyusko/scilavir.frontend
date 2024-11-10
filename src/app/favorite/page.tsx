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
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { useQueryState, parseAsStringEnum } from 'nuqs';

type TState = {
  products: TProduct[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
};

export default function FavoritePage() {
  const { updateClerkToken } = useClerkToken();
  const { isSignedIn, isLoaded } = useUser();
  const [sort, setSort] = useQueryState<SortStrategy>(
    'sort',
    parseAsStringEnum<SortStrategy>(Object.values(SortStrategy))  
      .withDefault(SortStrategy.ALPHABETICAL_ASC)
  );
  const [state, setState] = useState<TState>({
    products: [],
    isLoading: true,
    currentPage: 0,
    totalPages: 1,
  });

  const {
    isLoading, currentPage, totalPages,
  } = state;

  // TODO: Add error handling
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn) {
        toast.error('Необходимо авторизоваться для просмотра истории заказов');
        return;
      }

      await updateClerkToken();

      const { data: productsResponse } = await axios<PaginatedResponse<TProduct>>({
        method: 'GET',
        url: '/products/favorites',
        params: {
          sort,
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
  }, [sort, currentPage, isLoaded]);

  if (isLoading || !isLoaded) {
    return <Loader />;
  }

  const onPageChange = (page: number) => setState({ ...state, currentPage: page - 1 });

  return (
    <main className="container mx-auto px-4 flex flex-col flex-auto">
      <h1 className="w-full text-4xl text-center font-semibold mb-5">Избранное</h1>
      <div className="flex justify-between mb-2.5">
        <Dropdown
          label="Сортировать"
          inline
        >
          <Dropdown.Item
            onClick={() => setSort(SortStrategy.ALPHABETICAL_ASC)}
          >
            А ➔ Я
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setSort(SortStrategy.ALPHABETICAL_DESC)}
          >
            Я ➔ А
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setSort(SortStrategy.PRICE_ASC)}
          >
            Сначала дешевые
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setSort(SortStrategy.PRICE_DESC)}
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
