'use client';

import { Rating } from 'flowbite-react';
import { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type TProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function RatingInput({ label, name, ...inputProps }: TProps) {
  const { register, setValue: setRHFValue } = useFormContext();
  const [value, setValue] = useState(0);

  return (
    <div className="mb-4 w-[600px]">
      <label
        htmlFor={name}
        className="block mb-2 ml-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Rating>
        {[1, 2, 3, 4, 5].map((item) => (
          <Rating.Star
            className="cursor-pointer mx-0.5"
            onClick={() => {
              setValue(item);
              setRHFValue(name, item);
            }}
            filled={value >= item}
          />
        ))}
      </Rating>
      <input
        {...inputProps}
        {...register(name, { value })}
        className="hidden"
      />
    </div>
  );
}
