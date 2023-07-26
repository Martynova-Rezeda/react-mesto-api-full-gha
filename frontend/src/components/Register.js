import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegistationSubmit, isOpen }) => {
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
    onRegistationSubmit(password, email);
  };
  return (
    <>
      <div className="register">
        <form className="register__form" onSubmit={handleSubmit}>
          <h1 className="register__header">Регистрация</h1>
          <input
            className="register__field"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            className="register__field"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
          />
          <div className="register__button-container">
            <button type="submit" className="register__button">
              Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p className="register__signin-title">
            Уже зарегистрированы?
            <Link to="/sign-in" className="register__login-link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
