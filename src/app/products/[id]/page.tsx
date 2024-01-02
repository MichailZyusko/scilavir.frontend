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
import { selectCart } from '@/app/cart/cart.slice';
import { useSelector } from 'react-redux';

type TProps = {
  params: {
    id: string;
  }
};

type TState = {
  product: TProduct | null;
  similarProducts: TProduct[];
  isFavorite: boolean;
  isLoading: boolean;
};
export default function ProductPage({ params: { id } }: TProps) {
  const { cart } = useSelector(selectCart);
  const { updateClerkToken } = useClerkToken();

  const [state, setState] = useState<TState>({
    product: null,
    similarProducts: [],
    isFavorite: false,
    isLoading: true,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      await updateClerkToken();

      const { data: product } = await axios.get<TProduct>(`/products/${id}`);
      const { data: similarProducts } = await axios.get(`/categories/${product.categoryIds[0]}/sample`, {
        params: {
          productId: id,
        },
      });

      setState({
        ...state,
        product,
        similarProducts,
        isFavorite: !!product.isFavorite,
        isLoading: false,
      });
    })();
  }, [id, updateClerkToken]);

  const {
    product, isFavorite, isLoading,
  } = state;

  const changeFavoriteState = async () => {
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

  const quantity = cart.get(product.id) ?? product?.quantity;

  const images = product.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <main className="flex flex-col flex-auto container mx-auto px-4">
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
            />
          </div>
        </div>
      </div>

      {state.similarProducts.length > 0 && (
        <>
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
        </>
      )}

      <Feedbacks productId={id} />
    </main>
  );
}
