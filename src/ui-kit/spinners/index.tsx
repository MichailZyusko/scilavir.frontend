'use client';

import { Spinner } from 'flowbite-react';

export function Loader() {
  return (
    <main className="flex flex-col flex-auto items-center justify-center">
      <div className="mb-40">
        <Spinner
          size="xl"
          color="purple"
        />
      </div>
    </main>
  );
}
