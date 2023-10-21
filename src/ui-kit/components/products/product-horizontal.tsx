import Link from 'next/link';
import Image from 'next/image';
import { TProduct } from '@/types';

export function ProductHorizontal({
  name, price, images, id, description,
}: TProduct) {
  return (
    <Link className="flex flex-row items-start" href={`/products/${id}`}>
      {images && (
        <Image
          src={images[0]}
          style={{ objectFit: 'contain' }}
          width={128}
          height={128}
          alt={name}
        />
      )}
      <div className="flex flex-col ml-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="whitespace-normal text-center">
          {price}
          &nbsp;
          BYN
        </p>
        <p className="text-sm whitespace-normal">
          {description}
        </p>
      </div>
    </Link>
  );
}
