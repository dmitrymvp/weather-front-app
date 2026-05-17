import { capitalize } from '@shared/utils/capitalize';
import { formatTimestamp, round1 } from '@shared/utils/converters';
import { getWeatherIcon } from '@shared/utils/weatherIcons';
import MainWeatherCard from './ui/MainWeaterCard/MainWeatherCard';
import WeatherParameters from './ui/WeatherParameters/WeatherParameters';
import type { WeatherData } from '@entities/weather';
import './CurrentWeather.css';
import WindCard from './ui/WindCard/WindCard';

type CurrentWeatherProps = {
  data: WeatherData;
};

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <section className="current-weather">
      <MainWeatherCard
        city={data.city}
        date={formatTimestamp(data.dt, data.timezone)}
        temp={`${data.temp > 0 ? '+' : ''}${round1(data.temp)}°`}
        feelsLike={`${data.feelsLike > 0 ? '+' : ''}${round1(data.feelsLike)}°`}
        weatherDescription={capitalize(data.description)}
        tempMin={`${data.tempMin > 0 ? '+' : ''}${round1(data.tempMin)}°`}
        tempMax={`${data.tempMax > 0 ? '+' : ''}${round1(data.tempMax)}°`}
        tempDifference={`${round1(data.tempMax - data.tempMin)}°`}
        icon={getWeatherIcon(data.icon)}
      />
      <div className="current-weather__right">
        <WeatherParameters
          humidity={`${data.humidity}%`}
          pressure={`${data.pressure} мм`}
          clouds={`${data.clouds}%`}
          precipitation={`${round1(data.precipitation)} мм`}
        />
        <WindCard
          deg={data.windDeg}
          windSpeed={round1(data.windSpeed)}
          windGust={data.windGust != null ? `Порывы до ${round1(data.windGust)} м/с` : 'Нет данных'}
        />
      </div>
    </section>
  );
};

export default CurrentWeather;
