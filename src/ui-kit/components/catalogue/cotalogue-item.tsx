import { GROUPS_AND_CATEGORIES_MAPPER } from '@/constants';
import { TCategory, TGroup } from '@/types';
import { Button } from '@/ui-kit/buttons';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type TProps = {
  item: TCategory | TGroup;
  type: 'group' | 'category'
};

export function CatalogueItem({ item, type }: TProps) {
  const styles = GROUPS_AND_CATEGORIES_MAPPER.get(item.id);

  return (
    <Link
      className={twMerge('w-full bg-gray flex flex-col justify-between p-8', styles?.className)}
      key={item.id}
      style={styles?.style}
      href={`/${type === 'group' ? 'groups' : 'categories'}/${item.id}`}
    >
      <div>
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p>Текст</p>
      </div>

      <div>
        <p>
          {item.minPrice === null
            ? `Нет товаров в этой  ${type === 'group' ? 'подборке' : 'категории'}`
            : `Начиная от ${item.minPrice} BYN`}
        </p>
        <Button>Купить сейчас</Button>
      </div>
    </Link>
  );
}
