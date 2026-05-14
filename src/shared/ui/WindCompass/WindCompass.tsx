// src/shared/ui/WindCompass/WindCompass.tsx

import s from './WindCompass.module.css';

interface WindCompassProps {
  deg: number;
}

const WindCompass = ({ deg }: WindCompassProps) => (
  <div className={s.compass}>
    <div className={s.arrow} style={{ '--deg': `${deg}deg` } as React.CSSProperties}>
      <img src="/icons/arrow-compass.svg" alt="" />
    </div>
    <span className={s.north}>С</span>
    <span className={s.south}>Ю</span>
    <span className={s.west}>З</span>
    <span className={s.east}>В</span>
  </div>
);

export default WindCompass;
