import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type TProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ label, name, ...inputProps }: TProps) {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-2 ml-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...inputProps}
        {...register(name)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}
