import Link from 'next/link';
import Image from 'next/image';
import { TProduct } from '@/types';

export function Product({
  name, price, images, id,
}: TProduct) {
  return (
    <Link className="flex flex-col items-start mb-8" href={`/products/${id}`}>
      {images && (
        <div className="w-[128px] h-[200px]">
          <Image
            src={images[0]}
            style={{ objectFit: 'scale-down' }}
            width={256}
            height={256}
            alt={name}
          />
        </div>
      )}
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="whitespace-normal text-center">
        {price}
        &nbsp;
        BYN
      </p>
    </Link>
  );
}
