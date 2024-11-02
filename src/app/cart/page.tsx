'use client';

import axios from '@/api/axios';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { round } from '@/utils';
import { Button } from '@/ui-kit/buttons';
import { PaginatedResponse, TProduct } from '@/types';
import { useClerkToken } from '@/context/auth';
import { toast } from 'react-toastify';
import { Loader } from '@/ui-kit/spinners';
import { useSelector } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch } from '@/redux/hooks';
import { clearCart, selectCart } from './cart.slice';

type TState = {
  products: TProduct[];
  isLoading: boolean;
};
export default function CartPage() {
  const { cart } = useSelector(selectCart);
  const { isSignedIn, isLoaded: isUserInfoReady } = useUser();
  const { updateClerkToken } = useClerkToken();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TState>({
    products: [],
    isLoading: true,
  });

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
  }, [cart]);

  const { isLoading, products } = state;

  const submitOrder = async () => {
    if (!isSignedIn) {
      toast.error('Для оформления заказа необходимо авторизоваться');
      return;
    }

    try {
      setState({
        ...state,
        isLoading: true,
      });

      await updateClerkToken();
      const orderPromise = axios.post('/orders', {
        cart,
      });

      const { status } = await toast.promise(orderPromise, {
        pending: 'Оформляем заказ...',
        success: 'Заказ успешно оформлен',
        error: 'Ошибка при оформлении заказа',
      });

      if (status === 201) {
        dispatch(clearCart());
        setState({
          ...state,
          products: [],
        });
      }
    } catch (error) {
      toast.error('Ошибка при оформлении заказа');
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
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

  return (
    <main className="px-44 mb-16">
      <div className="mb-8">
        {products.map((product) => (
          <div className="mb-8 flex h-40">
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
            <div className="flex flex-col justify-between w-full h-full">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <div className="flex justify-between items-center mt-auto">
                <AddToCartButton productId={product.id} />
                <p className="text-right w-24">
                  {round(product.price * (product.quantity || 1))}
&nbsp; BYN
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button onClick={submitOrder} size="xl">
          Оформить заказ
        </Button>
      </div>
    </main>
  );
}
