import { Catalogue } from '@/ui-kit/components/catalogue/catalogue';
import { Metadata } from 'next';

export default async function CataloguePage() {
  return (
    <main className="flex flex-col flex-auto container mx-auto px-4">
      <Catalogue />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Каталог',
};
