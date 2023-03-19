import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type TProps = {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
} & PropsWithChildren;

export function Button({ children, size }: TProps) {
  return (
    <button
      type="button"
      className={clsx(
        'bg-black text-white rounded-[10px] px-2.5 py-1 mt-1.5',
        size === 'xl' && 'text-2xl px-3 py-1.5',
      )}
    >
      {children}
    </button>
  );
}
