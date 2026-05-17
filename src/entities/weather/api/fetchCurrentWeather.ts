import { httpClient } from '@shared/api/httpClient';
import { hpaToMmHg } from '../model/formatsPressure';
import type { Coordinates } from '@shared/types/coordinates';
import type { OWMCurrentResponse, WeatherData } from './types';

export async function fetchCurrentWeather(coordinates: Coordinates): Promise<WeatherData> {
  const data = await httpClient<OWMCurrentResponse>('/weather', {
    lat: String(coordinates.lat),
    lon: String(coordinates.lon),
  });

  return {
    city: data.name,
    dt: data.dt,
    timezone: data.timezone,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    pressure: hpaToMmHg(data.main.pressure),
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    windGust: data.wind.gust ?? null,
    clouds: data.clouds.all,
    precipitation: data.rain?.['1h'] ?? data.snow?.['1h'] ?? 0,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}
