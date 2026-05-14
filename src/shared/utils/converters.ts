export const formatTimestamp = (timestamp: number | undefined): string => {
  if (!timestamp) return 'Сейчас';
  return new Date(timestamp * 1000).toLocaleString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function round(n: number): number {
  return Math.round(n);
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export const degreesToCompass = (deg: number): string => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

  const index = Math.round(deg / 45) % 8;

  return directions[index];
};
