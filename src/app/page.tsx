import { AboutUs } from '@/ui-kit/components/overview/about-us';
import { Banner } from '@/ui-kit/components/overview/banner';
import { PopularCategories } from '@/ui-kit/components/overview/popular-categories';
import { ProsList } from '@/ui-kit/components/overview/pros-list';

export default async function Home() {
  return (
    <main className="px-44">
      <Banner />
      <ProsList />
      <PopularCategories />
      <AboutUs />
    </main>
  );
}
