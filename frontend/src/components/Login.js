import React from 'react';

function Login({ onLogin, formLoginValue, setFormLoginValue }) {
  function handleEmailChange(evt) {
    const { name, value } = evt.target;
    setFormLoginValue({
      ...formLoginValue,
      [name]: value,
    });
  }

  return (
    <div className="page__authorisation">
      <h1 className="page__title">Вход</h1>
      <form className="page__form" onSubmit={onLogin}>
          <input
            type="email"
            className="page__input"
            name="email"
            placeholder="Email"
            required
            id="input-email"
            onChange={handleEmailChange}
            value={formLoginValue.email || ""}
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
            value={formLoginValue.password || ""}
          />
          <span className="page__error"></span>
        <button className="page__button page__button_margin">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;