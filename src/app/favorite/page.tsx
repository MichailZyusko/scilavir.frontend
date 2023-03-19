'use client';

import Image from 'next/image';
import { PRODUCTS } from '@/constants';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown } from 'flowbite-react';

export default function FavoritePage() {
  return (
    <main className="px-44">
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
        {PRODUCTS.map(({ id, ...product }) => <Product key={id} id={id} {...product} />)}
      </div>

      <h2 className="w-full text-3xl text-center font-semibold my-10">Похожие товары</h2>

      <div className="grid grid-cols-4 gap-8">
        {PRODUCTS.slice(0, 4).map(({ id, ...product }) => (
          <Product
            key={id}
            id={id}
            {...product}
          />
        ))}
      </div>
    </main>
  );
}
