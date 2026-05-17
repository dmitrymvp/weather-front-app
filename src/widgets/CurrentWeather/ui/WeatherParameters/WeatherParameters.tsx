import ParametrCard from '@shared/ui/ParametrCard/ParametrCard';
import './WeatherParameters.css';

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
    <div className="weather-params">
      <p className="weather-params__title">Параметры</p>
      <div className="weather-params__grid">
        <ParametrCard title="Влажность" value={humidity} />
        <ParametrCard title="Давление" value={pressure} />
        <ParametrCard title="Облачность" value={clouds} />
        <ParametrCard title="Осадки" value={precipitation} />
      </div>
    </div>
  );
};

export default WeatherParameters;
