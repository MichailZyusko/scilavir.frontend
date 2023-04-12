'use client';

import { Button } from '@/ui-kit/buttons';
import { Spinner } from '@/ui-kit/spinners';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { TProduct } from '@/types';

type TProps = {
  params: {
    id: string;
  }
};
export default function ProductPage({ params: { id } }: TProps) {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios<TProduct>({
        method: 'GET',
        url: `/products/${id}`,
      });

      setProduct(data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    router.push('/404');
    return null;
  }

  const images = product.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

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
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <br />
            <p>
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl">
              {product.price}
              {' '}
              BYN
            </h2>
            <Button size="xl">В корзину</Button>
          </div>
        </div>
      </div>

      <h2 className="w-full text-3xl text-center font-semibold my-10">Похожие товары</h2>
    </main>
  );
}
