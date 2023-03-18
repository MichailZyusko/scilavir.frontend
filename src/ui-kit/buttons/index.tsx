import { PropsWithChildren } from 'react';

export function Button({ children }: PropsWithChildren) {
  return (
    <button type="button" className="bg-black text-white rounded-[10px] px-2.5 py-1 mt-1.5">
      {children}
    </button>
  );
}
