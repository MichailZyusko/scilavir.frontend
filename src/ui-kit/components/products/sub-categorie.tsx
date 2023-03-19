type TSubCategory = {
  id: number;
  name: string;
};

const subCategory: TSubCategory[] = [
  {
    id: 1,
    name: 'Подкатегория 1',
  },
  {
    id: 2,
    name: 'Подкатегория 2',
  },
  {
    id: 3,
    name: 'Подкатегория 3',
  },
  {
    id: 4,
    name: 'Подкатегория 4',
  },
  {
    id: 5,
    name: 'Подкатегория 5',
  }];

function SubCategory({ name }: Omit<TSubCategory, 'id'>) {
  return (
    <div className="flex flex-col w-min items-center justify-center">
      <div className="w-44 h-44 bg-gray" />
      <h2 className="text-center font-semibold">{name}</h2>
    </div>
  );
}

export function SubCategoryList() {
  return (
    <div className="flex justify-between mb-16">
      {subCategory.map(({ name, id }) => (
        <SubCategory
          key={id}
          name={name}
        />
      ))}
    </div>
  );
}
