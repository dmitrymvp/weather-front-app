import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image-wrapper">
        <img className="loader__spiner" src="icons/clear-day.svg" alt="Крутящееся солнышко" />
      </div>
      <p className="loader__description">Считаем облака...</p>
    </div>
  );
};

export default Loader;
