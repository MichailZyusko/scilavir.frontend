import Link from 'next/link';
import Image from 'next/image';
import { TCategory } from '@/types';

type TSubCategory = Omit<TCategory, 'subCategories'>;

function SubCategory({ name, id, image }: TSubCategory) {
  return (
    <Link className="flex flex-col w-40 items-center" href={`/categories/${id}`}>
      <Image
        src={image}
        alt={name}
        width={256}
        height={256}
        objectFit="contain"
      />
      <h2 className="text-center font-semibold">{name}</h2>
    </Link>
  );
}

type TProps = {
  categories?: TSubCategory[]
};
export function SubCategoryList({ categories }: TProps) {
  if (!(categories && categories.length)) {
    return null;
  }

  return (
    <div className="flex justify-around mb-16">
      {categories.map(({ name, id, image }) => (
        <SubCategory
          image={image}
          key={id}
          id={id}
          name={name}
        />
      ))}
    </div>
  );
}
