import { useState } from 'react';
import type { WeatherData } from '../../entities/weather';
import { formatSunTime, sunlightDuration, sunPosition } from '../../shared/utils/converters';
import './Daylight.css';

interface Props {
  data: Pick<WeatherData, 'sunrise' | 'sunset' | 'timezone'>;
}

const Daylight = ({ data: { sunrise, sunset, timezone } }: Props) => {
  const [nowUnix] = useState<number>(() => Math.floor(Date.now() / 1000));

  const position = sunPosition(sunrise, sunset, nowUnix);
  const positionPercent = `${Math.round(position * 100)}%`;

  const sunriseLabel = formatSunTime(sunrise, timezone);
  const sunsetLabel = formatSunTime(sunset, timezone);

  return (
    <section className="daylight">
      <h3 className="daylight__title">Световой день</h3>

      <div className="daylight__track-block">
        <div className="daylight__labels">
          <span>{sunriseLabel}</span>
          <span>утро</span>
          <span>полдень</span>
          <span>вечер</span>
          <span>{sunsetLabel}</span>
        </div>

        <div className="daylight__track">
          <div className="daylight__track-fill" style={{ width: positionPercent }} />
          <div className="daylight__track-thumb" style={{ left: positionPercent }} />
        </div>

        <div className="daylight__info">
          <div className="daylight__info-item">
            <span className="daylight__info-label">Восход</span>
            <span className="daylight__info-value">{sunriseLabel}</span>
          </div>

          <div className="daylight__info-item" data-center>
            <span className="daylight__info-label">Световой день</span>
            <span className="daylight__info-value">{sunlightDuration(sunrise, sunset)}</span>
          </div>

          <div className="daylight__info-item" data-right>
            <span className="daylight__info-label">Закат</span>
            <span className="daylight__info-value">{sunsetLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Daylight;
