'use client';

import { Loader } from '@/ui-kit/spinners';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { TProduct } from '@/types';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { round } from '@/utils';
import Image from 'next/image';
import { useClerkToken } from '@/context/auth';
import { Product } from '@/ui-kit/components/products/product';
import { Feedbacks } from '@/ui-kit/components/feedbacks';
import { toast } from 'react-toastify';

type TProps = {
  params: {
    id: string;
  }
};

type TState = {
  product: TProduct | null;
  similarProducts: TProduct[];
  quantity: number;
  isFavorite: boolean;
  isLoading: boolean;
};
export default function ProductPage({ params: { id } }: TProps) {
  const { updateClerkToken } = useClerkToken();

  const [state, setState] = useState<TState>({
    product: null,
    similarProducts: [],
    quantity: 0,
    isFavorite: false,
    isLoading: true,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      await updateClerkToken();

      const [
        { data: product },
        { data: { quantity } },
      ] = await Promise.all([
        axios.get<TProduct>(`/products/${id}`),
        axios.get<{ quantity: number }>(`/cart/${id}`),
      ]);

      const { data: similarProducts } = await axios.get(`/categories/${product.categoryIds[0]}/sample`, {
        params: {
          productId: id,
        },
      });

      setState({
        ...state,
        product,
        quantity,
        similarProducts,
        isFavorite: product.isFavorite,
        isLoading: false,
      });
    })();
  }, [id, updateClerkToken]);

  const {
    product, quantity, isFavorite, isLoading,
  } = state;

  const changeFavoriteState = async () => {
    if (!product) {
      return;
    }

    await updateClerkToken();

    if (isFavorite) {
      await toast.promise(axios.delete(`/products/favorites/${id}`), {
        pending: 'Удаляем из избранного...',
        success: 'Успешно удалено из избранного',
        error: 'Ошибка при удалении из избранного',
      });
    } else {
      await toast.promise(axios.post(`/products/favorites/${id}`), {
        pending: 'Добавляем в избранное...',
        success: 'Успешно добавлено в избранное',
        error: 'Ошибка при добавлении в избранное',
      });
    }

    setState({
      ...state,
      isFavorite: !isFavorite,
    });
  };

  if (isLoading) {
    return <Loader />;
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
              width={32}
              height={32}
              alt="favorite"
              className="relative top-4 -left-14 z-10 cursor-pointer w-auto h-auto"
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
              setQuantity={(newQuantity) => setState({ ...state, quantity: newQuantity })}
            />
          </div>
        </div>
      </div>

      <Feedbacks productId={id} />

      <h2 className="w-full text-3xl text-center font-semibold my-10">Похожие товары</h2>
      <div className="grid grid-cols-4 gap-8">
        {state.similarProducts.map(({ id: productId, ...productWithOutId }) => (
          <Product
            key={productId}
            id={productId}
            {...productWithOutId}
          />
        ))}
      </div>
    </main>
  );
}
