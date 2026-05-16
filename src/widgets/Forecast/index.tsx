import type { ForecastDay } from '../../entities/weather/api/types';
import ForecastCard from '../../shared/ui/ForecastCard/ForecastCard';
import { getWeatherIcon } from '../../shared/utils/weatherIcons';
import './Forecast.css';

type ForecastProps = {
  days: ForecastDay[];
};

const Forecast = ({ days }: ForecastProps) => {
  return (
    <section className="forecast">
      <h3 className="forecast__title">Прогноз на 5 дней</h3>
      <div className="forecast__list">
        {days.map((day, index) => {
          const isToday = index === 0;
          const dayLabel = isToday
            ? 'Сегодня'
            : new Date(day.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'short' });

          return (
            <ForecastCard
              key={day.dt}
              day={day}
              isToday={isToday}
              dayLabel={dayLabel}
              tempMax={`${day.tempMax > 0 ? '+' : ''}${Math.round(day.tempMax)}°`}
              tempMin={`${day.tempMin > 0 ? '+' : ''}${Math.round(day.tempMin)}°`}
              icon={getWeatherIcon(day.icon)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Forecast;
