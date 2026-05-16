import TempCard from '@shared/ui/TempCard/TempCard';
import './MainWeatherCard.css';

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
    <div className="weather-card">
      <div className="weather-card__header">
        <h2 className="weather-card__city">{city}</h2>
        <p className="weather-card__date">{date}</p>
      </div>
      <div className="weather-card__temp-container">
        <p className="weather-card__temp">{temp}</p>
        <div className="weather-card__feels-like">
          <p className="weather-card__feels-like-label">Ощущается</p>
          <p className="weather-card__feels-like-temp">{feelsLike}</p>
        </div>
        <div className="weather-card__icon-wrap">
          <img src={icon} alt={weatherDescription} />
        </div>
      </div>
      <p className="weather-card__description">{weatherDescription}</p>
      <div className="weather-card__temp-cards">
        <TempCard title="Мин" temp={tempMin} />
        <TempCard title="Макс" temp={tempMax} />
        <TempCard title="Разница" temp={tempDifference} />
      </div>
    </div>
  );
};

export default MainWeatherCard;
