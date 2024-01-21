import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const round = (x: number) => Math.round(x * 100) / 100;
export const formatDate = (date: Date) => new Intl
  .DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour: '2-digit',
  })
  .format(date);

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const { status } = error.request;

    if (status === 401) {
      toast.error('Для того чтобы совершить это действие необходимо быть зарегестрированным');
      return;
    }
  }

  console.error(error);
  toast.error('Возникла непредвиденная ошибка. Попробуйте позже или сообщите в поддержку');
};
