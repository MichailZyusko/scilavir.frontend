/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import {
  Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef,
} from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { useFocusElement } from '@/hooks/useFocusElement';
import axios from '@/api/axios';
import { PaginatedResponse, TProduct } from '@/types';
import { useClerkToken } from '@/context/auth';

type TProps = {
  setProducts: Dispatch<SetStateAction<TProduct[]>>;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  isSearchListFocused: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({
  name,
  setIsModalOpened,
  setProducts,
  isSearchListFocused,
  ...inputProps
}: TProps) {
  const { updateClerkToken } = useClerkToken();
  const { register, watch, reset } = useFormContext();
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useFocusElement(ref);
  const search = watch('search');

  useEffect(() => {
    if (!(isFocused || isSearchListFocused)) {
      setIsModalOpened(false);
      setProducts([]);
    }
  }, [isFocused, isSearchListFocused]);

  useEffect(() => {
    (async () => {
      if (!search) return;

      await updateClerkToken();

      const {
        data:
        { data: products },
      } = await axios.get<PaginatedResponse<TProduct>>('/products', { params: { search } });
      setProducts(products);
    })();
  }, [search]);

  return (
    <div
      role="button"
      ref={ref}
      className="flex items-center w-[600px]"
      onClick={() => {
        setIsFocused(true);
        setIsModalOpened(true);
        reset({ name: 'search' });
      }}
    >
      <Image
        src="/images/search.svg"
        width={28}
        height={28}
        alt="search"
        className="cursor-pointer mr-2.5"
      />
      <input
        placeholder="Карандаш"
        {...inputProps}
        {...register('search')}
        className="border-b-2 border-b-gray-700 outline-none text-gray-900 text-sm block w-1/2 p-2 pt-0"
      />
    </div>
  );
}

// onKeyDown={async (e) => {
//   if (e.key === 'Enter') {
//     e.preventDefault();
//     await getProducts();
//   } else if (e.key === 'Escape') {
//     setIsFocused(false);
//   }
// }}
