import React from 'react';
import { Link } from 'react-router-dom';

function Register({ formRegisterValue, setFormRegisterValue, onRegister }) {
  function handleEmailChange(evt) {
    const { name, value } = evt.target;
    setFormRegisterValue({
      ...formRegisterValue,
      [name]: value,
    });
  }

  return (
    <div className="page__authorisation">
      <h1 className="page__title">Регистрация</h1>
      <form className="page__form" onSubmit={onRegister}>
        <input
          type="email"
          className="page__input"
          name="email"
          placeholder="Email"
          required
          id="input-email"
          onChange={handleEmailChange}
          value={formRegisterValue.email}
        />
        <span className="page__error"></span>
        <input
          type="password"
          className="page__input"
          name="password"
          placeholder="Пароль"
          required
          id="input-password"
          onChange={handleEmailChange}
          value={formRegisterValue.password}
        />
        <span className="page__error"></span>
        <button className="page__button">
          Зарегистрироватся
        </button>
      </form>
      <p className="page__text">
        Уже зарегистрированы?
        <Link className="page__link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;