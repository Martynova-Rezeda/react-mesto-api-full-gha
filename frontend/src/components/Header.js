import React from 'react';
import logoPath from '../images/logo.svg';
import { Route, Routes, NavLink } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип сайта" className="header__logo" />

      <nav className="menu">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <NavLink to="/sign-in" className="menu__link">
                Войти
              </NavLink>
            }
          />

          <Route
            path="/sign-in"
            element={
              <NavLink to="/sign-up" className="menu__link">
                Регистрация
              </NavLink>
            }
          />

          <Route
            path="/"
            element={
              <div className="menu__link-block">
                <p className="menu__email">{userEmail}</p>
                <NavLink
                  to="/sign-in"
                  className="menu__link"
                  onClick={onSignOut}
                >
                  Выйти
                </NavLink>
              </div>
            }
          />

          <Route
            path="/*"
            element={
              <NavLink to="/sign-in" className="menu__link" onClick={onSignOut}>
                Выйти
              </NavLink>
            }
          />
        </Routes>
      </nav>
    </header>
  );
}
export default Header;
