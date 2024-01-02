'use client';

import axios from '@/api/axios';
import Image from 'next/image';
import { PaginatedResponse, TCategory, TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { SubCategoryList } from '@/ui-kit/components/products/sub-categorie';
import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { SortStrategy } from '@/enums';
import { useClerkToken } from '@/context/auth';
import { Loader } from '@/ui-kit/spinners';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Paginator } from '@/ui-kit/components/paginator';

type TState = {
  products: TProduct[];
  category: TCategory | null;
  sort: SortStrategy;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
};

type TProps = {
  params: {
    id: string;
  }
};

export default function CategoryPage({ params: { id: categoryId = '' } }: TProps) {
  const { updateClerkToken } = useClerkToken();
  const [state, setState] = useState<TState>({
    products: [],
    category: null,
    sort: SortStrategy.PRICE_ASC,
    isLoading: true,
    currentPage: 0,
    totalPages: 1,
  });
  const {
    sort, currentPage, totalPages, isLoading,
  } = state;

  useEffect(() => {
    (async () => {
      setState({ ...state, isLoading: true });
      await updateClerkToken();

      const { data: { category } } = await axios.get<{ category: TCategory }>(`/categories/${categoryId}`);
      const { data: productsResponse } = await axios.get<PaginatedResponse<TProduct>>('/products', {
        params: {
          categoryIds: category.subCategories.length
            ? category.subCategories.map(({ id }) => id)
            : [categoryId],
          limit: DEFAULT_PAGE_SIZE,
          offset: currentPage * DEFAULT_PAGE_SIZE,
          sort,
        },
      });

      setState({
        ...state,
        products: productsResponse.data,
        totalPages: Math.ceil(productsResponse.count / DEFAULT_PAGE_SIZE),
        category,
        isLoading: false,
      });
    })();
  }, [categoryId, currentPage, sort]);

  if (isLoading) {
    return <Loader />;
  }

  const onPageChange = (page: number) => setState({ ...state, currentPage: page - 1 });

  return (
    <main className="flex flex-col flex-auto container mx-auto px-4">
      <SubCategoryList categories={state?.category?.subCategories} />
      <h1 className="w-full text-3xl text-center font-semibold mb-5">{state.category?.name}</h1>
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
