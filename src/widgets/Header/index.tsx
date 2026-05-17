import type { ReactNode } from 'react';
import './Header.css';

const Header = ({ children }: { children?: ReactNode }) => (
  <header className="header">
    <h1 className="app-name">Погодный фронт</h1>
    {children}
  </header>
);

export default Header;
