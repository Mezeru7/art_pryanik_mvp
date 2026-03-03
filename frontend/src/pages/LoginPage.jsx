import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import styles from './AuthPage.module.scss';

function LoginPage() {
  const [form, setForm] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.login.trim()) errs.login = 'Введите имя, почту или телефон';
    if (!form.password) errs.password = 'Введите пароль';
    else if (form.password.length < 6) errs.password = 'Минимум 6 символов';
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
  };

  return (
    <>
      <SEO title="Вход" description="Войдите в аккаунт Арт-Пряник" path="/login" />

      <div className={styles.auth}>
        <div className={styles.auth__card}>
          <h1 className={styles.auth__title}>
            Авторизуйтесь<br />пожалуйста
          </h1>

          <form className={styles.auth__form} onSubmit={handleSubmit} noValidate>
            <input
              className={`${styles.auth__input} ${errors.login ? styles['auth__input--error'] : ''}`}
              type="text"
              name="login"
              placeholder="Ваше имя, почта или номер телефона"
              value={form.login}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.login && <p className={styles.auth__error}>{errors.login}</p>}

            <input
              className={`${styles.auth__input} ${errors.password ? styles['auth__input--error'] : ''}`}
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <p className={styles.auth__error}>{errors.password}</p>}

            <div className={styles.auth__links}>
              <Link to="/register" className={styles.auth__link}>Нет аккаунта?</Link>
              <Link to="/forgot-password" className={styles.auth__link}>Забыли пароль?</Link>
            </div>

            <button className={styles.auth__btn} type="submit">
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
