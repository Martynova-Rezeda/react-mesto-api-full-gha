import React from 'react';

import { useState } from 'react';

const Login = ({ onLoginSubmit }) => {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    onLoginSubmit(password, email);
  };
  return (
    <>
      <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__header">Вход</h1>
          <input
            className="login__field"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValue.email}
          />
          <input
            className="login__field"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={formValue.password}
          />
          <div className="login__button-container">
            <button type="submit" className="login__button">
              Войти
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
