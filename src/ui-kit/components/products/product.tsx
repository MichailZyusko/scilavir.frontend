import Link from 'next/link';
import Image from 'next/image';
import { TProduct } from '@/types';
import { useState } from 'react';
import { useClerkToken } from '@/context/auth';
import axios from '@/api/axios';
import { toast } from 'react-toastify';
import { AddToCartButton } from '@/ui-kit/buttons/add-to-cart';
import { selectCart } from '@/app/cart/cart.slice';
import { useSelector } from 'react-redux';

export function Product({
  name, price, images, id, ...props
}: TProduct) {
  const { updateClerkToken } = useClerkToken();
  const { cart } = useSelector(selectCart);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  const quantity = cart.get(id) ?? props.quantity;

  const changeFavoriteState = async () => {
    if (!id) return;

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
    >
      {isHovered && (
        <Image
          onClick={changeFavoriteState}
          src={isFavorite ? '/images/favorite-active.svg' : '/images/favorite.svg'}
          width={32}
          height={32}
          alt="favorite"
          // ! TODO: @ArtemAndrushkevich "like" should be in right top corner
          className="relative right-0 top-0 z-10 cursor-pointer w-auto h-auto"
        />
      )}
      <Link
        className="flex flex-col items-start mb-8"
        href={`/products/${id}`}
      >
        {images.length > 0 && (
          <Image
            src={images[0]}
            className="mb-5 z-0"
            style={{ objectFit: 'scale-down' }}
            width={256}
            height={256}
            alt={name}
          />
        )}
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="whitespace-normal text-center">
          {price}
          &nbsp;
          BYN
        </p>
      </Link>
      {isHovered && (
        // ! TODO: @ArtemAndrushkevich "AddToCartButton" should be in right bottom corner
        <div className="relative z-10">
          <AddToCartButton
            productId={id}
            quantity={quantity}
          />
        </div>
      )}
    </div>
  );
}
