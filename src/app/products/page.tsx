'use client';

import Image from 'next/image';
import { Product } from '@/ui-kit/components/products/product';
import { Dropdown } from 'flowbite-react';
import { SubCategoryList } from '@/ui-kit/components/products/sub-categorie';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { Spinner } from '@/ui-kit/spinners';
import { TProduct } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios<TProduct[]>({
        method: 'GET',
        url: '/products',
      });

      setProducts(data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="px-44">
      <SubCategoryList />
      <h1 className="w-full text-4xl text-center font-semibold mb-5">Каталог</h1>
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
    </main>
  );
}
