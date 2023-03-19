/* eslint-disable max-len */

'use client';

import { PRODUCTS } from '@/constants';
import { Button } from '@/ui-kit/buttons';
import { Product } from '@/ui-kit/components/products/product';
import ImageGallery from 'react-image-gallery';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },

];

export default function ProductPage() {
  return (
    <main className="px-44">
      <div className="flex mb-5">
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          showNav={false}
          autoPlay
          additionalClass="w-1/2"
        />
        <div className="flex flex-col justify-between ml-5 w-1/2">
          <div>
            <h1 className="text-4xl font-semibold">Название</h1>
            <br />
            <p>
              Описание Описание ОписаниеОписание Описание ОписаниеОписание Описание ОписаниеОписание Описание
            </p>
            <p>
              Описание Описание ОписаниеОписание Описание ОписаниеОписание Описание ОписаниеОписание Описание
            </p>
            <p>
              Описание Описание ОписаниеОписание Описание ОписаниеОписание Описание ОписаниеОписание Описание
            </p>
            <p>
              Описание Описание ОписаниеОписание Описание ОписаниеОписание Описание ОписаниеОписание Описание
            </p>
          </div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl">10 BYN</h2>
            <Button size="xl">В корзину</Button>
          </div>
        </div>
      </div>

      <h2 className="w-full text-3xl text-center font-semibold my-10">Похожие товары</h2>

      <div className="grid grid-cols-4 gap-8">
        {PRODUCTS.slice(0, 4).map(({ id, ...product }) => <Product key={id} id={id} {...product} />)}
      </div>

    </main>
  );
}
