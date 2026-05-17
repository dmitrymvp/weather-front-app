import { httpClient } from '@shared/api/httpClient';
import type { Coordinates } from '@shared/types/coordinates';
import type { HourlyPoint, OWMForecastResponse } from './types';

export async function fetchHourlyForecast(coords: Coordinates): Promise<HourlyPoint[]> {
  const raw = await httpClient<OWMForecastResponse>('/forecast', {
    lat: String(coords.lat),
    lon: String(coords.lon),
  });

  return raw.list.slice(0, 9).map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    icon: item.weather[0].icon,
    timezone: raw.city.timezone,
  }));
}
