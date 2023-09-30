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

type TCartItem = {
  quantity: number;
  product: TProduct;
};
export default function CartPage() {
  const { updateClerkToken } = useClerkToken();
  const [cart, setCart] = useState<TCartItem[]>([]);

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const { data } = await axios.get('/cart');

      setCart(data);
    })();
  }, []);

  const submitOrder = async () => {
    await updateClerkToken();

    await axios.post('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">Корзина пуста</h1>
        <Link href="/">
          <Button>
            Вернуться в главное меню
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        {cart.map(({ quantity, product: { id, ...product } }) => (
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
            <AddToCartButton
              productId={id}
              quantity={quantity}
              // TODO: allow to cahnge count of items in cart
              setQuantity={() => { }}
            />
          </Link>
        ))}
      </div>

      <div>
        <Button
          onClick={submitOrder}
          size="xl"
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}
