'use client';

import { patchUser } from '@/api/services/users/patch.user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TProps = {
  params: Record<string, string> & { id: string }
};

export default function VerificationPage({ params }: TProps) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    (async () => {
      await patchUser({
        id,
        isActivated: true,
      });

      router.push('/');
    })();
  }, [id]);

  return (
    <>
      <h1>
        Thanks for verification
      </h1>
      <h2>
        You can continue browse our site
      </h2>
    </>
  );
}
