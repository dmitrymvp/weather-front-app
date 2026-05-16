import type { ForecastDay } from '@entities/weather';
import { round1 } from '@shared/utils/converters';
import './ForecastCard.css';

type ForecastCardProps = {
  day: ForecastDay;
  isToday: boolean;
  dayLabel: string;
  tempMax: string;
  tempMin: string;
  icon: string;
};

const ForecastCard = ({ day, isToday, dayLabel, tempMin, tempMax, icon }: ForecastCardProps) => {
  return (
    <div className={`forecast-card ${isToday ? 'forecast-card--today' : ''}`}>
      <span className="forecast-card__day-label">{dayLabel}</span>

      <div className="forecast-card__icon-wrap">
        <img className="forecast-card__icon" src={icon} alt={day.description} />
      </div>

      <div className="forecast-card__temps">
        <span className="forecast-card__temp-max">{tempMax}</span>
        <span className="forecast-card__temp-min">{tempMin}</span>
      </div>

      <div className="forecast-card__divider" />

      <div className="forecast-card__params">
        <div className="forecast-card__param-item">
          <span className="forecast-card__param-label">Влажность</span>
          <span className="forecast-card__param-value">{day.humidity}%</span>
        </div>
        <div className="forecast-card__param-item">
          <span className="forecast-card__param-label">Ветер</span>
          <span className="forecast-card__param-value">{round1(day.windSpeed)} м/с</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
