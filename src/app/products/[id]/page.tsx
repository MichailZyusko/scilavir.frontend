'use client';

import { Spinner } from '@/ui-kit/spinners';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { TProduct } from '@/types';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { round } from '@/utils';
import Image from 'next/image';
import { useClerkToken } from '@/context/auth';

type TProps = {
  params: {
    id: string;
  }
};
export default function ProductPage({ params: { id } }: TProps) {
  const { updateClerkToken } = useClerkToken();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await updateClerkToken();
      const [
        { data: prdct },
        { data: { quantity: qnty } },
        { data: { isFavorite: isFav } },
      ] = await Promise.all([
        axios<TProduct>({
          method: 'GET',
          url: `/products/${id}`,
        }),
        axios <{ quantity: number }>({
          method: 'GET',
          url: `/cart/${id}`,
        }),
        axios <{ isFavorite: boolean }>({
          method: 'GET',
          url: `/products/favorites/${id}`,
        }),
      ]);

      setIsFavorite(isFav);
      setProduct(prdct);
      setQuantity(qnty);
      setIsLoading(false);
    })();
  }, [id, updateClerkToken]);

  const changeFavoriteState = async () => {
    if (!product) {
      return;
    }

    if (isFavorite) {
      await axios.delete(`/products/favorites/${id}`);
    } else {
      await axios.post(`/products/favorites/${id}`);
    }

    setIsFavorite(!isFavorite);
  };

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
            <Image
              onClick={changeFavoriteState}
              src={isFavorite ? '/images/favorite-active.svg' : '/images/favorite.svg'}
              width={24}
              height={24}
              alt="logo"
              className="relative top-8 -left-14 z-10"
            />
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <br />
            <p>
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl">
              {round(product.price * (quantity || 1))}
              {' '}
              BYN
            </h2>
            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>

      <h2 className="w-full text-3xl text-center font-semibold my-10">Похожие товары</h2>
    </main>
  );
}
