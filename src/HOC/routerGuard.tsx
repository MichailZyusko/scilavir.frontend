import { ADMIN_ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/context/auth';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

type TProps = {
  isAdminOnly?: boolean;
  fallback?: JSX.Element;
} & PropsWithChildren;

export function RouterGuard({ children, isAdminOnly, fallback }: TProps) {
  const [isShouldRendering, setIsShouldRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { user } = useAuthContext();

  const router = useRouter();
  const aToken = window.localStorage.getItem('a-token');

  if (!aToken) {
    router.push('/auth/sign-in');
  }

  useEffect(() => {
    (async () => {
      if (user?.role === 'user' && ADMIN_ROUTES.includes(pathname)) {
        setIsShouldRendering(false);
      } else {
        setIsShouldRendering(true);
      }

      setIsLoading(false);
    })();
  }, [pathname, user]);

  if (!isShouldRendering && isAdminOnly) {
    return fallback || <h1>You don&apos;t have enough permissions for this page</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="px-44">
      {children}
    </main>
  );
}
