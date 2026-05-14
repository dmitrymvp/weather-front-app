const BASE_URL = import.meta.env.VITE_OWM_BASE_URL;
const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export const httpClient = async (endpoint: string, params: Record<string, string>) => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');
  url.searchParams.set('lang', 'ru');

  Object.entries(params)?.forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
