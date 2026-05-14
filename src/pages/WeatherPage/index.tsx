import type { Coordinates } from '../../shared/types/coordinates';
import CurrentWeather from '../../widgets/CurrentWeather';

interface Props {
  coordinates: Coordinates | null;
}

const WeatherPage = ({ coordinates }: Props) => {
  return <CurrentWeather coordinates={coordinates} />;
};

export default WeatherPage;
