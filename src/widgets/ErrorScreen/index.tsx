import icon from '../../assets/icons/cloudy.svg';
import './ErrorScreen.css';

type ErrorScreenProps = {
  message: 'denied' | 'unavailable';
};

const ErrorScreen = ({ message }: ErrorScreenProps) => {
  return (
    <div className="error-screen">
      <div className="error-screen__image-wrapper">
        <img src={icon} alt="Облако" />
      </div>
      {message === 'denied' ? (
        <>
          <p className="error-screen__description">Кажется, вы прячетесь.</p>
          <p className="error-screen__description">Разрешите доступ к местоположению</p>
        </>
      ) : (
        <p className="error-screen__description">Не удалось определить местоположение</p>
      )}
    </div>
  );
};

export default ErrorScreen;
