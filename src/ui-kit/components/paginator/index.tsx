import { FlowbitePaginationTheme, Pagination } from 'flowbite-react';

const paginationTheme: FlowbitePaginationTheme = {
  base: '',
  layout: {
    table: {
      base: 'text-sm text-gray-700 dark:text-gray-400',
      span: 'font-semibold text-gray-900 dark:text-white',
    },
  },
  pages: {
    base: 'xs:mt-0 mt-2 inline-flex items-center space-x-px',
    showIcon: 'inline-flex',
    previous: {
      base: 'ml-0 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      icon: 'h-5 w-5',
    },
    next: {
      base: 'bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      icon: 'h-5 w-5',
    },
    selector: {
      base: 'w-10 border-gray-300 bg-white py-2 px-2 text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      active: 'bg-yellow-400 bg-opacity-50 rounded-full text-black hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
      disabled: 'opacity-50 cursor-normal',
    },
  },
};

type TProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export function Paginator({ currentPage, totalPages, onPageChange }: TProps) {
  if (!totalPages) {
    return null;
  }

  return (
    <Pagination
      theme={paginationTheme}
      nextLabel="Вперед >"
      previousLabel="< Назад"
      currentPage={currentPage + 1}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
