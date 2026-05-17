import { useGeolocation } from '@features/getLocation';
import ErrorScreen from '@widgets/ErrorScreen';
import WeatherPage from '@pages/WeatherPage';
import Loader from '@shared/ui/Loader/Loader';
import Footer from '@widgets/Footer';
import Header from '@widgets/Header';
import './App.css';

const App = () => {
  const { coordinates, loading, error } = useGeolocation();

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error || !coordinates) return <ErrorScreen message={error ?? 'unavailable'} />;

    return <WeatherPage key={`${coordinates.lat}-${coordinates.lon}`} coordinates={coordinates} />;
  };

  return (
    <div className="container">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  );
};

export default App;
