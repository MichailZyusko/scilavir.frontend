type TPros = {
  id: number;
  name: string;
  description: string;
};

const pros: TPros[] = [
  {
    id: 1,
    name: 'Низкие цены',
    description: 'Магазин предлагает клиентам конкурентоспособные цены, что делает его привлекательным выбором для тех, кто ценит экономию',
  },
  {
    id: 2,
    name: 'Самый крупный магазин Лиды',
    description: 'Магазин является самым крупным в своей категории, предоставляя широчайший выбор товаров для офиса и школы',
  },
  {
    id: 3,
    name: 'Большое разнообразие товаров',
    description: 'Мы предлагаем разнообразные канцелярские товары, включая не только основные предметы (ручки, тетради), но и специализированные товары (художественные материалы, офисная техника)',
  },
];

function Pros({ description, name }: Omit<TPros, 'id'>) {
  return (
    <li className="flex flex-col items-start justify-start w-1/3">
      <div className="w-full h-40 bg-gray" />
      <h2 className="text-xl pt-5">{name}</h2>
      <p className="whitespace-normal text-sm pt-2.5">{description}</p>
    </li>
  );
}

export function ProsList() {
  return (
    <ul className="container mx-auto px-4 flex justify-between gap-5 mt-20">
      {pros.map(({ description, name, id }) => (
        <Pros
          key={id}
          description={description}
          name={name}
        />
      ))}
    </ul>
  );
}
