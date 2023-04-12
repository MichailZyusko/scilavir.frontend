'use client';

import Image from 'next/image';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown } from 'flowbite-react';
import { RouterGuard } from '@/HOC/routerGuard';
import { TProduct } from '@/types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spinner } from '@/ui-kit/spinners';

export default function FavoritePage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios<TProduct[]>({
        method: 'GET',
        url: '@me/favorites',
      });

      setProducts(data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <RouterGuard>
      <h1 className="w-full text-4xl text-center font-semibold mb-5">Избранное</h1>
      <div className="flex justify-between mb-2.5">
        <Dropdown
          label="Сортировать"
          inline
        >
          <Dropdown.Item>
            А ➔ Я
          </Dropdown.Item>
          <Dropdown.Item>
            Я ➔ А
          </Dropdown.Item>
          <Dropdown.Item>
            Сначала дешевые
          </Dropdown.Item>
          <Dropdown.Item>
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
        {products.map(({ id, ...product }) => <Product key={id} id={id} {...product} />)}
      </div>

      <h2 className="w-full text-3xl text-center font-semibold my-10">Похожие товары</h2>

      <div className="grid grid-cols-4 gap-8">
        {products.slice(0, 4).map(({ id, ...product }) => (
          <Product
            key={id}
            id={id}
            {...product}
          />
        ))}
      </div>
    </RouterGuard>
  );
}
