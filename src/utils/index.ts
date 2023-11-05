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
