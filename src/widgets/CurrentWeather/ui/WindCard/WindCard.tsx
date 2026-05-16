import WindCompass from '../../../../shared/ui/WindCompass/WindCompass';
import { degreesToCompass } from '../../../../shared/utils/converters';
import './WindCard.css';

type WindCardProps = {
  deg: number;
  windSpeed: number;
  windGust: string;
};

const WindCard = ({ deg, windSpeed, windGust }: WindCardProps) => {
  return (
    <div className="wind-card">
      <p className="wind-card__title">Ветер</p>
      <div className="wind-card__container">
        <WindCompass deg={deg} />
        <div className="wind-card__info">
          <div className="wind-card__speed-row">
            <p className="wind-card__speed">{windSpeed}</p>
            <span className="wind-card__speed-label">{`м/с ${degreesToCompass(deg)}`}</span>
          </div>

          <p className="wind-card__gust">{windGust}</p>
        </div>
      </div>
    </div>
  );
};

export default WindCard;
