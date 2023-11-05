import Link from 'next/link';

type TSubCategory = {
  id: string;
  name: string;
};

function SubCategory({ name, id }: TSubCategory) {
  return (
    <Link className="flex flex-col w-min items-center justify-center" href={`/categories/${id}`}>
      <div className="w-44 h-44 bg-gray" />
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
    <div className="flex justify-between mb-16">
      {categories.map(({ name, id }) => (
        <SubCategory
          key={id}
          id={id}
          name={name}
        />
      ))}
    </div>
  );
}
