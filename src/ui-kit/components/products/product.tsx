import Link from 'next/link';
import Image from 'next/image';
import { TProduct } from '@/types';
import { useState } from 'react';
import { useClerkToken } from '@/context/auth';
import axios from '@/api/axios';
import { toast } from 'react-toastify';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { useUser } from '@clerk/nextjs';

export function Product({
  name, price, images, id, ...props
}: TProduct) {
  const { updateClerkToken } = useClerkToken();
  const { isSignedIn, isLoaded } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  const changeFavoriteState = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!id) return;
    if (!isSignedIn) {
      toast.error('Вы должны быть авторизованы, чтобы добавить товар в избранное');
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

    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Link
        className="flex flex-col items-start mb-8"
        href={`/products/${id}`}
      >
        <div className="relative">
          {images.length > 0 && (
          <Image
            src={images[0]}
            className=" mb-5 z-0"
            style={{ objectFit: 'scale-down' }}
            width={256}
            height={256}
            alt={name}
          />
          )}
          <div>
            <button type="button" onClick={changeFavoriteState} disabled={!isLoaded}>
              <Image
                src={isFavorite ? '/images/favorite-active.svg' : '/images/favorite.svg'}
                width={32}
                height={32}
                alt="favorite"
                className="absolute right-0 top-0 z-10 w-auto h-auto"
              />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-semibold leading-5">{name}</h2>
        <p className="whitespace-normal text-center mt-3">
          {price}
          &nbsp;
          BYN
        </p>
        {isHovered && (
          <div className="absolute bottom-0 right-0">
            <AddToCartButton productId={id} />
          </div>
        )}
      </Link>
    </div>
  );
}
