'use client';

import { Button } from '@/ui-kit/buttons';

export default function SignOut() {
  const onClickHandler = async () => {
    console.log('sign out');
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
