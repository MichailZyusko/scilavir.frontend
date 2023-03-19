import Link from 'next/link';

type TProps = {
  name: string;
  price: number;
  id: string;
};

export function Product({ name, price, id }: TProps) {
  return (
    <Link className="flex flex-col items-start mb-8" href={`/products/${id}`}>
      <div className="w-full h-64 bg-gray mb-2.5" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="whitespace-normal text-center">
        {price}
        &nbsp;
        BYN
      </p>
    </Link>
  );
}
