import { useEffect, useState } from 'react';
import type { Coordinates } from '../../shared/types/coordinates';

interface GeolocationState {
  coordinates: Coordinates | null;
  loading: boolean;
  error: 'denied' | 'unavailable' | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          coordinates: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          loading: false,
          error: null,
        });
      },
      (err) => {
        const error = err.code === 1 ? 'denied' : 'unavailable';

        setState({
          coordinates: null,
          loading: false,
          error: error,
        });
      },
    );
  }, []);

  return state;
};
