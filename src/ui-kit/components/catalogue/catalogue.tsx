/* eslint-disable max-len */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { Loader } from '@/ui-kit/spinners';
import { Button } from '../../buttons';

type TGroup = {
  id: string;
  name: string;
  minPrice: number | null;
  image: string;
};

type TCategory = {
  id: string;
  parentId: string;
  name: string;
  minPrice: number | null;
};

type TState = {
  categories: TCategory[] | [];
  groups: TGroup[] | [];
  isLoading: boolean;
};

export function Catalogue() {
  const [state, setState] = useState<TState>({
    categories: [],
    groups: [],
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const [{ data: categories }, { data: groups }] = await Promise.all([
        axios.get<TCategory[]>('/categories/roots'),
        axios.get<TGroup[]>('/groups'),
      ]);

      setState({
        categories,
        groups,
        isLoading: false,
      });
    })();
  }, []);

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-semibold mb-2.5">Подборки</h1>
        {state.groups.map((group) => (
          <>
            <Link
              className="w-full h-80 bg-gray flex flex-col justify-between p-8"
              key={group.id}
              href={`/groups/${group.id}`}
            >
              <div>
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <p>Текст</p>
              </div>

              <div>
                <p>
                  {group.minPrice === null
                    ? 'Нет товаров в этой подборке'
                    : `Начиная от ${group.minPrice} BYN`}
                </p>
                <Button>Купить сейчас</Button>
              </div>
            </Link>

            <div className="border-white border-t-[1.5rem] w-full" />
          </>
        ))}
      </div>

      <div>
        <h1 className="text-center text-4xl font-semibold mb-2.5">Категории</h1>
        {state.categories.map((category) => (
          <>
            <Link
              className="w-full h-80 bg-gray flex flex-col justify-between p-8"
              key={category.id}
              href={`/categories/${category.id}`}
            >
              <div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p>Текст</p>
              </div>

              <div>
                <p>
                  {category.minPrice === null
                    ? 'Нет товаров в этой категории'
                    : `Начиная от ${category.minPrice} BYN`}
                </p>
                <Button>Купить сейчас</Button>
              </div>
            </Link>

            <div className="border-white border-t-[1.5rem] w-full" />
          </>
        ))}
      </div>
    </>
  );
}

//  <div className="flex justify-between">
//           <div className="flex flex-col w-[calc(50%+1.5rem)]">
//             <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
//               <div>
//                 <h3 className="text-xl font-semibold">Бумага</h3>
//                 <p>Текст</p>
//               </div>

//               <div>
//                 <p>Начиная от 1 BYN</p>
//                 <Button>Купить сейчас</Button>
//               </div>
//             </Link>

//             <div className="border-white border-t-[1.5rem] w-full" />

//             <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
//               <div>
//                 <h3 className="text-xl font-semibold">Ежедневники и блокноты</h3>
//                 <p>Текст</p>
//               </div>

//               <div>
//                 <p>Начиная от 1 BYN</p>
//                 <Button>Купить сейчас</Button>
//               </div>
//             </Link>
//           </div>

//           <div className="border-white border-l-[1.5rem]" />

//           <Link className="w-[calc(50%-1.5rem)] h-160 bg-gray flex flex-col justify-between p-8" href="/products">
//             <div>
//               <h3 className="text-xl font-semibold">Пишущие пренадлежности</h3>
//               <p>Текст</p>
//             </div>

//             <div>
//               <p>Начиная от 1 BYN</p>
//               <Button>Купить сейчас</Button>
//             </div>
//           </Link>
//         </div>

//         <div className="border-white border-t-[1.5rem] w-full" />

//         <div className="flex justify-between">
//           <Link className="w-[calc(50%-1.5rem)] h-160 bg-gray flex flex-col justify-between p-8" href="/products">
//             <div>
//               <h3 className="text-xl font-semibold">Канцелярские инструменты</h3>
//               <p>Текст</p>
//             </div>

//             <div>
//               <p>Начиная от 1 BYN</p>
//               <Button>Купить сейчас</Button>
//             </div>
//           </Link>

//           <div className="border-white border-l-[1.5rem]" />

//           <div className="flex flex-col w-[calc(50%+20px)]">
//             <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
//               <div>
//                 <h3 className="text-xl font-semibold">Тетради</h3>
//                 <p>Текст</p>
//               </div>

//               <div>
//                 <p>Начиная от 1 BYN</p>
//                 <Button>Купить сейчас</Button>
//               </div>
//             </Link>

//             <div className="border-white border-t-[1.5rem] w-full" />

//             <Link className="w-full h-80 bg-gray flex flex-col justify-between p-8" href="/products">
//               <div>
//                 <h3 className="text-xl font-semibold">Органайзеры</h3>
//                 <p>Текст</p>
//               </div>

//               <div>
//                 <p>Начиная от 1 BYN</p>
//                 <Button>Купить сейчас</Button>
//               </div>
//             </Link>
//           </div>
//         </div>
