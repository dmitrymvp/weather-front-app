import TempCard from '../../../../shared/ui/TempCard/TempCard';
import s from './MainWeatherCard.module.css';

type MainWeatherCardProps = {
  city: string;
  date: string;
  temp: string;
  feelsLike: string;
  weatherDescription: string;
  tempMin: string;
  tempMax: string;
  tempDifference: string;
  icon: string;
};

const MainWeatherCard = ({
  city,
  date,
  temp,
  feelsLike,
  weatherDescription,
  tempMin,
  tempMax,
  tempDifference,
  icon,
}: MainWeatherCardProps) => {
  return (
    <div className={s.weatherCard}>
      <div className={s.weatherCard__header}>
        <h2 className={s.weatherCard__city}>{city}</h2>
        <p className={s.weatherCard__date}>{date}</p>
      </div>
      <div className={s.weatherCard__tempContainer}>
        <p className={s.weatherCard__temp}>{temp}</p>
        <div className={s.weatherCard__feelsLike}>
          <p className={s.weatherCard__feelsLikeDescr}>Ощущается</p>
          <p className={s.weatherCard__feelsLikeTemp}>{feelsLike}</p>
        </div>
        <div className={s.weatherCard__imageContainer}>
          <img src={icon} alt={weatherDescription} />
        </div>
      </div>
      <p className={s.weatherCard__descr}>{weatherDescription}</p>
      <div className={s.weatherCard__tempCardContainer}>
        <TempCard title="Мин" temp={tempMin} />
        <TempCard title="Макс" temp={tempMax} />
        <TempCard title="Разница" temp={tempDifference} />
      </div>
    </div>
  );
};

export default MainWeatherCard;
