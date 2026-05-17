import { useGeolocation } from '@features/getLocation';
import { useLocationTabs, LocationTabs } from '@features/locationTabs';
import ErrorScreen from '@widgets/ErrorScreen';
import WeatherPage from '@pages/WeatherPage';
import Loader from '@shared/ui/Loader/Loader';
import Footer from '@widgets/Footer';
import Header from '@widgets/Header';
import './App.css';

const App = () => {
  const { coordinates: geoCoords, loading: geoLoading, error: geoError } = useGeolocation();
  const { activeTabId, activeTab, setTab, tabs } = useLocationTabs();

  const isGeoTab = activeTab.coordinates === null;
  const coordinates = isGeoTab ? geoCoords : activeTab.coordinates;
  const loading = isGeoTab && geoLoading;
  const error = isGeoTab ? geoError : null;

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error || !coordinates) return <ErrorScreen message={error ?? 'unavailable'} />;

    const cityLabel = activeTabId === 0 ? undefined : activeTab.label;
    return <WeatherPage key={`${coordinates.lat}-${coordinates.lon}`} coordinates={coordinates} cityLabel={cityLabel} />;
  };

  return (
    <div className="container">
      <Header>
        <LocationTabs tabs={tabs} activeTabId={activeTabId} onTabChange={setTab} />
      </Header>
      {renderContent()}
      <Footer />
    </div>
  );
};

export default App;
