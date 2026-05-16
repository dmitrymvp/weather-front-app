import type { ForecastDay } from '../../../entities/weather/api/types';
import { round1 } from '../../utils/converters';
import s from './ForecastCard.module.css';

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
    <div className={`${s.card} ${isToday ? s.cardToday : ''}`}>
      <span className={s.dayLabel}>{dayLabel}</span>

      <div className={s.iconWrap}>
        <img className={s.icon} src={icon} alt={day.description} />
      </div>

      <div className={s.temps}>
        <span className={s.tempMax}>{tempMax}</span>
        <span className={s.tempMin}>{tempMin}</span>
      </div>

      <div className={s.divider} />

      <div className={s.params}>
        <div className={s.paramItem}>
          <span className={s.paramLabel}>Влажность</span>
          <span className={s.paramValue}>{day.humidity}%</span>
        </div>
        <div className={s.paramItem}>
          <span className={s.paramLabel}>Ветер</span>
          <span className={s.paramValue}>{round1(day.windSpeed)} м/с</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
