'use client';

import axios from '@/api/axios';
import {
  Accordion, CustomFlowbiteTheme, Flowbite,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useClerkToken } from '@/context/auth';
import { TProduct } from '@/types';
import { Product } from '@/ui-kit/components/products/product';
import { Loader } from '@/ui-kit/spinners';
import { formatDate } from '@/utils';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';

const customTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: 'divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700',
      flush: {
        off: 'rounded-lg border',
        on: 'border-b',
      },
    },
    content: {
      base: 'py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg',
    },
    title: {
      arrow: {
        base: 'h-6 w-6 shrink-0',
        open: {
          off: '',
          on: 'rotate-180',
        },
      },
      base: 'flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400',
      flush: {
        off: 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800',
        on: 'bg-transparent dark:bg-transparent',
      },
      heading: 'flex w-full flex-row justify-between',
      open: {
        off: '',
        on: 'text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white',
      },
    },
  },
};

type TOrderItem = {
  price: number;
  quantity: number;
  product: TProduct;
};

type TOrder = {
  id: string;
  items: TOrderItem[];
  createdAt: string;
  updatedAt: string;
};

type TState = {
  orders: TOrder[];
  isLoading: boolean;
};

export default function OrdersPage() {
  const { updateClerkToken } = useClerkToken();
  const { isSignedIn, isLoaded } = useUser();
  const [state, setState] = useState<TState>({
    orders: [],
    isLoading: true,
  });

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

      const { data: orders } = await axios.get<TOrder[]>('/orders/history');

      setState({
        ...state,
        orders,
        isLoading: false,
      });
    })();
  }, [isLoaded]);

  if (state.isLoading || !isLoaded) {
    return <Loader />;
  }

  return (
    <main className="container mx-auto px-4 mb-16 flex flex-col flex-auto">
      <h1 className="w-full text-4xl text-center font-semibold mb-5">История заказов</h1>
      <Flowbite theme={{ theme: customTheme }}>

        <Accordion collapseAll>
          {state.orders.map(({ id, ...order }) => (
            <Accordion.Panel>
              <Accordion.Title>
                <div className="flex-1">
                  <p>
                    Заказ №
                    {' '}
                    <b>
                      {id.replaceAll('-', '').slice(0, 10)}
                    </b>
                  </p>
                  <br />
                  <p className="text-gray-500 text-xs dark:text-gray-400">
                    <time dateTime={order.createdAt}>
                      {formatDate(new Date(order.createdAt))}
                    </time>
                  </p>
                </div>

                <div className="flex-1">
                  <p>
                    {order.items.reduce((acc, { price }) => {
                      // eslint-disable-next-line no-param-reassign
                      acc += price;

                      return acc;
                    }, 0).toFixed(2)}
                    {' '}
                    BYN
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {order.items.length}
                    {' '}
                    шт.
                  </p>
                </div>

                <div className="flex-1">
                  <p>
                    Заказ Завершен
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                {order.items.map(({ quantity, product }) => (
                  <div className="flex flex-row items-end border-b-2 mb-2">
                    <Product {...product} />
                    <span>
                      {quantity}
                      {' '}
                      шт.
                    </span>
                  </div>
                ))}

              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </Flowbite>
    </main>
  );
}
