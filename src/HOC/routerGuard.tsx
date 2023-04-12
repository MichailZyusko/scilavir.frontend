import { ADMIN_ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/context/auth';
import { Spinner } from '@/ui-kit/spinners';
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
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    (async () => {
      const aToken = window.localStorage.getItem('a-token');

      if (!aToken) {
        router.push('/auth/sign-in');
        return;
      }

      if (user?.user_metadata?.role === 'user' && ADMIN_ROUTES.includes(pathname)) {
        setIsShouldRendering(false);
      } else {
        setIsShouldRendering(true);
      }

      setIsLoading(false);
    })();
  }, [pathname, user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isShouldRendering && isAdminOnly) {
    return fallback || <h1>You don&apos;t have enough permissions for this page</h1>;
  }

  return (
    <main className="px-44">
      {children}
    </main>
  );
}
