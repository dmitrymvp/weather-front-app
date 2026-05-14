import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__description">git commit -m "fix: убрал дождь из прогноза" </p>
      <p className="footer__contacts">
        <a href="https://github.com/dmitrymvp" className="footer__link">
          @DMITRYMVP
        </a>{' '}
        · СДМ 2026 · Рецифра
      </p>
    </footer>
  );
};

export default Footer;
