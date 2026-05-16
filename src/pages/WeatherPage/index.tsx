import { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '@entities/weather';
import type { WeatherData } from '@entities/weather';
import Loader from '@shared/ui/Loader/Loader';
import ErrorScreen from '@widgets/ErrorScreen';
import CurrentWeather from '@widgets/CurrentWeather';
import type { Coordinates } from '@shared/types/coordinates';
import Daylight from '@widgets/Daylight';
import Forecast from '@widgets/Forecast';
import HourlyForecast from '@widgets/HourlyForecast';
import { fetchForecast, fetchHourlyForecast } from '@entities/weather';
import type { ForecastDay, HourlyPoint } from '@entities/weather';
import './WeatherPage.css';

interface Props {
  coordinates: Coordinates;
}

interface PageState {
  weather: WeatherData | null;
  forecast: ForecastDay[];
  hourly: HourlyPoint[];
  loading: boolean;
  error: boolean;
}

const initialState: PageState = {
  weather: null,
  forecast: [],
  hourly: [],
  loading: true,
  error: false,
};

const WeatherPage = ({ coordinates }: Props) => {
  const [state, setState] = useState<PageState>(initialState);

  const { lat, lon } = coordinates;

  useEffect(() => {
    Promise.all([
      fetchCurrentWeather({ lat, lon }),
      fetchForecast({ lat, lon }),
      fetchHourlyForecast({ lat, lon }),
    ])
      .then(([weatherData, daily, hourly]) => {
        const todayForecast = daily[0];
        const weather: WeatherData = {
          ...weatherData,
          tempMin: todayForecast?.tempMin ?? weatherData.tempMin,
          tempMax: todayForecast?.tempMax ?? weatherData.tempMax,
        };

        setState({ weather, forecast: daily, hourly, loading: false, error: false });
      })
      .catch((err) => {
        console.error('fetch failed:', err);
        setState({ weather: null, forecast: [], hourly: [], loading: false, error: true });
      });
  }, [lat, lon]);

  if (state.loading) return <Loader />;
  if (state.error) return <ErrorScreen message="unavailable" />;
  if (!state.weather) return null;

  return (
    <main className="weather-page">
      <CurrentWeather data={state.weather} />
      <Daylight data={state.weather} />
      <Forecast days={state.forecast} />
      <HourlyForecast points={state.hourly} />
    </main>
  );
};

export default WeatherPage;
