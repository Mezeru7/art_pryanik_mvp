import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import styles from './AuthPage.module.scss';

function LoginPage() {
  const [form, setForm] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

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
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: form.login.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Неверные данные для входа');
        return;
      }

      login(data.token, data.user);
      navigate(from, { replace: true });
    } catch {
      setServerError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
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
              disabled={loading}
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
              disabled={loading}
            />
            {errors.password && <p className={styles.auth__error}>{errors.password}</p>}

            {serverError && <p className={styles.auth__error}>{serverError}</p>}

            <div className={styles.auth__links}>
              <Link to="/register" className={styles.auth__link}>Нет аккаунта?</Link>
              <Link to="/forgot-password" className={styles.auth__link}>Забыли пароль?</Link>
            </div>

            <button className={styles.auth__btn} type="submit" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
