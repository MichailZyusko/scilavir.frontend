import { Maps } from '@/ui-kit/components/maps/maps';
import { AboutUs } from '@/ui-kit/components/overview/about-us';
import { Banner } from '@/ui-kit/components/overview/banner';
import { PopularGroups } from '@/ui-kit/components/overview/popular-categories';
import { ProsList } from '@/ui-kit/components/overview/pros-list';

export default async function Home() {
  return (
    <main className="flex flex-auto flex-col pt-10 pb-10">
      <Banner />
      <ProsList />
      <PopularGroups />
      <AboutUs />
      <Maps />
    </main>
  );
}
