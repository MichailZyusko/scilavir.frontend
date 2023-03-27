'use client';

import { UserService } from '@/api/services/users.service';
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
      await UserService.patch({
        id,
        isActivated: true,
      });

      router.push('/');
    })();
  }, [id, router]);

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
