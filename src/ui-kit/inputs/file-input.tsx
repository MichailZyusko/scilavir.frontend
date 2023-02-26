import { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

type TProps = {
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

type Event<T = EventTarget> = {
  target: T;
};

export function FileInput({ name }: TProps) {
  const { register } = useFormContext();
  const [multipleImages, setMultipleImages] = useState<string[]>([]);

  // Functions to preview multiple images
  const changeMultipleFiles = (e: Event<HTMLInputElement>) => {
    if (e.target.files) {
      const images = [...e.target.files].map((file) => URL.createObjectURL(file));
      setMultipleImages(images);
    }
  };

  return (
    <>
      {multipleImages.length > 0 && (
        <div className="flex flex-row justify-between">
          {multipleImages.map((img) => (
            <Image
              className="p-3"
              width={150}
              height={150}
              src={img}
              alt=""
              key={img}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
              {' '}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            accept="image/*"
            {...register(name, {
              onChange: (e) => changeMultipleFiles(e),
            })}
            className="hidden"
          />
        </label>
      </div>
    </>

  );
}
