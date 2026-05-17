const iconMap: Record<string, string> = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'drizzle-day',
  '09n': 'drizzle-night',
  '10d': 'rain',
  '10n': 'partly-cloudy-night-rain',
  '11d': 'thunder',
  '11n': 'thunder',
  '13d': 'snow',
  '13n': 'partly-cloudy-night-snow',
  '50d': 'fog',
  '50n': 'fog',
};

const FALLBACK = 'unknown';

export function getWeatherIcon(owmCode: string | undefined): string {
  if (!owmCode) return FALLBACK;
  const name = iconMap[owmCode] ?? FALLBACK;
  return `icons/${name}.svg`;
}
