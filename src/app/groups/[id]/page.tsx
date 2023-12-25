'use client';

import axios from '@/api/axios';
import Image from 'next/image';
import { PaginatedResponse, TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { SortStrategy } from '@/enums';
import { useClerkToken } from '@/context/auth';
import { Loader } from '@/ui-kit/spinners';
import { DEFAULT_PAGE_SIZE } from '@/constants';

type TGroup = {
  id: string;
  name: string;
};

type TState = {
  products: TProduct[];
  group: TGroup | null;
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

export default function GroupsPage({ params: { id: groupId = '' } }: TProps) {
  const { updateClerkToken } = useClerkToken();
  const [state, setState] = useState<TState>({
    products: [],
    group: null,
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

      const [{ data: group }, { data: productsResponse }] = await Promise.all([
        axios.get<TGroup>(`/groups/${groupId}`),
        axios.get<PaginatedResponse<TProduct>>('/products', {
          params: {
            groupIds: [groupId],
            limit: DEFAULT_PAGE_SIZE,
            offset: currentPage * DEFAULT_PAGE_SIZE,
            sort,
          },
        }),
      ]);

      setState({
        ...state,
        products: productsResponse.data,
        totalPages: Math.ceil(productsResponse.count / DEFAULT_PAGE_SIZE),
        group,
        isLoading: false,
      });
    })();
  }, [groupId, sort, currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (!state.group) {
    return <div>Группа не найдена</div>;
  }

  const onPageChange = (page: number) => setState({ ...state, currentPage: page - 1 });

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
        <Pagination
          showIcons
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

    </main>
  );
}
