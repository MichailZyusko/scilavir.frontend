'use client';

import { useAuthContext } from '@/context/auth';
import { Button } from '@/ui-kit/buttons';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const { signOut } = useAuthContext();
  const router = useRouter();

  const onClickHandler = async () => {
    const status = await signOut();

    if (status === 204) {
      router.replace('/');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="flex w-2/5 flex-col items-center justify-center ">
        <h1 className="text-3xl">Выход</h1>

        <Button type="button" onClick={onClickHandler}>
          Выйти
        </Button>
      </div>
    </main>
  );
}
