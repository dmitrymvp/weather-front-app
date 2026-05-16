import { useState } from 'react';
import type { WeatherData } from '../../entities/weather';
import { formatSunTime, sunlightDuration, sunPosition } from '../../shared/utils/converters';
import s from './Daylight.module.css';

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
    <section className={s.daylight}>
      <h3 className={s.daylight__title}>Световой день</h3>

      <div className={s.daylight__trackBlock}>
        <div className={s.daylight__labels}>
          <span>{sunriseLabel}</span>
          <span>утро</span>
          <span>полдень</span>
          <span>вечер</span>
          <span>{sunsetLabel}</span>
        </div>

        <div className={s.track}>
          <div className={s.track__fill} style={{ width: positionPercent }} />
          <div className={s.track__thumb} style={{ left: positionPercent }} />
        </div>

        <div className={s.daylght__info}>
          <div className={s.info__Item}>
            <span className={s.info__Label}>Восход</span>
            <span className={s.info__Value}>{sunriseLabel}</span>
          </div>

          <div className={s.info__Item} data-center>
            <span className={s.info__Label}>Световой день</span>
            <span className={s.info__Value}>{sunlightDuration(sunrise, sunset)}</span>
          </div>

          <div className={s.info__Item} data-right>
            <span className={s.info__Label}>Закат</span>
            <span className={s.info__Value}>{sunsetLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Daylight;
