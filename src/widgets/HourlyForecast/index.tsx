import './HourlyForecast.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { HourlyPoint } from '@entities/weather';
import { getWeatherIcon } from '@shared/utils/weatherIcons';
import { round1 } from '@shared/utils/converters';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface Props {
  points: HourlyPoint[];
}

const formatHour = (dt: number, tz: number): string => {
  const d = new Date((dt + tz) * 1000);
  return String(d.getUTCHours()).padStart(2, '0') + ':00';
};

const HourlyForecast = ({ points }: Props) => {
  if (!points.length) return null;

  const labels = points.map((p) => formatHour(p.dt, p.timezone));
  const temps = points.map((p) => round1(p.temp));

  const data = {
    labels,
    datasets: [
      {
        data: temps,
        borderColor: '#378add',
        borderWidth: 2,
        pointBackgroundColor: '#b5d4f4',
        pointBorderColor: '#378add',
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}°`,
        },
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: false,
        grace: '10%',
      },
    },
  };

  return (
    <section className="hourly-forecast">
      <h2 className="hourly-forecast__title">На ближайшие 24 часа</h2>
      <div className="hourly-forecast__scroll">
        <div className="hourly-forecast__inner">
          <div className="hourly-forecast__icons-row">
            {points.map((point) => (
              <div key={point.dt} className="hourly-forecast__col">
                <img
                  className="hourly-forecast__col-icon"
                  src={getWeatherIcon(point.icon)}
                  alt={point.icon}
                />
                <span className="hourly-forecast__col-temp">{round1(point.temp)}°</span>
              </div>
            ))}
          </div>

          <div className="hourly-forecast__chart">
            <Line data={data} options={options} />
          </div>

          <div className="hourly-forecast__times-row">
            {points.map((point) => (
              <div key={point.dt} className="hourly-forecast__col">
                <span className="hourly-forecast__col-time">
                  {formatHour(point.dt, point.timezone)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HourlyForecast;
