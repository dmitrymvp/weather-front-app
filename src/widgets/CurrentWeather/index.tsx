import { useEffect, useState } from 'react';
import { capitalize } from '../../shared/utils/capitalize';
import { formatTimestamp, round, round1 } from '../../shared/utils/converters';
import { getWeatherIcon } from '../../shared/utils/weatherIcons';
import MainWeatherCard from './ui/MainWeaterCard/MainWeatherCard';
import WeatherParameters from './ui/WeatherParameters/WeatherParameters';
import type { Coordinates } from '../../shared/types/coordinates';
import { fetchCurrentWeather, type WeatherData } from '../../entities/weather';
import Loader from '../../shared/ui/Loader/Loader';
import s from './CurrentWeather.module.css';
import WindCard from './ui/WindCard/WindCard';

type CurrentWeatherProps = {
  coordinates: Coordinates | null;
};

const CurrentWeather = ({ coordinates }: CurrentWeatherProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coordinates) {
      fetchCurrentWeather(coordinates)
        .then(setWeather)
        .finally(() => setLoading(false));
    }
  }, [coordinates]);

  if (loading) return <Loader />;

  console.log(weather);

  if (!weather) return <div>No weather data</div>;

  return (
    <section className={s.currentWeatherSection}>
      <MainWeatherCard
        city={weather.city}
        date={formatTimestamp(weather.dt)}
        temp={`${weather.temp > 0 ? '+' : ''}${round(weather.temp)}°`}
        feelsLike={`${weather.feelsLike > 0 ? '+' : ''}${round(weather.feelsLike)}°`}
        weatherDescription={capitalize(weather.description)}
        tempMin={`${weather.tempMin > 0 ? '+' : ''}${round(weather.tempMin)}°`}
        tempMax={`${weather.tempMax > 0 ? '+' : ''}${round(weather.tempMax)}°`}
        tempDifference={`${round(weather.tempMax) - round(weather.tempMin)}°`}
        icon={getWeatherIcon(weather.icon)}
      />
      <WeatherParameters
        humidity={`${weather.humidity}%`}
        pressure={`${weather.pressure} мм`}
        clouds={`${weather.clouds}%`}
        precipitation={`${weather.precipitation} мм`}
      />
      <WindCard
        deg={weather.windDeg}
        windSpeed={round1(weather.windSpeed)}
        windGust={`Порывы до ${round1(weather.windGust)} м/с`}
      />
    </section>
  );
};

export default CurrentWeather;
