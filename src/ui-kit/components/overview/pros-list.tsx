import Image from 'next/image';

type TPros = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const pros: TPros[] = [
  {
    id: 1,
    name: 'Низкие цены',
    description: 'Магазин предлагает клиентам конкурентоспособные цены, что делает его привлекательным выбором для тех, кто ценит экономию',
    image: '/images/pros-1.svg',
  },
  {
    id: 2,
    name: 'Самый крупный магазин Лиды',
    description: 'Магазин является самым крупным в своей категории, предоставляя широчайший выбор товаров для офиса и школы',
    image: '/images/pros-2.svg',
  },
  {
    id: 3,
    name: 'Большое разнообразие товаров',
    description: 'Мы предлагаем разнообразные канцелярские товары, включая не только основные предметы (ручки, тетради), но и специализированные товары (художественные материалы, офисная техника)',
    image: '/images/pros-3.svg',
  },
];

function Pros({ description, name, image }: Omit<TPros, 'id'>) {
  return (
    <li className="flex flex-col items-start justify-start w-1/3">
      <Image
        width={90}
        height={90}
        src={image}
        alt={name}
      />
      <h2 className="text-xl pt-5 font-semibold">{name}</h2>
      <p className="whitespace-normal text-sm pt-2.5">{description}</p>
    </li>
  );
}

export function ProsList() {
  return (
    <ul className="container mx-auto px-4 flex justify-between gap-5 mt-20">
      {pros.map(({ id, ...params }) => (
        <Pros
          key={id}
          {...params}
        />
      ))}
    </ul>
    </ul>
  );
}
