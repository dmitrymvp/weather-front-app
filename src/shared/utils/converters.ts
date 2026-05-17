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

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export const degreesToCompass = (deg: number): string => {
  const directions = [
    'С',
    'ССВ',
    'СВ',
    'ВСВ',
    'В',
    'ВЮВ',
    'ЮВ',
    'ЮЮВ',
    'Ю',
    'ЮЮЗ',
    'ЮЗ',
    'ЗЮЗ',
    'З',
    'ЗСЗ',
    'СЗ',
    'ССЗ',
  ];

  const index = Math.floor((deg + 11.25) / 22.5) % 16;

  return directions[index];
};

export function formatSunTime(unix: number, timezoneOffset: number): string {
  const date = new Date((unix + timezoneOffset) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function sunlightDuration(sunrise: number, sunset: number): string {
  const totalSeconds = sunset - sunrise;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}ч ${minutes}м`;
}

export function sunPosition(sunrise: number, sunset: number, now: number): number {
  if (now <= sunrise) return 0;
  if (now >= sunset) return 1;
  return (now - sunrise) / (sunset - sunrise);
}
