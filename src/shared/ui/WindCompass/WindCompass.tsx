import './WindCompass.css';

interface WindCompassProps {
  deg: number;
}

const WindCompass = ({ deg }: WindCompassProps) => (
  <div className="wind-compass">
    <div className="wind-compass__arrow" style={{ '--deg': `${deg}deg` } as React.CSSProperties}>
      <img src="icons/arrow-compass.svg" alt="" />
    </div>
    <span className="wind-compass__north">С</span>
    <span className="wind-compass__south">Ю</span>
    <span className="wind-compass__west">З</span>
    <span className="wind-compass__east">В</span>
  </div>
);

export default WindCompass;
