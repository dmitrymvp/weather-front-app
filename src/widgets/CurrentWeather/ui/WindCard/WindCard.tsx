import WindCompass from '../../../../shared/ui/WindCompass/WindCompass';
import { degreesToCompass } from '../../../../shared/utils/converters';
import s from './WindCard.module.css';

type WindCardProps = {
  deg: number;
  windSpeed: number;
  windGust: string;
};

const WindCard = ({ deg, windSpeed, windGust }: WindCardProps) => {
  return (
    <div className={s.windCard}>
      <p className={s.windCard__title}>Ветер</p>
      <div className={s.windCard__container}>
        <WindCompass deg={deg} />
        <div className={s.windCard__windInfo}>
          <div>
            <p className={s.windCard__windSpeed}>{windSpeed}</p>
            <span className={s.windCard__windSpeedDescr}>{`м/с ${degreesToCompass(deg)}`}</span>
          </div>

          <p className={s.windCard__windGust}>{windGust}</p>
        </div>
      </div>
    </div>
  );
};

export default WindCard;
