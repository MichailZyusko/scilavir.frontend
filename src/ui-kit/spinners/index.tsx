'use client';

import { Spinner } from 'flowbite-react';

export function Loader() {
  return (
    <main className="flex items-center justify-center min-h-[70vh]">
      <div className="mb-40">
        <Spinner
          size="xl"
          color="purple"
        />
      </div>
    </main>
  );
}
