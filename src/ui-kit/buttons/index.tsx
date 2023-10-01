import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type TProps = {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
} & React.ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

export function Button({
  children, size, ...buttonProps
}: TProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'bg-black text-white rounded-[10px] px-2.5 py-1',
        size === 'xl' && 'text-2xl px-3 py-1.5',
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
