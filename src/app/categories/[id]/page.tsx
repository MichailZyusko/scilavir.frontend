'use client';

import axios from '@/api/axios';
import Image from 'next/image';
import { TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { SubCategoryList } from '@/ui-kit/components/products/sub-categorie';
import { Dropdown, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { SortStrategy } from '@/enums';

type TState = {
  products: TProduct[];
  subCategories: [];
  sort: SortStrategy;
  isLoading: boolean;
};

type TProps = {
  params: {
    id: string;
  }
};

export default function CategoryPage({ params: { id: categoryId = '' } }: TProps) {
  const [state, setState] = useState<TState>({
    products: [],
    subCategories: [],
    sort: SortStrategy.PRICE_ASC,
    isLoading: true,
  });

  const { sort } = state;

  useEffect(() => {
    (async () => {
      const [{ data: subCategories }, { data: products }] = await Promise.all([
        axios.get<[]>(`/categories/${categoryId}`),
        axios.get<TProduct[]>(`/products/categories/${categoryId}`, {
          params: {
            sort,
          },
        }),
      ]);

      setState({
        ...state,
        products,
        subCategories,
        isLoading: false,
      });
    })();
  }, [categoryId, sort]);

  if (state.isLoading) {
    return <Spinner />;
  }
  return (
    <main className="px-44">
      <SubCategoryList categories={state.subCategories} />
      <h1 className="w-full text-4xl text-center font-semibold mb-5">Каталог</h1>
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
