import { AboutUs } from '@/ui-kit/components/overview/about-us';
import { Banner } from '@/ui-kit/components/overview/banner';
import { PopularCategories } from '@/ui-kit/components/overview/popular-categories';
import { ProsList } from '@/ui-kit/components/overview/pros-list';

type TProps = {
  searchParams?: {
    access_token: string;
    refresh_token: string;
  };
};

export default async function Home({ searchParams }: TProps) {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
  } = searchParams || {};

  if (accessToken && refreshToken) {
    localStorage.setItem('a-token', accessToken);
    localStorage.setItem('r-token', refreshToken);
  }

  return (
    <main className="px-44">
      <Banner />
      <ProsList />
      <PopularCategories />
      <AboutUs />
    </main>
  );
}
