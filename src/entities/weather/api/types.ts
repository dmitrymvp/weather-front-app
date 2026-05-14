export interface OWMCurrentResponse {
  name: string;
  dt: number;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: { '1h'?: number };
  snow?: { '1h'?: number };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
}

export interface WeatherData {
  city: string;
  dt: number;
  timezone: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  windGust: number;
  clouds: number;
  precipitation: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

// export interface OWMForecastItem {
//   dt: number;
//   main: {
//     temp: number;
//     temp_min: number;
//     temp_max: number;
//     humidity: number;
//   };
//   weather: Array<{
//     description: string;
//     icon: string;
//   }>;
//   wind: {
//     speed: number;
//     deg: number;
//   };
//   pop: number;
// }

// export interface OWMForecastResponse {
//   list: OWMForecastItem[];
//   city: {
//     timezone: number;
//   };
// }

// export interface ForecastDay {
//   dt: number;
//   tempMin: number;
//   tempMax: number;
//   humidity: number;
//   windSpeed: number;
//   description: string;
//   icon: string;
//   pop: number;
// }
