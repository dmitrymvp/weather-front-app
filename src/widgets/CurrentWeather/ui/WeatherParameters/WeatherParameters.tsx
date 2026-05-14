import ParametrCard from '../../../../shared/ui/ParametrCard/ParametrCard';
import s from './WeatherParameters.module.css';

type WeatherParametersProps = {
  humidity: string;
  pressure: string;
  clouds: string;
  precipitation: string;
};

const WeatherParameters = ({
  humidity,
  pressure,
  clouds,
  precipitation,
}: WeatherParametersProps) => {
  return (
    <div className={s.parametersCard}>
      <p className={s.parametersCard__title}>Параметры</p>
      <div className={s.parametersCard__containerCards}>
        <ParametrCard title="Влажность" value={humidity} />
        <ParametrCard title="Давление" value={pressure} />
        <ParametrCard title="Облачность" value={clouds} />
        <ParametrCard title="Осадки" value={precipitation} />
      </div>
    </div>
  );
};

export default WeatherParameters;
