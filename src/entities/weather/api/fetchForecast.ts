import { httpClient } from '@shared/api/httpClient';
import type { Coordinates } from '@shared/types/coordinates';
import type { ForecastDay, OWMForecastItem, OWMForecastResponse } from './types';

export async function fetchForecast(coords: Coordinates): Promise<ForecastDay[]> {
  const raw = await httpClient<OWMForecastResponse>('/forecast', {
    lat: String(coords.lat),
    lon: String(coords.lon),
  });

  const byDay = new Map<string, OWMForecastItem[]>();

  raw.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('ru-RU');
    if (!byDay.has(date)) byDay.set(date, []);
    byDay.get(date)!.push(item);
  });

  return Array.from(byDay.entries())
    .slice(0, 5)
    .map(([, items]) => {
      const tempMax = Math.max(...items.map((i) => i.main.temp_max));
      const tempMin = Math.min(...items.map((i) => i.main.temp_min));

      const midday = items.reduce((prev, curr) => {
        const prevHour = new Date(prev.dt * 1000).getUTCHours();
        const currHour = new Date(curr.dt * 1000).getUTCHours();
        return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
      });

      return {
        dt: midday.dt,
        tempMin,
        tempMax,
        humidity: Math.round(items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length),
        windSpeed: Math.max(...items.map((i) => i.wind.speed)),
        description: midday.weather[0].description,
        icon: midday.weather[0].icon,
        pop: Math.max(...items.map((i) => i.pop)),
      };
    });
}
