"use client";

import axios from '@/api/axios';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { round } from '@/utils';
import { Button } from '@/ui-kit/buttons';
import { PaginatedResponse, TProduct } from '@/types';
import { toast } from 'react-toastify';
import { Loader } from '@/ui-kit/spinners';
import { useSelector } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch } from '@/redux/hooks';
import RemoveProductIcon from 'public/images/icons/close.svg';
import { useRouter } from 'next/navigation';
import { removeProductFromCart, selectCart } from './cart.slice';

type TState = {
  products: TProduct[];
  isLoading: boolean;
};
export default function CartPage() {
  const { cart } = useSelector(selectCart);
  const { isSignedIn, isLoaded: isUserInfoReady } = useUser();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TState>({
    products: [],
    isLoading: true,
  });
  const router = useRouter();

  // TODO: fetch products from backend only when added new product to cart or deleted
  useEffect(() => {
    // !TODO: add logic when we store data as well on backend
    (async () => {
      const idsToFetch = Object.keys(cart);

      if (idsToFetch.length === 0) {
        setState({
          ...state,
          isLoading: false,
        });
        return;
      }

      const {
        data: { data: products },
      } = await axios.get<PaginatedResponse<TProduct>>('/products', {
        params: {
          ids: idsToFetch,
        },
      });

      const cartFromLocalStorage = products.map((product) => ({
        ...product,
        quantity: cart[product.id],
      }));

      setState({
        ...state,
        products: cartFromLocalStorage,
        isLoading: false,
      });
    })();
  }, [Object.keys(cart).length]);

  const { isLoading, products } = state;

  const submitOrder = async () => {
    if (!isSignedIn) {
      toast.error('Для оформления заказа необходимо авторизоваться');
      return;
    }

    router.push('/cart/order');
  };

  const onRemoveProductHandler = (productId: string) => {
    dispatch(removeProductFromCart({ id: productId }));
  };

  if (isLoading || !isUserInfoReady) {
    return <Loader />;
  }

  if (products.length === 0) {
    return (
      <main className="flex flex-auto flex-col items-center justify-center px-44 mb-16">
        <h1 className="text-2xl font-semibold">Корзина пуста</h1>
        <Link href="/">
          <Button>Вернуться в главное меню</Button>
        </Link>
      </main>
    );
  }

  const { totalCount, totalPrice } = products.reduce(
    (acc, product) => {
      const quantity = cart[product.id] || 1;
      acc.totalCount += quantity;
      acc.totalPrice += product.price * quantity;
      return acc;
    },

    { totalCount: 0, totalPrice: 0 },
  );

  return (
    <main className="px-44 mb-16">
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col my-10 gap-8">
          {products.map((product) => {
            const quantity = cart[product.id];

            return (
              <div className="flex flex-row h-40">
                {product.images && (
                <div className="flex-shrink-0 mr-4 h-full w-40">
                  <Image
                    src={product.images[0]}
                    style={{ objectFit: 'cover' }}
                    width={300}
                    height={300}
                    alt={product.name}
                  />
                </div>
                )}
                <div className="flex flex-col justify-between items-start w-full h-full">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <AddToCartButton productId={product.id} />
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button type="button" onClick={() => onRemoveProductHandler(product.id)}>
                    <Image
                      src={RemoveProductIcon}
                      alt="delete-product"
                      width={25}
                      height={25}
                    />
                  </button>

                  <p className="text-right w-24">
                    {round(product.price * (quantity || 1))}
  &nbsp; BYN
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="ml-auto">
          <div className="flex justify-between w-full">
            <h3 className="font-bold">ВСЕГО</h3>
            <p className="font-bold">
              {round(totalPrice)}
            &nbsp;BYN
            </p>
          </div>
          <p className="mb-4 text-gray">
            {totalCount}
              &nbsp;шт.
          </p>

          <Button onClick={submitOrder} size="xl">
            Оформить заказ
          </Button>
        </div>
      </div>
    </main>
  );
}
