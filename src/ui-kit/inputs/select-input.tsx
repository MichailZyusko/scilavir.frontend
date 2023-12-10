import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type TProps = {
  label: string;
  name: string;
  options: [{
    id: string;
    name: string;
  }] | [];
} & InputHTMLAttributes<HTMLSelectElement>;

export function SelectInput({
  label, name, options, ...selectProps
}: TProps) {
  const { register } = useFormContext();

  return (
    <div className="w-[600px]">
      <label
        htmlFor={name}
        className="block mb-2 ml-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        {...selectProps}
        {...register(name)}
        multiple
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          value="NULL"
          key="e7c46786-10df-4089-9610-104b3d6301f7"
          selected
        >
          Not selected
        </option>
        {options.map((item) => (
          <option
            value={item.id}
            key={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
