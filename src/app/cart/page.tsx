'use client';

import axios from '@/api/axios';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { round } from '@/utils';
import { Button } from '@/ui-kit/buttons';
import { TProduct } from '@/types';
import { useClerkToken } from '@/context/auth';
import { toast } from 'react-toastify';
import { Loader } from '@/ui-kit/spinners';
import { useSelector } from 'react-redux';
import { selectCart } from './cart.slice';

type TCartItem = {
  quantity: number;
  product: TProduct;
};

type TState = {
  cart: TCartItem[];
  isLoading: boolean;
};
export default function CartPage() {
  const { cart: myCart } = useSelector(selectCart);
  const { updateClerkToken } = useClerkToken();
  const [state, setState] = useState<TState>({
    cart: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const { data } = await axios.get('/cart');

      setState({
        ...state,
        cart: data,
        isLoading: false,
      });
    })();
  }, []);

  const { isLoading, cart } = state;

  const submitOrder = async () => {
    await updateClerkToken();

    const { status } = await toast.promise(axios.post('/orders'), {
      pending: 'Оформляем заказ...',
      success: 'Заказ успешно оформлен',
      error: 'Ошибка при оформлении заказа',
    });

    if (status === 201) {
      setState({
        ...state,
        cart: [],
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <main className="flex flex-auto flex-col items-center justify-center px-44 mb-16">
        <h1 className="text-2xl font-semibold">Корзина пуста</h1>
        <Link href="/">
          <Button>
            Вернуться в главное меню
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-auto flex-col justify-center items-center px-44 mb-16">
      <div className="grid grid-cols-4 gap-8">
        {cart.map(({ quantity: q, product: { id, ...product } }) => {
          const quantity = myCart.get(id) ?? q;

          return (
            <div className="flex flex-col">
              <Link className="flex flex-col items-start mb-8" href={`/products/${id}`}>
                {product.images && (
                <Image
                  src={product.images[0]}
                  style={{ objectFit: 'contain' }}
                  width={256}
                  height={256}
                  alt={product.name}
                />
                )}
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="whitespace-normal text-center">
                  {round(product.price * (quantity || 1))}
                  &nbsp;
                  BYN
                </p>
              </Link>
              <AddToCartButton
                productId={id}
                quantity={quantity}
              />
            </div>
          );
        })}
      </div>

      <div>
        <Button
          onClick={submitOrder}
          size="xl"
        >
          Оформить заказ
        </Button>
      </div>
    </main>
  );
}
